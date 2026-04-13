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

Locator: getByRole('heading', { name: 'Rol - - TestEmployer_1774951248072' })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('heading', { name: 'Rol - - TestEmployer_1774951248072' })

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
              - button "Global Actions" [ref=e92] [cursor=pointer]:
                - generic [ref=e93]:
                  - img [ref=e97]
                  - tooltip "Global Actions"
            - listitem [ref=e100]:
              - button "Guidance Center" [ref=e102] [cursor=pointer]:
                - generic [ref=e103]:
                  - img [ref=e107]
                  - tooltip "Guidance Center"
            - listitem [ref=e110]:
              - button "Salesforce Help" [ref=e113] [cursor=pointer]:
                - generic [ref=e114]:
                  - img [ref=e118]
                  - tooltip "Salesforce Help"
            - listitem [ref=e121]:
              - button "Setup" [ref=e127] [cursor=pointer]:
                - generic [ref=e128]:
                  - img [ref=e132]
                  - tooltip "Setup"
            - listitem [ref=e135]:
              - button "Notifications" [ref=e138] [cursor=pointer]:
                - generic [ref=e139]:
                  - img [ref=e144]
                  - tooltip "Notifications"
            - listitem [ref=e148]:
              - button "View profile" [ref=e151] [cursor=pointer]:
                - generic [ref=e152]:
                  - tooltip "View profile"
    - generic [ref=e156]:
      - generic [ref=e159]:
        - generic [ref=e161]:
          - navigation "App" [ref=e162]:
            - button "App Launcher" [ref=e164] [cursor=pointer]:
              - generic [ref=e175]: App Launcher
          - heading "PFS" [level=1] [ref=e176]:
            - generic "PFS" [ref=e177]
        - navigation "Global" [ref=e180]:
          - list [ref=e181]:
            - listitem [ref=e182]:
              - link "Home" [ref=e183] [cursor=pointer]:
                - /url: /lightning/page/home
                - generic [ref=e184]: Home
            - listitem [ref=e185]:
              - link "Tasks" [ref=e186] [cursor=pointer]:
                - /url: /lightning/n/Tasks
                - generic [ref=e187]: Tasks
            - listitem [ref=e188]:
              - link "Leads" [ref=e189] [cursor=pointer]:
                - /url: /lightning/o/Lead/home
                - generic [ref=e190]: Leads
              - button "Leads List" [ref=e194] [cursor=pointer]:
                - img [ref=e198]
                - generic [ref=e201]: Leads List
            - listitem [ref=e202]:
              - link "Campaigns" [ref=e203] [cursor=pointer]:
                - /url: /lightning/o/Campaign/home
                - generic [ref=e204]: Campaigns
              - button "Campaigns List" [ref=e208] [cursor=pointer]:
                - img [ref=e212]
                - generic [ref=e215]: Campaigns List
            - listitem [ref=e216]:
              - link "Accounts" [ref=e217] [cursor=pointer]:
                - /url: /lightning/o/Account/home
                - generic [ref=e218]: Accounts
              - button "Accounts List" [ref=e222] [cursor=pointer]:
                - img [ref=e226]
                - generic [ref=e229]: Accounts List
            - listitem [ref=e230]:
              - link "Contacts" [ref=e231] [cursor=pointer]:
                - /url: /lightning/o/Contact/home
                - generic [ref=e232]: Contacts
              - button "Contacts List" [ref=e236] [cursor=pointer]:
                - img [ref=e240]
                - generic [ref=e243]: Contacts List
            - listitem [ref=e244]:
              - link "Opportunities" [ref=e245] [cursor=pointer]:
                - /url: /lightning/o/Opportunity/home
                - generic [ref=e246]: Opportunities
              - button "Opportunities List" [ref=e250] [cursor=pointer]:
                - img [ref=e254]
                - generic [ref=e257]: Opportunities List
            - listitem [ref=e258]:
              - link "Reports" [ref=e259] [cursor=pointer]:
                - /url: /lightning/o/Report/home
                - generic [ref=e260]: Reports
              - button "Reports List" [ref=e264] [cursor=pointer]:
                - img [ref=e268]
                - generic [ref=e271]: Reports List
            - listitem [ref=e272]:
              - link "Dashboards" [ref=e273] [cursor=pointer]:
                - /url: /lightning/o/Dashboard/home
                - generic [ref=e274]: Dashboards
              - button "Dashboards List" [ref=e278] [cursor=pointer]:
                - img [ref=e282]
                - generic [ref=e285]: Dashboards List
            - listitem [ref=e286]:
              - link "Thresholds" [ref=e287] [cursor=pointer]:
                - /url: /lightning/o/Threshold__c/home
                - generic [ref=e288]: Thresholds
              - button "Thresholds List" [ref=e292] [cursor=pointer]:
                - img [ref=e296]
                - generic [ref=e299]: Thresholds List
            - listitem [ref=e300]:
              - button "Help" [ref=e304] [cursor=pointer]:
                - img [ref=e306]
                - generic [ref=e309]: Help
      - main [ref=e311]:
        - iframe [ref=e320]:
          - generic [active] [ref=f17e1]:
            - img "Content Starts Here" [ref=f17e2] [cursor=pointer]
            - generic [ref=f17e9]:
              - banner [ref=f17e10]:
                - heading "Fund Account Selection" [level=2] [ref=f17e11]
              - generic [ref=f17e12]:
                - article [ref=f17e14]:
                  - generic [ref=f17e16]:
                    - img [ref=f17e21]
                    - heading "Information" [level=2] [ref=f17e25]:
                      - generic [ref=f17e26]: Information
                  - generic [ref=f17e29]:
                    - generic [ref=f17e31]:
                      - generic [ref=f17e38]:
                        - generic [ref=f17e39]: "*Fund Account"
                        - generic [ref=f17e44]:
                          - combobox "Fund Account" [ref=f17e47]
                          - generic:
                            - generic:
                              - generic:
                                - generic:
                                  - img
                        - status
                      - generic [ref=f17e50]:
                        - generic [ref=f17e51]: Opportunity
                        - link "Rol - - TestEmployer_1774951248072" [ref=f17e53] [cursor=pointer]:
                          - /url: /006dz00000E9GGn
                    - generic [ref=f17e55]:
                      - generic [ref=f17e61]:
                        - generic [ref=f17e62]: "*% of Investment"
                        - spinbutton "% of Investment" [ref=f17e64]
                      - generic [ref=f17e70]:
                        - generic [ref=f17e71]: "*IRAType"
                        - generic [ref=f17e75]:
                          - combobox "IRAType" [ref=f17e76] [cursor=pointer]:
                            - generic [ref=f17e77]: "--None--"
                          - generic:
                            - generic:
                              - generic:
                                - generic:
                                  - img
                        - status
                    - generic [ref=f17e79]:
                      - generic [ref=f17e83]:
                        - generic [ref=f17e84]: "*Fund Account Selection Type"
                        - generic [ref=f17e88]:
                          - combobox "Fund Account Selection Type" [ref=f17e89] [cursor=pointer]:
                            - generic [ref=f17e90]: Participant Selection
                          - generic:
                            - generic:
                              - generic:
                                - generic:
                                  - img
                        - status
                      - generic [ref=f17e95]:
                        - generic [ref=f17e96]: Fund Account Number Exists
                        - checkbox "Fund Account Number Exists" [ref=f17e98]
                    - generic [ref=f17e100]:
                      - generic [ref=f17e105]:
                        - generic [ref=f17e106]: Traditional Participant Selection Total
                        - textbox "Traditional Participant Selection Total" [disabled] [ref=f17e108]: "0"
                      - generic [ref=f17e114]:
                        - generic [ref=f17e115]: Fund Account Number
                        - textbox "Fund Account Number" [disabled] [ref=f17e117]
                    - generic [ref=f17e124]:
                      - generic [ref=f17e125]: Roth Participant Selection Total
                      - textbox "Roth Participant Selection Total" [disabled] [ref=f17e127]: "10"
                    - generic [ref=f17e128]:
                      - button "Save & Close" [ref=f17e130] [cursor=pointer]
                      - button "Save & New" [ref=f17e132] [cursor=pointer]
                      - button "Close" [ref=f17e134] [cursor=pointer]
                - article [ref=f17e137]:
                  - heading "Related Fund Account Selections" [level=2] [ref=f17e141]:
                    - generic [ref=f17e142]: Related Fund Account Selections
                  - table [ref=f17e146]:
                    - rowgroup [ref=f17e147]:
                      - row "Fund Account Opportunity Name % of Investment IRA Type Fund Account Selection Type" [ref=f17e148]:
                        - columnheader "Fund Account" [ref=f17e149]
                        - columnheader "Opportunity Name" [ref=f17e150]
                        - columnheader "% of Investment" [ref=f17e151]
                        - columnheader "IRA Type" [ref=f17e152]
                        - columnheader "Fund Account Selection Type" [ref=f17e153]
                    - rowgroup [ref=f17e154]:
                      - row "Test JHI IRA Fund Account Rol - - TestEmployer_1774951248072 10 Roth Participant Selection" [ref=f17e155]:
                        - cell "Test JHI IRA Fund Account" [ref=f17e156]:
                          - link "Test JHI IRA Fund Account" [ref=f17e157] [cursor=pointer]:
                            - /url: /a0Rdz00000270zpEAA
                            - generic [ref=f17e158]: Test JHI IRA Fund Account
                        - cell "Rol - - TestEmployer_1774951248072" [ref=f17e159]:
                          - generic [ref=f17e160]: Rol - - TestEmployer_1774951248072
                        - cell "10" [ref=f17e161]:
                          - generic [ref=f17e162]: "10"
                        - cell "Roth" [ref=f17e163]:
                          - generic [ref=f17e164]: Roth
                        - cell "Participant Selection" [ref=f17e165]:
                          - generic [ref=f17e166]: Participant Selection
            - iframe [ref=f17e167]:
              
  - generic:
    - status
