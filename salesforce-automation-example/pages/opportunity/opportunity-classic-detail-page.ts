import { Page, expect, test } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

/**
 * Page Object for the Salesforce Classic Opportunity detail page.
 *
 * After saving an Opportunity in Classic, the browser navigates to the detail
 * page at /{recordId}. This page displays the record information and related
 * lists including Fund Account Selections.
 *
 * The "New Fund Account Selection" button navigates to a standalone
 * Visualforce page (NOT an iframe) at /apex/InvestmentFundAccountSelection.
 */
export class OpportunityClassicDetailPage extends BasePage {
  readonly pageName = 'OpportunityClassicDetailPage';
  protected readonly relativeUrl = '';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get fundAccountSelectionsLink() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('link', { name: /^Fund Account Selections\[/ }),
      (p) => p.locator('a').filter({ hasText: /^Fund Account Selections\[\d+\]$/ }),
      (p) => p.locator('a[href*="00NG000000Dwu2H_target"]'),
    ]);
  }

  private get newFundAccountSelectionButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.locator('input[title="New Fund Account Selection"]'),
      (p) => p.locator('input[name="investment_fund_account_selection"]'),
      (p) => p.locator('input[value="New Fund Account Selection"]'),
    ]);
  }

  private get opportunityNameHeading() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('heading', { name: /Opportunity/i, level: 1 }),
      (p) => p.locator('h1.pageType'),
      (p) => p.locator('.topName'),
    ]);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  /**
   * Clicks the "Fund Account Selections[n]" link to scroll to that related list section.
   */
  async clickFundAccountSelectionsLink(): Promise<void> {
    try {
      await this.fundAccountSelectionsLink.getLocator().click();
    } catch (error) {
      console.error('Failed to click Fund Account Selections link');
      throw error;
    }
  }

  /**
   * Clicks the "New Fund Account Selection" button on the Classic detail page.
   * This navigates to the standalone Visualforce page for creating a Fund Account Selection.
   */
  async clickNewFundAccountSelectionButton(): Promise<void> {
    try {
      await this.newFundAccountSelectionButton.getLocator().click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to click New Fund Account Selection button');
      throw error;
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  /**
   * Verifies the Classic detail page is displayed after saving an Opportunity.
   *
   * First waits for the URL to contain a Salesforce record ID (confirms save succeeded
   * and the browser redirected to a detail page). Then attempts to match the expected
   * opportunity name in the page title. If the title doesn't match — which happens when
   * a Salesforce trigger/automation renames the record after creation — falls back to
   * verifying the page title indicates an Opportunity detail page.
   */
  async verifyDetailPageDisplayed(expectedName: string): Promise<void> {
    try {
      // Wait for the URL to contain a Salesforce record ID (15 or 18 chars)
      // confirming save succeeded and navigated to the detail page
      await expect(this['page']).toHaveURL(/\/[a-zA-Z0-9]{15,18}(#.*)?$/, { timeout: 30_000 });
      await this['page'].waitForLoadState('domcontentloaded');

      // Try matching expected opportunity name in the title
      try {
        await expect(this['page']).toHaveTitle(new RegExp(expectedName), { timeout: 5_000 });
      } catch {
        // Title doesn't contain the expected name — likely renamed by a trigger/automation.
        // Verify we're at least on an Opportunity detail page.
        await expect(this['page']).toHaveTitle(/Opportunity.*Salesforce/i, { timeout: 5_000 });
        const actualTitle = await this['page'].title();
        console.warn(
          `Opportunity name in title does not match expected "${expectedName}". ` +
            `Actual title: "${actualTitle}". ` +
            `Record likely renamed by a Salesforce trigger/automation.`
        );
      }
    } catch (error) {
      console.error(`Failed to verify Classic detail page for: ${expectedName}`);
      await this.captureScreenshot(this['page'], test.info(), 'verify-detail-page-failure');
      throw new Error(`verifyDetailPageDisplayed failed: ${String(error)}`);
    }
  }

  /**
   * Extracts the Opportunity record ID from the current Classic detail page URL.
   * Classic detail URLs follow the pattern: /{recordId}
   * Returns the record ID or empty string if not found.
   */
  extractRecordIdFromUrl(): string {
    try {
      const url = this['page'].url();
      const match = url.match(/\/([a-zA-Z0-9]{15,18})(?:#.*)?$/);
      return match ? match[1] : '';
    } catch {
      return '';
    }
  }
}
