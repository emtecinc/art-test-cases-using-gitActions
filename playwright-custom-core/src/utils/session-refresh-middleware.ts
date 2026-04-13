/**
 * Salesforce session-refresh middleware (cross-process safe).
 *
 * Problem it solves
 * ─────────────────
 * Long-running Playwright tests can outlive the Salesforce server-side
 * session lifetime.  When that happens, Salesforce silently redirects the
 * browser to the login page.  Any subsequent Playwright action then fails
 * with a cryptic "element not found" timeout.
 *
 * How it works
 * ────────────
 * 1. `register(page)` is called once per test (typically in a workflow or
 *    in test.beforeEach).
 * 2. A `framenavigated` listener tracks the last valid Salesforce URL so
 *    the middleware knows where to return after re-authentication.
 * 3. When the listener detects a session-expiry redirect pattern, the
 *    middleware:
 *    a. Acquires a file-based mutex (proper-lockfile) to prevent redundant
 *       JWT exchanges from parallel workers.
 *    b. Checks whether the storage-state file was already refreshed by
 *       another worker (mtime comparison).  If yes, skips JWT and reloads
 *       cookies from file.
 *    c. If not, resets the SalesforceConnection, forces a fresh JWT
 *       exchange, navigates to frontdoor.jsp, and persists the refreshed
 *       storage state.
 *    d. Navigates back to the last known good Salesforce URL.
 * 4. The lock is released in a finally block.
 *
 * IMPORTANT: Never register this middleware on an impersonated session.
 *   After "Login As", the page is running as a different user — refreshing
 *   the admin JWT would corrupt the impersonated session.
 *   Use ImpersonationHelper.logBack() instead to return to admin.
 */

import { Frame, Page } from '@playwright/test';
import lockfile from 'proper-lockfile';
import fs from 'fs';
import { ISessionRefreshMiddleware } from './interfaces/session-refresh.interface';
import { SalesforceConnection } from './salesforce-connection';
import { SessionManager } from './session-manager';

// ── Constants ─────────────────────────────────────────────────────────────────

const SESSION_EXPIRY_URL_SIGNALS = [
  '/visualforce/session',
  'startURL=%2Fvisualforce%2Fsession',
];

const LIGHTNING_READY_SELECTOR =
  'one-app-nav-bar-item-root, .slds-global-header__item, one-appnav-menu-item';

// ── Middleware ────────────────────────────────────────────────────────────────

export class SalesforceSessionRefreshMiddleware implements ISessionRefreshMiddleware {
  private readonly sfConnection: SalesforceConnection;

  /** Last valid Salesforce URL seen before a session redirect occurred. */
  private lastKnownSalesforceUrl = '';

  /** Running count of session refreshes — useful for diagnosing flaky tests. */
  private refreshCount = 0;

  /** Timestamp (epoch ms) of when the current expiry was first detected. */
  private expiryDetectedAt = 0;

  /**
   * @param sfConnection  Optional injected connection.  Defaults to the singleton.
   */
  constructor(sfConnection?: SalesforceConnection) {
    this.sfConnection = sfConnection ?? SalesforceConnection.getInstance();
  }

  // ── Public ────────────────────────────────────────────────────────────────

  /**
   * Attaches session-expiry detection to the given page.
   */
  register(page: Page): void {
    this.attachFrameNavigatedListener(page);
    console.log(`[SessionRefreshMiddleware] Session-expiry handler registered.`);
  }

  // ── Private ───────────────────────────────────────────────────────────────

  private refreshInProgress = false;

  private attachFrameNavigatedListener(page: Page): void {
    page.on('framenavigated', (frame: Frame) => {
      if (frame !== page.mainFrame()) return;

      const url = frame.url();

      if (this.isValidSalesforceUrl(url)) {
        this.lastKnownSalesforceUrl = url;
        return;
      }

      const isExpiryRedirect = SESSION_EXPIRY_URL_SIGNALS.some((signal) =>
        url.includes(signal),
      );

      if (isExpiryRedirect && !this.refreshInProgress) {
        this.refreshInProgress = true;
        this.expiryDetectedAt = Date.now();
        void this.handleSessionExpiry(page).finally(() => {
          this.refreshInProgress = false;
        });
      }
    });
  }

