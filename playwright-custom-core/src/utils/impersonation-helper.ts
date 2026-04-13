/**
 * Salesforce Impersonation Helper — "Login As" / "Log Back In" utility.
 *
 * Provides two static methods that operate on the **same page / context**:
 *
 *   ImpersonationHelper.loginAs(page, 'Jane Smith')
 *     → Navigates to Setup → Users, finds the user, clicks "Login"
 *     → Page is now running as Jane Smith
 *
 *   ImpersonationHelper.logBack(page)
 *     → Clicks the "Log back in as …" banner Salesforce shows
 *     → If the page is redirected to the login page (session corrupted),
 *       restores the admin session from stored auth state (.auth/salesforce.json).
 *     → If stored auth state is stale/invalid, reuses the cached credentials
 *       from the SalesforceConnection singleton (primed by global-setup) to
 *       navigate to frontdoor.jsp and restore the session — no new JWT
 *       exchange is triggered unless the cached token is unavailable.
 *     → Page returns to the admin session
 *
 * Because this operates on the SAME browser context:
 *   - No separate storageState files are created.
 *   - No new BrowserContexts are opened.
 *   - The admin session's cookies are replaced by the impersonated session.
 *
 * Session isolation in parallel runs
 * ────────────────────────────────────
 * Clicking "Log out as" only affects the current BrowserContext's cookies.
 * Each Playwright worker has its own isolated context (storageState is copied
 * at context-creation time, not shared live).  Impersonation in one worker
 * does NOT corrupt sessions in other parallel workers.
 *
 * The shared auth-states/sf-auth.json file is intentionally NOT overwritten
 * by logBack().  Writing it here would race with other parallel workers that
 * read it for session-refresh.  The restoration is scoped to this context only.
 *
 * ⚠ IMPORTANT:
 *   - Do NOT register SessionRefreshMiddleware while impersonated.
 *     The middleware would attempt a JWT refresh for the admin user,
 *     which would overwrite the impersonated session.
 *   - After logBack(), the admin session is automatically restored —
 *     first from stored auth state, then via the singleton's cached credentials.
 */

import { Page } from '@playwright/test';
import fs from 'fs';
import { SessionManager } from './session-manager';
import { SalesforceConnection } from './salesforce-connection';

const LIGHTNING_READY_SELECTOR =
  'one-app-nav-bar-item-root, .slds-global-header__item, one-appnav-menu-item';

type StorageCookie = {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
};

export class ImpersonationHelper {

  /**
   * Derive the Salesforce org base URL from the current page URL.
   * Falls back to the provided baseUrl or BASE_URL env variable.
   */
  private static resolveBaseUrl(page: Page, baseUrl?: string): string {
    // 1. Try to derive from current page URL (most reliable — page is already on the org)
    try {
      const currentUrl = new URL(page.url());
      if (currentUrl.protocol.startsWith('http')) {
        return currentUrl.origin;
      }
    } catch {
      // page.url() may return 'about:blank' or similar
    }

    // 2. Fall back to explicit baseUrl parameter
    if (baseUrl) {
      return baseUrl.replace(/\/$/, '');
    }

    // 3. Fall back to environment variable
    const envUrl = process.env.BASE_URL;
    if (envUrl) {
      return envUrl.replace(/\/$/, '');
    }

    throw new Error(
      '[ImpersonationHelper] Cannot resolve Salesforce base URL. ' +
      'Ensure the page is already on the org, or pass baseUrl, or set BASE_URL env variable.'
    );
  }

  /**
   * Convert a display name between "First Last" ↔ "Last, First" formats.
   * Salesforce Setup Users list displays names as "Last, First" while
   * Lightning UI often uses "First Last".
   *
   * @param name  The name to convert (e.g. "Support Manager" → "Manager, Support")
   * @returns     The reversed format, or null if the name has only one word.
   */
  private static reverseNameFormat(name: string): string | null {
    // If name contains comma → "Last, First" → convert to "First Last"
    if (name.includes(',')) {
      const parts = name.split(',').map((p) => p.trim());
      if (parts.length === 2 && parts[0] && parts[1]) {
        return `${parts[1]} ${parts[0]}`;
      }
      return null;
    }

    // If name is "First Last" → convert to "Last, First"
    const parts = name.trim().split(/\s+/);
    if (parts.length === 2) {
      return `${parts[1]}, ${parts[0]}`;
    }

    // Multi-word names (3+): treat last word as last name, rest as first
    if (parts.length > 2) {
      const lastName = parts[parts.length - 1];
      const firstName = parts.slice(0, -1).join(' ');
      return `${lastName}, ${firstName}`;
    }

    return null;
  }

