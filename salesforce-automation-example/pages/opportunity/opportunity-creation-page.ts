import { Page, expect } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

export class OpportunityCreationPage extends BasePage {
  readonly pageName = 'OpportunityCreationPage';
  protected readonly relativeUrl = '/lightning/o/Opportunity/new';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Dialog Scope ──────────────────────────────────────────────────────────

  /**
   * Scopes to the Opportunity creation dialog.
   * Uses .filter() instead of name matching because the dialog's accessible
   * name can disappear during Lightning form re-renders (e.g. after lookup
   * selections). The heading inside the dialog keeps its text reliably.
   */
  private dialogScope(p: Page) {
    return p.getByRole('dialog').filter({
      has: p.getByRole('heading', { name: /New Opportunity/i }),
    });
  }

  private get dialog() {
    return this.dialogScope(this['page']);
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get opportunityNameInput() {
    return new ResilientLocator(this['page'], [
      (p) => this.dialogScope(p).getByRole('textbox', { name: 'Opportunity Name' }),
      (p) => this.dialogScope(p).getByLabel('Opportunity Name'),
      (p) => this.dialogScope(p).locator('input[name*="Name"]'),
    ]);
  }

  private get closeDateInput() {
    return new ResilientLocator(this['page'], [
      (p) => this.dialogScope(p).getByRole('textbox', { name: 'Close Date' }),
      (p) => this.dialogScope(p).getByLabel('Close Date'),
      (p) => this.dialogScope(p).locator('input[name*="CloseDate"]'),
    ]);
  }

  private get stageCombobox() {
    return new ResilientLocator(this['page'], [
      (p) => this.dialogScope(p).getByRole('combobox', { name: 'Stage' }),
      (p) => this.dialogScope(p).getByLabel('Stage'),
      (p) => this.dialogScope(p).locator('button[name*="StageName"]'),
    ]);
  }

  private get saveButton() {
    return new ResilientLocator(this['page'], [
      (p) => this.dialogScope(p).getByRole('button', { name: 'Save', exact: true }),
      (p) => this.dialogScope(p).locator('button[name="SaveEdit"]'),
      (p) => this.dialogScope(p).locator('button').filter({ hasText: /^Save$/ }),
    ]);
  }

  private get nextButton() {
    return new ResilientLocator(this['page'], [
      (p) => this.dialogScope(p).getByRole('button', { name: 'Next', exact: true }),
      (p) => this.dialogScope(p).locator('button[name="Next"]'),
      (p) => this.dialogScope(p).locator('button').filter({ hasText: /^Next$/ }),
    ]);
  }

  private get accountNameLookupInput() {
    return new ResilientLocator(this['page'], [
      (p) => this.dialogScope(p).getByRole('combobox', { name: 'Account Name', exact: true }),
      (p) => this.dialogScope(p).getByLabel('Account Name', { exact: true }),
      (p) => this.dialogScope(p).locator('input[placeholder*="Search Accounts"]'),
    ]);
  }

  private get planLookupInput() {
    return new ResilientLocator(this['page'], [
      (p) => this.dialogScope(p).getByRole('combobox', { name: 'Plan', exact: true }),
      (p) => this.dialogScope(p).getByLabel('Plan', { exact: true }),
      (p) => this.dialogScope(p).locator('input[placeholder*="Search Plans"]'),
    ]);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async fillOpportunityName(name: string): Promise<void> {
    try {
      await this.opportunityNameInput.getLocator().fill(name);
    } catch (error) {
      console.error('Failed to fill Opportunity Name');
      throw error;
    }
  }

  async fillCloseDate(date: string): Promise<void> {
    try {
      await this.closeDateInput.getLocator().fill(date);
    } catch (error) {
      console.error('Failed to fill Close Date');
      throw error;
    }
  }

  async selectStage(stageName: string): Promise<void> {
    const combobox = this.stageCombobox.getLocator();
    const option = this.dialog.getByRole('option', { name: stageName });

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await combobox.click({ timeout: 10_000 });
        await expect(option).toBeVisible({ timeout: 5_000 });
        await option.click();
        return;
      } catch { /* Dropdown closed by overlay — retry */ }
    }
    await combobox.click({ timeout: 10_000 });
    await expect(option).toBeVisible({ timeout: 5_000 });
    await option.click();
  }

