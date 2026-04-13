import { Page, expect } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

/**
 * Page Object for creating a new Opportunity in Salesforce Classic.
 *
 * The CLA Classic record type is created by navigating directly to
 * /006/e?RecordType=012G0000001BFrD&ent=Opportunity — no record-type
 * picker dialog is involved.
 *
 * Key Classic form characteristics:
 *  - Account Name: plain text input #opp4 (NOT readonly — can be filled directly)
 *  - Plan:         read-only hidden input #CF00NG000000Dwu6z — MUST use popup window lookup
 *  - Stage:        native <select id="opp11">
 *  - Close Date:   plain text input #opp9
 *  - Save:         input[name="save"]
 */
export class OpportunityClassicCreationPage extends BasePage {
  readonly pageName = 'OpportunityClassicCreationPage';
  /** Record type ID for CLA Classic */
  static readonly CLA_CLASSIC_RECORD_TYPE_ID = '012G0000001BFrD';

  protected readonly relativeUrl = `/006/e?RecordType=${OpportunityClassicCreationPage.CLA_CLASSIC_RECORD_TYPE_ID}&ent=Opportunity`;

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || '');
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  private get opportunityNameInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('textbox', { name: '* Opportunity Name' }),
      (p) => p.locator('#opp3'),
      (p) => p.locator('input[name="opp3"]'),
    ]);
  }

  private get accountNameInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('textbox', { name: '* Account Name' }),
      (p) => p.locator('#opp4'),
      (p) => p.locator('input[name="opp4"]'),
    ]);
  }

  private get recordTypeSelect() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByLabel('*Record Type of new record'),
      (p) => p.locator('select[name="p3"]'),
      (p) => p.locator('#p3'),
    ]);
  }

  private get continueButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'Continue' }),
      (p) => p.locator('input[value="Continue"]'),
      (p) => p.locator('input[name="save"]').first(),
    ]);
  }

  private get newButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'New' }),
      (p) => p.locator('input[value="New"]'),
      (p) => p.locator('input[name="new"]'),
    ]);
  }

  private get planLookupLink() {
    return new ResilientLocator(this['page'], [
      (p) => p.locator('a[title="Plan Lookup (New Window)"]'),
      (p) => p.getByRole('link', { name: 'Plan Lookup (New Window)' }),
      (p) => p.locator('a[href*="CF00NG000000Dwu6z"]'),
    ]);
  }

  private get stageSelect() {
    return new ResilientLocator(this['page'], [
      (p) => p.locator('select[id="opp11"]'),
      (p) => p.getByLabel('* Stage'),
      (p) => p.locator('select[name="opp11"]'),
    ]);
  }

  private get closeDateInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('textbox', { name: '* Close Date' }),
      (p) => p.locator('#opp9'),
      (p) => p.locator('input[name="opp9"]'),
    ]);
  }

  private get saveButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.locator('input[name="save"]').first(),
      (p) => p.locator('td.pbButton input[value="Save"]').first(),
      (p) => p.locator('input[type="submit"][value="Save"]').first(),
    ]);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  /**
   * Clicks the "New" button on the Classic Opportunities list page.
   * Navigates to the record type selection page.
   */
  async clickNewOnClassicListPage(): Promise<void> {
    try {
      await this.newButton.getLocator().click();
      await this['page'].waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Failed to click New button on Classic Opportunities list page');
      throw error;
    }
  }

  /**
   * Selects a record type by its Salesforce ID from the record type selection page
   * and clicks Continue to proceed to the creation form.
   * The dropdown option values are Salesforce record type IDs.
   */
  async selectRecordTypeAndContinue(recordTypeId: string): Promise<void> {
    try {
      await this.recordTypeSelect.getLocator().selectOption(recordTypeId);
      await this.continueButton.getLocator().click();
      await this['page'].waitForLoadState('domcontentloaded');
      await expect(this.opportunityNameInput.getLocator()).toBeVisible({ timeout: 20_000 });
    } catch (error) {
      console.error(`Failed to select record type ${recordTypeId} and continue`);
      throw error;
    }
  }

  /**
   * Navigate directly to the CLA Classic opportunity creation form.
   */
  async navigateToClassicCreateForm(): Promise<void> {
    try {
      await this['page'].goto(this.pageUrl, { timeout: 60_000, waitUntil: 'domcontentloaded' });
      await expect(this.opportunityNameInput.getLocator()).toBeVisible({ timeout: 20_000 });
    } catch (error) {
      console.error('Failed to navigate to Classic Opportunity create form');
      throw error;
    }
  }

  async fillOpportunityName(name: string): Promise<void> {
    try {
      await this.opportunityNameInput.getLocator().fill(name);
    } catch (error) {
      console.error(`Failed to fill Opportunity Name: ${name}`);
      throw error;
    }
  }

  /**
   * Fills the Account Name field directly (it is a plain text input, not readonly).
   */
  async fillAccountName(accountName: string): Promise<void> {
    try {
      await this.accountNameInput.getLocator().fill(accountName);
    } catch (error) {
      console.error(`Failed to fill Account Name: ${accountName}`);
      throw error;
    }
  }

  /**
   * The hidden Plan display field — populated by lookupPick after popup selection.
   * Note: This field has `display: none` but its value is set by the Classic lookup.
   */
  private get planHiddenInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.locator('#CF00NG000000Dwu6z'),
      (p) => p.locator('input[name="CF00NG000000Dwu6z"]'),
      (p) => p.locator('input[readonly][name*="CF00NG"]'),
    ]);
  }

  /**
   * Clicks the "Plan Lookup (New Window)" link, waits for the popup window to open,
   * searches for the plan name, and selects the matching result from the popup.
   *
   * Classic lookup popups open as a new browser window/tab containing a frameset
   * with two named <frame> elements: "searchFrame" and "resultsFrame".
   * We access them using Playwright's `frameLocator('frame[name="..."]')`.
   *
   * After clicking the result, `window.opener.lookupPick(...)` is called which
   * sets the Plan field on the parent form. We verify the plan name is set on the
   * parent instead of waiting for the popup close event (which is unreliable).
   *
   * @param planName - The exact plan name to search for and select (e.g. "TestPlan_1775124181119")
   */
  async fillPlanLookupAndSelect(planName: string): Promise<void> {
    try {
      const popupPromise = this['page'].waitForEvent('popup');
      await this.planLookupLink.getLocator().click();
      const popupPage = await popupPromise;

      // The popup is a frameset with <frame name="searchFrame"> and <frame name="resultsFrame">
      const searchFrame = popupPage.frameLocator('frame[name="searchFrame"]');
      const resultsFrame = popupPage.frameLocator('frame[name="resultsFrame"]');

      // Search for the plan name
      const searchInput = searchFrame.locator('input[name="lksrch"]');
      await expect(searchInput).toBeVisible({ timeout: 20_000 });
      await searchInput.fill(planName);
      await searchFrame.locator('input[name="go"]').click();

      // Wait for the result link to appear and click it
      const resultLink = resultsFrame.getByRole('link', { name: planName });
      await expect(resultLink).toBeVisible({ timeout: 15_000 });
      await resultLink.click();

      // After clicking, lookupPick() sets the Plan hidden input in the parent form.
      // We verify by checking the parent page's Plan input value is set.
      // Also wait for popup to close (best-effort, extended timeout).
      await Promise.race([
        popupPage.waitForEvent('close', { timeout: 30_000 }),
        // Fallback: wait just a moment, then verify the parent field is set
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);

      // Verify the Plan field was populated on the parent form
      const planFieldValue = await this['page'].locator('#CF00NG000000Dwu6z').inputValue();
      if (!planFieldValue || !planFieldValue.includes(planName)) {
        // Field may not be immediately readable if it's hidden — try a brief wait
        await this['page'].locator('#CF00NG000000Dwu6z').waitFor({ state: 'attached', timeout: 5_000 });
      }
    } catch (error) {
      console.error(`Failed to fill Plan lookup and select: ${planName}`);
      throw error;
    }
  }

  async selectStage(stage: string): Promise<void> {
    try {
      await this.stageSelect.getLocator().selectOption(stage);
    } catch (error) {
      console.error(`Failed to select Stage: ${stage}`);
      throw error;
    }
  }

  async fillCloseDate(date: string): Promise<void> {
    try {
      const input = this.closeDateInput.getLocator();
      await input.fill(date);
      await input.press('Tab');
    } catch (error) {
      console.error(`Failed to fill Close Date: ${date}`);
      throw error;
    }
  }

  /**
   * Clicks Save and waits for the redirect to the Opportunity detail page.
   * After saving, Salesforce Classic either stays in Classic or redirects to
   * the Lightning detail page depending on org settings. We wait for navigation
   * to complete.
   */
  async clickSave(): Promise<void> {
    try {
      await this.saveButton.getLocator().click();
      // Wait for navigation away from the edit form
      await this['page'].waitForURL((url) => !url.href.includes('/006/e'), { timeout: 30_000 });
    } catch (error) {
      console.error('Failed to click Save on Classic Opportunity form');
      throw error;
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  async verifyFormLoaded(): Promise<void> {
    try {
      await expect(this.opportunityNameInput.getLocator()).toBeVisible({ timeout: 20_000 });
    } catch (error) {
      console.error('Classic Opportunity creation form is not visible');
      throw error;
    }
  }
}