  /**
   * Log in as another Salesforce user via Setup → Users → Login.
   *
   * Accepts the user display name in either "First Last" (e.g. "Support Manager")
   * or "Last, First" (e.g. "Manager, Support") format — the helper automatically
   * tries both formats against the Setup Users list.
   *
   * The "Login" link is clicked directly from the Users list row, avoiding
   * an extra navigation to the User Detail page.
   *
   * Prerequisites:
   *   - The current page must be authenticated as an admin user with
   *     "Manage Users" permission and "Login As" enabled.
   *
   * @param page                   The current Playwright Page (will be mutated).
   * @param targetUserDisplayName  The display name of the user to impersonate
   *                               (e.g. "Jane Smith" or "Smith, Jane").
   * @param baseUrl                Optional Salesforce org base URL (e.g. "https://myorg.lightning.force.com").
   *                               If omitted, derived from the current page URL or BASE_URL env variable.
   */
  static async loginAs(page: Page, targetUserDisplayName: string, baseUrl?: string): Promise<void> {
    console.log(`[ImpersonationHelper] Logging in as "${targetUserDisplayName}"…`);

    const orgBaseUrl = ImpersonationHelper.resolveBaseUrl(page, baseUrl);
    console.log(`[ImpersonationHelper] Using base URL: ${orgBaseUrl}`);

    // Step 1: Navigate to Setup → Users
    await page.goto(`${orgBaseUrl}/lightning/setup/ManageUsers/home`, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    // Step 2: Salesforce Setup pages render content inside an iframe.
    // Try common iframe title patterns.
    const iframeSelectors = [
      'iframe[title="Users ~ Salesforce - Enterprise Edition"]',
      'iframe[title*="Users"]',
      'iframe[title*="Setup"]',
    ];

    let setupFrame = page.frameLocator(iframeSelectors[0]);
    for (const selector of iframeSelectors) {
      const candidate = page.frameLocator(selector);
      try {
        await candidate.locator('body').waitFor({ state: 'attached', timeout: 10_000 });
        setupFrame = candidate;
        break;
      } catch {
        // Try next
      }
    }

    // Step 3: Find the target user row in the Users list.
    // Salesforce displays names as "Last, First" in the Users list,
    // but callers often pass "First Last". Try both formats.
    const namesToTry = [targetUserDisplayName];
    const reversedName = ImpersonationHelper.reverseNameFormat(targetUserDisplayName);
    if (reversedName) {
      namesToTry.push(reversedName);
    }

    console.log(`[ImpersonationHelper] Looking for user with names: ${namesToTry.join(' | ')}`);

    // Find the user row that contains a "Login" link.
    // The Users list renders each user as a table row with: [Checkbox | Edit | Login] [Full Name] ...
    // We locate the row by matching the user name, then click the "Login" link in that row.
    let loginLink = null;
    for (const nameVariant of namesToTry) {
      try {
        // Find the row containing the user name in the rowheader
        const userRow = setupFrame.getByRole('row').filter({
          has: setupFrame.locator(`th:has(a:text-is("${nameVariant}"))`)
        });

        const rowLoginLink = userRow.getByRole('link', { name: 'Login', exact: true });
        await rowLoginLink.waitFor({ state: 'visible', timeout: 15_000 });
        loginLink = rowLoginLink;
        console.log(`[ImpersonationHelper] Found user "${nameVariant}" with Login link.`);
        break;
      } catch {
        console.log(`[ImpersonationHelper] Name variant "${nameVariant}" not found, trying next…`);
      }
    }

    if (!loginLink) {
      throw new Error(
        `[ImpersonationHelper] Could not find user "${targetUserDisplayName}" ` +
        `(also tried: ${reversedName ?? 'N/A'}) in the Setup Users list. ` +
        `Ensure the user exists and the admin has "Login As" permission.`
      );
    }

    // Step 4: Click the "Login" link directly from the Users list row
    await loginLink.click();

    // Step 5: Wait for the page to finish loading after impersonation.
    // The impersonated user may land on Lightning Experience or Classic,
    // so use waitForLoadState instead of Lightning-specific selectors.
    await page.waitForLoadState('domcontentloaded', { timeout: 60_000 });
    await page.waitForLoadState('load', { timeout: 60_000 }).catch(() => {});

    // Step 6: Navigate to the main Lightning home page using the CURRENT page origin.
    // After impersonation from Setup, the page may land on the setup subdomain
    // (e.g. *.salesforce-setup.com) or Salesforce Classic. Navigate to /lightning/page/home
    // so the page is on Lightning Experience where the "Log back in" banner is visible.
    const currentOrigin = new URL(page.url()).origin;
    console.log(`[ImpersonationHelper] Post-login origin: ${currentOrigin}. Navigating to Lightning home…`);

    await page.goto(`${currentOrigin}/lightning/page/home`, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    // Wait for any nav element — either Lightning or Classic header
    const PAGE_READY_SELECTOR = `${LIGHTNING_READY_SELECTOR}, .slds-global-header, [role="banner"], [role="navigation"]`;
    await page.waitForSelector(PAGE_READY_SELECTOR, {
      state: 'visible',
      timeout: 30_000,
    });

    console.log(
      `[ImpersonationHelper] ✅ Now impersonating "${targetUserDisplayName}". ` +
      `URL: ${page.url()}`
    );
  }

  // ============================================
  // LOGIN PAGE DETECTION
  // ============================================

  /** URL patterns that indicate Salesforce has redirected to a login page. */
  private static readonly LOGIN_PAGE_SIGNALS = [
    '/login.salesforce.com',
    '/secur/login',
    'login?',
    '/identity/',
    '/visualforce/session',
    'startURL=%2Fvisualforce%2Fsession',
    'un=', // login form query params
  ];

  /**
   * Returns true if the page's current URL looks like a Salesforce login page.
   */
  private static isOnLoginPage(page: Page): boolean {
    const currentUrl = page.url();
    return ImpersonationHelper.LOGIN_PAGE_SIGNALS.some((signal) =>
      currentUrl.includes(signal),
    );
  }

  // ============================================
  // SESSION RESTORATION — FROM STORED AUTH STATE
  // ============================================

  /**
   * Attempt to restore the admin session by loading cookies from the stored
   * auth-state file (.auth/salesforce.json) into the current browser context.
   *
   * @returns true if Lightning shell is reachable after restoring cookies.
   */
  private static async restoreFromStoredAuthState(page: Page): Promise<boolean> {
  const logTag = '[ImpersonationHelper]';
  const authPath = SessionManager.getStorageStatePath();

  if (!SessionManager.exists()) {
    console.log(`${logTag} No stored auth state.`);
    return false;
  }

  console.log(`${logTag} Attempting restore from ${authPath}...`);

  try {
    const storedState = JSON.parse(fs.readFileSync(authPath, 'utf8')) as any;
    const cookies = storedState.cookies as StorageCookie[] || [];

    if (cookies.length === 0) return false;

    // 1. Clear everything aggressively
    await page.context().clearCookies();
    // Optionally clear storage if you captured origins
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    // 2. Add cookies with better handling
    await page.context().addCookies(cookies);
    console.log(`${logTag} Injected ${cookies.length} cookies.`);

    // 3. Determine target URL (prefer env, or from sid cookie domain)
    const sidCookie = cookies.find(c => c.name === 'sid');
    if (!sidCookie) return false;

    const domain = sidCookie.domain.replace(/^\./, '');
    const orgUrl = `https://${domain}`;

    // 4. Use frontdoor.jsp as the injection point — this is the most reliable way even with stored sid
    const frontdoorUrl = `${orgUrl}/secur/frontdoor.jsp?sid=${sidCookie.value}`;
    console.log(`${logTag} Navigating via frontdoor.jsp with stored sid...`);

    await page.goto(frontdoorUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });

    if (ImpersonationHelper.isOnLoginPage(page)) {
      console.log(`${logTag} Stored sid rejected (stale after impersonation).`);
      return false;
    }

    // 5. Verify Lightning shell
    await page.waitForSelector(LIGHTNING_READY_SELECTOR, { state: 'visible', timeout: 30_000 });

    console.log(`${logTag} ✅ Restored from stored auth state (via frontdoor).`);
    return true;
  } catch (error) {
    console.warn(`${logTag} Restore from file failed:`, error);
    return false;
  }
}

  // ============================================
  // SESSION RESTORATION — SINGLETON CREDENTIALS
  // ============================================

  /**
   * Unlike SalesforceSessionRefreshMiddleware (which resets the singleton
   * because the Salesforce server-side session has genuinely expired),
   * impersonation logout only corrupts **this browser context's cookies** —
   * the admin access token in the singleton is still valid on Salesforce's
   * side.  We can therefore reuse the cached credentials directly without
   * forcing a new JWT exchange.
   *
   * The restored session is scoped to this BrowserContext only.
   * The shared auth-states/sf-auth.json file is intentionally NOT written
   * here to avoid racing with other parallel workers.
   *
   * @returns true if Lightning shell is reachable after restoring cookies.
   */
  private static async restoreViaJwtRefresh(page: Page): Promise<boolean> {
    const logTag = '[ImpersonationHelper]';

    console.log(`${logTag} Restoring session via cached singleton credentials…`);

    try {
      // Reuse the cached token from global-setup — no reset() needed.
      // The admin token is still valid; only this context's cookies were lost.
      const { accessToken, instanceUrl } = await SalesforceConnection.getInstance().getConnection();

      if (!accessToken || !instanceUrl) {
        console.error(`${logTag} Singleton returned empty credentials.`);
        return false;
      }

      // Navigate to frontdoor.jsp to re-establish the browser session
      const frontdoorUrl = `${instanceUrl}/secur/frontdoor.jsp?sid=${accessToken}`;
      console.log(`${logTag} Navigating to frontdoor.jsp…`);

      await page.goto(frontdoorUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
      });

      // Wait for frontdoor.jsp redirect to complete
      await page.waitForURL(
        (url) => !url.toString().includes('frontdoor.jsp'),
        { timeout: 30_000 },
      );

      // Verify we're not on a login/MFA page
      if (ImpersonationHelper.isOnLoginPage(page)) {
        console.error(`${logTag} Still on login page after frontdoor.jsp — cached token may be stale.`);
        return false;
      }

      // Wait for Lightning shell
      await page.waitForSelector(LIGHTNING_READY_SELECTOR, {
        state: 'visible',
        timeout: 30_000,
      });

      // Intentionally NOT writing storageState back to the shared auth file.
      // This restoration is scoped to the current BrowserContext only.
      // Writing here would race with other parallel workers reading the file.

      console.log(`${logTag} ✅ Admin session restored via singleton credentials.`);
      return true;
    } catch (error) {
      console.error(`${logTag} ❌ Session restoration failed:`, error);
      await page.screenshot({
        path: `test-results/impersonation-logback-jwt-failure-${Date.now()}.png`,
        fullPage: true,
      }).catch(() => {});
      return false;
    }
  }

