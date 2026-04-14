import { test } from '@playwright/test';
import * as path from 'path';
import { CsvReader, TestDataGenerator, SFDataFactory } from 'playwright-custom-core';
import { COMPONENT_OBJECT_MAP } from '../../data/component-object-mapping';
import {
  CreateClassicRolloverOpportunityFundAccountWorkflow,
  ClassicRolloverOpportunityFundAccountData,
} from '../../workflows/opportunity/create-classic-rollover-opportunity-fund-account-workflow';

test.describe('Opportunity - Create Classic Rollover with Fund Account Selection @smoke', () => {
  let workflow: CreateClassicRolloverOpportunityFundAccountWorkflow;
  let dataFactory: SFDataFactory;
  let csvRow: Record<string, string>;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(300_000);

    const baseUrl = (process.env.BASE_URL || '').replace(/\/$/, '');
    workflow = new CreateClassicRolloverOpportunityFundAccountWorkflow(page, baseUrl);
    dataFactory = new SFDataFactory();
    await dataFactory.authenticate();

    // 1. Load test data from CSV
    const csvPath = path.resolve(
      __dirname,
      '../../test-data/opportunity/opportunity-classic-rollover-fund-account.csv'
    );
    csvRow = CsvReader.readRow<Record<string, string>>(csvPath, 0)!;

    // 2. Navigate to Salesforce Classic home to establish the session
    await workflow.navigateToClassicHome();

    // Register duplicate detection handler (MANDATORY for record-creating tests)
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
    'should create classic rollover opportunity with fund account selection @smoke',
    async ({ page }, testInfo) => {
      test.info().annotations.push({
      type: 'test_key',
      description: 'ART2',
    });
      // Prepare unique opportunity name from CSV prefix
      const opportunityName = TestDataGenerator.uniqueName(csvRow.namePrefix);
      // Classic Rollover record type uses a formula override for the Opportunity Name:
      // "Rol - - {accountName}" — the entered prefix is ignored by the formula.
      const formulaOpportunityName = `Rol - - ${csvRow.accountName}`;
      let opportunityRecordId = '';

      const opportunityData: ClassicRolloverOpportunityFundAccountData = {
        namePrefix: opportunityName,
        accountName: csvRow.accountName,
        planName: csvRow.planName,
        stage: csvRow.stage,
        closeDate: csvRow.closeDate,
        recordTypeName: csvRow.recordTypeName,
        recordTypeId: csvRow.recordTypeId,
        fundAccountSearchText: csvRow.fundAccountSearchText,
        fundAccount: csvRow.fundAccount,
        percentOfInvestment: csvRow.percentOfInvestment,
        iraType: csvRow.iraType,
      };

      workflow.testInfo = testInfo;

      // ── Act: Create Classic Rollover Opportunity ──────────────────────────
      await test.step('Create Classic Rollover Opportunity', async () => {
        await workflow.createClassicRolloverOpportunity(opportunityData);
      });

      // ── Verify + Register Opportunity cleanup ──────────────────────────────
      await test.step('Verify Opportunity detail page and extract record ID', async () => {
        let verifyError: unknown;
        try {
          await workflow.verifyOpportunityDetailPageDisplayed(formulaOpportunityName);
        } catch (error) {
          verifyError = error;
          if (testInfo) {
            await page.screenshot({ fullPage: true }).then(screenshot =>
              testInfo.attach('verify-opportunity-detail-failure', { body: screenshot, contentType: 'image/png' })
            ).catch(() => {});
          }
        } finally {
          // Extract record ID from the Classic detail page URL
          opportunityRecordId = workflow.extractOpportunityRecordId();
        }
        if (verifyError) throw verifyError;
      });

      // ── Act: Create Fund Account Selection ────────────────────────────────
      await test.step('Create Fund Account Selection', async () => {
        await workflow.createFundAccountSelection(opportunityData);
      });

      // ── Verify return to detail page + Register cleanup ───────────────────
      await test.step('Verify return to detail page and register cleanup', async () => {
        let cleanupError: unknown;
        try {
          await workflow.verifyOpportunityDetailPageDisplayed(formulaOpportunityName);
        } catch (error) {
          cleanupError = error;
          if (testInfo) {
            await page.screenshot({ fullPage: true }).then(screenshot =>
              testInfo.attach('verify-return-to-detail-failure', { body: screenshot, contentType: 'image/png' })
            ).catch(() => {});
          }
        } finally {
          // Register Fund Account Selection for cleanup FIRST (child before parent)
          if (opportunityRecordId) {
            try {
              await dataFactory.getRecordIdByField(
                'Fund_Account_Selection__c',
                'Opportunity__c',
                opportunityRecordId
              );
            } catch {
              console.warn('Could not find Fund Account Selection record for cleanup');
            }
          }
          // Register Opportunity for cleanup SECOND (parent after child)
          if (opportunityRecordId) {
            dataFactory.registerForCleanup('Opportunity', opportunityRecordId, formulaOpportunityName);
          } else {
            // Fallback: try SOQL query if URL extraction failed
            try {
              await dataFactory.getRecordIdByField(
                COMPONENT_OBJECT_MAP['Opportunity'].objectApiName,
                COMPONENT_OBJECT_MAP['Opportunity'].uniqueField,
                formulaOpportunityName
              );
            } catch {
              console.warn('Could not extract Opportunity record ID from URL or SOQL');
            }
          }
        }
        if (cleanupError) throw cleanupError;
      });
    }
  );
});
