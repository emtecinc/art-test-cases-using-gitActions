import { Page, expect } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

/**
 * Handles the Account creation modal dialog form (Lightning standard layout).
 */
export class AccountCreationPage extends BasePage {
  readonly pageName = 'AccountCreationPage';
  protected readonly relativeUrl = '/lightning/o/Account/new';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get accountNameInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('textbox', { name: 'Account Name', exact: true }),
      (p) => p.getByLabel('*Account Name'),
      (p) => p.locator('input[name="Name"]'),
    ]);
  }

  private get conversionPropensityScoreInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('spinbutton', { name: 'Conversion Propensity Score' }),
      (p) => p.getByLabel('Conversion Propensity Score'),
      (p) => p.locator('input[name="Conversion_Propensity_Score__c"]'),
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

  async fillAccountName(name: string): Promise<void> {
    try {
      const locator = this.accountNameInput.getLocator();
      await expect(locator).toBeVisible({ timeout: 15_000 });
      await locator.fill(name);
    } catch (error) {
      console.error('Failed to fill Account Name');
      throw error;
    }
  }

  async fillConversionPropensityScore(score: string): Promise<void> {
    try {
      await this.conversionPropensityScoreInput.getLocator().fill(score);
    } catch (error) {
      console.error('Failed to fill Conversion Propensity Score');
      throw error;
    }
  }

  async clickSave(): Promise<void> {
    try {
      await this.saveButton.getLocator().click();
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error('Failed to click Save on Account creation form');
      throw error;
    }
  }
}
