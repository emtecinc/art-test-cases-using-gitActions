import test, { Page } from '@playwright/test';
import { BaseWorkflow } from 'playwright-custom-core';
import { SalesforcePage } from '../../pages/SF-Basepage/sf-page';
import { AccountClassicSearchPage } from '../../pages/account/account-classic-search-page';
import { AccountClassicFormPage } from '../../pages/account/account-classic-form-page';
import { AccountClassicDetailPage } from '../../pages/account/account-classic-detail-page';
import { PlanCustomerClassicFormPage } from '../../pages/plan-customer/plan-customer-classic-form-page';
import { PlanCustomerClassicDetailPage } from '../../pages/plan-customer/plan-customer-classic-detail-page';

export interface ClassicAccountPlanCustomerData {
  accountName: string;
  accountSearchTerm: string;
  initialConversionPropensityScore: string;
  updatedConversionPropensityScore: string;
  planCustomerName: string;
}

export class CreateClassicAccountPlanCustomerPropensityScoresWorkflow extends BaseWorkflow {
  readonly workflowName = 'CreateClassicAccountPlanCustomerPropensityScoresWorkflow';

  private sfPage: SalesforcePage;
  private searchPage: AccountClassicSearchPage;
  private formPage: AccountClassicFormPage;
  private detailPage: AccountClassicDetailPage;
  private planCustomerFormPage: PlanCustomerClassicFormPage;
  private planCustomerDetailPage: PlanCustomerClassicDetailPage;

  constructor(page: Page, baseUrl?: string) {
    super(page);
    const url = baseUrl || process.env.BASE_URL || '';
    this.sfPage = new SalesforcePage(page, url);
    this.searchPage = new AccountClassicSearchPage(page, url);
    this.formPage = new AccountClassicFormPage(page, url);
    this.detailPage = new AccountClassicDetailPage(page, url);
    this.planCustomerFormPage = new PlanCustomerClassicFormPage(page, url);
    this.planCustomerDetailPage = new PlanCustomerClassicDetailPage(page, url);
  }

  protected override async testStep(description: string, action: () => Promise<void>): Promise<void> {
    await test.step(`${this.workflowName}: ${description}`, async () => {
      await action();
    });
  }

  // ── Standard Setup ────────────────────────────────────────────────────────

  async navigateToClassicHome(): Promise<void> {
    await this.testStep('Navigate to Salesforce Classic home', async () => {
      await this.sfPage.navigateToClassicHome();
      await this.sfPage.captureScreenshot(this['page'], test.info(), 'navigate-to-classic-home.png');
    });
  }

  // ── Business Methods ──────────────────────────────────────────────────────

  /**
   * Complete Classic account creation flow:
   *   Click Accounts tab → Click New → Search → Click New in results →
   *   Record type selection → Continue → Fill form → Save
   */
  async createAccountViaClassic(data: ClassicAccountPlanCustomerData): Promise<void> {
    await this.testStep('Click Accounts nav link', async () => {
      await this.detailPage.clickAccountsNavLink();
    });

    await this.testStep('Verify Accounts list page displayed', async () => {
      await this.detailPage.verifyAccountsListDisplayed();
    });

    await this.testStep('Click New button on Accounts list', async () => {
      await this.detailPage.clickNewAccountButton();
    });

    await this.testStep('Search for account', async () => {
      await this.searchPage.searchAccount(data.accountSearchTerm);
    });

    await this.testStep('Verify search results displayed', async () => {
      await this.searchPage.verifySearchResultsDisplayed();
    });

    await this.testStep('Click New in search results', async () => {
      await this.searchPage.clickNewInSearchResults();
    });

    await this.testStep('Verify record type selection displayed', async () => {
      await this.searchPage.verifyRecordTypeSelectionDisplayed();
    });

    await this.testStep('Click Continue on record type selection', async () => {
      await this.searchPage.selectRecordTypeAndContinue();
    });

    await this.testStep('Verify Classic Account form displayed', async () => {
      await this.formPage.verifyFormDisplayed();
    });

    await this.testStep('Fill Account Name', async () => {
      await this.formPage.fillAccountName(data.accountName);
    });

    await this.testStep('Fill Conversion Propensity Score', async () => {
      await this.formPage.fillConversionPropensityScore(data.initialConversionPropensityScore);
    });

    await this.testStep('Click Save on Account creation form', async () => {
      await this.formPage.clickSave();
      await this.sfPage.captureScreenshot(this['page'], test.info(), 'account-creation-saved.png');
    });
  }

