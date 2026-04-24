import { Page, expect, test } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

/**
 * Handles the Salesforce Classic Plan Customer detail page.
 * URL pattern: /a0adz00000XXXXX
 */
export class PlanCustomerClassicDetailPage extends BasePage {
  readonly pageName = 'PlanCustomerClassicDetailPage';
  protected readonly relativeUrl = '/a0a';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Verification ──────────────────────────────────────────────────────────

  async verifyPlanCustomerDetailDisplayed(planCustomerName: string): Promise<void> {
    try {
      const heading = this['page'].getByRole('heading', { name: planCustomerName, level: 2 });
      await expect(heading).toBeVisible({ timeout: 30_000 });
    } catch (error) {
      console.error(`Failed to verify Plan Customer detail page for: ${planCustomerName}`);
      await this.captureScreenshot(this['page'], test.info(), 'verify-plan-customer-detail-failure');
      throw new Error(`verifyPlanCustomerDetailDisplayed failed: ${String(error)}`);
    }
  }
}
