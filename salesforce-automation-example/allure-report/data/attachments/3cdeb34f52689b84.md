# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: opportunity/create-classic-rollover-opportunity-fund-account.spec.ts >> Opportunity - Create Classic Rollover with Fund Account Selection @smoke >> should create classic rollover opportunity with fund account selection @smoke
- Location: tests/opportunity/create-classic-rollover-opportunity-fund-account.spec.ts:62:7

# Error details

```
Error: locator.selectOption: Test ended.
Call log:
  - waiting for getByLabel('*Record Type of new record')

```

# Test source

```ts
  26  |     super(page, baseUrl || process.env.BASE_URL || '');
  27  |   }
  28  | 
  29  |   // ── Locators ──────────────────────────────────────────────────────────────
  30  | 
  31  |   private get opportunityNameInput() {
  32  |     return new ResilientLocator(this['page'], [
  33  |       (p) => p.getByRole('textbox', { name: '* Opportunity Name' }),
  34  |       (p) => p.locator('#opp3'),
  35  |       (p) => p.locator('input[name="opp3"]'),
  36  |     ]);
  37  |   }
  38  | 
  39  |   private get accountNameInput() {
  40  |     return new ResilientLocator(this['page'], [
  41  |       (p) => p.getByRole('textbox', { name: '* Account Name' }),
  42  |       (p) => p.locator('#opp4'),
  43  |       (p) => p.locator('input[name="opp4"]'),
  44  |     ]);
  45  |   }
  46  | 
  47  |   private get recordTypeSelect() {
  48  |     return new ResilientLocator(this['page'], [
  49  |       (p) => p.getByLabel('*Record Type of new record'),
  50  |       (p) => p.locator('select[name="p3"]'),
  51  |       (p) => p.locator('#p3'),
  52  |     ]);
  53  |   }
  54  | 
  55  |   private get continueButton() {
  56  |     return new ResilientLocator(this['page'], [
  57  |       (p) => p.getByRole('button', { name: 'Continue' }),
  58  |       (p) => p.locator('input[value="Continue"]'),
  59  |       (p) => p.locator('input[name="save"]').first(),
  60  |     ]);
  61  |   }
  62  | 
  63  |   private get newButton() {
  64  |     return new ResilientLocator(this['page'], [
  65  |       (p) => p.getByRole('button', { name: 'New' }),
  66  |       (p) => p.locator('input[value="New"]'),
  67  |       (p) => p.locator('input[name="new"]'),
  68  |     ]);
  69  |   }
  70  | 
  71  |   private get planLookupLink() {
  72  |     return new ResilientLocator(this['page'], [
  73  |       (p) => p.locator('a[title="Plan Lookup (New Window)"]'),
  74  |       (p) => p.getByRole('link', { name: 'Plan Lookup (New Window)' }),
  75  |       (p) => p.locator('a[href*="CF00NG000000Dwu6z"]'),
  76  |     ]);
  77  |   }
  78  | 
  79  |   private get stageSelect() {
  80  |     return new ResilientLocator(this['page'], [
  81  |       (p) => p.locator('select[id="opp11"]'),
  82  |       (p) => p.getByLabel('* Stage'),
  83  |       (p) => p.locator('select[name="opp11"]'),
  84  |     ]);
  85  |   }
  86  | 
  87  |   private get closeDateInput() {
  88  |     return new ResilientLocator(this['page'], [
  89  |       (p) => p.getByRole('textbox', { name: '* Close Date' }),
  90  |       (p) => p.locator('#opp9'),
  91  |       (p) => p.locator('input[name="opp9"]'),
  92  |     ]);
  93  |   }
  94  | 
  95  |   private get saveButton() {
  96  |     return new ResilientLocator(this['page'], [
  97  |       (p) => p.locator('input[name="save"]').first(),
  98  |       (p) => p.locator('td.pbButton input[value="Save"]').first(),
  99  |       (p) => p.locator('input[type="submit"][value="Save"]').first(),
  100 |     ]);
  101 |   }
  102 | 
  103 |   // ── Actions ───────────────────────────────────────────────────────────────
  104 | 
  105 |   /**
  106 |    * Clicks the "New" button on the Classic Opportunities list page.
  107 |    * Navigates to the record type selection page.
  108 |    */
  109 |   async clickNewOnClassicListPage(): Promise<void> {
  110 |     try {
  111 |       await this.newButton.getLocator().click();
  112 |       await this['page'].waitForLoadState('domcontentloaded');
  113 |     } catch (error) {
  114 |       console.error('Failed to click New button on Classic Opportunities list page');
  115 |       throw error;
  116 |     }
  117 |   }
  118 | 
  119 |   /**
  120 |    * Selects a record type by its Salesforce ID from the record type selection page
  121 |    * and clicks Continue to proceed to the creation form.
  122 |    * The dropdown option values are Salesforce record type IDs.
  123 |    */
  124 |   async selectRecordTypeAndContinue(recordTypeId: string): Promise<void> {
  125 |     try {
> 126 |       await this.recordTypeSelect.getLocator().selectOption(recordTypeId);
      |                                                ^ Error: locator.selectOption: Test ended.
  127 |       await this.continueButton.getLocator().click();
  128 |       await this['page'].waitForLoadState('domcontentloaded');
  129 |       await expect(this.opportunityNameInput.getLocator()).toBeVisible({ timeout: 20_000 });
  130 |     } catch (error) {
  131 |       console.error(`Failed to select record type ${recordTypeId} and continue`);
  132 |       throw error;
  133 |     }
  134 |   }
  135 | 
  136 |   /**
  137 |    * Navigate directly to the CLA Classic opportunity creation form.
  138 |    */
  139 |   async navigateToClassicCreateForm(): Promise<void> {
  140 |     try {
  141 |       await this['page'].goto(this.pageUrl, { timeout: 60_000, waitUntil: 'domcontentloaded' });
  142 |       await expect(this.opportunityNameInput.getLocator()).toBeVisible({ timeout: 20_000 });
  143 |     } catch (error) {
  144 |       console.error('Failed to navigate to Classic Opportunity create form');
  145 |       throw error;
  146 |     }
  147 |   }
  148 | 
  149 |   async fillOpportunityName(name: string): Promise<void> {
  150 |     try {
  151 |       await this.opportunityNameInput.getLocator().fill(name);
  152 |     } catch (error) {
  153 |       console.error(`Failed to fill Opportunity Name: ${name}`);
  154 |       throw error;
  155 |     }
  156 |   }
  157 | 
  158 |   /**
  159 |    * Fills the Account Name field directly (it is a plain text input, not readonly).
  160 |    */
  161 |   async fillAccountName(accountName: string): Promise<void> {
  162 |     try {
  163 |       await this.accountNameInput.getLocator().fill(accountName);
  164 |     } catch (error) {
  165 |       console.error(`Failed to fill Account Name: ${accountName}`);
  166 |       throw error;
  167 |     }
  168 |   }
  169 | 
  170 |   /**
  171 |    * The hidden Plan display field — populated by lookupPick after popup selection.
  172 |    * Note: This field has `display: none` but its value is set by the Classic lookup.
  173 |    */
  174 |   private get planHiddenInput() {
  175 |     return new ResilientLocator(this['page'], [
  176 |       (p) => p.locator('#CF00NG000000Dwu6z'),
  177 |       (p) => p.locator('input[name="CF00NG000000Dwu6z"]'),
  178 |       (p) => p.locator('input[readonly][name*="CF00NG"]'),
  179 |     ]);
  180 |   }
  181 | 
  182 |   /**
  183 |    * Clicks the "Plan Lookup (New Window)" link, waits for the popup window to open,
  184 |    * searches for the plan name, and selects the matching result from the popup.
  185 |    *
  186 |    * Classic lookup popups open as a new browser window/tab containing a frameset
  187 |    * with two named <frame> elements: "searchFrame" and "resultsFrame".
  188 |    * We access them using Playwright's `frameLocator('frame[name="..."]')`.
  189 |    *
  190 |    * After clicking the result, `window.opener.lookupPick(...)` is called which
  191 |    * sets the Plan field on the parent form. We verify the plan name is set on the
  192 |    * parent instead of waiting for the popup close event (which is unreliable).
  193 |    *
  194 |    * @param planName - The exact plan name to search for and select (e.g. "TestPlan_1775124181119")
  195 |    */
  196 |   async fillPlanLookupAndSelect(planName: string): Promise<void> {
  197 |     try {
  198 |       const popupPromise = this['page'].waitForEvent('popup');
  199 |       await this.planLookupLink.getLocator().click();
  200 |       const popupPage = await popupPromise;
  201 | 
  202 |       // The popup is a frameset with <frame name="searchFrame"> and <frame name="resultsFrame">
  203 |       const searchFrame = popupPage.frameLocator('frame[name="searchFrame"]');
  204 |       const resultsFrame = popupPage.frameLocator('frame[name="resultsFrame"]');
  205 | 
  206 |       // Search for the plan name
  207 |       const searchInput = searchFrame.locator('input[name="lksrch"]');
  208 |       await expect(searchInput).toBeVisible({ timeout: 20_000 });
  209 |       await searchInput.fill(planName);
  210 |       await searchFrame.locator('input[name="go"]').click();
  211 | 
  212 |       // Wait for the result link to appear and click it
  213 |       const resultLink = resultsFrame.getByRole('link', { name: planName });
  214 |       await expect(resultLink).toBeVisible({ timeout: 15_000 });
  215 |       await resultLink.click();
  216 | 
  217 |       // After clicking, lookupPick() sets the Plan hidden input in the parent form.
  218 |       // We verify by checking the parent page's Plan input value is set.
  219 |       // Also wait for popup to close (best-effort, extended timeout).
  220 |       await Promise.race([
  221 |         popupPage.waitForEvent('close', { timeout: 30_000 }),
  222 |         // Fallback: wait just a moment, then verify the parent field is set
  223 |         new Promise((resolve) => setTimeout(resolve, 2000)),
  224 |       ]);
  225 | 
  226 |       // Verify the Plan field was populated on the parent form
```