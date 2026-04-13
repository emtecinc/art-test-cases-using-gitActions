import { Page, expect } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

/**
 * Page Object for the Fund Account Selection Visualforce iframe form.
 *
 * The form lives inside a cross-origin Visualforce iframe whose name attribute
 * starts with "vfFrameId" followed by a dynamic timestamp. Multiple VF iframes
 * may be present on the page; the form frame is the one with height="600px".
 * All locators are scoped to the iframe's content frame.
 */
export class FundAccountSelectionPage extends BasePage {
  readonly pageName = 'FundAccountSelectionPage';
  protected readonly relativeUrl = '';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Frame access ──────────────────────────────────────────────────────────

  /**
   * Returns a FrameLocator for the VF iframe content.
   *
   * Salesforce VF iframes have **empty `src` attributes** — the content is
   * loaded via JavaScript, so `iframe[src*="vf.force.com"]` never matches.
   * Instead we target by `name^="vfFrameId"` (stable Salesforce convention).
   *
   * After clicking "New Fund Account Selection", Lightning keeps the previous
   * detail page's VF iframe in the DOM (hidden). The form iframe is the
   * last matching element, so we use `.last()`.
   */
  private vfFrame(p: Page) {
    return p.locator('iframe[name^="vfFrameId"]').last().contentFrame();
  }

  /** Shorthand for the current page's VF frame. */
  private get frame() {
    return this.vfFrame(this['page']);
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get fundAccountCombobox() {
    return new ResilientLocator(this['page'], [
      (p) => this.vfFrame(p).getByRole('combobox', { name: 'Fund Account', exact: true }),
      (p) => this.vfFrame(p).getByLabel('Fund Account', { exact: true }),
      (p) => this.vfFrame(p).locator('input[placeholder*="Search Fund"]'),
    ]);
  }

  private get percentOfInvestmentInput() {
    return new ResilientLocator(this['page'], [
      (p) => this.vfFrame(p).getByRole('spinbutton', { name: '% of Investment' }),
      (p) => this.vfFrame(p).getByLabel('% of Investment'),
      (p) => this.vfFrame(p).locator('input[type="number"]').first(),
    ]);
  }

  private get iraTypeCombobox() {
    return new ResilientLocator(this['page'], [
      (p) => this.vfFrame(p).getByRole('combobox', { name: 'IRAType' }),
      (p) => this.vfFrame(p).getByLabel('IRAType'),
      (p) => this.vfFrame(p).locator('[name="IRAType__c"]'),
    ]);
  }

  private get fundAccountSelectionTypeCombobox() {
    return new ResilientLocator(this['page'], [
      (p) => this.vfFrame(p).getByRole('combobox', { name: 'Fund Account Selection Type' }),
      (p) => this.vfFrame(p).getByLabel('Fund Account Selection Type'),
      (p) => this.vfFrame(p).locator('[name*="FundAccountSelectionType"]'),
    ]);
  }

  private get saveAndCloseButton() {
    return new ResilientLocator(this['page'], [
      (p) => this.vfFrame(p).getByRole('button', { name: 'Save & Close' }),
      (p) => this.vfFrame(p).locator('button').filter({ hasText: /Save & Close/i }),
      (p) => this.vfFrame(p).locator('input[value="Save & Close"]'),
    ]);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async waitForIframeVisible(): Promise<void> {
    try {
      // First wait for the VF iframe element itself to appear in the DOM
      const iframeLocator = this['page'].locator('iframe[name^="vfFrameId"]').last();
      await expect(iframeLocator).toBeVisible({ timeout: 30_000 });

      // Then wait for the Fund Account combobox inside the frame
      await expect(this.fundAccountCombobox.getLocator()).toBeVisible({ timeout: 30_000 });
    } catch (error) {
      console.error('Fund Account Selection iframe did not become visible');
      throw error;
    }
  }

  /**
   * Types the search text into the Fund Account combobox and selects the matching option.
   * Uses pressSequentially because the lookup requires character-by-character input to trigger suggestions.
   */
  async fillFundAccountAndSelect(searchText: string, optionName: string): Promise<void> {
    try {
      const combobox = this.fundAccountCombobox.getLocator();
      await combobox.click();
      await combobox.pressSequentially(searchText, { delay: 80 });
      const option = this.frame.getByRole('option', { name: optionName });
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
   * The IRAType field is a Lightning combobox button — click to open, then click the option.
   */
  async selectIraType(value: string): Promise<void> {
    const combobox = this.iraTypeCombobox.getLocator();
    const option = this.frame.getByRole('option', { name: value, exact: true });

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await combobox.click({ timeout: 10_000 });
        await expect(option).toBeVisible({ timeout: 5_000 });
        await option.click();
        return;
      } catch { /* Dropdown closed — retry */ }
    }
    await combobox.click({ timeout: 10_000 });
    await expect(option).toBeVisible({ timeout: 5_000 });
    await option.click();
  }

  /**
   * Selects the Fund Account Selection Type option from the Lightning combobox.
   */
  async selectFundAccountSelectionType(value: string): Promise<void> {
    const combobox = this.fundAccountSelectionTypeCombobox.getLocator();
    const option = this.frame.getByRole('option', { name: value, exact: true });

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await combobox.click({ timeout: 10_000 });
        await expect(option).toBeVisible({ timeout: 5_000 });
        await option.click();
        return;
      } catch { /* Dropdown closed — retry */ }
    }
    await combobox.click({ timeout: 10_000 });
    await expect(option).toBeVisible({ timeout: 5_000 });
    await option.click();
  }

  /**
   * Clicks the "Save & Close" button, which saves the Fund Account Selection
   * and navigates back to the parent Opportunity detail page.
   */
  async clickSaveAndClose(): Promise<void> {
    try {
      await this.saveAndCloseButton.getLocator().click();
    } catch (error) {
      console.error('Failed to click Save & Close on Fund Account Selection form');
      throw error;
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  /**
   * Verifies the Fund Account Selection form heading is visible in the iframe.
   */
  async verifyFormVisible(): Promise<void> {
    try {
      const heading = this.frame.getByRole('heading', { name: 'Fund Account Selection', exact: true });
      await expect(heading).toBeVisible({ timeout: 20_000 });
    } catch (error) {
      console.error('Fund Account Selection form is not visible');
      throw error;
    }
  }
}
