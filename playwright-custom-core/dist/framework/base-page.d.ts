import { type Page, TestInfo } from '@playwright/test';
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
export declare abstract class BasePage {
    protected readonly page: Page;
    protected readonly baseUrl: string;
    /** Human-readable name for this page */
    abstract readonly pageName: string;
    /** Relative URL path for this page (e.g. '/login') */
    protected abstract readonly relativeUrl: string;
    /** Full page URL (baseUrl + relativeUrl) */
    get pageUrl(): string;
    constructor(page: Page, baseUrl: string);
    /**
     * Navigate to this page using the default timeout.
     */
    navigate(): Promise<void>;
    /**
     * Navigate to this page with a custom timeout.
     * @param waitTime - Timeout in milliseconds
     */
    navigateWithTimeout(waitTime: number): Promise<void>;
    /**
     * Execute a named step.
     *
     * @param description - Human-readable step description
     * @param action - Async action to execute within the step
     */
    protected testStep(description: string, action: () => Promise<void>): Promise<void>;
    /**
     * Capture a screenshot and attach it to the Playwright test report.
     *
     * @param page - Playwright Page object
     * @param path - File path to save screenshot
     * @param name - Descriptive name to hint the context of the screenshot
     */
    captureScreenshot(page: Page, testInfo: TestInfo, name: string): Promise<void>;
}
//# sourceMappingURL=base-page.d.ts.map