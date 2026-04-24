import test, { Page, TestInfo } from '@playwright/test';
import { BaseWorkflow } from 'playwright-custom-core';
import { SalesforcePage } from '../../pages/SF-Basepage/sf-page';
import { OpportunityClassicCreationPage } from '../../pages/opportunity/opportunity-classic-creation-page';
import { OpportunityClassicDetailPage } from '../../pages/opportunity/opportunity-classic-detail-page';
import { FundAccountSelectionClassicPage } from '../../pages/opportunity/fund-account-selection-classic-page';

export interface ClassicOpportunityFundAccountSelectionData {
  /** Prefix to generate a unique Opportunity Name via TestDataGenerator.uniqueName() */
  namePrefix: string;
  /** Salesforce account name to link to the Opportunity */
  accountName: string;
  /** Short search term to type in Account Name popup search box (e.g. "test") */
  accountSearchTerm: string;
  /** Plan name to lookup and select via popup window */
  planName: string;
  /** Stage value for the Opportunity (e.g. "New") */
  stage: string;
  /** Close Date in MM/DD/YYYY format */
  closeDate: string;
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

export class CreateClassicOpportunityFundAccountSelectionWorkflow extends BaseWorkflow {
  readonly workflowName = 'CreateClassicOpportunityFundAccountSelectionWorkflow';

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

  protected override async testStep(description: string, action: () => Promise<void>): Promise<void> {
    await test.step(`${this.workflowName}: ${description}`, async () => {
      await action();
    });
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  async navigateToClassicHome(): Promise<void> {
    await this.testStep('Navigate to Salesforce Classic home', async () => {
      await this.sfPage.navigateToClassicHome();
      await this.sfPage.captureScreenshot(this.page, test.info(), 'navigate-to-classic-home.png');
    });
  }

  // ── Business Methods ──────────────────────────────────────────────────────

  /**
   * Creates a Classic Opportunity via the Salesforce Classic UI.
   *
   * Flow: Classic nav Opportunities tab → New button → Record Type selection →
   *       Continue → Fill Classic form (Name, Account, Plan lookup, Stage, Close Date) → Save
   */
  async createClassicOpportunity(data: ClassicOpportunityFundAccountSelectionData): Promise<void> {
    await this.testStep('Navigate to Opportunities via Classic navigation tab', async () => {
      await this.sfPage.clickClassicNavigationTab('Opportunities');
      await this.sfPage.captureScreenshot(this.page, test.info(), 'navigate-to-opportunities-classic.png');
    });

    await this.testStep('Click New button on Opportunities list page', async () => {
      await this.classicCreationPage.clickNewOnClassicListPage();
    });

    await this.testStep(`Select record type "${data.recordTypeId}" and click Continue`, async () => {
      await this.classicCreationPage.selectRecordTypeAndContinue(data.recordTypeId);
      await this.sfPage.captureScreenshot(this.page, test.info(), 'classic-opportunity-form.png');
    });

    await this.testStep('Fill Opportunity Name', async () => {
      await this.classicCreationPage.fillOpportunityName(data.namePrefix);
    });

    await this.testStep('Fill Account Name via popup lookup', async () => {
      await this.classicCreationPage.fillAccountNameViaLookupPopup(data.accountSearchTerm, data.accountName);
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
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'before-save-classic-opportunity.png');
      }
      await this.classicCreationPage.clickSave();
      await this.sfPage.captureScreenshot(this.page, test.info(), 'classic-opportunity-saved.png');
    });
  }

  /**
   * Verifies the Classic Opportunity detail page is displayed after saving.
   * Classic detail page title contains the opportunity name.
   */
  async verifyOpportunityDetailPageDisplayed(opportunityName: string): Promise<void> {
    await this.testStep('Verify Classic Opportunity detail page is displayed', async () => {
      await this.classicDetailPage.verifyDetailPageDisplayed(opportunityName);
      await this.sfPage.captureScreenshot(this.page, test.info(), 'classic-opportunity-detail-page.png');
    });
  }

  /**
   * Extracts the Opportunity record ID from the current Classic detail page URL.
   * Classic detail URLs follow the pattern: /{recordId}
   */
  extractOpportunityRecordId(): string {
    return this.classicDetailPage.extractRecordIdFromUrl();
  }

  /**
   * Creates a Fund Account Selection from the Classic Opportunity detail page.
   *
   * Flow: Click Fund Account Selections related list link →
   *       Click New Fund Account Selection button →
   *       Fill standalone VF form (Fund Account, % of Investment, IRAType) → Save & Close
   */
  async createFundAccountSelection(data: ClassicOpportunityFundAccountSelectionData): Promise<void> {
    await this.testStep('Click Fund Account Selections related list link', async () => {
      await this.classicDetailPage.clickFundAccountSelectionsLink();
    });

    await this.testStep('Click New Fund Account Selection button', async () => {
      await this.classicDetailPage.clickNewFundAccountSelectionButton();
    });

    await this.testStep('Wait for Fund Account Selection form to load', async () => {
      await this.fundAccountSelectionPage.waitForFormVisible();
      await this.sfPage.captureScreenshot(this.page, test.info(), 'fund-account-selection-form.png');
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
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'before-save-fund-account-selection.png');
      }
      await this.fundAccountSelectionPage.clickSaveAndClose();
      await this.sfPage.captureScreenshot(this.page, test.info(), 'fund-account-selection-saved.png');
    });
  }

  /**
   * Verifies the Classic Opportunity detail page is displayed after Fund Account Selection save.
   * After Save & Close, the VF page redirects back to the Classic Opportunity detail page.
   */
  async verifyReturnToOpportunityDetailPage(opportunityName: string): Promise<void> {
    await this.testStep('Verify return to Classic Opportunity detail page after Fund Account Selection save', async () => {
      await this.classicDetailPage.verifyDetailPageDisplayed(opportunityName);
      await this.sfPage.captureScreenshot(this.page, test.info(), 'return-to-classic-opportunity-detail.png');
    });
  }
}