  async clickSave(): Promise<void> {
    try {
      await this.saveButton.getLocator().click();
      // Wait for navigation to the record detail page after save
      await this['page'].waitForURL(
        /\/lightning\/r\/Opportunity\/[a-zA-Z0-9]+\/view/,
        { timeout: 30_000, waitUntil: 'domcontentloaded' },
      );
      // Wait for Lightning spinner to clear before proceeding
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 30_000 }).catch(() => {});
    } catch (error) {
      console.error('Failed to click Save or navigate to detail page');
      throw error;
    }
  }

  async selectRecordType(recordTypeName: string): Promise<void> {
    try {
      // Record type radio accessible names include description text
      // (e.g. "Rollover PFS Rollover"). Use regex starting with the label name
      // to avoid matching partial names like "NextCapital Rollover".
      // The raw <input> is intercepted by a styled wrapper div, so use force: true.
      const radio = new ResilientLocator(this['page'], [
        (p) => p.getByRole('dialog').getByRole('radio', { name: new RegExp(`^${recordTypeName}\\b`) }),
        (p) => p.getByRole('dialog').locator('label').filter({ hasText: new RegExp(`^\\s*${recordTypeName}\\s`) }).locator('input[type="radio"]'),
        (p) => p.getByRole('dialog').locator('span.slds-form-element__label').filter({ hasText: new RegExp(`^${recordTypeName}$`) }),
      ]);
      await expect(radio.getLocator()).toBeVisible({ timeout: 15_000 });
      await radio.getLocator().scrollIntoViewIfNeeded();
      await radio.getLocator().click({ force: true });
    } catch (error) {
      console.error(`Failed to select record type: ${recordTypeName}`);
      throw error;
    }
  }

  async clickNext(): Promise<void> {
    try {
      await this.nextButton.getLocator().click();
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error('Failed to click Next on record type dialog');
      throw error;
    }
  }

  /**
   * Types into the Account Name lookup and selects the matching option.
   * Uses pressSequentially to trigger the lookup search, then clicks
   * the option from the accessibility tree (no exact match since the
   * option name includes the record type, e.g. "TestEmployer Employer").
   */
  async fillAccountNameLookupAndSelect(accountName: string): Promise<void> {
    try {
      const input = this.accountNameLookupInput.getLocator();
      await input.click();
      await input.pressSequentially(accountName, { delay: 80, timeout: 30_000 });

      // Wait for the Search Results group inside the lookup dropdown, then click the match.
      // IMPORTANT: Do NOT use a bare option matcher — the first option in the listbox is
      // "Show more results for ..." which also contains the search text and clicking it
      // opens an Advanced Search dialog instead of selecting the record.
      const resultsGroup = this.dialog.getByRole('group', { name: 'Search Results' });
      await expect(resultsGroup).toBeVisible({ timeout: 15_000 });
      const option = resultsGroup.getByRole('option', { name: accountName }).first();
      await expect(option).toBeVisible({ timeout: 10_000 });
      await option.click();

      // Wait for the lookup pill to confirm selection and any spinner to finish
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error(`Failed to fill and select Account Name: ${accountName}`);
      throw error;
    }
  }

  /**
   * Types into the Plan lookup and selects the matching option.
   * Same pattern as Account Name lookup.
   */
  async fillPlanLookupAndSelect(planName: string): Promise<void> {
    try {
      // Ensure the dialog is still visible before interacting with Plan
      await expect(this.dialog).toBeVisible({ timeout: 15_000 });
      const input = this.planLookupInput.getLocator();
      await input.click({ timeout: 15_000 });
      await input.pressSequentially(planName, { delay: 80, timeout: 30_000 });

      // Scope to "Search Results" group to avoid clicking "Show more results"
      const resultsGroup = this.dialog.getByRole('group', { name: 'Search Results' });
      await expect(resultsGroup).toBeVisible({ timeout: 15_000 });
      const option = resultsGroup.getByRole('option', { name: planName }).first();
      await expect(option).toBeVisible({ timeout: 10_000 });
      await option.click();

      // Wait for any form refresh
      await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    } catch (error) {
      console.error(`Failed to fill and select Plan: ${planName}`);
      throw error;
    }
  }
}
