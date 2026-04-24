import { Page, expect, test } from '@playwright/test';
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
      await this.captureScreenshot(this['page'], test.info(), 'fill-account-name-failure');
      throw new Error(`fillAccountName failed: ${String(error)}`);
    }
  }

  async fillConversionPropensityScore(score: string): Promise<void> {
    try {
      const locator = this.conversionPropensityScoreInput.getLocator();
      await expect(locator).toBeVisible({ timeout: 15_000 });
      await locator.fill(score);
    } catch (error) {
      console.error('Failed to fill Conversion Propensity Score on Classic form');
      await this.captureScreenshot(this['page'], test.info(), 'fill-propensity-score-failure');
      throw new Error(`fillConversionPropensityScore failed: ${String(error)}`);
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
      await this.captureScreenshot(this['page'], test.info(), 'clear-fill-propensity-score-failure');
      throw new Error(`clearAndFillConversionPropensityScore failed: ${String(error)}`);
    }
  }

  async clickSave(): Promise<void> {
    try {
      await this.saveButton.getLocator().click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to click Save on Classic account form');
      await this.captureScreenshot(this['page'], test.info(), 'click-save-failure');
      throw new Error(`clickSave failed: ${String(error)}`);
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  async verifyFormDisplayed(): Promise<void> {
    try {
      const heading = this['page'].getByRole('heading', { name: /New Account|Account Edit/ }).first();
      await expect(heading).toBeVisible({ timeout: 15_000 });
    } catch (error) {
      console.error('Failed to verify Classic account form is displayed');
      await this.captureScreenshot(this['page'], test.info(), 'verify-form-displayed-failure');
      throw new Error(`verifyFormDisplayed failed: ${String(error)}`);
    }
  }

  async verifyValidationError(): Promise<void> {
    try {
      const errorAlert = this['page'].getByRole('alert').filter({ hasText: 'Error' });
      await expect(errorAlert).toBeVisible({ timeout: 10_000 });
    } catch (error) {
      console.error('Failed to verify validation error');
      await this.captureScreenshot(this['page'], test.info(), 'verify-validation-error-failure');
      throw new Error(`verifyValidationError failed: ${String(error)}`);
    }
  }
}
