/**
 * Contract for any session-refresh middleware implementation.
 *
 * Interface Segregation: deliberately narrow — one method, one concern.
 * Callers depend on this abstraction so the concrete implementation
 * can be swapped (e.g. mocked in unit tests) without touching workflows.
 *
 * Single Responsibility: this interface knows only about registering a
 * per-page session-expiry handler.  It knows nothing about JWT, storage
 * state, or Playwright workflows.
 */
import { Page } from '@playwright/test';
export interface ISessionRefreshMiddleware {
    /**
     * Attaches session-expiry detection to the given Playwright Page.
     *
     * Call ONCE per test page (e.g. in a workflow constructor).
     * The method is synchronous from the caller's perspective — the async
     * handler registration runs as a fire-and-forget so it never blocks
     * test setup.
     *
     * Once registered, the middleware automatically:
     *  1. Detects when Salesforce redirects to the login page
     *     (server-side session invalidation or expiry).
     *  2. Re-authenticates via the JWT Bearer Flow + frontdoor.jsp.
     *  3. Saves the refreshed storage state to sf-auth.json.
     *  4. Navigates the page back to the last valid Salesforce URL so the
     *     test can resume where it left off.
     *
     * @param page  The Playwright Page to attach the handler to.
     */
    register(page: Page): void;
}
//# sourceMappingURL=session-refresh.interface.d.ts.map