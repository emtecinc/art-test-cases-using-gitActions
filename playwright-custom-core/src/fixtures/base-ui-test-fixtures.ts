import { test as base } from '@playwright/test';

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
export const test = base.extend<CustomFixtures>({
  baseUrl: async ({}, use) => {
    const url = process.env.BASE_URL || base.info().project.use.baseURL || 'http://localhost:3000';
    await use(url);
  },
});

export { expect } from '@playwright/test';
