# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: account/create-classic-account-plan-customer-propensity-scores.spec.ts >> Classic Account with Plan Customer - Propensity Scores @smoke >> should create classic account with plan customer and update propensity score @smoke
- Location: tests/account/create-classic-account-plan-customer-propensity-scores.spec.ts:58:7

# Error details

```
Error: page.goto: Test ended.
Call log:
  - navigating to "https://jhancock--devlm2.sandbox.my.salesforce.com/home/home.jsp", waiting until "load"

```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';
  2  | import { BasePage, ResilientLocator } from 'playwright-custom-core';
  3  | 
  4  | export class SalesforcePage extends BasePage {
  5  |   readonly pageName = 'SalesforcePage';
  6  |   protected readonly relativeUrl = '/lightning/page/home';
  7  | 
  8  |   constructor(page: Page, baseUrl?: string) {
  9  |     super(page, baseUrl || process.env.BASE_URL || '');
  10 |   }
  11 | 
  12 |   // ── Locators ──────────────────────────────────────────────────────────────
  13 | 
  14 |   private get appLauncherButton() {
  15 |     return new ResilientLocator(this['page'], [
  16 |       (p) => p.getByRole('button', { name: 'App Launcher' }),
  17 |       (p) => p.locator('one-app-launcher-header button'),
  18 |       (p) => p.locator('button[data-id="app-launcher"]'),
  19 |     ]);
  20 |   }
  21 | 
  22 |   private get appLauncherSearchBox() {
  23 |     return new ResilientLocator(this['page'], [
  24 |       (p) => p.getByRole('combobox', { name: 'Search apps and items...' }),
  25 |       (p) => p.getByPlaceholder('Search apps and items...'),
  26 |       (p) => p.locator('input[placeholder="Search apps and items..."]'),
  27 |     ]);
  28 |   }
  29 | 
  30 |   // ── Navigation ────────────────────────────────────────────────────────────
  31 | 
  32 |   async navigateToBaseUrl(): Promise<void> {
  33 |     try {
  34 |       await this['page'].goto(this.pageUrl, { timeout: 90_000 });
  35 |       await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
  36 |     } catch (error) {
  37 |       console.error('Failed to navigate to base URL');
  38 |       throw error;
  39 |     }
  40 |   }
  41 | 
  42 |   async closeAllPrimaryTabs(): Promise<void> {
  43 |     try {
  44 |       const closeButtons = this['page'].locator('button[data-tabid]');
  45 |       const count = await closeButtons.count();
  46 |       for (let i = count - 1; i >= 0; i--) {
  47 |         await closeButtons.nth(i).click({ timeout: 3_000 }).catch(() => {});
  48 |       }
  49 |     } catch {
  50 |       // No tabs to close — safe to ignore
  51 |     }
  52 |   }
  53 | 
  54 |   async navigateToAppViaAppLauncher(appName: string): Promise<void> {
  55 |     try {
  56 |       await this.appLauncherButton.getLocator().click();
  57 |       await this.appLauncherSearchBox.getLocator().fill(appName);
  58 |       await this['page'].getByRole('option', { name: appName, exact: true }).click();
  59 |       await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
  60 |     } catch (error) {
  61 |       console.error(`Failed to navigate to ${appName} via App Launcher`);
  62 |       throw error;
  63 |     }
  64 |   }
  65 | 
  66 |   // ── Classic Navigation ──────────────────────────────────────────────────
  67 | 
  68 |   async navigateToClassicHome(): Promise<void> {
  69 |     try {
  70 |       const classicHomeUrl = `${this.baseUrl}/home/home.jsp`;
> 71 |       await this['page'].goto(classicHomeUrl, { timeout: 90_000 });
     |                          ^ Error: page.goto: Test ended.
  72 |       await this['page'].waitForLoadState('domcontentloaded');
  73 |     } catch (error) {
  74 |       console.error('Failed to navigate to Classic home page');
  75 |       throw error;
  76 |     }
  77 |   }
  78 | 
  79 |   // ── Toast Verification ────────────────────────────────────────────────────
  80 | 
  81 |   async verifyToastMessage(expectedText: string): Promise<void> {
  82 |     try {
  83 |       const toast = this['page'].getByRole('status').filter({ hasText: 'was created' });
  84 |       await expect(toast).toContainText(expectedText, { timeout: 15_000 });
  85 |     } catch (error) {
  86 |       console.error(`Failed to verify toast message: ${expectedText}`);
  87 |       throw error;
  88 |     }
  89 |   }
  90 | }
  91 | 
```