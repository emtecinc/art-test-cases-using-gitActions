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
export class ResilientLocator {
  private readonly page: Page;
  private readonly strategies: LocatorStrategy[];

  /**
   * @param page - The Playwright Page instance
   * @param strategies - Ordered list of locator strategies to try
   */
  constructor(page: Page, strategies: LocatorStrategy[]) {
    this.page = page;
    this.strategies = [...strategies];
  }

  /**
   * Get the first working locator by trying each strategy in order.
   *
   * @returns The first successfully resolved Locator
   * @throws Error if all locator strategies fail
   */
  getLocator(): Locator {
    for (const strategy of this.strategies) {
      try {
        const locator = strategy(this.page);
        return locator;
      } catch {
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
  async getVisibleLocator(timeout = 1000): Promise<Locator> {
    for (const strategy of this.strategies) {
      try {
        const locator = strategy(this.page);
        await locator.waitFor({ state: 'visible', timeout });
        return locator;
      } catch {
        // Try next strategy
      }
    }
    throw new Error('All locator strategies failed — no visible element found.');
  }
}
