import test, { Page, TestInfo } from '@playwright/test';
import { BaseWorkflow } from 'playwright-custom-core';
import { SalesforcePage } from '../../pages/SF-Basepage/sf-page';
import { OpportunityListPage } from '../../pages/opportunity/opportunity-list-page';
import { OpportunityCreationPage } from '../../pages/opportunity/opportunity-creation-page';
import { OpportunityDetailPage } from '../../pages/opportunity/opportunity-detail-page';

export interface OpportunityData {
  name: string;
  closeDate: string;
  stage: string;
}

export class CreateOpportunityRequiredFieldsWorkflow extends BaseWorkflow {
  readonly workflowName = 'CreateOpportunityRequiredFieldsWorkflow';

  private sfPage: SalesforcePage;
  private listPage: OpportunityListPage;
  private creationPage: OpportunityCreationPage;
  private detailPage: OpportunityDetailPage;
  testInfo?: TestInfo;

  constructor(page: Page, baseUrl?: string) {
    super(page);
    const url = baseUrl || process.env.BASE_URL || '';
    this.sfPage = new SalesforcePage(page, url);
    this.listPage = new OpportunityListPage(page, url);
    this.creationPage = new OpportunityCreationPage(page, url);
    this.detailPage = new OpportunityDetailPage(page, url);
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

  async createOpportunity(data: OpportunityData): Promise<void> {
    await this.testStep('Navigate to Opportunities via App Launcher', async () => {
      await this.sfPage.navigateToAppViaAppLauncher('Opportunities');
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'opportunities-list-view');
      }
    });

    await this.testStep('Verify Opportunities list view is visible', async () => {
      await this.listPage.verifyListViewVisible();
    });

    await this.testStep('Click New button', async () => {
      await this.listPage.clickNewButton();
    });

    await this.testStep('Fill Opportunity Name', async () => {
      await this.creationPage.fillOpportunityName(data.name);
    });

    await this.testStep('Fill Close Date', async () => {
      await this.creationPage.fillCloseDate(data.closeDate);
    });

    await this.testStep('Select Stage', async () => {
      await this.creationPage.selectStage(data.stage);
    });

    await this.testStep('Click Save', async () => {
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'before-save-opportunity');
      }
      await this.creationPage.clickSave();
    });
  }

  async verifySuccessToast(opportunityName: string): Promise<void> {
    await this.testStep('Verify success toast notification', async () => {
      await this.sfPage.verifyToastMessage(`Opportunity "${opportunityName}" was created.`);
      if (this.testInfo) {
        await this.sfPage.captureScreenshot(this.page, this.testInfo, 'success-toast-opportunity');
      }
    });
  }

  async verifyOpportunityCreated(data: OpportunityData): Promise<void> {
    await this.testStep('Verify opportunity name on detail page', async () => {
      await this.detailPage.verifyOpportunityName(data.name);
    });

    await this.testStep('Verify close date on detail page', async () => {
      // Salesforce displays dates without leading zeros (12/04/2026 → 12/4/2026)
      const displayDate = data.closeDate.replace(/\b0+(\d)/g, '$1');
      await this.detailPage.verifyCloseDate(displayDate);
    });
  }
}
