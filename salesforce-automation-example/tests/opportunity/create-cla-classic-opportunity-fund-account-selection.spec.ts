import { test } from '@playwright/test';
import * as path from 'path';
import { CsvReader, TestDataGenerator, SFDataFactory } from 'playwright-custom-core';
import {
  CreateClaClassicOpportunityFundAccountWorkflow,
  ClaClassicOpportunityFundAccountData,
} from '../../workflows/opportunity/create-cla-classic-opportunity-fund-account-workflow';

test.describe('Opportunity - Create CLA Classic with Fund Account Selection @smoke', () => {
  let workflow: CreateClaClassicOpportunityFundAccountWorkflow;
  let dataFactory: SFDataFactory;
  let csvRow: Record<string, string>;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(300_000);

    const baseUrl = (process.env.BASE_URL || '').replace(/\/$/, '');
    workflow = new CreateClaClassicOpportunityFundAccountWorkflow(page, baseUrl);
    dataFactory = new SFDataFactory();
    await dataFactory.authenticate();

    // 1. Load test data from CSV
    const csvPath = path.resolve(
      __dirname,
      '../../test-data/opportunity/opportunity-cla-classic-fund-account-selection.csv'
    );
    csvRow = CsvReader.readRow<Record<string, string>>(csvPath, 0)!;

    // 2. Navigate to Salesforce Classic home to establish the session
    await workflow.navigateToClassicHome();

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

    // Register toast auto-dismiss handler (Lightning toasts after page switches)
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

  test(
    'should create CLA Classic opportunity with fund account selection @smoke',
    async ({ page }, testInfo) => {
      test.info().annotations.push({
      type: 'test_key',
      description: 'ART1',
    });
      // Prepare unique opportunity name from CSV prefix
      const opportunityName = TestDataGenerator.uniqueName(csvRow.namePrefix);
      // CLA Classic record type uses a formula override for the Opportunity Name:
      // "Rol - - {accountName}" — the entered prefix is ignored by the formula.
      const formulaOpportunityName = `Rol - - ${csvRow.accountName}`;
      let opportunityRecordId = '';

      const opportunityData: ClaClassicOpportunityFundAccountData = {
        namePrefix: opportunityName,
        accountName: csvRow.accountName,
        planName: csvRow.planName,
        stage: csvRow.stage,
        closeDate: csvRow.closeDate,
        fundAccountSearchText: 'Test',
        fundAccount: csvRow.fundAccount,
        percentOfInvestment: csvRow.percentOfInvestment,
        fundAccountSelectionType: csvRow.fundAccountSelectionType,
        iraType: csvRow.iraType,
      };

      workflow.testInfo = testInfo;

      // ── Act: Create CLA Classic Opportunity ──────────────────────────────
      await test.step('Create CLA Classic Opportunity', async () => {
        await workflow.createClaClassicOpportunity(opportunityData);
      });

      // ── Verify + Register Opportunity cleanup ──────────────────────────────
      // After saving in Classic, the workflow navigates to the Lightning detail URL:
      //   /lightning/r/Opportunity/{recordId}/view
      // Extract the record ID directly from the URL instead of SOQL query
      // (the formula name "Rol - - {accountName}" can be unreliable with SOQL).
      await test.step('Verify Opportunity detail page and register cleanup', async () => {
        let verifyError: unknown;
        try {
          await workflow.verifyOpportunityDetailPageDisplayed(formulaOpportunityName);
        } catch (error) {
          verifyError = error;
        } finally {
          // Extract record ID from the Lightning URL
          const urlMatch = page.url().match(/\/Opportunity\/([a-zA-Z0-9]{15,18})\/view/);
          if (urlMatch) {
            opportunityRecordId = urlMatch[1];
            dataFactory.registerForCleanup('Opportunity', opportunityRecordId, formulaOpportunityName);
          } else {
            // Fallback: try SOQL query if URL extraction fails
            try {
              opportunityRecordId = await dataFactory.getRecordIdByField(
                'Opportunity',
                'Name',
                formulaOpportunityName
              );
            } catch {
              console.warn('Could not extract Opportunity record ID from URL or SOQL');
            }
          }
        }
        if (verifyError) throw verifyError;
      });

      // ── Act: Create Fund Account Selection ────────────────────────────────
      await test.step('Create Fund Account Selection', async () => {
        await workflow.createFundAccountSelection(opportunityData);
      });

      // ── Verify Fund Account Selection + Register cleanup ───────────────────
      // After "Save & Close" the VF iframe stays on the Fund Account Selection view.
      // Navigate back to the Opportunity detail page using the record ID we extracted.
      await test.step('Verify return to Opportunity detail page and register Fund Account Selection cleanup', async () => {
        let cleanupError: unknown;
        try {
          // Navigate back to the Opportunity Lightning detail page
          const baseUrl = (process.env.BASE_URL || '').replace(/\/$/, '');
          await page.goto(
            `${baseUrl}/lightning/r/Opportunity/${opportunityRecordId}/view`,
            { timeout: 60_000, waitUntil: 'domcontentloaded' }
          );
          await page.locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
          await workflow.verifyOpportunityDetailPageDisplayed(formulaOpportunityName);
        } catch (error) {
          cleanupError = error;
        } finally {
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
    }
  );
});
