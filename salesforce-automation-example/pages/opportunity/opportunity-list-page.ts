import { Page, expect } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

export class OpportunityListPage extends BasePage {
  readonly pageName = 'OpportunityListPage';
  protected readonly relativeUrl = '/lightning/o/Opportunity/list';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get listViewHeading() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('heading', { name: 'Opportunities', exact: true }),
      (p) => p.locator('h1').filter({ hasText: /^Opportunities$/ }),
      (p) => p.locator('[data-aura-class*="forceListViewManager"] h1').filter({ hasText: /^Opportunities$/ }).first(),
    ]);
  }

  private get newButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'New', exact: true }),
      (p) => p.locator('a[title="New"]'),
      (p) => p.locator('[data-target-selection-name="sfdc:StandardButton.Opportunity.New"]'),
    ]);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async clickNewButton(): Promise<void> {
    try {
      await this.newButton.getLocator().click();
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error('Failed to click New button on Opportunities list');
      throw error;
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  async verifyListViewVisible(): Promise<void> {
    try {
      await expect(this.listViewHeading.getLocator()).toBeVisible({ timeout: 15_000 });
    } catch (error) {
      console.error('Failed to verify Opportunities list view is visible');
      throw error;
    }
  }
}
