"use strict";
/**
 * Salesforce browser login service.
 *
 * Establishes an authenticated Playwright BrowserContext by navigating to
 * Salesforce's frontdoor.jsp endpoint.
 *
 * Depends on SalesforceConnection for JWT signing / token exchange.
 * Does NOT persist the session to disk (global-setup.ts handles that).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesforceLoginService = void 0;
const salesforce_connection_1 = require("./salesforce-connection");
const LIGHTNING_READY_SELECTOR = 'one-app-nav-bar-item-root, .slds-global-header__item, one-appnav-menu-item';
const MFA_URL_SIGNALS = ['/login/', '/identity/', 'login.salesforce.com'];
class SalesforceLoginService {
    sfConnection;
    /**
     * @param sfConnection  Injected connection. Defaults to the singleton.
     */
    constructor(sfConnection) {
        this.sfConnection = sfConnection ?? salesforce_connection_1.SalesforceConnection.getInstance();
    }
    async login(browser) {
        const { accessToken, instanceUrl } = await this.resolveCredentials();
        const context = await browser.newContext();
        const page = await context.newPage();
        try {
            const frontdoorUrl = `${instanceUrl}/secur/frontdoor.jsp?sid=${accessToken}`;
            console.log(`[SalesforceLoginService] Navigating to frontdoor.jsp…`);
            await page.goto(frontdoorUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
            await page.waitForURL((url) => !url.toString().includes('frontdoor.jsp'), { timeout: 30_000, waitUntil: 'commit' });
            this.assertNotMfaRedirect(page.url());
            // await page.waitForSelector(LIGHTNING_READY_SELECTOR, {
            //   state: 'visible',
            //   timeout: 30_000,
            // });
            console.log(`[SalesforceLoginService] ✅ Lightning shell ready. URL: ${page.url()}`);
        }
        catch (error) {
            console.error(`[SalesforceLoginService] Login failed — saving screenshot.`);
            await page
                .screenshot({ path: 'test-results/login-failure.png', fullPage: true })
                .catch(() => { });
            await context.close();
            throw error;
        }
        finally {
            await page.close();
        }
        return context;
    }
    async resolveCredentials() {
        const connection = await this.sfConnection.getConnection();
        const accessToken = connection.accessToken;
        const instanceUrl = connection.instanceUrl;
        if (!accessToken) {
            throw new Error(`[SalesforceLoginService] No access token returned. ` +
                'Verify SF_CLIENT_ID, SF_USERNAME, and SF_PRIVATE_KEY_PATH env vars.');
        }
        if (!instanceUrl) {
            throw new Error(`[SalesforceLoginService] No instance URL returned.`);
        }
        return { accessToken, instanceUrl };
    }
    assertNotMfaRedirect(currentUrl) {
        const isMfaRedirect = MFA_URL_SIGNALS.some((signal) => currentUrl.includes(signal));
        if (isMfaRedirect) {
            throw new Error(`[SalesforceLoginService] Salesforce redirected to an MFA / login page ` +
                `after frontdoor.jsp. Detected URL: ${currentUrl}\n` +
                'Resolution: ensure the automation user has the ' +
                '"Waive Multi-Factor Authentication for Exempt Users" permission set.');
        }
    }
}
exports.SalesforceLoginService = SalesforceLoginService;
//# sourceMappingURL=salesforce-login.js.map