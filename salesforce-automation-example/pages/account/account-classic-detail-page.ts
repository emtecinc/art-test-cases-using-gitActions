import { Page, expect, test } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

/**
 * Handles the Salesforce Classic Account detail page.
 * Provides actions for: Accounts tab navigation, clicking account links,
 * Edit button, Plan Customers related list, and Plan Customer links.
 * URL pattern: /001dz00000XXXXX
 */
export class AccountClassicDetailPage extends BasePage {
  readonly pageName = 'AccountClassicDetailPage';
  protected readonly relativeUrl = '/001';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Navigation Locators ───────────────────────────────────────────────────

  private get accountsNavLink() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('link', { name: 'Accounts', exact: true }),
      (p) => p.locator('nav a[href="/001/o"]'),
      (p) => p.locator('a[title="Accounts"]'),
    ]);
  }

  private get newAccountButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'New', exact: true }),
      (p) => p.locator('input[name="new"][title="New"]'),
      (p) => p.locator('input[type="submit"][value=" New "]'),
    ]);
  }

  // ── Detail Page Locators ──────────────────────────────────────────────────

  private get editButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.locator('input[name="edit"][title="Edit"]').first(),
      (p) => p.getByRole('button', { name: 'Edit', exact: true }).first(),
      (p) => p.locator('input[type="button"][value=" Edit "]').first(),
    ]);
  }

  private get newPlanCustomerButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.locator('input[title="New Plan Customer"]'),
      (p) => p.getByRole('button', { name: 'New Plan Customer', exact: true }),
      (p) => p.locator('input[type="submit"][value="New Plan Customer"]'),
    ]);
  }

  private get planCustomersRelatedListLink() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('link', { name: /^Plan Customers\[/ }),
      (p) => p.locator('a[id$="_link"]').filter({ hasText: 'Plan Customers' }),
      (p) => p.locator('a').filter({ hasText: /^Plan Customers\[\d+\]$/ }),
    ]);
  }

  // ── Navigation Actions ────────────────────────────────────────────────────

  async clickAccountsNavLink(): Promise<void> {
    try {
      await this.accountsNavLink.getLocator().click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to click Accounts nav link in Classic');
      await this.captureScreenshot(this['page'], test.info(), 'click-accounts-nav-failure');
      throw new Error(`clickAccountsNavLink failed: ${String(error)}`);
    }
  }

  async clickNewAccountButton(): Promise<void> {
    try {
      await this.newAccountButton.getLocator().click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to click New button on Classic Accounts list');
      await this.captureScreenshot(this['page'], test.info(), 'click-new-account-failure');
      throw new Error(`clickNewAccountButton failed: ${String(error)}`);
    }
  }

  async clickAccountLink(accountName: string): Promise<void> {
    try {
      const link = this['page'].getByRole('link', { name: accountName, exact: true }).first();
      await expect(link).toBeVisible({ timeout: 15_000 });
      await link.click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error(`Failed to click account link: ${accountName}`);
      await this.captureScreenshot(this['page'], test.info(), 'click-account-link-failure');
      throw new Error(`clickAccountLink failed: ${String(error)}`);
    }
  }

  // ── Detail Page Actions ───────────────────────────────────────────────────

  async clickEditButton(): Promise<void> {
    try {
      const editBtn = this.editButton.getLocator();
      await expect(editBtn).toBeVisible({ timeout: 15_000 });
      await editBtn.click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to click Edit button on Classic Account detail');
      await this.captureScreenshot(this['page'], test.info(), 'click-edit-button-failure');
      throw new Error(`clickEditButton failed: ${String(error)}`);
    }
  }

  async clickPlanCustomersRelatedListLink(): Promise<void> {
    try {
      const link = this.planCustomersRelatedListLink.getLocator();
      await expect(link).toBeVisible({ timeout: 15_000 });
      await link.click();
    } catch (error) {
      console.error('Failed to click Plan Customers related list link');
      await this.captureScreenshot(this['page'], test.info(), 'click-plan-customers-link-failure');
      throw new Error(`clickPlanCustomersRelatedListLink failed: ${String(error)}`);
    }
  }

  async clickNewPlanCustomerButton(): Promise<void> {
    try {
      const newBtn = this.newPlanCustomerButton.getLocator();
      await expect(newBtn).toBeVisible({ timeout: 15_000 });
      await newBtn.click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to click New Plan Customer button');
      await this.captureScreenshot(this['page'], test.info(), 'click-new-plan-customer-failure');
      throw new Error(`clickNewPlanCustomerButton failed: ${String(error)}`);
    }
  }

  async clickPlanCustomerLink(name: string): Promise<void> {
    try {
      const link = this['page'].getByRole('link', { name, exact: true }).first();
      await expect(link).toBeVisible({ timeout: 15_000 });
      await link.click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error(`Failed to click Plan Customer link: ${name}`);
      await this.captureScreenshot(this['page'], test.info(), 'click-plan-customer-link-failure');
      throw new Error(`clickPlanCustomerLink failed: ${String(error)}`);
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  async verifyAccountDetailDisplayed(accountName: string): Promise<void> {
    try {
      const heading = this['page'].getByRole('heading', { name: accountName, level: 2 });
      await expect(heading).toBeVisible({ timeout: 30_000 });
    } catch (error) {
      console.error(`Failed to verify account detail page for: ${accountName}`);
      await this.captureScreenshot(this['page'], test.info(), 'verify-account-detail-failure');
      throw new Error(`verifyAccountDetailDisplayed failed: ${String(error)}`);
    }
  }

  async verifyAccountsListDisplayed(): Promise<void> {
    try {
      const heading = this['page'].getByRole('heading', { name: 'Accounts', level: 1 });
      await expect(heading).toBeVisible({ timeout: 15_000 });
    } catch (error) {
      console.error('Failed to verify Accounts list page');
      await this.captureScreenshot(this['page'], test.info(), 'verify-accounts-list-failure');
      throw new Error(`verifyAccountsListDisplayed failed: ${String(error)}`);
    }
  }

  async verifyConversionPropensityScore(expectedScore: string): Promise<void> {
    try {
      const scoreCell = this['page'].locator('td').filter({ hasText: 'Conversion Propensity Score' })
        .locator('~ td').first();
      await expect(scoreCell).toContainText(expectedScore, { timeout: 15_000 });
    } catch (error) {
      console.error(`Failed to verify Conversion Propensity Score: ${expectedScore}`);
      await this.captureScreenshot(this['page'], test.info(), 'verify-propensity-score-failure');
      throw new Error(`verifyConversionPropensityScore failed: ${String(error)}`);
    }
  }
}
