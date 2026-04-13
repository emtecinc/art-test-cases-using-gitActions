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
import { Page } from '@playwright/test';
import { ISessionRefreshMiddleware } from './interfaces/session-refresh.interface';
import { SalesforceConnection } from './salesforce-connection';
export declare class SalesforceSessionRefreshMiddleware implements ISessionRefreshMiddleware {
    private readonly sfConnection;
    /** Last valid Salesforce URL seen before a session redirect occurred. */
    private lastKnownSalesforceUrl;
    /** Running count of session refreshes — useful for diagnosing flaky tests. */
    private refreshCount;
    /** Timestamp (epoch ms) of when the current expiry was first detected. */
    private expiryDetectedAt;
    /**
     * @param sfConnection  Optional injected connection.  Defaults to the singleton.
     */
    constructor(sfConnection?: SalesforceConnection);
    /**
     * Attaches session-expiry detection to the given page.
     */
    register(page: Page): void;
    private refreshInProgress;
    private attachFrameNavigatedListener;
    private handleSessionExpiry;
    private isValidSalesforceUrl;
}
//# sourceMappingURL=session-refresh-middleware.d.ts.map