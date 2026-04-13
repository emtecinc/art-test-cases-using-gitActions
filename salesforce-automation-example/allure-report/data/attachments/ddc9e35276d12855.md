# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: opportunity/create-cla-classic-opportunity-fund-account-selection.spec.ts >> Opportunity - Create CLA Classic with Fund Account Selection @smoke >> should create CLA Classic opportunity with fund account selection @smoke
- Location: tests/opportunity/create-cla-classic-opportunity-fund-account-selection.spec.ts:61:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('iframe[name^="vfFrameId"]').last().contentFrame().getByRole('combobox', { name: 'Fund Account', exact: true })
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for locator('iframe[name^="vfFrameId"]').last().contentFrame().getByRole('combobox', { name: 'Fund Account', exact: true })

```

# Page snapshot

```yaml
- generic [active]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link "Skip to Navigation" [ref=e4] [cursor=pointer]:
        - /url: javascript:void(0);
      - link "Skip to Main Content" [ref=e5] [cursor=pointer]:
        - /url: javascript:void(0);
      - generic [ref=e9]:
        - generic [ref=e13]:
          - button "Toggle Panel" [ref=e17] [cursor=pointer]:
            - img [ref=e21]
            - generic [ref=e24]: Menu
          - generic [ref=e29]:
            - img [ref=e33]
            - generic [ref=e37]: Sandbox (DEVLM2)
        - button "Show menu" [ref=e46] [cursor=pointer]:
          - img [ref=e48]
          - generic [ref=e51]: Show menu
      - generic [ref=e52]:
        - button "Search" [ref=e58]:
          - img [ref=e60]
          - text: Search...
        - navigation "Global Header" [ref=e63]:
          - list [ref=e65]:
            - listitem [ref=e66]:
              - group [ref=e67]:
                - button "This item doesn't support favorites" [ref=e69] [cursor=pointer]:
                  - generic [ref=e70]:
                    - img [ref=e74]
                    - tooltip "This item doesn't support favorites"
                - button "Favorites list" [ref=e78] [cursor=pointer]:
                  - generic [ref=e79]:
                    - img [ref=e83]
                    - tooltip "Favorites list"
            - listitem [ref=e86]:
              - button "Global Actions" [ref=e88]:
                - img [ref=e92]
            - listitem [ref=e95]:
              - button "Salesforce Help" [ref=e98] [cursor=pointer]:
                - generic [ref=e99]:
                  - img [ref=e103]
                  - tooltip "Salesforce Help"
            - listitem [ref=e106]:
              - button "Setup" [ref=e112] [cursor=pointer]:
                - generic [ref=e113]:
                  - img [ref=e117]
                  - tooltip "Setup"
            - listitem [ref=e120]:
              - button "Notifications" [ref=e123] [cursor=pointer]:
                - generic [ref=e124]:
                  - img [ref=e129]
                  - tooltip "Notifications"
            - listitem [ref=e133]:
              - button "View profile" [ref=e136] [cursor=pointer]:
                - generic [ref=e137]:
                  - tooltip "View profile"
    - generic [ref=e141]:
      - generic [ref=e144]:
        - generic [ref=e146]:
          - navigation "App" [ref=e147]:
            - button "App Launcher" [ref=e149] [cursor=pointer]:
              - generic [ref=e160]: App Launcher
          - heading "PFS" [level=1] [ref=e161]:
            - generic "PFS" [ref=e162]
        - navigation "Global" [ref=e165]:
          - list [ref=e166]:
            - listitem [ref=e167]:
              - link "Home" [ref=e168] [cursor=pointer]:
                - /url: /lightning/page/home
                - generic [ref=e169]: Home
            - listitem [ref=e170]:
              - link "Tasks" [ref=e171] [cursor=pointer]:
                - /url: /lightning/n/Tasks
                - generic [ref=e172]: Tasks
            - listitem [ref=e173]:
              - link "Leads" [ref=e174] [cursor=pointer]:
                - /url: /lightning/o/Lead/home
                - generic [ref=e175]: Leads
              - button "Leads List" [ref=e179] [cursor=pointer]:
                - img [ref=e183]
                - generic [ref=e186]: Leads List
            - listitem [ref=e187]:
              - link "Campaigns" [ref=e188] [cursor=pointer]:
                - /url: /lightning/o/Campaign/home
                - generic [ref=e189]: Campaigns
              - button "Campaigns List" [ref=e193] [cursor=pointer]:
                - img [ref=e197]
                - generic [ref=e200]: Campaigns List
            - listitem [ref=e201]:
              - link "Accounts" [ref=e202] [cursor=pointer]:
                - /url: /lightning/o/Account/home
                - generic [ref=e203]: Accounts
              - button "Accounts List" [ref=e207] [cursor=pointer]:
                - img [ref=e211]
                - generic [ref=e214]: Accounts List
            - listitem [ref=e215]:
              - link "Contacts" [ref=e216] [cursor=pointer]:
                - /url: /lightning/o/Contact/home
                - generic [ref=e217]: Contacts
              - button "Contacts List" [ref=e221] [cursor=pointer]:
                - img [ref=e225]
                - generic [ref=e228]: Contacts List
            - listitem [ref=e229]:
              - link "Opportunities" [ref=e230] [cursor=pointer]:
                - /url: /lightning/o/Opportunity/home
                - generic [ref=e231]: Opportunities
              - button "Opportunities List" [ref=e235] [cursor=pointer]:
                - img [ref=e239]
                - generic [ref=e242]: Opportunities List
            - listitem [ref=e243]:
              - link "Reports" [ref=e244] [cursor=pointer]:
                - /url: /lightning/o/Report/home
                - generic [ref=e245]: Reports
              - button "Reports List" [ref=e249] [cursor=pointer]:
                - img [ref=e253]
                - generic [ref=e256]: Reports List
            - listitem [ref=e257]:
              - link "Dashboards" [ref=e258] [cursor=pointer]:
                - /url: /lightning/o/Dashboard/home
                - generic [ref=e259]: Dashboards
              - button "Dashboards List" [ref=e263] [cursor=pointer]:
                - img [ref=e267]
                - generic [ref=e270]: Dashboards List
            - listitem [ref=e271]:
              - link "Thresholds" [ref=e272] [cursor=pointer]:
                - /url: /lightning/o/Threshold__c/home
                - generic [ref=e273]: Thresholds
              - button "Thresholds List" [ref=e277] [cursor=pointer]:
                - img [ref=e281]
                - generic [ref=e284]: Thresholds List
            - listitem [ref=e285]:
              - button "Help" [ref=e289] [cursor=pointer]:
                - img [ref=e291]
                - generic [ref=e294]: Help
      - main [ref=e296]:
        - iframe [ref=e305]:
          - generic [active] [ref=f14e1]:
            - img "Content Starts Here" [ref=f14e2] [cursor=pointer]
            - generic [ref=f14e9]:
              - banner [ref=f14e10]:
                - heading "Fund Account Selection" [level=2] [ref=f14e11]
              - generic [ref=f14e12]:
                - article [ref=f14e14]:
                  - generic [ref=f14e16]:
                    - img [ref=f14e21]
                    - heading "Information" [level=2] [ref=f14e23]:
                      - generic [ref=f14e24]: Information
                  - generic [ref=f14e27]:
                    - generic [ref=f14e29]:
                      - generic [ref=f14e35]:
                        - generic [ref=f14e36]: Fund Account
                        - generic [ref=f14e41]:
                          - combobox "Fund Account" [disabled] [ref=f14e44]
                          - generic:
                            - generic:
                              - generic:
                                - generic:
                                  - img
                        - status
                        - alert [ref=f14e45]: This field can't load because of a configuration problem. Ask your Salesforce admin for help.
                      - generic [ref=f14e48]:
                        - generic [ref=f14e49]: Opportunity
                        - generic:
                          - link:
                            - /url: /006dz00000EDo78
                    - generic [ref=f14e63]:
                      - generic [ref=f14e64]: "*Fund Account Selection Type"
                      - generic [ref=f14e68]:
                        - combobox "Fund Account Selection Type" [ref=f14e69] [cursor=pointer]:
                          - generic [ref=f14e70]: Participant Selection
                        - generic:
                          - generic:
                            - generic:
                              - generic:
                                - img
                      - status
                    - generic [ref=f14e80]:
                      - generic [ref=f14e81]: Traditional Participant Selection Total
                      - textbox "Traditional Participant Selection Total" [disabled] [ref=f14e83]
                    - generic [ref=f14e93]:
                      - generic [ref=f14e94]: Roth Participant Selection Total
                      - textbox "Roth Participant Selection Total" [disabled] [ref=f14e96]
                    - generic [ref=f14e97]:
                      - button "Save & Close" [ref=f14e99] [cursor=pointer]
                      - button "Save & New" [ref=f14e101] [cursor=pointer]
                      - button "Close" [ref=f14e103] [cursor=pointer]
                - article [ref=f14e106]:
                  - heading "Related Fund Account Selections" [level=2] [ref=f14e110]:
                    - generic [ref=f14e111]: Related Fund Account Selections
                  - table [ref=f14e115]:
                    - rowgroup [ref=f14e116]:
                      - row "Fund Account Opportunity Name % of Investment IRA Type Fund Account Selection Type" [ref=f14e117]:
                        - columnheader "Fund Account" [ref=f14e118]
                        - columnheader "Opportunity Name" [ref=f14e119]
                        - columnheader "% of Investment" [ref=f14e120]
                        - columnheader "IRA Type" [ref=f14e121]
                        - columnheader "Fund Account Selection Type" [ref=f14e122]
                    - rowgroup
            - iframe [ref=f14e123]:
              
  - generic:
    - status
