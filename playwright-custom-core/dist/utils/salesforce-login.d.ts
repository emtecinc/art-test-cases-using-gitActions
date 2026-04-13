/**
 * Salesforce browser login service.
 *
 * Establishes an authenticated Playwright BrowserContext by navigating to
 * Salesforce's frontdoor.jsp endpoint.
 *
 * Depends on SalesforceConnection for JWT signing / token exchange.
 * Does NOT persist the session to disk (global-setup.ts handles that).
 */
import { Browser, BrowserContext } from '@playwright/test';
import { ISalesforceLoginService } from './interfaces/salesforce-login.interface';
import { SalesforceConnection } from './salesforce-connection';
export declare class SalesforceLoginService implements ISalesforceLoginService {
    private readonly sfConnection;
    /**
     * @param sfConnection  Injected connection. Defaults to the singleton.
     */
    constructor(sfConnection?: SalesforceConnection);
    login(browser: Browser): Promise<BrowserContext>;
    private resolveCredentials;
    private assertNotMfaRedirect;
}
//# sourceMappingURL=salesforce-login.d.ts.map