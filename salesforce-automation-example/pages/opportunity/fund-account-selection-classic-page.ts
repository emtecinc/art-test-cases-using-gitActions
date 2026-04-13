import { Page, expect } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

/**
 * Page Object for the Fund Account Selection standalone Visualforce page.
 *
 * In the Classic UI flow, clicking "New Fund Account Selection" on the
 * Opportunity detail page navigates to a standalone VF page at:
 *   /apex/InvestmentFundAccountSelection?oppId={id}&oppRecordTypeName={type}
 *
 * All fields render directly on the page (no iframe wrapper).
 * After "Save & Close", the page redirects back to the Classic Opportunity detail page.
 */
export class FundAccountSelectionClassicPage extends BasePage {
  readonly pageName = 'FundAccountSelectionClassicPage';
  protected readonly relativeUrl = '';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get fundAccountCombobox() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('combobox', { name: 'Fund Account', exact: true }),
      (p) => p.getByLabel('Fund Account', { exact: true }),
      (p) => p.locator('input[placeholder*="Search Fund"]'),
    ]);
  }

  private get percentOfInvestmentInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('spinbutton', { name: '% of Investment' }),
      (p) => p.getByLabel('% of Investment'),
      (p) => p.locator('input[type="number"]').first(),
    ]);
  }

  private get iraTypeCombobox() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('combobox', { name: 'IRAType' }),
      (p) => p.getByLabel('IRAType'),
      (p) => p.locator('[name="IRAType__c"]'),
    ]);
  }

  private get saveAndCloseButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'Save & Close' }),
      (p) => p.locator('button').filter({ hasText: /Save & Close/i }),
      (p) => p.locator('input[value="Save & Close"]'),
    ]);
  }

  private get formHeading() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('heading', { name: 'Fund Account Selection', exact: true }),
      (p) => p.locator('h2').filter({ hasText: 'Fund Account Selection' }),
      (p) => p.locator('.slds-page-header__title').filter({ hasText: 'Fund Account Selection' }),
    ]);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  /**
   * Waits for the Fund Account Selection form to be fully visible.
   */
  async waitForFormVisible(): Promise<void> {
    try {
      await expect(this.formHeading.getLocator()).toBeVisible({ timeout: 30_000 });
      await expect(this.fundAccountCombobox.getLocator()).toBeVisible({ timeout: 15_000 });
    } catch (error) {
      console.error('Fund Account Selection form did not become visible');
      throw error;
    }
  }

  /**
   * Types the search text into the Fund Account combobox character by character
   * to trigger suggestions, then selects the matching option.
   */
  async fillFundAccountAndSelect(searchText: string, optionName: string): Promise<void> {
    try {
      const combobox = this.fundAccountCombobox.getLocator();
      await combobox.click();
      await combobox.pressSequentially(searchText, { delay: 80 });
      const option = this['page'].getByRole('option', { name: optionName });
      await expect(option).toBeVisible({ timeout: 15_000 });
      await option.click();
    } catch (error) {
      console.error(`Failed to fill Fund Account with: ${searchText} and select: ${optionName}`);
      throw error;
    }
  }

  /**
   * Fills the % of Investment numeric field.
   */
  async fillPercentOfInvestment(value: string): Promise<void> {
    try {
      await this.percentOfInvestmentInput.getLocator().fill(value);
    } catch (error) {
      console.error(`Failed to fill % of Investment with: ${value}`);
      throw error;
    }
  }

  /**
   * Selects the IRAType option from the Lightning combobox.
   * Uses a 3-attempt retry loop since Lightning combobox dropdowns may close unexpectedly.
   */
  async selectIraType(value: string): Promise<void> {
    const combobox = this.iraTypeCombobox.getLocator();
    const option = this['page'].getByRole('option', { name: value, exact: true });

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await combobox.click({ timeout: 10_000 });
        await expect(option).toBeVisible({ timeout: 5_000 });
        await option.click();
        return;
      } catch { /* Dropdown closed — retry */ }
    }
    // Final attempt — throw on failure
    await combobox.click({ timeout: 10_000 });
    await expect(option).toBeVisible({ timeout: 5_000 });
    await option.click();
  }

  /**
   * Clicks the "Save & Close" button and waits for navigation back to the
   * Classic Opportunity detail page.
   */
  async clickSaveAndClose(): Promise<void> {
    try {
      await this.saveAndCloseButton.getLocator().click();
      // After Save & Close, the VF page redirects back to the Classic detail page
      await this['page'].waitForURL((url) => !url.href.includes('/apex/InvestmentFundAccountSelection'), {
        timeout: 30_000,
      });
    } catch (error) {
      console.error('Failed to click Save & Close on Fund Account Selection form');
      throw error;
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  /**
   * Verifies the Fund Account Selection form heading is visible.
   */
  async verifyFormVisible(): Promise<void> {
    try {
      await expect(this.formHeading.getLocator()).toBeVisible({ timeout: 20_000 });
    } catch (error) {
      console.error('Fund Account Selection form is not visible');
      throw error;
    }
  }
}
