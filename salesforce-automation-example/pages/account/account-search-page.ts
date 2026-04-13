import { Page, expect } from '@playwright/test';
import { BasePage } from 'playwright-custom-core';

/**
 * Handles the Visualforce iframe-based "Search First" account creation flow
 * and the record type selection iframe.
 */
export class AccountSearchPage extends BasePage {
  readonly pageName = 'AccountSearchPage';
  protected readonly relativeUrl = '/lightning/o/Account/new';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  /**
   * Returns a FrameLocator that lazily resolves across ALL VF iframes.
   * Playwright's frameLocator() is the recommended API for dynamic iframe names
   * and correctly handles iframes that appear after navigation.
   */
  private vfFrame() {
    return this['page'].frameLocator('iframe[name^="vfFrameId"]');
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async searchAccount(searchTerm: string): Promise<void> {
    try {
      const searchInput = this.vfFrame().getByRole('textbox', { name: 'Account' });
      await expect(searchInput).toBeVisible({ timeout: 15_000 });
      await searchInput.fill(searchTerm);
      await this.vfFrame().getByRole('button', { name: 'Search' }).click();
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error('Failed to search account in VF iframe');
      throw error;
    }
  }

  async clickNewInSearchResults(): Promise<void> {
    try {
      const newButton = this.vfFrame().getByRole('button', { name: 'New' });
      await expect(newButton).toBeVisible({ timeout: 10_000 });
      await newButton.click();
    } catch (error) {
      console.error('Failed to click New in search results');
      throw error;
    }
  }

  async selectRecordTypeAndContinue(): Promise<void> {
    try {
      // After clicking New in search results, the page loads a SECOND VF iframe for
      // record type selection alongside the existing search iframe.
      // The newer (last) iframe contains the Continue button — use .last() to target it.
      const continueButton = this['page']
        .frameLocator('iframe[name^="vfFrameId"]')
        .last()
        .getByRole('button', { name: 'Continue' });
      await expect(continueButton).toBeVisible({ timeout: 20_000 });
      await continueButton.click();
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error('Failed to select record type and click Continue');
      throw error;
    }
  }
}