  // ============================================
  // LOG BACK — PUBLIC API
  // ============================================

  /**
   * Log back in as the original admin user.
   * 
   * This method:
   *   1. Clicks the "Log out as" link to end the impersonation.
   *   2. If Salesforce redirects to the login page (session corrupted),
   *      restores the admin session from stored auth state (.auth/salesforce.json).
   *   3. If stored auth state is stale/invalid, reuses cached credentials from
   *      the SalesforceConnection singleton (no new JWT exchange) to restore
   *      the session in this context only — shared auth file is NOT overwritten.
   *
   * @param page     The current Playwright Page (running as impersonated user).
   * @param baseUrl  Optional Salesforce org base URL. Derived automatically if omitted.
   */
  static async logBack(page: Page, baseUrl?: string): Promise<void> {
    const logTag = '[ImpersonationHelper]';
    console.log(`${logTag} Logging back as admin…`);

    // Use broader page readiness selector
    const PAGE_READY_SELECTOR = `${LIGHTNING_READY_SELECTOR}, .slds-global-header, [role="banner"], [role="navigation"]`;

    // The "Log back in as ..." banner may not be visible if the page is on
    // the setup subdomain. Use the current origin for navigation.
    const currentOrigin = new URL(page.url()).origin;

    // ── Step 1: Click the "Log out as" banner ────────────────────
    const logBackSelectors = [
      page.getByRole('link', { name: /Log out as/i }).first(),
      page.locator('a').filter({ hasText: /Log out as/i }).first(),
      page.locator('a[href*="logout"]').filter({ hasText: /Log out/i }).first(),
    ];

    let clicked = false;

    // Try clicking on the current page
    for (const selector of logBackSelectors) {
      try {
        await selector.waitFor({ state: 'visible', timeout: 5_000 });
        await selector.click();
        clicked = true;
        break;
      } catch {
        // Try next selector
      }
    }

    // If not found, navigate to Lightning home page where the banner should appear
    if (!clicked) {
      console.log(`${logTag} Log back banner not found on current page. Navigating to Lightning home…`);
      await page.goto(`${currentOrigin}/lightning/page/home`, {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
      });
      await page.waitForSelector(PAGE_READY_SELECTOR, {
        state: 'visible',
        timeout: 30_000,
      }).catch(() => {});

      // Retry finding the banner after navigation
      for (const selector of logBackSelectors) {
        try {
          await selector.waitFor({ state: 'visible', timeout: 10_000 });
          await selector.click();
          clicked = true;
          break;
        } catch {
          // Try next selector
        }
      }
    }

    if (!clicked) {
      throw new Error(
        `${logTag} Could not find "Log out as" link. ` +
        'The page may not be in an impersonated session.',
      );
    }

    // Wait for the logout navigation to settle
    await page.waitForLoadState('domcontentloaded', { timeout: 60_000 });

    // ── Step 2: Detect login-page redirect ───────────────────────
    // After clicking "Log out as [user]", Salesforce often redirects to
    // the login page, corrupting the original admin session.
    if (!ImpersonationHelper.isOnLoginPage(page)) {
      // Best case: we're back on a Salesforce page as admin
      try {
        await page.waitForSelector(PAGE_READY_SELECTOR, {
          state: 'visible',
          timeout: 15_000,
        });
        console.log(`${logTag} ✅ Logged back as admin (no session recovery needed). URL: ${page.url()}`);
        return;
      } catch {
        console.log(`${logTag} Page loaded but Lightning shell not visible. Checking further…`);
      }
    }

    console.log(
      `${logTag} ⚠️  Redirected to login page after impersonation logout. ` +
      `URL: ${page.url()}. Attempting session recovery…`,
    );

    // ── Step 3: Restore from stored auth state ───────────────────
    // const restoredFromFile = await ImpersonationHelper.restoreFromStoredAuthState(page);
    // if (restoredFromFile) {
    //   console.log(`${logTag} ✅ Logged back as admin (restored from auth state). URL: ${page.url()}`);
    //   return;
    // }

    // ── Step 4: Restore via singleton cached credentials (last resort) ─────
    const restoredFromJwt = await ImpersonationHelper.restoreViaJwtRefresh(page);
    if (restoredFromJwt) {
      console.log(`${logTag} ✅ Logged back as admin (restored via singleton credentials). URL: ${page.url()}`);
      return;
    }

    // ── All recovery attempts exhausted ──────────────────────────
    await page.screenshot({
      path: `test-results/impersonation-logback-failure-${Date.now()}.png`,
      fullPage: true,
    }).catch(() => {});

    throw new Error(
      `${logTag} ❌ Failed to restore admin session after impersonation logout. ` +
      `All recovery attempts exhausted. Current URL: ${page.url()}`,
    );
  }
}