```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';
  2  | import { BasePage, ResilientLocator } from 'playwright-custom-core';
  3  | 
  4  | export class OpportunityDetailPage extends BasePage {
  5  |   readonly pageName = 'OpportunityDetailPage';
  6  |   protected readonly relativeUrl = '/lightning/r/Opportunity';
  7  | 
  8  |   constructor(page: Page, baseUrl?: string) {
  9  |     super(page, baseUrl || process.env.BASE_URL || '');
  10 |   }
  11 | 
  12 |   // ── Locators ──────────────────────────────────────────────────────────────
  13 | 
  14 |   private get fundAccountActionsButton() {
  15 |     return new ResilientLocator(this['page'], [
  16 |       (p) => p.getByRole('article', { name: /Fund Account/i }).getByRole('button', { name: /Show actions/i }).first(),
  17 |       (p) => p.locator('[data-target-selection-name*="FundAccount"] button[aria-haspopup]').first(),
  18 |       (p) => p.locator('article').filter({ hasText: /Fund Account/i }).locator('button[aria-haspopup]').first(),
  19 |     ]);
  20 |   }
  21 | 
  22 |   private get newFundAccountSelectionMenuItem() {
  23 |     return new ResilientLocator(this['page'], [
  24 |       (p) => p.getByRole('menuitem', { name: /New Fund Account Selection/i }),
  25 |       (p) => p.getByRole('option', { name: /New Fund Account Selection/i }),
  26 |       (p) => p.locator('a[title="New Fund Account Selection"]'),
  27 |     ]);
  28 |   }
  29 | 
  30 |   // ── Actions ───────────────────────────────────────────────────────────────
  31 | 
  32 |   async clickFundAccountActionsButton(): Promise<void> {
  33 |     try {
  34 |       await this.fundAccountActionsButton.getLocator().click();
  35 |     } catch (error) {
  36 |       console.error('Failed to click Fund Account actions button');
  37 |       throw error;
  38 |     }
  39 |   }
  40 | 
  41 |   async clickNewFundAccountSelectionMenuItem(): Promise<void> {
  42 |     try {
  43 |       await expect(this.newFundAccountSelectionMenuItem.getLocator()).toBeVisible({ timeout: 10_000 });
  44 |       await this.newFundAccountSelectionMenuItem.getLocator().click();
  45 |       await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
  46 |     } catch (error) {
  47 |       console.error('Failed to click New Fund Account Selection menu item');
  48 |       throw error;
  49 |     }
  50 |   }
  51 | 
  52 |   // ── Verification ──────────────────────────────────────────────────────────
  53 | 
  54 |   async verifyOpportunityName(expectedName: string): Promise<void> {
  55 |     try {
  56 |       const heading = this['page'].getByRole('heading', { name: `Opportunity ${expectedName}`, exact: true });
  57 |       await expect(heading).toBeVisible({ timeout: 15_000 });
  58 |     } catch (error) {
  59 |       console.error(`Failed to verify opportunity name: ${expectedName}`);
  60 |       throw error;
  61 |     }
  62 |   }
  63 | 
  64 |   async verifyCloseDate(expectedDate: string): Promise<void> {
  65 |     try {
  66 |       const closeDateValue = this['page'].getByText(expectedDate, { exact: true });
  67 |       await expect(closeDateValue).toBeVisible({ timeout: 15_000 });
  68 |     } catch (error) {
  69 |       console.error(`Failed to verify close date: ${expectedDate}`);
  70 |       throw error;
  71 |     }
  72 |   }
  73 | 
  74 |   async verifyDetailPageVisible(opportunityName: string): Promise<void> {
  75 |     try {
  76 |       // Salesforce Lightning heading includes the object type prefix
  77 |       // e.g. "Opportunity Rol - - TestEmployer_xxx" — so never use exact: true.
  78 |       const title = new ResilientLocator(this['page'], [
  79 |         (p) => p.getByRole('heading', { name: opportunityName }),
  80 |         (p) => p.locator('h1').filter({ hasText: opportunityName }),
  81 |         (p) => p.locator('.slds-page-header__title').filter({ hasText: opportunityName }),
  82 |       ]);
> 83 |       await expect(title.getLocator()).toBeVisible({ timeout: 15_000 });
     |                                        ^ Error: expect(locator).toBeVisible() failed
  84 |     } catch (error) {
  85 |       console.error(`Failed to verify opportunity detail page for: ${opportunityName}`);
  86 |       throw error;
  87 |     }
  88 |   }
  89 | }
  90 | 
```