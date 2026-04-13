import { Page, expect } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

/**
 * Handles the Plan Customer creation modal dialog form.
 */
export class PlanCustomerCreationPage extends BasePage {
  readonly pageName = 'PlanCustomerCreationPage';
  protected readonly relativeUrl = '/lightning/o/Plan_Customer__c/new';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get nameInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('textbox', { name: 'Name', exact: true }),
      (p) => p.getByLabel('*Name'),
      (p) => p.locator('input[name="Name"]'),
    ]);
  }

  private get saveButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'Save', exact: true }),
      (p) => p.locator('button[name="SaveEdit"]'),
      (p) => p.locator('records-lwc-detail-panel').getByRole('button', { name: 'Save' }),
    ]);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async fillName(name: string): Promise<void> {
    try {
      const locator = this.nameInput.getLocator();
      await expect(locator).toBeVisible({ timeout: 15_000 });
      await locator.fill(name);
    } catch (error) {
      console.error('Failed to fill Plan Customer Name');
      throw error;
    }
  }

  async clickSave(): Promise<void> {
    try {
      await this.saveButton.getLocator().click();
      // Wait for the form to navigate away from the /new page back to the parent record
      await this['page'].waitForURL(/\/lightning\/r\//, { timeout: 30_000 });
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error('Failed to click Save on Plan Customer creation form');
      throw error;
    }
  }
}