  /**
   * Verify the Account detail page is displayed after creation.
   */
  async verifyAccountDetailDisplayed(accountName: string): Promise<void> {
    await this.testStep('Verify account detail page displayed', async () => {
      await this.detailPage.verifyAccountDetailDisplayed(accountName);
      await this.sfPage.captureScreenshot(this['page'], test.info(), 'verify-account-detail.png');
    });
  }

  /**
   * Create a Plan Customer from the Classic Account detail page:
   *   Click Plan Customers related list → Click New Plan Customer → Fill Name → Save
   */
  async createPlanCustomerFromClassicDetail(data: ClassicAccountPlanCustomerData): Promise<void> {
    await this.testStep('Click Plan Customers related list link', async () => {
      await this.detailPage.clickPlanCustomersRelatedListLink();
    });

    await this.testStep('Click New Plan Customer button', async () => {
      await this.detailPage.clickNewPlanCustomerButton();
    });

    await this.testStep('Verify Plan Customer form displayed', async () => {
      await this.planCustomerFormPage.verifyFormDisplayed();
    });

    await this.testStep('Fill Plan Customer Name', async () => {
      await this.planCustomerFormPage.fillName(data.planCustomerName);
    });

    await this.testStep('Click Save on Plan Customer form', async () => {
      await this.planCustomerFormPage.clickSave();
      await this.sfPage.captureScreenshot(this['page'], test.info(), 'plan-customer-saved.png');
    });
  }

  /**
   * Verify the Plan Customer detail page is displayed after creation.
   */
  async verifyPlanCustomerDetailDisplayed(planCustomerName: string): Promise<void> {
    await this.testStep('Verify Plan Customer detail page displayed', async () => {
      await this.planCustomerDetailPage.verifyPlanCustomerDetailDisplayed(planCustomerName);
      await this.sfPage.captureScreenshot(this['page'], test.info(), 'verify-plan-customer-detail.png');
    });
  }

  /**
   * Navigate to Accounts list and click a specific account link.
   */
  async navigateToAccountFromList(accountName: string): Promise<void> {
    await this.testStep('Click Accounts nav link', async () => {
      await this.detailPage.clickAccountsNavLink();
    });

    await this.testStep('Verify Accounts list page displayed', async () => {
      await this.detailPage.verifyAccountsListDisplayed();
    });

    await this.testStep(`Click account link: ${accountName}`, async () => {
      await this.detailPage.clickAccountLink(accountName);
    });

    await this.testStep('Verify account detail page displayed', async () => {
      await this.detailPage.verifyAccountDetailDisplayed(accountName);
    });
  }

  /**
   * Edit the Conversion Propensity Score on the Classic Account detail page:
   *   Click Edit → Clear and fill new score → Save
   */
  async editAccountConversionPropensityScore(updatedScore: string): Promise<void> {
    await this.testStep('Click Edit button on Account detail', async () => {
      await this.detailPage.clickEditButton();
    });

    await this.testStep('Clear and fill Conversion Propensity Score', async () => {
      await this.formPage.clearAndFillConversionPropensityScore(updatedScore);
    });

    await this.testStep('Click Save on Account edit form', async () => {
      await this.formPage.clickSave();
      await this.sfPage.captureScreenshot(this['page'], test.info(), 'account-edit-saved.png');
    });
  }

  /**
   * Navigate to a Plan Customer from the Account detail page.
   */
  async navigateToPlanCustomerFromAccountDetail(planCustomerName: string): Promise<void> {
    await this.testStep(`Click Plan Customer link: ${planCustomerName}`, async () => {
      await this.detailPage.clickPlanCustomerLink(planCustomerName);
    });

    await this.testStep('Verify Plan Customer detail page displayed', async () => {
      await this.planCustomerDetailPage.verifyPlanCustomerDetailDisplayed(planCustomerName);
    });
  }
}
