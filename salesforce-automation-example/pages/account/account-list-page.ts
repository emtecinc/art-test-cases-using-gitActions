import { Page, expect } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

export class AccountListPage extends BasePage {
  readonly pageName = 'AccountListPage';
  protected readonly relativeUrl = '/lightning/o/Account/list';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get accountsNavLink() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('link', { name: 'Accounts', exact: true }),
      (p) => p.locator('a[title="Accounts"]'),
      (p) => p.locator('one-app-nav-bar-item-root a[data-label="Accounts"]'),
    ]);
  }

  private get newButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'New', exact: true }),
      (p) => p.locator('force-list-view-manager-header').getByRole('button', { name: 'New' }),
      (p) => p.locator('lst-list-view-manager-header').getByRole('button', { name: 'New' }),
    ]);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async clickAccountsNavLink(): Promise<void> {
    try {
      await this.accountsNavLink.getLocator().click();
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error('Failed to click Accounts nav link');
      throw error;
    }
  }

  async clickNewButton(): Promise<void> {
    try {
      await this.newButton.getLocator().click();
    } catch (error) {
      console.error('Failed to click New button on Account list');
      throw error;
    }
  }
}
