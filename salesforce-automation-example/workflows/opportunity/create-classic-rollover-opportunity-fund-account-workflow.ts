import test, { Page, TestInfo } from '@playwright/test';
import { BaseWorkflow } from 'playwright-custom-core';
import { SalesforcePage } from '../../pages/SF-Basepage/sf-page';
import { OpportunityClassicCreationPage } from '../../pages/opportunity/opportunity-classic-creation-page';
import { OpportunityClassicDetailPage } from '../../pages/opportunity/opportunity-classic-detail-page';
import { FundAccountSelectionClassicPage } from '../../pages/opportunity/fund-account-selection-classic-page';

export interface ClassicRolloverOpportunityFundAccountData {
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
  /** Record type label (e.g. "Rollover") */
  recordTypeName: string;
  /** Record type Salesforce ID (e.g. "012G0000001BFrD") */
  recordTypeId: string;
  /** Text to type in Fund Account search combobox */
  fundAccountSearchText: string;
  /** Exact option name to select from Fund Account dropdown */
  fundAccount: string;
  /** Numeric string for % of Investment (e.g. "39") */
  percentOfInvestment: string;
  /** IRAType option to select (e.g. "Roth") */
  iraType: string;
}

export class CreateClassicRolloverOpportunityFundAccountWorkflow extends BaseWorkflow {
  readonly workflowName = 'CreateClassicRolloverOpportunityFundAccountWorkflow';

  private sfPage: SalesforcePage;
  private classicCreationPage: OpportunityClassicCreationPage;
  private classicDetailPage: OpportunityClassicDetailPage;
  private fundAccountSelectionPage: FundAccountSelectionClassicPage;
  testInfo?: TestInfo;

  constructor(page: Page, baseUrl?: string) {
    super(page);
    const url = baseUrl || process.env.BASE_URL || '';
    this.sfPage = new SalesforcePage(page, url);
    this.classicCreationPage = new OpportunityClassicCreationPage(page, url);
    this.classicDetailPage = new OpportunityClassicDetailPage(page, url);
    this.fundAccountSelectionPage = new FundAccountSelectionClassicPage(page, url);
  }

  protected async testStep(description: string, action: () => Promise<void>): Promise<void> {
    await test.step(`${this.workflowName}: ${description}`, async () => {
      await action();
    });
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  async navigateToClassicHome(): Promise<void> {
    await this.testStep('Navigate to Salesforce Classic home', async () => {
      await this.sfPage.navigateToClassicHome();
    });
  }

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

  // ── Business Methods ──────────────────────────────────────────────────────

  /**
   * Creates a Rollover Opportunity via Classic UI.
   *
   * Navigates through: Opportunities tab → New → Record Type selection → Classic form.
   */
  async createClassicRolloverOpportunity(data: ClassicRolloverOpportunityFundAccountData): Promise<void> {
    await this.testStep('Navigate to Opportunities via Classic tab', async () => {
      await this.sfPage.clickClassicNavigationTab('Opportunities');
    });

    await this.testStep('Click New button on Opportunities list page', async () => {
      await this.classicCreationPage.clickNewOnClassicListPage();
    });

    await this.testStep(`Select record type "${data.recordTypeName}" and click Continue`, async () => {
      await this.classicCreationPage.selectRecordTypeAndContinue(data.recordTypeId);
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'classic-rollover-opportunity-form');
      }
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
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'before-save-classic-rollover-opportunity');
      }
      await this.classicCreationPage.clickSave();
    });
  }

  /**
   * Verifies the Classic Opportunity detail page is displayed after saving.
   */
  async verifyOpportunityDetailPageDisplayed(opportunityName: string): Promise<void> {
    await this.testStep('Verify Classic Opportunity detail page is displayed', async () => {
      await this.classicDetailPage.verifyDetailPageDisplayed(opportunityName);
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'classic-rollover-opportunity-detail-page');
      }
    });
  }

  /**
   * Extracts the Opportunity record ID from the current Classic detail page URL.
   */
  extractOpportunityRecordId(): string {
    return this.classicDetailPage.extractRecordIdFromUrl();
  }

  /**
   * Creates a Fund Account Selection via the standalone Classic VF page.
   * The Classic Opportunity detail page must already be displayed.
   */
  async createFundAccountSelection(data: ClassicRolloverOpportunityFundAccountData): Promise<void> {
    await this.testStep('Click Fund Account Selections link on detail page', async () => {
      await this.classicDetailPage.clickFundAccountSelectionsLink();
    });

    await this.testStep('Click New Fund Account Selection button', async () => {
      await this.classicDetailPage.clickNewFundAccountSelectionButton();
    });

    await this.testStep('Wait for Fund Account Selection form to load', async () => {
      await this.fundAccountSelectionPage.waitForFormVisible();
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'classic-fund-account-selection-form');
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

    await this.testStep(`Select IRAType: ${data.iraType}`, async () => {
      await this.fundAccountSelectionPage.selectIraType(data.iraType);
    });

    await this.testStep('Click Save & Close', async () => {
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'before-save-classic-fund-account-selection');
      }
      await this.fundAccountSelectionPage.clickSaveAndClose();
    });
  }

  /**
   * Navigates to the Lightning detail page for a given Opportunity record ID.
   * Used for verifying the record after Classic creation.
   */
  async navigateToLightningDetailPage(recordId: string): Promise<void> {
    await this.testStep('Navigate to Lightning detail page', async () => {
      const baseUrl = (process.env.BASE_URL || '').replace(/\/$/, '');
      await this.page.goto(
        `${baseUrl}/lightning/r/Opportunity/${recordId}/view`,
        { timeout: 60_000, waitUntil: 'domcontentloaded' }
      );
      await this.page.locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 20_000 }).catch(() => {});
    });
  }
}
