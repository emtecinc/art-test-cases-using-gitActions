import { test } from '@playwright/test';
import * as path from 'path';
import { CsvReader, TestDataGenerator, SFDataFactory } from 'playwright-custom-core';
import {
  CreateOpportunityRequiredFieldsWorkflow,
  OpportunityData,
} from '../../workflows/opportunity/create-opportunity-required-fields-workflow';

test.describe('Opportunity Creation - Required Fields @smoke', () => {
  let workflow: CreateOpportunityRequiredFieldsWorkflow;
  let dataFactory: SFDataFactory;
  let csvRow: Record<string, string>;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(120_000);

    const baseUrl = process.env.BASE_URL || 'https://orgfarm-c3f45fc810-dev-ed.develop.lightning.force.com';
    workflow = new CreateOpportunityRequiredFieldsWorkflow(page, baseUrl);
    dataFactory = new SFDataFactory();
    await dataFactory.authenticate();

    // 1. Load test data from CSV
    const csvPath = path.resolve(__dirname, '../../test-data/opportunity/opportunity-required-fields.csv');
    csvRow = CsvReader.readRow<Record<string, string>>(csvPath, 0)!;

    // 2. Navigate to Salesforce home
    await workflow.navigateToBaseUrl();

    // 3. Close all open tabs for a clean workspace
    await workflow.closeAllPrimaryTabs();

    // Register duplicate detection handler (MANDATORY for record-creating tests)
    await page.addLocatorHandler(
      page.getByRole('dialog', { name: 'Similar Records Exist' }),
      async () => {
        const closeButtons = page.getByRole('dialog', { name: 'Similar Records Exist' })
          .getByRole('button', { name: /Close/i });
        const count = await closeButtons.count();
        for (let i = 0; i < count; i++) {
          await closeButtons.nth(i).click({ timeout: 5_000 }).catch(() => {});
        }
      },
      { noWaitAfter: true }
    );

    // Register toast auto-dismiss handler (MANDATORY — prevents toast overlays from blocking interactions)
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

  test('should create opportunity with required fields @smoke', async ({ page }, testInfo) => {
    const opportunityData: OpportunityData = {
      name: TestDataGenerator.uniqueName(csvRow.namePrefix),
      closeDate: csvRow.closeDate,
      stage: csvRow.stage,
    };

    workflow.testInfo = testInfo;

    // Act — create the opportunity
    await test.step('Create opportunity with required fields', async () => {
      await workflow.createOpportunity(opportunityData);
    });

    // Verify toast + register cleanup
    await test.step('Verify toast and register cleanup', async () => {
      let toastError: unknown;
      try {
        await workflow.verifySuccessToast(opportunityData.name);
      } catch (error) {
        toastError = error;
      } finally {
        dataFactory.registerRecordFromUrl(page.url(), opportunityData.name);
      }
      if (toastError) throw toastError;
    });

    // Assert — verify record details
    await test.step('Verify opportunity record details', async () => {
      await workflow.verifyOpportunityCreated(opportunityData);
    });
  });
});
