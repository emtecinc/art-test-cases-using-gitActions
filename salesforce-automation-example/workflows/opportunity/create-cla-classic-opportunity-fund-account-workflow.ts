import test, { Page, TestInfo } from '@playwright/test';
import { BaseWorkflow } from 'playwright-custom-core';
import { SalesforcePage } from '../../pages/SF-Basepage/sf-page';
import { OpportunityClassicCreationPage } from '../../pages/opportunity/opportunity-classic-creation-page';
import { OpportunityDetailPage } from '../../pages/opportunity/opportunity-detail-page';
import { FundAccountSelectionPage } from '../../pages/opportunity/fund-account-selection-page';

export interface ClaClassicOpportunityFundAccountData {
  /** Prefix to generate a unique Opportunity Name via TestDataGenerator.uniqueName() */
  namePrefix: string;
  /** Salesforce account name to link to the Opportunity */
  accountName: string;
  /** Plan name to lookup and select via popup window */
  planName: string;
  /** Stage value for the Opportunity (e.g. "New") */
  stage: string;
  /** Close Date in MM/DD/YYYY format */
  closeDate: string;
  /** Text to type in Fund Account search combobox */
  fundAccountSearchText: string;
  /** Exact option name to select from Fund Account dropdown */
  fundAccount: string;
  /** Numeric string for % of Investment (e.g. "10") */
  percentOfInvestment: string;
  /** Fund Account Selection Type (e.g. "Participant Selection") */
  fundAccountSelectionType: string;
  /** IRAType option to select (e.g. "Roth") */
  iraType: string;
}

export class CreateClaClassicOpportunityFundAccountWorkflow extends BaseWorkflow {
  readonly workflowName = 'CreateClaClassicOpportunityFundAccountWorkflow';

  private sfPage: SalesforcePage;
  private classicCreationPage: OpportunityClassicCreationPage;
  private detailPage: OpportunityDetailPage;
  private fundAccountSelectionPage: FundAccountSelectionPage;
  testInfo?: TestInfo;

  constructor(page: Page, baseUrl?: string) {
    super(page);
    const url = baseUrl || process.env.BASE_URL || '';
    this.sfPage = new SalesforcePage(page, url);
    this.classicCreationPage = new OpportunityClassicCreationPage(page, url);
    this.detailPage = new OpportunityDetailPage(page, url);
    this.fundAccountSelectionPage = new FundAccountSelectionPage(page, url);
  }

  protected async testStep(description: string, action: () => Promise<void>): Promise<void> {
    await test.step(`${this.workflowName}: ${description}`, async () => {
      await action();
    });
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  async navigateToClassicHome(): Promise<void> {
    await this.testStep('Navigate to Salesforce Classic home', async () => {
      await this['page'].goto(
        `${(process.env.BASE_URL || '').replace(/\/$/, '')}/home/home.jsp`,
        { timeout: 90_000, waitUntil: 'domcontentloaded' }
      );
    });
  }

  // ── Business Methods ──────────────────────────────────────────────────────

  /**
   * Creates a CLA Classic Opportunity via the Salesforce Classic edit form.
   *
   * Uses direct URL navigation to the CLA Classic record type form
   * (no record-type picker required).
   */
  async createClaClassicOpportunity(data: ClaClassicOpportunityFundAccountData): Promise<void> {
    await this.testStep('Navigate to CLA Classic Opportunity creation form', async () => {
      await this.classicCreationPage.navigateToClassicCreateForm();
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'cla-classic-opportunity-form');
      }
    });

    await this.testStep('Verify CLA Classic creation form is loaded', async () => {
      await this.classicCreationPage.verifyFormLoaded();
    });

    await this.testStep('Fill Opportunity Name', async () => {
      await this.classicCreationPage.fillOpportunityName(data.namePrefix);
    });

    await this.testStep('Fill Account Name', async () => {
      await this.classicCreationPage.fillAccountName(data.accountName);
    });

    await this.testStep('Fill Plan via popup window lookup', async () => {
      await this.classicCreationPage.fillPlanLookupAndSelect(data.planName);
    });

    await this.testStep('Select Stage', async () => {
      await this.classicCreationPage.selectStage(data.stage);
    });

    await this.testStep('Fill Close Date', async () => {
      await this.classicCreationPage.fillCloseDate(data.closeDate);
    });

    await this.testStep('Click Save', async () => {
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'before-save-cla-classic-opportunity');
      }
      await this.classicCreationPage.clickSave();
    });

    await this.testStep('Navigate to Lightning detail page after Classic save', async () => {
      // After Classic save, the URL is a Classic detail URL like /006dz00000E8woNAAR
      // The full 15-18 char Salesforce record ID starts with the object key prefix (006 for Opportunity).
      // Extract the full ID from the last path segment.
      const currentUrl = this['page'].url();
      const pathSegments = currentUrl.split('/');
      const recordId = pathSegments[pathSegments.length - 1].split('?')[0];
      if (recordId && /^006[a-zA-Z0-9]{12,15}/.test(recordId)) {
        const baseUrl = (process.env.BASE_URL || '').replace(/\/$/, '');
        await this['page'].goto(
          `${baseUrl}/lightning/r/Opportunity/${recordId}/view`,
          { timeout: 60_000, waitUntil: 'domcontentloaded' }
        );
        // Wait for the Lightning page spinner to clear before proceeding
        await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 20_000 }).catch(() => {});
        await this['page'].waitForTimeout(1000);
      }
    });
  }

  /**
   * Verifies the Opportunity detail page is displayed after saving.
   */
  async verifyOpportunityDetailPageDisplayed(opportunityName: string): Promise<void> {
    await this.testStep('Verify Opportunity detail page is displayed', async () => {
      await this.detailPage.verifyDetailPageVisible(opportunityName);
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'cla-classic-opportunity-detail-page');
      }
    });
  }

  /**
   * Creates a Fund Account Selection via the Lightning VF iframe form.
   * The detail page must already be displayed.
   */
  async createFundAccountSelection(data: ClaClassicOpportunityFundAccountData): Promise<void> {
    await this.testStep('Click "Show actions for Fund Account Selections" button', async () => {
      await this.detailPage.clickFundAccountActionsButton();
    });

    await this.testStep('Click "New Fund Account Selection" menu item', async () => {
      await this.detailPage.clickNewFundAccountSelectionMenuItem();
    });

    await this.testStep('Wait for Fund Account Selection iframe form to load', async () => {
      await this.fundAccountSelectionPage.waitForIframeVisible();
      await this.fundAccountSelectionPage.verifyFormVisible();
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'cla-classic-fund-account-selection-form');
      }
    });

    await this.testStep('Fill Fund Account and select option', async () => {
      await this.fundAccountSelectionPage.fillFundAccountAndSelect(
        data.fundAccountSearchText,
        data.fundAccount
      );
    });

    await this.testStep('Fill % of Investment', async () => {
      await this.fundAccountSelectionPage.fillPercentOfInvestment(data.percentOfInvestment);
    });

    await this.testStep(`Select Fund Account Selection Type: ${data.fundAccountSelectionType}`, async () => {
      await this.fundAccountSelectionPage.selectFundAccountSelectionType(data.fundAccountSelectionType);
    });

    await this.testStep(`Select IRAType: ${data.iraType}`, async () => {
      await this.fundAccountSelectionPage.selectIraType(data.iraType);
    });

    await this.testStep('Click Save & Close', async () => {
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'before-save-cla-classic-fund-account-selection');
      }
      await this.fundAccountSelectionPage.clickSaveAndClose();
    });
  }
}
