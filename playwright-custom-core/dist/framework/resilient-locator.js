"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResilientLocator = void 0;
/**
 * Resilient Locator
 *
 * Provides fallback/multi-strategy element location.
 * Tries each strategy in order until one succeeds, enabling self-healing
 * when primary selectors break due to UI changes.
 *
 * @example
 * ```ts
 * const submitButton = new ResilientLocator(page, [
 *   (p) => p.getByRole('button', { name: 'Submit' }),
 *   (p) => p.locator('#submit-btn'),
 *   (p) => p.locator('[data-testid="submit"]'),
 * ]);
 *
 * const locator = submitButton.getLocator();
 * await locator.click();
 * ```
 */
class ResilientLocator {
    page;
    strategies;
    /**
     * @param page - The Playwright Page instance
     * @param strategies - Ordered list of locator strategies to try
     */
    constructor(page, strategies) {
        this.page = page;
        this.strategies = [...strategies];
    }
    /**
     * Get the first working locator by trying each strategy in order.
     *
     * @returns The first successfully resolved Locator
     * @throws Error if all locator strategies fail
     */
    getLocator() {
        for (const strategy of this.strategies) {
            try {
                const locator = strategy(this.page);
                return locator;
            }
            catch {
                // Try next strategy
            }
        }
        throw new Error('All locator strategies failed.');
    }
    /**
     * Get the first working locator by trying each strategy and verifying
     * that the element is actually present in the DOM.
     *
     * @param timeout - Max time (ms) to wait for each strategy. Default: 1000
     * @returns The first locator whose element is visible
     * @throws Error if all locator strategies fail or no element is found
     */
    async getVisibleLocator(timeout = 1000) {
        for (const strategy of this.strategies) {
            try {
                const locator = strategy(this.page);
                await locator.waitFor({ state: 'visible', timeout });
                return locator;
            }
            catch {
                // Try next strategy
            }
        }
        throw new Error('All locator strategies failed — no visible element found.');
    }
}
exports.ResilientLocator = ResilientLocator;
//# sourceMappingURL=resilient-locator.js.map