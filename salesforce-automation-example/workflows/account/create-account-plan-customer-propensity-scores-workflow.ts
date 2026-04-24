import test, { Page } from '@playwright/test';
import { BaseWorkflow } from 'playwright-custom-core';
import { SalesforcePage } from '../../pages/SF-Basepage/sf-page';
import { AccountListPage } from '../../pages/account/account-list-page';
import { AccountSearchPage } from '../../pages/account/account-search-page';
import { AccountCreationPage } from '../../pages/account/account-creation-page';
import { AccountDetailPage } from '../../pages/account/account-detail-page';
import { PlanCustomerCreationPage } from '../../pages/plan-customer/plan-customer-creation-page';
import { PlanCustomerDetailPage } from '../../pages/plan-customer/plan-customer-detail-page';

export interface AccountPlanCustomerData {
  accountName: string;
  accountSearchTerm: string;
  initialConversionPropensityScore: string;
  updatedConversionPropensityScore: string;
  planCustomerName: string;
  planCustomerPropensityScore: string;
}

export class CreateAccountPlanCustomerPropensityScoresWorkflow extends BaseWorkflow {
  readonly workflowName = 'CreateAccountPlanCustomerPropensityScoresWorkflow';

  private sfPage: SalesforcePage;
  private listPage: AccountListPage;
  private searchPage: AccountSearchPage;
  private creationPage: AccountCreationPage;
  private detailPage: AccountDetailPage;
  private planCustomerCreationPage: PlanCustomerCreationPage;
  private planCustomerDetailPage: PlanCustomerDetailPage;

  constructor(page: Page, baseUrl?: string) {
    super(page);
    const url = baseUrl || process.env.BASE_URL || '';
    this.sfPage = new SalesforcePage(page, url);
    this.listPage = new AccountListPage(page, url);
    this.searchPage = new AccountSearchPage(page, url);
    this.creationPage = new AccountCreationPage(page, url);
    this.detailPage = new AccountDetailPage(page, url);
    this.planCustomerCreationPage = new PlanCustomerCreationPage(page, url);
    this.planCustomerDetailPage = new PlanCustomerDetailPage(page, url);
  }

  protected async testStep(description: string, action: () => Promise<void>): Promise<void> {
    await test.step(`${this.workflowName}: ${description}`, async () => {
      await action();
    });
  }

  // ── Standard Setup Methods ────────────────────────────────────────────────

  async navigateToBaseUrl(): Promise<void> {
    await this.testStep('Navigate to Salesforce home', async () => {
      await this.sfPage.navigateToBaseUrl();
    });
  }

  async closeAllPrimaryTabs(): Promise<void> {
    await this.testStep('Close all primary tabs', async () => {
      await this.sfPage.closeAllPrimaryTabs();
    });
  }

  // ── High-Level Business Methods ───────────────────────────────────────────

  /**
   * Complete account creation flow:
   *   Navigate to Accounts → Click New → Search → Record type → Fill form → Save
   */
  async createAccount(data: AccountPlanCustomerData): Promise<void> {
    await this.testStep('Navigate to Accounts via nav bar', async () => {
      await this.listPage.clickAccountsNavLink();
    });

    await this.testStep('Click New button on Accounts list', async () => {
      await this.listPage.clickNewButton();
    });

    await this.testStep('Search for account in VF iframe', async () => {
      await this.searchPage.searchAccount(data.accountSearchTerm);
    });

    await this.testStep('Click New in search results', async () => {
      await this.searchPage.clickNewInSearchResults();
    });

    await this.testStep('Select record type and click Continue', async () => {
      await this.searchPage.selectRecordTypeAndContinue();
    });

    await this.testStep('Fill Account Name', async () => {
      await this.creationPage.fillAccountName(data.accountName);
    });

    await this.testStep('Fill Conversion Propensity Score', async () => {
      await this.creationPage.fillConversionPropensityScore(data.initialConversionPropensityScore);
    });

    await this.testStep('Click Save on Account creation form', async () => {
      await this.creationPage.clickSave();
    });
  }

  /**
   * Verify the "was created" toast message for the account.
   */
  async verifyAccountCreatedToast(accountName: string): Promise<void> {
    await this.testStep('Verify account created toast', async () => {
      await this.sfPage.verifyToastMessage(accountName);
    });
  }

  /**
   * Create a Plan Customer from the Account detail related list.
   *   Navigate to Related tab → Click New in Plan Customers related list → Fill Name → Save
   */
  async createPlanCustomerFromAccountDetail(data: AccountPlanCustomerData): Promise<void> {
    await this.testStep('Click Related tab to access Plan Customers related list', async () => {
      await this.detailPage.clickRelatedTab();
    });

    await this.testStep('Click New on Plan Customers related list', async () => {
      await this.detailPage.clickNewPlanCustomer();
    });

    await this.testStep('Fill Plan Customer Name', async () => {
      await this.planCustomerCreationPage.fillName(data.planCustomerName);
    });

    await this.testStep('Click Save on Plan Customer form', async () => {
      await this.planCustomerCreationPage.clickSave();
    });

    await this.testStep('Wait for Plan Customer in related list', async () => {
      await this.detailPage.waitForPlanCustomerInRelatedList(data.planCustomerName);
    });
  }

  /**
   * Edit the Conversion Propensity Score on the Account Details tab.
   *   Click Details tab → Edit score → Fill new value → Save
   */
  async updateAccountConversionPropensityScore(data: AccountPlanCustomerData): Promise<void> {
    await this.testStep('Click Details tab', async () => {
      await this.detailPage.clickDetailsTab();
    });

    await this.testStep('Edit Conversion Propensity Score', async () => {
      await this.detailPage.editConversionPropensityScore(data.updatedConversionPropensityScore);
    });

    await this.testStep('Save inline edit', async () => {
      await this.detailPage.clickSaveInlineEdit();
    });
  }

  /**
   * Navigate from Account to the Plan Customer and edit its Propensity Score.
   *   Click Related tab → Click Plan Customer link → Edit Propensity Score → Save
   */
  async navigateToPlanCustomerAndEditPropensityScore(data: AccountPlanCustomerData): Promise<void> {
    await this.testStep('Click Related tab', async () => {
      await this.detailPage.clickRelatedTab();
    });

    await this.testStep('Click Plan Customer link', async () => {
      await this.detailPage.clickPlanCustomerLink(data.planCustomerName);
    });

    await this.testStep('Edit Propensity Score on Plan Customer', async () => {
      await this.planCustomerDetailPage.editPropensityScore(data.planCustomerPropensityScore);
    });

    await this.testStep('Save Plan Customer inline edit', async () => {
      await this.planCustomerDetailPage.clickSave();
    });
  }
}