```

# Test source

```ts
  1   | import { Page, expect } from '@playwright/test';
  2   | import { BasePage, ResilientLocator } from 'playwright-custom-core';
  3   | 
  4   | /**
  5   |  * Page Object for the Fund Account Selection Visualforce iframe form.
  6   |  *
  7   |  * The form lives inside a cross-origin Visualforce iframe whose name attribute
  8   |  * starts with "vfFrameId" followed by a dynamic timestamp. Multiple VF iframes
  9   |  * may be present on the page; the form frame is the one with height="600px".
  10  |  * All locators are scoped to the iframe's content frame.
  11  |  */
  12  | export class FundAccountSelectionPage extends BasePage {
  13  |   readonly pageName = 'FundAccountSelectionPage';
  14  |   protected readonly relativeUrl = '';
  15  | 
  16  |   constructor(page: Page, baseUrl?: string) {
  17  |     super(page, baseUrl || process.env.BASE_URL || '');
  18  |   }
  19  | 
  20  |   // ── Frame access ──────────────────────────────────────────────────────────
  21  | 
  22  |   /**
  23  |    * Returns a FrameLocator for the VF iframe content.
  24  |    *
  25  |    * Salesforce VF iframes have **empty `src` attributes** — the content is
  26  |    * loaded via JavaScript, so `iframe[src*="vf.force.com"]` never matches.
  27  |    * Instead we target by `name^="vfFrameId"` (stable Salesforce convention).
  28  |    *
  29  |    * After clicking "New Fund Account Selection", Lightning keeps the previous
  30  |    * detail page's VF iframe in the DOM (hidden). The form iframe is the
  31  |    * last matching element, so we use `.last()`.
  32  |    */
  33  |   private vfFrame(p: Page) {
  34  |     return p.locator('iframe[name^="vfFrameId"]').last().contentFrame();
  35  |   }
  36  | 
  37  |   /** Shorthand for the current page's VF frame. */
  38  |   private get frame() {
  39  |     return this.vfFrame(this['page']);
  40  |   }
  41  | 
  42  |   // ── Locators ──────────────────────────────────────────────────────────────
  43  | 
  44  |   private get fundAccountCombobox() {
  45  |     return new ResilientLocator(this['page'], [
  46  |       (p) => this.vfFrame(p).getByRole('combobox', { name: 'Fund Account', exact: true }),
  47  |       (p) => this.vfFrame(p).getByLabel('Fund Account', { exact: true }),
  48  |       (p) => this.vfFrame(p).locator('input[placeholder*="Search Fund"]'),
  49  |     ]);
  50  |   }
  51  | 
  52  |   private get percentOfInvestmentInput() {
  53  |     return new ResilientLocator(this['page'], [
  54  |       (p) => this.vfFrame(p).getByRole('spinbutton', { name: '% of Investment' }),
  55  |       (p) => this.vfFrame(p).getByLabel('% of Investment'),
  56  |       (p) => this.vfFrame(p).locator('input[type="number"]').first(),
  57  |     ]);
  58  |   }
  59  | 
  60  |   private get iraTypeCombobox() {
  61  |     return new ResilientLocator(this['page'], [
  62  |       (p) => this.vfFrame(p).getByRole('combobox', { name: 'IRAType' }),
  63  |       (p) => this.vfFrame(p).getByLabel('IRAType'),
  64  |       (p) => this.vfFrame(p).locator('[name="IRAType__c"]'),
  65  |     ]);
  66  |   }
  67  | 
  68  |   private get fundAccountSelectionTypeCombobox() {
  69  |     return new ResilientLocator(this['page'], [
  70  |       (p) => this.vfFrame(p).getByRole('combobox', { name: 'Fund Account Selection Type' }),
  71  |       (p) => this.vfFrame(p).getByLabel('Fund Account Selection Type'),
  72  |       (p) => this.vfFrame(p).locator('[name*="FundAccountSelectionType"]'),
  73  |     ]);
  74  |   }
  75  | 
  76  |   private get saveAndCloseButton() {
  77  |     return new ResilientLocator(this['page'], [
  78  |       (p) => this.vfFrame(p).getByRole('button', { name: 'Save & Close' }),
  79  |       (p) => this.vfFrame(p).locator('button').filter({ hasText: /Save & Close/i }),
  80  |       (p) => this.vfFrame(p).locator('input[value="Save & Close"]'),
  81  |     ]);
  82  |   }
  83  | 
  84  |   // ── Actions ───────────────────────────────────────────────────────────────
  85  | 
  86  |   async waitForIframeVisible(): Promise<void> {
  87  |     try {
  88  |       // First wait for the VF iframe element itself to appear in the DOM
  89  |       const iframeLocator = this['page'].locator('iframe[name^="vfFrameId"]').last();
  90  |       await expect(iframeLocator).toBeVisible({ timeout: 30_000 });
  91  | 
  92  |       // Then wait for the Fund Account combobox inside the frame
> 93  |       await expect(this.fundAccountCombobox.getLocator()).toBeVisible({ timeout: 30_000 });
      |                                                           ^ Error: expect(locator).toBeVisible() failed
  94  |     } catch (error) {
  95  |       console.error('Fund Account Selection iframe did not become visible');
  96  |       throw error;
  97  |     }
  98  |   }
  99  | 
  100 |   /**
  101 |    * Types the search text into the Fund Account combobox and selects the matching option.
  102 |    * Uses pressSequentially because the lookup requires character-by-character input to trigger suggestions.
  103 |    */
  104 |   async fillFundAccountAndSelect(searchText: string, optionName: string): Promise<void> {
  105 |     try {
  106 |       const combobox = this.fundAccountCombobox.getLocator();
  107 |       await combobox.click();
  108 |       await combobox.pressSequentially(searchText, { delay: 80 });
  109 |       const option = this.frame.getByRole('option', { name: optionName });
  110 |       await expect(option).toBeVisible({ timeout: 15_000 });
  111 |       await option.click();
  112 |     } catch (error) {
  113 |       console.error(`Failed to fill Fund Account with: ${searchText} and select: ${optionName}`);
  114 |       throw error;
  115 |     }
  116 |   }
  117 | 
  118 |   /**
  119 |    * Fills the % of Investment numeric field.
  120 |    */
  121 |   async fillPercentOfInvestment(value: string): Promise<void> {
  122 |     try {
  123 |       await this.percentOfInvestmentInput.getLocator().fill(value);
  124 |     } catch (error) {
  125 |       console.error(`Failed to fill % of Investment with: ${value}`);
  126 |       throw error;
  127 |     }
  128 |   }
  129 | 
  130 |   /**
  131 |    * Selects the IRAType option from the Lightning combobox.
  132 |    * The IRAType field is a Lightning combobox button — click to open, then click the option.
  133 |    */
  134 |   async selectIraType(value: string): Promise<void> {
  135 |     const combobox = this.iraTypeCombobox.getLocator();
  136 |     const option = this.frame.getByRole('option', { name: value, exact: true });
  137 | 
  138 |     for (let attempt = 0; attempt < 3; attempt++) {
  139 |       try {
  140 |         await combobox.click({ timeout: 10_000 });
  141 |         await expect(option).toBeVisible({ timeout: 5_000 });
  142 |         await option.click();
  143 |         return;
  144 |       } catch { /* Dropdown closed — retry */ }
  145 |     }
  146 |     await combobox.click({ timeout: 10_000 });
  147 |     await expect(option).toBeVisible({ timeout: 5_000 });
  148 |     await option.click();
  149 |   }
  150 | 
  151 |   /**
  152 |    * Selects the Fund Account Selection Type option from the Lightning combobox.
  153 |    */
  154 |   async selectFundAccountSelectionType(value: string): Promise<void> {
  155 |     const combobox = this.fundAccountSelectionTypeCombobox.getLocator();
  156 |     const option = this.frame.getByRole('option', { name: value, exact: true });
  157 | 
  158 |     for (let attempt = 0; attempt < 3; attempt++) {
  159 |       try {
  160 |         await combobox.click({ timeout: 10_000 });
  161 |         await expect(option).toBeVisible({ timeout: 5_000 });
  162 |         await option.click();
  163 |         return;
  164 |       } catch { /* Dropdown closed — retry */ }
  165 |     }
  166 |     await combobox.click({ timeout: 10_000 });
  167 |     await expect(option).toBeVisible({ timeout: 5_000 });
  168 |     await option.click();
  169 |   }
  170 | 
  171 |   /**
  172 |    * Clicks the "Save & Close" button, which saves the Fund Account Selection
  173 |    * and navigates back to the parent Opportunity detail page.
  174 |    */
  175 |   async clickSaveAndClose(): Promise<void> {
  176 |     try {
  177 |       await this.saveAndCloseButton.getLocator().click();
  178 |     } catch (error) {
  179 |       console.error('Failed to click Save & Close on Fund Account Selection form');
  180 |       throw error;
  181 |     }
  182 |   }
  183 | 
  184 |   // ── Verification ──────────────────────────────────────────────────────────
  185 | 
  186 |   /**
  187 |    * Verifies the Fund Account Selection form heading is visible in the iframe.
  188 |    */
  189 |   async verifyFormVisible(): Promise<void> {
  190 |     try {
  191 |       const heading = this.frame.getByRole('heading', { name: 'Fund Account Selection', exact: true });
  192 |       await expect(heading).toBeVisible({ timeout: 20_000 });
  193 |     } catch (error) {
```