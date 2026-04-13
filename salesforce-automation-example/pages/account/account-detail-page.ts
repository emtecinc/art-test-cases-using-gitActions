import { Page, expect } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

/**
 * Handles the Account detail/record page — tab navigation, inline edit,
 * related list interactions, and field verification.
 */
export class AccountDetailPage extends BasePage {
  readonly pageName = 'AccountDetailPage';
  protected readonly relativeUrl = '/lightning/r/Account';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Tab Locators ──────────────────────────────────────────────────────────

  private get detailsTab() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('tab', { name: 'Details', exact: true }),
      (p) => p.locator('a[data-tab-name="detailTab"]'),
      (p) => p.locator('li.uiTabItem a[title="Details"]'),
    ]);
  }

  private get relatedTab() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('tab', { name: 'Related', exact: true }),
      (p) => p.locator('a[data-tab-name="relatedListsTab"]'),
      (p) => p.locator('li.uiTabItem a[title="Related"]'),
    ]);
  }

  // ── Inline Edit Locators ──────────────────────────────────────────────────

  private get editConversionPropensityScoreButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'Edit Conversion Propensity Score' }),
      (p) => p.locator('button[title="Edit Conversion Propensity Score"]'),
      (p) => p.getByRole('button', { name: /Edit Conversion Propensity/ }),
    ]);
  }

  private get conversionPropensityScoreInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('spinbutton', { name: 'Conversion Propensity Score' }),
      (p) => p.getByLabel('Conversion Propensity Score'),
      (p) => p.locator('input[name="Conversion_Propensity_Score__c"]'),
    ]);
  }

  private get inlineEditSaveButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'Save', exact: true }),
      (p) => p.locator('button[name="SaveEdit"]'),
      (p) => p.locator('records-lwc-detail-panel').getByRole('button', { name: 'Save' }),
    ]);
  }

  // ── Related List Locators ─────────────────────────────────────────────────

  private get planCustomersNewButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByLabel('Plan Customers').getByRole('button', { name: 'New' }),
      (p) => p.getByRole('article', { name: 'Plan Customers' }).getByRole('button', { name: 'New' }),
      (p) => p.locator('article').filter({ hasText: 'Plan Customers' }).getByRole('button', { name: 'New' }),
    ]);
  }

  // ── Tab Navigation ────────────────────────────────────────────────────────

  async clickDetailsTab(): Promise<void> {
    try {
      await this.detailsTab.getLocator().click();
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error('Failed to click Details tab');
      throw error;
    }
  }

  async clickRelatedTab(): Promise<void> {
    try {
      await this.relatedTab.getLocator().click();
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error('Failed to click Related tab');
      throw error;
    }
  }

  // ── Inline Edit Actions ───────────────────────────────────────────────────

  async editConversionPropensityScore(score: string): Promise<void> {
    try {
      const editButton = this.editConversionPropensityScoreButton.getLocator();
      await expect(editButton).toBeVisible({ timeout: 15_000 });
      await editButton.click();
      const scoreInput = this.conversionPropensityScoreInput.getLocator();
      await expect(scoreInput).toBeVisible({ timeout: 10_000 });
      await scoreInput.fill(score);
    } catch (error) {
      console.error('Failed to edit Conversion Propensity Score');
      throw error;
    }
  }

  async clickSaveInlineEdit(): Promise<void> {
    try {
      await this.inlineEditSaveButton.getLocator().click();
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error('Failed to click Save on inline edit');
      throw error;
    }
  }

  // ── Related List Actions ──────────────────────────────────────────────────

  async clickNewPlanCustomer(): Promise<void> {
    try {
      const newButton = this.planCustomersNewButton.getLocator();
      await expect(newButton).toBeVisible({ timeout: 15_000 });
      await newButton.click();
    } catch (error) {
      console.error('Failed to click New on Plan Customers related list');
      throw error;
    }
  }

  /**
   * Waits for a Plan Customer link to become visible in the related list.
   * Acts as a web-first synchronisation guard before issuing the SOQL cleanup query.
   */
  async waitForPlanCustomerInRelatedList(name: string): Promise<void> {
    try {
      const link = this['page'].getByRole('article', { name: 'Plan Customers' })
        .getByRole('link', { name, exact: true });
      await expect(link).toBeVisible({ timeout: 30_000 });
    } catch (error) {
      console.error(`Plan Customer '${name}' did not appear in related list`);
      throw error;
    }
  }

  async clickPlanCustomerLink(name: string): Promise<void> {
    try {
      const link = this['page'].getByRole('link', { name, exact: true });
      await expect(link).toBeVisible({ timeout: 15_000 });
      await link.click();
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error(`Failed to click Plan Customer link: ${name}`);
      throw error;
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  async verifyConversionPropensityScore(expectedScore: string): Promise<void> {
    try {
      const scoreField = this['page'].locator('records-record-layout-item')
        .filter({ hasText: 'Conversion Propensity Score' })
        .locator('lightning-formatted-number');
      await expect(scoreField).toContainText(expectedScore, { timeout: 15_000 });
    } catch (error) {
      console.error(`Failed to verify Conversion Propensity Score: ${expectedScore}`);
      throw error;
    }
  }
}