  private async handleSessionExpiry(page: Page): Promise<void> {
    this.refreshCount++;
    const logTag = '[SessionRefreshMiddleware]';
    const authPath = SessionManager.getStorageStatePath();

    console.warn(
      `${logTag} ⚠️  Session expiry detected (refresh #${this.refreshCount}). ` +
      `Detected URL: ${page.url()}`
    );

    SessionManager.ensureDir();

    if (!fs.existsSync(authPath)) {
      fs.writeFileSync(authPath, '{}');
    }

    let release: (() => Promise<void>) | null = null;

    try {
      // ── Step 1: Acquire file-based mutex ──────────────────────
      console.log(`${logTag} Acquiring lock on ${authPath}…`);
      release = await lockfile.lock(authPath, {
        retries: {
          retries: 10,
          minTimeout: 500,
          maxTimeout: 3000,
          factor: 1.5,
        },
        stale: 120_000,
      });
      console.log(`${logTag} Lock acquired.`);

      // ── Step 2: Check if another worker already refreshed ─────
      if (SessionManager.isFresherThan(this.expiryDetectedAt)) {
        console.log(
          `${logTag} Storage state was already refreshed by another worker. ` +
          `Reloading cookies from ${authPath}…`
        );

        const freshState = JSON.parse(fs.readFileSync(authPath, 'utf8'));
        if (freshState.cookies && Array.isArray(freshState.cookies)) {
          await page.context().clearCookies();
          await page.context().addCookies(freshState.cookies);
        }

        if (this.lastKnownSalesforceUrl) {
          await page.goto(this.lastKnownSalesforceUrl, { timeout: 30_000 }).catch(() => {});
        }

        await page.waitForSelector(LIGHTNING_READY_SELECTOR, {
          state: 'visible',
          timeout: 30_000,
        });

        console.log(`${logTag} ✅ Session reloaded from another worker's refresh.`);
        return;
      }

      // ── Step 3: Full JWT refresh ──────────────────────────────
      console.log(`${logTag} No fresh session found — performing full JWT refresh.`);

      this.sfConnection.reset();
      const connection = await this.sfConnection.getConnection();

      const accessToken = connection.accessToken;
      const instanceUrl = connection.instanceUrl;

      if (!accessToken || !instanceUrl) {
        throw new Error(
          `${logTag} Fresh credentials were empty. ` +
          'Verify SF_USERNAME, SF_CLIENT_ID, and SF_PRIVATE_KEY_PATH env vars.'
        );
      }

      // ── Step 4: Re-establish browser session via frontdoor.jsp
      const frontdoorUrl = `${instanceUrl}/secur/frontdoor.jsp?sid=${accessToken}`;
      console.log(`${logTag} Navigating to frontdoor.jsp…`);
      await page.goto(frontdoorUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });

      await page.waitForURL(
        (url) => !url.toString().includes('frontdoor.jsp'),
        { timeout: 30_000 },
      );

      // ── Step 5: Confirm Lightning shell is ready ──────────────
      await page.waitForSelector(LIGHTNING_READY_SELECTOR, {
        state: 'visible',
        timeout: 30_000,
      });
      console.log(`${logTag} Lightning shell ready.`);

      // ── Step 6: Persist refreshed session ─────────────────────
      await page.context().storageState({ path: authPath });
      console.log(`${logTag} Refreshed session persisted to ${authPath}.`);

      // ── Step 7: Return to the pre-expiry page ─────────────────
      const currentUrl = page.url();
      const stillOnExpiryUrl = SESSION_EXPIRY_URL_SIGNALS.some((signal) =>
        currentUrl.includes(signal),
      );

      if (stillOnExpiryUrl && this.lastKnownSalesforceUrl) {
        console.log(`${logTag} Returning to pre-expiry URL: ${this.lastKnownSalesforceUrl}`);
        await page.goto(this.lastKnownSalesforceUrl, { timeout: 30_000 }).catch(() => {
          console.log(`${logTag} Return navigation superseded by test navigation — OK.`);
        });
      }

      console.log(
        `${logTag} ✅ Session refreshed successfully ` +
        `(total refreshes this test: ${this.refreshCount}).`
      );
    } catch (error) {
      console.error(`${logTag} ❌ Session refresh failed:`, error);
      await page.screenshot({
        path: `test-results/session-refresh-failure-${Date.now()}.png`,
        fullPage: true,
      }).catch(() => {});
      throw error;
    } finally {
      if (release) {
        try {
          await release();
          console.log(`${logTag} Lock released.`);
        } catch (unlockErr) {
          console.warn(`${logTag} Lock release failed (may be stale):`, unlockErr);
        }
      }
    }
  }

  private isValidSalesforceUrl(url: string): boolean {
    if (!url || url === 'about:blank') return false;
    const isSalesforceHost =
      url.includes('salesforce.com') || url.includes('force.com');
    const isAuthOrRedirectEndpoint =
      url.includes('login.salesforce.com') ||
      url.includes('frontdoor.jsp') ||
      url.includes('/secur/login') ||
      url.includes('/identity/') ||
      url.includes('/visualforce/session') ||
      url.includes('startURL=%2Fvisualforce%2Fsession');
    return isSalesforceHost && !isAuthOrRedirectEndpoint;
  }
}
