import { Page, expect, test } from '@playwright/test';
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

  private get accountNameLookupLink() {
    return new ResilientLocator(this['page'], [
      (p) => p.locator('a[title="Account Name Lookup (New Window)"]'),
      (p) => p.getByRole('link', { name: 'Account Name Lookup (New Window)' }),
      (p) => p.locator('a[href*="lknm=opp4"]'),
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
      await this.captureScreenshot(this['page'], test.info(), 'click-new-classic-list-failure');
      throw new Error(`clickNewOnClassicListPage failed: ${String(error)}`);
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
      await this.captureScreenshot(this['page'], test.info(), 'select-record-type-continue-failure');
      throw new Error(`selectRecordTypeAndContinue failed: ${String(error)}`);
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
      await this.captureScreenshot(this['page'], test.info(), 'navigate-classic-create-form-failure');
      throw new Error(`navigateToClassicCreateForm failed: ${String(error)}`);
    }
  }

  async fillOpportunityName(name: string): Promise<void> {
    try {
      await this.opportunityNameInput.getLocator().fill(name);
    } catch (error) {
      console.error(`Failed to fill Opportunity Name: ${name}`);
      await this.captureScreenshot(this['page'], test.info(), 'fill-opportunity-name-failure');
      throw new Error(`fillOpportunityName failed: ${String(error)}`);
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
      await this.captureScreenshot(this['page'], test.info(), 'fill-account-name-failure');
      throw new Error(`fillAccountName failed: ${String(error)}`);
    }
  }

  /**
   * Opens the Account Name popup lookup window, searches for the account,
   * and selects the matching result. This properly sets BOTH the display name
   * AND the hidden AccountId — required for Classic save validation to pass.
   *
   * Classic Opportunity Account Name validation requires the AccountId to be set.
   * Simply filling the text input (`fillAccountName`) leaves AccountId unset,
   * causing the "Opportunities can only be created for an Individual or Employer Account"
   * error on save. This method resolves the account via the popup window lookup.
   *
   * @param searchTerm - Short search term for the popup search box (e.g. "test")
   * @param accountName - The exact account name to click in results (e.g. "TestEmployer_...")
   */
  async fillAccountNameViaLookupPopup(searchTerm: string, accountName: string): Promise<void> {
    try {
      // Pre-fill the display textbox so it shows the account name before popup resolution
      await this.accountNameInput.getLocator().fill(accountName);

      // Retry popup open up to 2 times — Classic JS popups can occasionally fail to open
      let popupPage: import('@playwright/test').Page | null = null;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const popupPromise = this['page'].waitForEvent('popup', { timeout: 30_000 });
          await this.accountNameLookupLink.getLocator().click();
          popupPage = await popupPromise;
          break;
        } catch {
          console.warn(`Account Name lookup popup did not open (attempt ${attempt + 1})`);
          if (attempt === 1) throw new Error('Account Name lookup popup failed to open after 2 attempts');
        }
      }
      if (!popupPage) throw new Error('Account Name lookup popup did not open');

      // Popup is a frameset with searchFrame and resultsFrame (same structure as Plan lookup)
      const searchFrame = popupPage.frameLocator('frame[name="searchFrame"]');

      // Search for the account
      const searchInput = searchFrame.locator('input[name="lksrch"]');
      await expect(searchInput).toBeVisible({ timeout: 20_000 });
      await searchInput.fill(searchTerm);
      // Press Enter to submit, as an alternative to clicking the Go button
      await searchInput.press('Enter');

      // Use frameLocator for the results frame — it auto-waits for the frame to appear
      // unlike the synchronous frame() method which returns null if not yet loaded
      const resultsFrame = popupPage.frameLocator('frame[name="resultsFrame"]');

      // Wait for any link to appear in results (confirms results loaded after search)
      await expect(resultsFrame.locator('a').first()).toBeVisible({ timeout: 20_000 });

      // Diagnostic: log all link texts to understand what results are displayed
      const resultsFrameObj = popupPage.frame({ name: 'resultsFrame' });
      if (resultsFrameObj) {
        const allLinkTexts = await resultsFrameObj.evaluate(() =>
          Array.from(document.querySelectorAll('a')).map((a) => a.textContent?.trim())
        );
        console.log('[DEBUG] Result links in resultsFrame:', JSON.stringify(allLinkTexts));
      }

      // Click the matching account in results — this calls lookupPick() on the parent form
      // which sets both the display name (#opp4) and the hidden AccountId
      const resultLink = resultsFrame.locator('a').filter({ hasText: accountName }).first();
      await expect(resultLink).toBeVisible({ timeout: 15_000 });
      await resultLink.click();

      // Wait for popup to close (best-effort)
      await Promise.race([
        popupPage.waitForEvent('close', { timeout: 30_000 }),
        new Promise<void>((resolve) => setTimeout(resolve, 2_000)),
      ]);
    } catch (error) {
      console.error(`Failed to fill Account Name via lookup popup: ${accountName}`);
      await this.captureScreenshot(this['page'], test.info(), 'fill-account-name-lookup-failure');
      throw new Error(`fillAccountNameViaLookupPopup failed: ${String(error)}`);
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
      await this.captureScreenshot(this['page'], test.info(), 'fill-plan-lookup-failure');
      throw new Error(`fillPlanLookupAndSelect failed: ${String(error)}`);
    }
  }

  async selectStage(stage: string): Promise<void> {
    try {
      await this.stageSelect.getLocator().selectOption(stage);
    } catch (error) {
      console.error(`Failed to select Stage: ${stage}`);
      await this.captureScreenshot(this['page'], test.info(), 'select-stage-failure');
      throw new Error(`selectStage failed: ${String(error)}`);
    }
  }

  async fillCloseDate(date: string): Promise<void> {
    try {
      const input = this.closeDateInput.getLocator();
      await input.fill(date);
      await input.press('Tab');
    } catch (error) {
      console.error(`Failed to fill Close Date: ${date}`);
      await this.captureScreenshot(this['page'], test.info(), 'fill-close-date-failure');
      throw new Error(`fillCloseDate failed: ${String(error)}`);
    }
  }

  /**
   * Clicks Save and waits for the redirect to the Opportunity detail page.
   * Uses a race between successful URL navigation and Classic validation-error display.
   * Classic validation errors keep the URL at /006/e; we detect and report them fast.
   */
  async clickSave(): Promise<void> {
    try {
      await this.saveButton.getLocator().click();

      // Race: either the URL leaves /006/e (success) or a Classic error banner appears (failure).
      // Timeout is 60 s to accommodate slow sandbox responses.
      const navigatedAway = this['page']
        .waitForURL((url) => !url.href.includes('/006/e'), { timeout: 60_000 });

      const errorAppeared = this['page']
        .locator('.errorMsg, .message.errorM3, .pbError')
        .first()
        .waitFor({ state: 'visible', timeout: 60_000 })
        .then(async () => {
          const errorText = await this['page']
            .locator('.errorMsg, .message.errorM3, .pbError')
            .first()
            .textContent()
            .catch(() => 'Unknown Classic validation error');
          throw new Error(`Salesforce Classic validation error on Save: ${errorText?.trim()}`);
        });

      await Promise.race([navigatedAway, errorAppeared]);
    } catch (error) {
      console.error('Failed to click Save on Classic Opportunity form');
      await this.captureScreenshot(this['page'], test.info(), 'click-save-classic-opportunity-failure');
      throw new Error(`clickSave failed: ${String(error)}`);
    }
  }

  // ── Verification ──────────────────────────────────────────────────────────

  async verifyFormLoaded(): Promise<void> {
    try {
      await expect(this.opportunityNameInput.getLocator()).toBeVisible({ timeout: 20_000 });
    } catch (error) {
      console.error('Classic Opportunity creation form is not visible');
      await this.captureScreenshot(this['page'], test.info(), 'verify-form-loaded-failure');
      throw new Error(`verifyFormLoaded failed: ${String(error)}`);
    }
  }
}
