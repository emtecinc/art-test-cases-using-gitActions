"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
// import { test } from '@playwright/test';
/**
 * Default navigation timeout (ms).
 */
const DEFAULT_WAIT_TIME = 90_000;
/**
 * Base Page
 *
 * Abstract base class for all Page Objects in the framework.
 * Provides navigation and step-based execution patterns.
 *
 * @example
 * ```ts
 * class LoginPage extends BasePage {
 *   readonly pageName = 'LoginPage';
 *   protected readonly relativeUrl = '/login';
 *
 *   constructor(page: Page, baseUrl: string) {
 *     super(page, baseUrl);
 *   }
 *
 *   async login(username: string, password: string): Promise<void> {
 *     await this.step('Enter credentials and submit', async () => {
 *       await this.page.fill('#username', username);
 *       await this.page.fill('#password', password);
 *       await this.page.click('#submit');
 *     });
 *   }
 * }
 * ```
 */
class BasePage {
    page;
    baseUrl;
    /** Full page URL (baseUrl + relativeUrl) */
    get pageUrl() {
        return `${this.baseUrl}${this.relativeUrl}`;
    }
    constructor(page, baseUrl) {
        this.page = page;
        this.baseUrl = baseUrl;
    }
    /**
     * Navigate to this page using the default timeout.
     */
    async navigate() {
        await this.page.goto(this.pageUrl, { timeout: DEFAULT_WAIT_TIME });
    }
    /**
     * Navigate to this page with a custom timeout.
     * @param waitTime - Timeout in milliseconds
     */
    async navigateWithTimeout(waitTime) {
        await this.page.goto(this.pageUrl, { timeout: waitTime });
    }
    /**
     * Execute a named step.
     *
     * @param description - Human-readable step description
     * @param action - Async action to execute within the step
     */
    async testStep(description, action) {
        // Note: Playwright's test.step is commented out here to avoid double import error in consuming project. Agent should impelement a similar step wrapper in the actual Basepage implementation.
        // await test.step(`${this.pageName}: ${description}`, async () => {
        //   await action();
        // });
    }
    /**
     * Capture a screenshot and attach it to the Playwright test report.
     *
     * @param page - Playwright Page object
     * @param path - File path to save screenshot
     * @param name - Descriptive name to hint the context of the screenshot
     */
    // deprecated captureScreenshot(page: Page, path: string, name: string): Promise<void> {. . . }
    // async captureScreenshot(page: Page, path: string, name: string): Promise<void> {
    //   const screenshot = await page.screenshot({ path, fullPage: false });
    //   // Note: Playwright's test.info().attach is commented out here to avoid double import error in consuming project. Agent should impelement a similar attachment method in the actual Basepage implementation.
    //   await test.info().attach(name, {
    //     body: screenshot,
    //     contentType: 'image/png',
    //   });
    // }
    // Updated method signature
    async captureScreenshot(page, testInfo, name) {
        const screenshot = await page.screenshot({ fullPage: true });
        await testInfo.attach(name, {
            body: screenshot,
            contentType: 'image/png'
        });
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=base-page.js.map