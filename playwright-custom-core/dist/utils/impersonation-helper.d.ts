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
export declare class ImpersonationHelper {
    /**
     * Derive the Salesforce org base URL from the current page URL.
     * Falls back to the provided baseUrl or BASE_URL env variable.
     */
    private static resolveBaseUrl;
    /**
     * Convert a display name between "First Last" ↔ "Last, First" formats.
     * Salesforce Setup Users list displays names as "Last, First" while
     * Lightning UI often uses "First Last".
     *
     * @param name  The name to convert (e.g. "Support Manager" → "Manager, Support")
     * @returns     The reversed format, or null if the name has only one word.
     */
    private static reverseNameFormat;
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
    static loginAs(page: Page, targetUserDisplayName: string, baseUrl?: string): Promise<void>;
    /** URL patterns that indicate Salesforce has redirected to a login page. */
    private static readonly LOGIN_PAGE_SIGNALS;
    /**
     * Returns true if the page's current URL looks like a Salesforce login page.
     */
    private static isOnLoginPage;
    /**
     * Attempt to restore the admin session by loading cookies from the stored
     * auth-state file (.auth/salesforce.json) into the current browser context.
     *
     * @returns true if Lightning shell is reachable after restoring cookies.
     */
    private static restoreFromStoredAuthState;
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
    private static restoreViaJwtRefresh;
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
    static logBack(page: Page, baseUrl?: string): Promise<void>;
}
//# sourceMappingURL=impersonation-helper.d.ts.map