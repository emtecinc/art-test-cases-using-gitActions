/**
 * Custom fixture types provided by the base test setup.
 */
export type CustomFixtures = {
    /** Base URL for the application under test */
    baseUrl: string;
};
/**
 * Base UI Test Fixtures
 *
 * Extends Playwright's base test with custom fixtures:
 * - `baseUrl`: The application base URL (from env or Playwright config)
 *
 * @example
 * ```ts
 * import { test, expect } from '../fixtures/base-ui-test-fixtures';
 *
 * test('should load the homepage', async ({ page, baseUrl }) => {
 *   await page.goto(baseUrl);
 *   await expect(page).toHaveTitle(/My App/);
 * });
 * ```
 */
export declare const test: import("@playwright/test").TestType<import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & CustomFixtures, import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions>;
export { expect } from '@playwright/test';
//# sourceMappingURL=base-ui-test-fixtures.d.ts.map