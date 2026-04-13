import { Page, expect } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

/**
 * Handles the Plan Customer detail/record page — inline edit and field verification.
 */
export class PlanCustomerDetailPage extends BasePage {
  readonly pageName = 'PlanCustomerDetailPage';
  protected readonly relativeUrl = '/lightning/r/Plan_Customer__c';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get editPropensityScoreButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'Edit Propensity Score' }),
      (p) => p.locator('button[title="Edit Propensity Score"]'),
      (p) => p.getByRole('button', { name: /Edit Propensity Score/ }),
    ]);
  }

  private get propensityScoreInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('spinbutton', { name: 'Propensity Score' }),
      (p) => p.getByLabel('Propensity Score'),
      (p) => p.locator('input[name="Propensity_Score__c"]'),
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

  async editPropensityScore(score: string): Promise<void> {
    try {
      const editButton = this.editPropensityScoreButton.getLocator();
      await expect(editButton).toBeVisible({ timeout: 15_000 });
      await editButton.click();
      const scoreInput = this.propensityScoreInput.getLocator();
      await expect(scoreInput).toBeVisible({ timeout: 10_000 });
      await scoreInput.fill(score);
    } catch (error) {
      console.error('Failed to edit Propensity Score');
      throw error;
    }
  }

  async clickSave(): Promise<void> {
    try {
      await this.saveButton.getLocator().click();
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error('Failed to click Save on Plan Customer detail page');
      throw error;
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  async verifyPropensityScore(expectedScore: string): Promise<void> {
    try {
      const scoreField = this['page'].locator('records-record-layout-item')
        .filter({ hasText: 'Propensity Score' })
        .locator('lightning-formatted-number');
      await expect(scoreField).toContainText(expectedScore, { timeout: 15_000 });
    } catch (error) {
      console.error(`Failed to verify Propensity Score: ${expectedScore}`);
      throw error;
    }
  }
}
