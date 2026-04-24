import { test } from '@playwright/test';
import * as path from 'path';
import { CsvReader, TestDataGenerator, SFDataFactory } from 'playwright-custom-core';
import { COMPONENT_OBJECT_MAP } from '../../data/component-object-mapping';
import {
  CreateClassicOpportunityFundAccountSelectionWorkflow,
  ClassicOpportunityFundAccountSelectionData,
} from '../../workflows/opportunity/create-classic-opportunity-fund-account-selection-workflow';

test.describe('Opportunity - Create Classic Opportunity with Fund Account Selection', () => {
  let workflow: CreateClassicOpportunityFundAccountSelectionWorkflow;
  let dataFactory: SFDataFactory;
  let csvRow: Record<string, string>;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(300_000);

    const baseUrl = (process.env.BASE_URL || '').replace(/\/$/, '');
    workflow = new CreateClassicOpportunityFundAccountSelectionWorkflow(page, baseUrl);
    dataFactory = new SFDataFactory();
    await dataFactory.authenticate();

    // 1. Load test data from CSV
    const csvPath = path.resolve(
      __dirname,
      '../../test-data/opportunity/opportunity-classic-fund-account-selection.csv'
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

    // Register toast auto-dismiss handler (MANDATORY — prevents overlay blocking)
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

  // TODO: Replace the placeholder Jira tag below with the actual Jira issue key
  // once assigned. Retrieve the prefix from the TEST_EXEC_PROJECT_KEY env var
  // (e.g. process.env.TEST_EXEC_PROJECT_KEY + '-TC1').
  test(
    'should create classic opportunity with fund account selection',
    { tag: ['@ART5', '@smoke'] },
    async ({ page }, testInfo) => {
      // Prepare unique opportunity name from CSV prefix
      const opportunityName = TestDataGenerator.uniqueName(csvRow.namePrefix);
      let opportunityRecordId = '';

      const opportunityData: ClassicOpportunityFundAccountSelectionData = {
        namePrefix: opportunityName,
        accountName: csvRow.accountName,
        accountSearchTerm: csvRow.accountSearchTerm,
        planName: csvRow.planName,
        stage: csvRow.stage,
        closeDate: csvRow.closeDate,
        recordTypeId: csvRow.recordTypeId,
        fundAccountSearchText: csvRow.fundAccountSearchText,
        fundAccount: csvRow.fundAccount,
        percentOfInvestment: csvRow.percentOfInvestment,
        iraType: csvRow.iraType,
      };

      workflow.testInfo = testInfo;

      // ── Steps 1–12: Create Classic Opportunity ────────────────────────────
      // Navigate Classic home → Opportunities tab → New → Record type → Continue →
      // Fill form (Name, Account, Plan, Stage, Close Date) → Save
      await test.step('Create Classic Opportunity', async () => {
        await workflow.createClassicOpportunity(opportunityData);
      });

      // ── Step 12: Verify detail page + extract record ID ───────────────────
      await test.step('Verify Opportunity detail page and extract record ID', async () => {
        let verifyError: unknown;
        try {
          await workflow.verifyOpportunityDetailPageDisplayed(opportunityName);
        } catch (error) {
          verifyError = error;
        } finally {
          // Extract record ID from the Classic detail page URL (/{recordId})
          opportunityRecordId = workflow.extractOpportunityRecordId();
        }
        if (verifyError) throw verifyError;
      });

      // ── Steps 13–18: Create Fund Account Selection ─────────────────────────
      // Click Fund Account Selections related list link → Click New Fund Account Selection
      // → Fill VF form (Fund Account, % of Investment, IRAType) → Save & Close
      await test.step('Create Fund Account Selection', async () => {
        await workflow.createFundAccountSelection(opportunityData);
      });

      // ── Verify return to Opportunity detail + register cleanup ─────────────
      await test.step('Verify return to Opportunity detail page and register cleanup', async () => {
        let cleanupError: unknown;
        try {
          await workflow.verifyReturnToOpportunityDetailPage(opportunityName);
        } catch (error) {
          cleanupError = error;
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
            dataFactory.registerForCleanup(
              COMPONENT_OBJECT_MAP['Opportunity'].objectApiName,
              opportunityRecordId,
              opportunityName
            );
          } else {
            // Fallback: SOQL lookup if URL extraction failed
            try {
              await dataFactory.getRecordIdByField(
                COMPONENT_OBJECT_MAP['Opportunity'].objectApiName,
                COMPONENT_OBJECT_MAP['Opportunity'].uniqueField,
                opportunityName
              );
            } catch {
              console.warn('Could not extract Opportunity record ID for cleanup');
            }
          }
        }
        if (cleanupError) throw cleanupError;
      });
    }
  );
});
