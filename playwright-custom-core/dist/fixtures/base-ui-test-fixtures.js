"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.test = void 0;
const test_1 = require("@playwright/test");
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
exports.test = test_1.test.extend({
    baseUrl: async ({}, use) => {
        const url = process.env.BASE_URL || test_1.test.info().project.use.baseURL || 'http://localhost:3000';
        await use(url);
    },
});
var test_2 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_2.expect; } });
//# sourceMappingURL=base-ui-test-fixtures.js.map