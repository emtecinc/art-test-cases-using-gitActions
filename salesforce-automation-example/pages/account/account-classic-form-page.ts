import { Page, expect } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

/**
 * Handles the Salesforce Classic Account creation and edit form.
 * Classic forms use standard HTML table layouts with input fields.
 * URL pattern: /001/e (new) or /001dz00000XXXXX/e (edit)
 */
export class AccountClassicFormPage extends BasePage {
  readonly pageName = 'AccountClassicFormPage';
  protected readonly relativeUrl = '/001/e';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get accountNameInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.locator('input[name="acc2"]'),
      (p) => p.getByRole('textbox', { name: /Account Name/ }),
      (p) => p.locator('tr').filter({ hasText: 'Account Name' }).locator('input[type="text"]'),
    ]);
  }

  private get conversionPropensityScoreInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.locator('input[name="00N4R00000JCbxN"]'),
      (p) => p.getByRole('textbox', { name: /Conversion Propensity Score/ }),
      (p) => p.locator('tr').filter({ hasText: 'Conversion Propensity Score' }).locator('input[type="text"]'),
    ]);
  }

  private get saveButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.locator('input[name="save"][title="Save"]').first(),
      (p) => p.getByRole('button', { name: 'Save', exact: true }).first(),
      (p) => p.locator('input[type="submit"][value=" Save "]').first(),
    ]);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async fillAccountName(name: string): Promise<void> {
    try {
      const locator = this.accountNameInput.getLocator();
      await expect(locator).toBeVisible({ timeout: 15_000 });
      await locator.fill(name);
    } catch (error) {
      console.error('Failed to fill Account Name on Classic form');
      throw error;
    }
  }

  async fillConversionPropensityScore(score: string): Promise<void> {
    try {
      const locator = this.conversionPropensityScoreInput.getLocator();
      await expect(locator).toBeVisible({ timeout: 15_000 });
      await locator.fill(score);
    } catch (error) {
      console.error('Failed to fill Conversion Propensity Score on Classic form');
      throw error;
    }
  }

  async clearAndFillConversionPropensityScore(score: string): Promise<void> {
    try {
      const locator = this.conversionPropensityScoreInput.getLocator();
      await expect(locator).toBeVisible({ timeout: 15_000 });
      await locator.clear();
      await locator.fill(score);
    } catch (error) {
      console.error('Failed to clear and fill Conversion Propensity Score');
      throw error;
    }
  }

  async clickSave(): Promise<void> {
    try {
      await this.saveButton.getLocator().click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to click Save on Classic account form');
      throw error;
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  async verifyFormDisplayed(): Promise<void> {
    try {
      const heading = this['page'].getByRole('heading', { name: /New Account|Account Edit/ }).first();
      await expect(heading).toBeVisible({ timeout: 15_000 });
    } catch (error) {
      console.error('Failed to verify Classic account form is displayed');
      throw error;
    }
  }

  async verifyValidationError(): Promise<void> {
    try {
      const errorAlert = this['page'].getByRole('alert').filter({ hasText: 'Error' });
      await expect(errorAlert).toBeVisible({ timeout: 10_000 });
    } catch (error) {
      console.error('Failed to verify validation error');
      throw error;
    }
  }
}
