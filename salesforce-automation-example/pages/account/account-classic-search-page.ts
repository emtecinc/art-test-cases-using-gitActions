import { Page, expect, test } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

/**
 * Handles the Salesforce Classic "Search First Account" page
 * and record type selection that follows it.
 *
 * Flow: Enter search → Click Search → Click New in results → Select record type → Continue
 */
export class AccountClassicSearchPage extends BasePage {
  readonly pageName = 'AccountClassicSearchPage';
  protected readonly relativeUrl = '/apex/searchFirstAccount';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get accountSearchInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('textbox', { name: 'Account' }),
      (p) => p.locator('input[name="acc2"]'),
      (p) => p.locator('td').filter({ hasText: 'Account' }).locator('~ td input[type="text"]'),
    ]);
  }

  private get searchButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'Search', exact: true }),
      (p) => p.locator('input[name="srch"][title="Search"]'),
      (p) => p.locator('input[type="submit"][value="Search"]'),
    ]);
  }

  private get newButtonInResults() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'New', exact: true }),
      (p) => p.locator('input[name="new"][title="New"]'),
      (p) => p.locator('input[type="submit"][value="New"]'),
    ]);
  }

  private get continueButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'Continue', exact: true }),
      (p) => p.locator('input[name="save"][title="Continue"]'),
      (p) => p.locator('input[type="submit"][value="Continue"]'),
    ]);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async searchAccount(searchTerm: string): Promise<void> {
    try {
      const searchInput = this.accountSearchInput.getLocator();
      await expect(searchInput).toBeVisible({ timeout: 15_000 });
      await searchInput.fill(searchTerm);
      await this.searchButton.getLocator().click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to search account on Classic search page');
      await this.captureScreenshot(this['page'], test.info(), 'search-account-failure');
      throw new Error(`searchAccount failed: ${String(error)}`);
    }
  }

  async clickNewInSearchResults(): Promise<void> {
    try {
      const newButton = this.newButtonInResults.getLocator();
      await expect(newButton).toBeVisible({ timeout: 15_000 });
      await newButton.click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to click New in Classic search results');
      await this.captureScreenshot(this['page'], test.info(), 'click-new-in-search-results-failure');
      throw new Error(`clickNewInSearchResults failed: ${String(error)}`);
    }
  }

  async selectRecordTypeAndContinue(): Promise<void> {
    try {
      const continueBtn = this.continueButton.getLocator();
      await expect(continueBtn).toBeVisible({ timeout: 20_000 });
      await continueBtn.click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to select record type and click Continue');
      await this.captureScreenshot(this['page'], test.info(), 'select-record-type-continue-failure');
      throw new Error(`selectRecordTypeAndContinue failed: ${String(error)}`);
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  async verifySearchResultsDisplayed(): Promise<void> {
    try {
      const heading = this['page'].getByRole('heading', { name: /Accounts \[\d+\]/ });
      await expect(heading).toBeVisible({ timeout: 15_000 });
    } catch (error) {
      console.error('Failed to verify search results displayed');
      await this.captureScreenshot(this['page'], test.info(), 'verify-search-results-failure');
      throw new Error(`verifySearchResultsDisplayed failed: ${String(error)}`);
    }
  }

  async verifyRecordTypeSelectionDisplayed(): Promise<void> {
    try {
      const heading = this['page'].getByRole('heading', { name: 'Select Account Record Type' }).first();
      await expect(heading).toBeVisible({ timeout: 15_000 });
    } catch (error) {
      console.error('Failed to verify record type selection page');
      await this.captureScreenshot(this['page'], test.info(), 'verify-record-type-selection-failure');
      throw new Error(`verifyRecordTypeSelectionDisplayed failed: ${String(error)}`);
    }
  }
}
