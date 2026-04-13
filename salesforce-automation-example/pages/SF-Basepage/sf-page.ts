import { Page, expect } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

export class SalesforcePage extends BasePage {
  readonly pageName = 'SalesforcePage';
  protected readonly relativeUrl = '/lightning/page/home';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get appLauncherButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'App Launcher' }),
      (p) => p.locator('one-app-launcher-header button'),
      (p) => p.locator('button[data-id="app-launcher"]'),
    ]);
  }

  private get appLauncherSearchBox() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('combobox', { name: 'Search apps and items...' }),
      (p) => p.getByPlaceholder('Search apps and items...'),
      (p) => p.locator('input[placeholder="Search apps and items..."]'),
    ]);
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  async navigateToBaseUrl(): Promise<void> {
    try {
      await this['page'].goto(this.pageUrl, { timeout: 90_000 });
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error('Failed to navigate to base URL');
      throw error;
    }
  }

  async closeAllPrimaryTabs(): Promise<void> {
    try {
      const closeButtons = this['page'].locator('button[data-tabid]');
      const count = await closeButtons.count();
      for (let i = count - 1; i >= 0; i--) {
        await closeButtons.nth(i).click({ timeout: 3_000 }).catch(() => {});
      }
    } catch {
      // No tabs to close — safe to ignore
    }
  }

  async navigateToAppViaAppLauncher(appName: string): Promise<void> {
    try {
      await this.appLauncherButton.getLocator().click();
      await this.appLauncherSearchBox.getLocator().fill(appName);
      await this['page'].getByRole('option', { name: appName, exact: true }).click();
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error(`Failed to navigate to ${appName} via App Launcher`);
      throw error;
    }
  }

  // ── Classic Navigation ──────────────────────────────────────────────────

  async navigateToClassicHome(): Promise<void> {
    try {
      const classicHomeUrl = `${this.baseUrl}/home/home.jsp`;
      await this['page'].goto(classicHomeUrl, { timeout: 90_000 });
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to navigate to Classic home page');
      throw error;
    }
  }

  /**
   * Clicks a Classic top navigation tab link (e.g. "Opportunities", "Accounts").
   * Works from any Classic page that displays the tab bar.
   */
  async clickClassicNavigationTab(tabName: string): Promise<void> {
    try {
      await this['page'].getByRole('link', { name: tabName, exact: true }).click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error(`Failed to click Classic navigation tab: ${tabName}`);
      throw error;
    }
  }

  // ── Toast Verification ────────────────────────────────────────────────────

  async verifyToastMessage(expectedText: string): Promise<void> {
    try {
      const toast = this['page'].getByRole('status').filter({ hasText: 'was created' });
      await expect(toast).toContainText(expectedText, { timeout: 15_000 });
    } catch (error) {
      console.error(`Failed to verify toast message: ${expectedText}`);
      throw error;
    }
  }
}
