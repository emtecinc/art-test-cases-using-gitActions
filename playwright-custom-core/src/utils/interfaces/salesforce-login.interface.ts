/**
 * Contract for any Salesforce browser login implementation.
 *
 * Interface Segregation: this interface is narrow and focused solely on
 * establishing an authenticated browser context.  It knows nothing about
 * how the token is obtained or where the session is persisted.
 *
 * Dependency Inversion: callers (e.g. global-setup.ts) depend on this
 * abstraction, not on the concrete SalesforceLoginService.  This makes
 * it trivial to swap implementations (e.g. a mock in unit tests).
 */

import { Browser, BrowserContext } from '@playwright/test';

export interface ISalesforceLoginService {
  /**
   * Authenticates to Salesforce using the JWT Bearer Flow + frontdoor.jsp
   * mechanism and returns a fully initialised Playwright BrowserContext.
   *
   * Responsibilities of this method:
   *  1. Obtain a valid OAuth access token (delegated to SalesforceConnection).
   *  2. Navigate a headless browser to frontdoor.jsp so Salesforce sets all
   *     required cookies and session state natively.
   *  3. Wait for the Lightning Experience shell to finish booting.
   *  4. Return the context so the caller can persist it via storageState().
   *
   * The method does NOT:
   *  - Save sf-auth.json (caller's responsibility).
   *  - Close the browser (caller's responsibility).
   *
   * @param browser  A Playwright Browser instance to create the context in.
   * @returns        Authenticated BrowserContext ready for storageState().
   * @throws         Clear, actionable error if login or MFA redirect detected.
   */
  login(browser: Browser): Promise<BrowserContext>;
}
