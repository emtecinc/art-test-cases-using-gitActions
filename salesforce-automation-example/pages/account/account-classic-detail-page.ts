import { Page, expect } from '@playwright/test';
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
      throw error;
    }
  }

  async clickNewAccountButton(): Promise<void> {
    try {
      await this.newAccountButton.getLocator().click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to click New button on Classic Accounts list');
      throw error;
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
      throw error;
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
      throw error;
    }
  }

  async clickPlanCustomersRelatedListLink(): Promise<void> {
    try {
      const link = this.planCustomersRelatedListLink.getLocator();
      await expect(link).toBeVisible({ timeout: 15_000 });
      await link.click();
    } catch (error) {
      console.error('Failed to click Plan Customers related list link');
      throw error;
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
      throw error;
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
      throw error;
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  async verifyAccountDetailDisplayed(accountName: string): Promise<void> {
    try {
      const heading = this['page'].getByRole('heading', { name: accountName, level: 2 });
      await expect(heading).toBeVisible({ timeout: 30_000 });
    } catch (error) {
      console.error(`Failed to verify account detail page for: ${accountName}`);
      throw error;
    }
  }

  async verifyAccountsListDisplayed(): Promise<void> {
    try {
      const heading = this['page'].getByRole('heading', { name: 'Accounts', level: 1 });
      await expect(heading).toBeVisible({ timeout: 15_000 });
    } catch (error) {
      console.error('Failed to verify Accounts list page');
      throw error;
    }
  }

  async verifyConversionPropensityScore(expectedScore: string): Promise<void> {
    try {
      const scoreCell = this['page'].locator('td').filter({ hasText: 'Conversion Propensity Score' })
        .locator('~ td').first();
      await expect(scoreCell).toContainText(expectedScore, { timeout: 15_000 });
    } catch (error) {
      console.error(`Failed to verify Conversion Propensity Score: ${expectedScore}`);
      throw error;
    }
  }
}
