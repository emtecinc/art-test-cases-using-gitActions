import { test } from '@playwright/test';
import * as path from 'path';
import { CsvReader, TestDataGenerator, SFDataFactory } from 'playwright-custom-core';
import { COMPONENT_OBJECT_MAP } from '../../data/component-object-mapping';
import {
  CreateAccountPlanCustomerPropensityScoresWorkflow,
  AccountPlanCustomerData,
} from '../../workflows/account/create-account-plan-customer-propensity-scores-workflow';

test.describe('Account with Plan Customer - Propensity Scores @smoke', () => {
  let workflow: CreateAccountPlanCustomerPropensityScoresWorkflow;
  let dataFactory: SFDataFactory;
  let csvRow: Record<string, string>;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(180_000);

    const baseUrl = process.env.BASE_URL || 'https://jhancock--devlm2.sandbox.lightning.force.com';
    workflow = new CreateAccountPlanCustomerPropensityScoresWorkflow(page, baseUrl);
    dataFactory = new SFDataFactory();
    await dataFactory.authenticate();

    // 1. Load test data from CSV
    const csvPath = path.resolve(__dirname, '../../test-data/account/account-plan-customer-propensity-scores.csv');
    csvRow = CsvReader.readRow<Record<string, string>>(csvPath, 0)!;

    // 2. Navigate to Salesforce home
    await workflow.navigateToBaseUrl();

    // 3. Close all open tabs for a clean workspace
    await workflow.closeAllPrimaryTabs();

    // Register duplicate detection handler
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

    // Register toast auto-dismiss handler
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

  test('should create account with plan customer and update propensity scores @smoke', async ({ page }) => {
    test.info().annotations.push({
      type: 'test_key',
      description: 'ART5',
    });
    const entityData: AccountPlanCustomerData = {
      accountName: TestDataGenerator.uniqueName(csvRow.accountNamePrefix),
      accountSearchTerm: csvRow.accountSearchTerm,
      initialConversionPropensityScore: csvRow.initialConversionPropensityScore,
      updatedConversionPropensityScore: csvRow.updatedConversionPropensityScore,
      planCustomerName: TestDataGenerator.uniqueName(csvRow.planCustomerNamePrefix),
      planCustomerPropensityScore: csvRow.planCustomerPropensityScore,
    };

    let accountUrl = '';

    // Step 1: Create Account (navigate + search + record type + fill + save)
    await test.step('Create account', async () => {
      await workflow.createAccount(entityData);
    });

    // Step 2: Verify account creation toast + capture URL for cleanup
    await test.step('Verify account creation toast and capture URL', async () => {
      let toastError: unknown;
      try {
        await workflow.verifyAccountCreatedToast(entityData.accountName);
      } catch (error) {
        toastError = error;
      } finally {
        accountUrl = page.url();
      }
      if (toastError) throw toastError;
    });

    // Step 3: Create Plan Customer from Account related list
    await test.step('Create plan customer', async () => {
      await workflow.createPlanCustomerFromAccountDetail(entityData);
    });

    // Step 4: Register cleanup
    // Account (parent) registered first so SFDataFactory's reverse-order teardown
    // deletes the Plan Customer (child) before the Account (parent).
    await test.step('Register cleanup', async () => {
      let cleanupError: unknown;
      try {
        const { objectApiName, uniqueField } = COMPONENT_OBJECT_MAP['PlanCustomer'];
        await dataFactory.getRecordIdByField(objectApiName, uniqueField, entityData.planCustomerName);
      } catch (error) {
        cleanupError = error;
      } finally {
        // Always register Account for cleanup even if Plan Customer lookup fails
        dataFactory.registerRecordFromUrl(accountUrl, entityData.accountName);
      }
      if (cleanupError) throw cleanupError;
    });

    // Step 5: Update Conversion Propensity Score on Account Details tab
    await test.step('Update account conversion propensity score', async () => {
      await workflow.updateAccountConversionPropensityScore(entityData);
    });

    // Step 6: Navigate to Plan Customer and update Propensity Score
    await test.step('Navigate to plan customer and update propensity score', async () => {
      await workflow.navigateToPlanCustomerAndEditPropensityScore(entityData);
    });
  });
});
