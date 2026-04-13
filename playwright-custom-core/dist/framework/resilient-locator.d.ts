import type { Page, Locator } from '@playwright/test';
/**
 * A locator strategy is a function that, given a page, returns a Locator.
 */
export type LocatorStrategy = (page: Page) => Locator;
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
export declare class ResilientLocator {
    private readonly page;
    private readonly strategies;
    /**
     * @param page - The Playwright Page instance
     * @param strategies - Ordered list of locator strategies to try
     */
    constructor(page: Page, strategies: LocatorStrategy[]);
    /**
     * Get the first working locator by trying each strategy in order.
     *
     * @returns The first successfully resolved Locator
     * @throws Error if all locator strategies fail
     */
    getLocator(): Locator;
    /**
     * Get the first working locator by trying each strategy and verifying
     * that the element is actually present in the DOM.
     *
     * @param timeout - Max time (ms) to wait for each strategy. Default: 1000
     * @returns The first locator whose element is visible
     * @throws Error if all locator strategies fail or no element is found
     */
    getVisibleLocator(timeout?: number): Promise<Locator>;
}
//# sourceMappingURL=resilient-locator.d.ts.map