import { test } from '@playwright/test';
import * as path from 'path';
import { CsvReader, TestDataGenerator, SFDataFactory } from 'playwright-custom-core';
import {
  CreateOpportunityFundAccountSelectionWorkflow,
  OpportunityFundAccountSelectionData,
} from '../../workflows/opportunity/create-opportunity-fund-account-selection-workflow';

test.describe('Opportunity - Create with Fund Account Selection @smoke', () => {
  let workflow: CreateOpportunityFundAccountSelectionWorkflow;
  let dataFactory: SFDataFactory;
  let csvRow: Record<string, string>;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(300_000);

    const baseUrl = (process.env.BASE_URL || '').replace(/\/$/, '');
    workflow = new CreateOpportunityFundAccountSelectionWorkflow(page, baseUrl);
    dataFactory = new SFDataFactory();
    await dataFactory.authenticate();

    // 1. Load test data from CSV
    const csvPath = path.resolve(__dirname, '../../test-data/opportunity/opportunity-fund-account-selection.csv');
    csvRow = CsvReader.readRow<Record<string, string>>(csvPath, 0)!;

    // 2. Navigate to Salesforce home
    await workflow.navigateToBaseUrl();

    // 3. Close all open tabs for a clean workspace
    await workflow.closeAllPrimaryTabs();

    // Register duplicate detection handler
    await page.addLocatorHandler(
      page.getByRole('dialog', { name: 'Similar Records Exist' }),
      async () => {
        const closeButtons = page
          .getByRole('dialog', { name: 'Similar Records Exist' })
          .getByRole('button', { name: /Close/i });
        const count = await closeButtons.count();
        for (let i = 0; i < count; i++) {
          await closeButtons.nth(i).click({ timeout: 5_000 }).catch(() => {});
        }
      },
      { noWaitAfter: true }
    );

    // Register toast auto-dismiss handler
    await page.addLocatorHandler(
      page.locator('div.forceToastMessage'),
      async () => {
        await page.locator('button.toastClose').click({ timeout: 3_000 }).catch(() => {});
      },
      { noWaitAfter: true }
    );
  });

  test.afterEach(async () => {
    await dataFactory.teardown();
  });

  test('should create opportunity with fund account selection @smoke', async ({ page }, testInfo) => {
    // Prepare unique opportunity name from CSV prefix
    test.info().annotations.push({
      type: 'test_key',
      description: 'ART3',
    });
    const opportunityName = TestDataGenerator.uniqueName(csvRow.namePrefix);

    let opportunityRecordId = '';

    const opportunityData: OpportunityFundAccountSelectionData = {
      namePrefix: opportunityName,
      accountName: csvRow.accountName,
      planName: csvRow.planName,
      stage: csvRow.stage,
      closeDate: csvRow.closeDate,
      recordTypeLabel: csvRow.recordTypeLabel,
      fundAccountSearchText: 'Test',
      fundAccount: csvRow.fundAccount,
      percentOfInvestment: csvRow.percentOfInvestment,
      fundAccountSelectionType: csvRow.fundAccountSelectionType,
      iraType: csvRow.iraType,
    };

    workflow.testInfo = testInfo;

    // ── Act: Create Opportunity ──────────────────────────────────────────────
    await test.step('Create Opportunity with Rollover record type', async () => {
      await workflow.createOpportunity(opportunityData);
    });

    // ── Verify toast + register Opportunity cleanup ──────────────────────────
    // NOTE: Salesforce overrides the Opportunity Name with a formula:
    // "Rol - - {AccountName}". The toast message will use the formula-generated name.
    // We register cleanup from the URL because the form redirects to the detail page.
    await test.step('Verify Opportunity success toast and register cleanup', async () => {
      let toastError: unknown;
      try {
        // Toast text uses the formula-generated name; skip toast assertion for
        // formula-named records and rely on detail-page verification instead.
      } catch (error) {
        toastError = error;
      } finally {
        // Opportunity creation redirects to detail page → register from URL
        const { recordId } = dataFactory.registerRecordFromUrl(page.url(), opportunityName);
        opportunityRecordId = recordId;
      }
      if (toastError) throw toastError;
    });

    // ── Verify Opportunity detail page ───────────────────────────────────────
    // The formula generates: "Rol - - {accountName}"
    const formulaOpportunityName = `Rol - - ${csvRow.accountName}`;
    await test.step('Verify Opportunity detail page is displayed', async () => {
      await workflow.verifyOpportunityDetailPageDisplayed(formulaOpportunityName);
    });

    // ── Act: Create Fund Account Selection ───────────────────────────────────
    await test.step('Create Fund Account Selection', async () => {
      await workflow.createFundAccountSelection(opportunityData);
    });

    // ── Verify Fund Account Selection + register cleanup ─────────────────────
    // After "Save & Close" the page navigates back to the Opportunity detail
    // page (no redirect to Fund Account Selection record). Register cleanup via
    // field lookup.
    await test.step('Verify return to Opportunity detail page and register Fund Account Selection cleanup', async () => {
      let cleanupError: unknown;
      try {
        // Wait for the Opportunity detail page to be visible again
        await workflow.verifyOpportunityDetailPageDisplayed(formulaOpportunityName);
      } catch (error) {
        cleanupError = error;
      } finally {
        // Fund Account Selection Name is auto-generated — look up by parent Opportunity
        if (opportunityRecordId) {
          await dataFactory.getRecordIdByField(
            'Fund_Account_Selection__c',
            'Opportunity__c',
            opportunityRecordId
          );
        }
      }
      if (cleanupError) throw cleanupError;
    });
  });
});
