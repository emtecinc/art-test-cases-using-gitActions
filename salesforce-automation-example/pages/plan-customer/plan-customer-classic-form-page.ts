import { Page, expect } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

/**
 * Handles the Salesforce Classic Plan Customer creation form.
 * URL pattern: /a0a/e?CF00NG000000Dwu7q=<AccountName>&...
 */
export class PlanCustomerClassicFormPage extends BasePage {
  readonly pageName = 'PlanCustomerClassicFormPage';
  protected readonly relativeUrl = '/a0a/e';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get nameInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.locator('input[name="Name"]'),
      (p) => p.getByRole('textbox', { name: /^Name/ }),
      (p) => p.locator('tr').filter({ hasText: /^\*?Name$/ }).locator('input[type="text"]'),
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

  async fillName(name: string): Promise<void> {
    try {
      const locator = this.nameInput.getLocator();
      await expect(locator).toBeVisible({ timeout: 15_000 });
      await locator.fill(name);
    } catch (error) {
      console.error('Failed to fill Plan Customer Name on Classic form');
      throw error;
    }
  }

  async clickSave(): Promise<void> {
    try {
      await this.saveButton.getLocator().click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to click Save on Classic Plan Customer form');
      throw error;
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  async verifyFormDisplayed(): Promise<void> {
    try {
      const heading = this['page'].getByRole('heading', { name: /Plan Customer/ }).first();
      await expect(heading).toBeVisible({ timeout: 15_000 });
    } catch (error) {
      console.error('Failed to verify Classic Plan Customer form is displayed');
      throw error;
    }
  }
}
