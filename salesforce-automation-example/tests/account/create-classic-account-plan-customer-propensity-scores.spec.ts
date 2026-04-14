import { test } from '@playwright/test';
import * as path from 'path';
import { CsvReader, TestDataGenerator, SFDataFactory } from 'playwright-custom-core';
import { COMPONENT_OBJECT_MAP } from '../../data/component-object-mapping';
import {
  CreateClassicAccountPlanCustomerPropensityScoresWorkflow,
  ClassicAccountPlanCustomerData,
} from '../../workflows/account/create-classic-account-plan-customer-propensity-scores-workflow';

test.describe('Classic Account with Plan Customer - Propensity Scores @smoke', () => {
  let workflow: CreateClassicAccountPlanCustomerPropensityScoresWorkflow;
  let dataFactory: SFDataFactory;
  let csvRow: Record<string, string>;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(180_000);

    const baseUrl = process.env.BASE_URL || 'https://jhancock--devlm2.sandbox.my.salesforce.com';
    workflow = new CreateClassicAccountPlanCustomerPropensityScoresWorkflow(page, baseUrl);
    dataFactory = new SFDataFactory();
    await dataFactory.authenticate();

    // 1. Load test data from CSV
    const csvPath = path.resolve(__dirname, '../../test-data/account/account-classic-plan-customer-propensity-scores.csv');
    csvRow = CsvReader.readRow<Record<string, string>>(csvPath, 0)!;

    // 2. Navigate to Salesforce Classic home page
    await workflow.navigateToClassicHome();

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

    // Register toast auto-dismiss handler (MANDATORY — prevent overlay issues)
    await page.addLocatorHandler(
      page.locator('.forceToastMessage'),
      async () => {
        await page.locator('.forceToastMessage .toastClose').click({ timeout: 3_000 }).catch(() => {});
      },
      { noWaitAfter: true }
    );
  });

  test.afterEach(async () => {
    await dataFactory.teardown();
  });

  test('should create classic account with plan customer and update propensity score @smoke', async ({ page }, testInfo) => {
    test.info().annotations.push({
      type: 'test_key',
      description: 'ART6',
    });
    const entityData: ClassicAccountPlanCustomerData = {
      accountName: TestDataGenerator.uniqueName(csvRow.accountNamePrefix),
      accountSearchTerm: csvRow.accountSearchTerm,
      initialConversionPropensityScore: csvRow.initialConversionPropensityScore,
      updatedConversionPropensityScore: csvRow.updatedConversionPropensityScore,
      planCustomerName: TestDataGenerator.uniqueName(csvRow.planCustomerNamePrefix),
    };

    // Step 1-8: Create Account (navigate → search → record type → fill form → save)
    await test.step('Create account via Classic UI', async () => {
      await workflow.createAccountViaClassic(entityData);
    });

    // Step 8: Verify Account detail page displayed after save
    await test.step('Verify account creation and register cleanup', async () => {
      let verifyError: unknown;
      try {
        await workflow.verifyAccountDetailDisplayed(entityData.accountName);
      } catch (error) {
        verifyError = error;
      } finally {
        // Classic URLs don't support registerRecordFromUrl — use field-based lookup
        const { objectApiName, uniqueField } = COMPONENT_OBJECT_MAP['Account'];
        await dataFactory.getRecordIdByField(objectApiName, uniqueField, entityData.accountName);
      }
      if (verifyError) throw verifyError;
    });

    // Step 9-12: Create Plan Customer from Account related list
    await test.step('Create plan customer from account detail', async () => {
      await workflow.createPlanCustomerFromClassicDetail(entityData);
    });

    // Step 12: Verify Plan Customer detail page displayed and register cleanup
    await test.step('Verify plan customer creation and register cleanup', async () => {
      let verifyError: unknown;
      try {
        await workflow.verifyPlanCustomerDetailDisplayed(entityData.planCustomerName);
      } catch (error) {
        verifyError = error;
      } finally {
        // Register Plan Customer for cleanup (child before parent in registration order)
        const { objectApiName, uniqueField } = COMPONENT_OBJECT_MAP['PlanCustomer'];
        await dataFactory.getRecordIdByField(objectApiName, uniqueField, entityData.planCustomerName);
      }
      if (verifyError) throw verifyError;
    });

    // Step 13-14: Navigate to Accounts list and click the created account
    await test.step('Navigate to account from list', async () => {
      await workflow.navigateToAccountFromList(entityData.accountName);
    });

    // Step 15-17: Edit Conversion Propensity Score
    await test.step('Edit account conversion propensity score', async () => {
      await workflow.editAccountConversionPropensityScore(entityData.updatedConversionPropensityScore);
    });

    // Step 17: Verify account saved with updated score
    await test.step('Verify account saved after edit', async () => {
      await workflow.verifyAccountDetailDisplayed(entityData.accountName);
    });

    // Step 18: Click Classic Plan Customer link
    await test.step('Navigate to plan customer from account detail', async () => {
      await workflow.navigateToPlanCustomerFromAccountDetail(entityData.planCustomerName);
    });
  });
});
