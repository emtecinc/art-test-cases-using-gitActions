import test, { Page, TestInfo } from '@playwright/test';
import { BaseWorkflow } from 'playwright-custom-core';
import { SalesforcePage } from '../../pages/SF-Basepage/sf-page';
import { OpportunityListPage } from '../../pages/opportunity/opportunity-list-page';
import { OpportunityCreationPage } from '../../pages/opportunity/opportunity-creation-page';
import { OpportunityDetailPage } from '../../pages/opportunity/opportunity-detail-page';
import { FundAccountSelectionPage } from '../../pages/opportunity/fund-account-selection-page';

export interface OpportunityFundAccountSelectionData {
  /** Prefix used to generate a unique Opportunity Name via TestDataGenerator.uniqueName() */
  namePrefix: string;
  /** Salesforce account to link to the Opportunity */
  accountName: string;
  /** Plan to link to the Opportunity */
  planName: string;
  /** Stage value for the Opportunity (e.g. "New") */
  stage: string;
  /** Close Date in MM/DD/YYYY format */
  closeDate: string;
  /** Record type label (e.g. "Rollover") */
  recordTypeLabel: string;
  /** Text to type in Fund Account search combobox */
  fundAccountSearchText: string;
  /** Exact option name to select from Fund Account dropdown */
  fundAccount: string;
  /** Numeric string for % of Investment (e.g. "10") */
  percentOfInvestment: string;
  /** Fund Account Selection Type (e.g. "Participant Selection") */
  fundAccountSelectionType: string;
  /** IRAType option to select (e.g. "Traditional") */
  iraType: string;
}

export class CreateOpportunityFundAccountSelectionWorkflow extends BaseWorkflow {
  readonly workflowName = 'CreateOpportunityFundAccountSelectionWorkflow';

  private sfPage: SalesforcePage;
  private listPage: OpportunityListPage;
  private creationPage: OpportunityCreationPage;
  private detailPage: OpportunityDetailPage;
  private fundAccountSelectionPage: FundAccountSelectionPage;
  testInfo?: TestInfo;

  constructor(page: Page, baseUrl?: string) {
    super(page);
    const url = baseUrl || process.env.BASE_URL || '';
    this.sfPage = new SalesforcePage(page, url);
    this.listPage = new OpportunityListPage(page, url);
    this.creationPage = new OpportunityCreationPage(page, url);
    this.detailPage = new OpportunityDetailPage(page, url);
    this.fundAccountSelectionPage = new FundAccountSelectionPage(page, url);
  }

  protected async testStep(description: string, action: () => Promise<void>): Promise<void> {
    await test.step(`${this.workflowName}: ${description}`, async () => {
      await action();
    });
  }

  // ── Navigation ────────────────────────────────────────────────────────────

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
   * Creates a Rollover Opportunity by navigating to the Opportunities list,
   * selecting the given record type, filling required fields, and saving.
   *
   * NOTE: Salesforce auto-generates the Opportunity Name using a formula
   * ("Rol - - {AccountName}"). The namePrefix supplied in data is passed into
   * the Opportunity Name field, but the displayed record title will follow the
   * formula. Use verifyOpportunityDetailPageDisplayed() to assert the page header.
   */
  async createOpportunity(data: OpportunityFundAccountSelectionData): Promise<void> {
    await this.testStep('Navigate to Opportunities via App Launcher', async () => {
      await this.sfPage.navigateToAppViaAppLauncher('Opportunities');
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'opportunities-list-view');
      }
    });

    await this.testStep('Verify Opportunities list view is visible', async () => {
      await this.listPage.verifyListViewVisible();
    });

    await this.testStep('Click New button to open record type dialog', async () => {
      await this.listPage.clickNewButton();
    });

    await this.testStep(`Select record type: ${data.recordTypeLabel}`, async () => {
      await this.creationPage.selectRecordType(data.recordTypeLabel);
      await this.creationPage.clickNext();
    });

    await this.testStep('Fill Opportunity Name', async () => {
      await this.creationPage.fillOpportunityName(data.namePrefix);
    });

    await this.testStep('Fill Account Name lookup', async () => {
      await this.creationPage.fillAccountNameLookupAndSelect(data.accountName);
    });

    await this.testStep('Fill Plan lookup', async () => {
      await this.creationPage.fillPlanLookupAndSelect(data.planName);
    });

    await this.testStep('Select Stage', async () => {
      await this.creationPage.selectStage(data.stage);
    });

    await this.testStep('Fill Close Date', async () => {
      await this.creationPage.fillCloseDate(data.closeDate);
    });

    await this.testStep('Click Save', async () => {
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'before-save-opportunity');
      }
      await this.creationPage.clickSave();
    });
  }

  /**
   * Verifies the Opportunity detail page heading is visible after save.
   */
  async verifyOpportunityDetailPageDisplayed(opportunityName: string): Promise<void> {
    await this.testStep('Verify Opportunity detail page is displayed', async () => {
      await this.detailPage.verifyDetailPageVisible(opportunityName);
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'opportunity-detail-page');
      }
    });
  }

  /**
   * Navigates to the Fund Account Selections related list and creates a new
   * Fund Account Selection record via the Visualforce iframe form.
   */
  async createFundAccountSelection(data: OpportunityFundAccountSelectionData): Promise<void> {
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
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'fund-account-selection-form');
      }
    });

    await this.testStep('Fill Fund Account search and select option', async () => {
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
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'before-save-fund-account-selection');
      }
      await this.fundAccountSelectionPage.clickSaveAndClose();
    });
  }

  /**
   * Verifies the success toast after Opportunity creation.
   */
  async verifyOpportunitySuccessToast(opportunityName: string): Promise<void> {
    await this.testStep('Verify Opportunity success toast', async () => {
      await this.sfPage.verifyToastMessage(`Opportunity "${opportunityName}" was created.`);
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'opportunity-success-toast');
      }
    });
  }
}
