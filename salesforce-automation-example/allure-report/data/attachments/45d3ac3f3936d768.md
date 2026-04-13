# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: account/create-account-plan-customer-propensity-scores.spec.ts >> Account with Plan Customer - Propensity Scores @smoke >> should create account with plan customer and update propensity scores @smoke
- Location: tests/account/create-account-plan-customer-propensity-scores.spec.ts:61:7

# Error details

```
Error: Cannot extract record info from URL: https://jhancock--devlm2.sandbox.lightning.force.com/lightning/o/Account/new?recordTypeId=012G0000001BFsk&nooverride=true&inContextOfRef=1.eyJ0eXBlIjoic3RhbmRhcmRfX29iamVjdFBhZ2UiLCJhdHRyaWJ1dGVzIjp7Im9iamVjdEFwaU5hbWUiOiJBY2NvdW50IiwiYWN0aW9uTmFtZSI6Im5ldyJ9LCJzdGF0ZSI6eyJvcmlnaW5hbFVybCI6Imh0dHBzOi8vamhhbmNvY2stLWRldmxtMi0tYy5zYW5kYm94LnZmLmZvcmNlLmNvbS9hcGV4L3NlYXJjaEZpcnN0QWNjb3VudD9uYXZpZ2F0aW9uTG9jYXRpb249TElTVF9WSUVXJmxleGlTT2JqZWN0TmFtZT1BY2NvdW50JmxleGlBY3Rpb25OYW1lPW5ldyZzZmRjLm92ZXJyaWRlPTEmdmZSZXRVUkxJblNGWD0lMkYwMDElMkZvIiwiaW5Db250ZXh0T2ZSZWYiOiIxLmV5SjBlWEJsSWpvaWMzUmhibVJoY21SZlgyOWlhbVZqZEZCaFoyVWlMQ0poZEhSeWFXSjFkR1Z6SWpwN0ltOWlhbVZqZEVGd2FVNWhiV1VpT2lKQlkyTnZkVzUwSWl3aVlXTjBhVzl1VG1GdFpTSTZJbXhwYzNRaWZTd2ljM1JoZEdVaU9uc2labWxzZEdWeVRtRnRaU0k2SWw5ZlVtVmpaVzUwSW4xOSIsImNvdW50IjoiMSJ9fQ%3D%3D&count=1&backgroundContext=%2Flightning%2Fo%2FAccount%2Fnew%3ForiginalUrl%3Dhttps%253A%252F%252Fjhancock--devlm2--c.sandbox.vf.force.com%252Fapex%252FsearchFirstAccount%253FnavigationLocation%253DLIST_VIEW%2526lexiSObjectName%253DAccount%2526lexiActionName%253Dnew%2526sfdc.override%253D1%2526vfRetURLInSFX%253D%25252F001%25252Fo%26inContextOfRef%3D1.eyJ0eXBlIjoic3RhbmRhcmRfX29iamVjdFBhZ2UiLCJhdHRyaWJ1dGVzIjp7Im9iamVjdEFwaU5hbWUiOiJBY2NvdW50IiwiYWN0aW9uTmFtZSI6Imxpc3QifSwic3RhdGUiOnsiZmlsdGVyTmFtZSI6Il9fUmVjZW50In19%26count%3D1. Expected format: /lightning/r/<Object>/<RecordId>/view
```

# Page snapshot

```yaml
- generic:
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
                - button "Add favorite" [ref=e69] [cursor=pointer]:
                  - generic [ref=e70]:
                    - img [ref=e74]
                    - tooltip "Add favorite"
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
            - listitem [ref=e216] [cursor=pointer]:
              - link "Accounts" [ref=e217]:
                - /url: /lightning/o/Account/home
                - generic [ref=e218]: Accounts
              - button "Accounts List" [ref=e222]:
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
            - listitem [ref=e258] [cursor=pointer]:
              - link "Reports" [ref=e259]:
                - /url: /lightning/o/Report/home
                - generic [ref=e260]: Reports
              - button "Reports List" [ref=e264]:
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
        - generic [ref=e315]:
          - text: · · · · ·
          - generic [ref=e327]:
            - generic [ref=e336]:
              - generic [ref=e337]:
                - generic [ref=e338]:
                  - heading "Account TestFundAcct_1776064908047" [level=1] [ref=e348]:
                    - generic [ref=e350]: Account
                    - generic [ref=e351]: TestFundAcct_1776064908047
                  - button "View Account Hierarchy" [ref=e362] [cursor=pointer]:
                    - img [ref=e364]
                    - generic [ref=e367]: View Account Hierarchy
                - generic [ref=e371]:
                  - generic "Delete" [ref=e372]:
                    - button "Delete" [ref=e377] [cursor=pointer]
                  - generic "View Relationship Map" [ref=e378]:
                    - button "View Relationship Map" [ref=e383] [cursor=pointer]
                  - generic "Edit Labels" [ref=e384]:
                    - button "Edit Labels" [ref=e389] [cursor=pointer]
                  - button "Show more actions" [ref=e391] [cursor=pointer]:
                    - img [ref=e393]
                    - generic [ref=e396]: Show more actions
              - generic [ref=e397]:
                - generic [ref=e399]:
                  - paragraph [ref=e400]: Type
                  - paragraph
                - generic [ref=e402]:
                  - paragraph [ref=e403]: Phone
                  - paragraph
                - generic [ref=e405]:
                  - paragraph [ref=e406]: Website
                  - paragraph
                - generic [ref=e408]:
                  - paragraph [ref=e409]: Account Owner
                  - paragraph [ref=e410]:
                    - generic [ref=e413]:
                      - generic [ref=e420]:
                        - link "Somya Sijaria" [ref=e421] [cursor=pointer]:
                          - /url: /lightning/r/User/005dz00000BSn13AAD/view
                          - generic [ref=e425]: Somya Sijaria
                        - button "Open Somya Sijaria Preview" [ref=e427] [cursor=pointer]:
                          - img [ref=e429]
                          - generic [ref=e432]: Open Somya Sijaria Preview
                      - button "Change Owner" [ref=e434] [cursor=pointer]:
                        - img [ref=e436]
                        - generic [ref=e439]: Change Owner
                - generic [ref=e441]:
                  - paragraph [ref=e442]: Account Site
                  - paragraph
                - generic [ref=e444]:
                  - paragraph [ref=e445]: Industry
                  - paragraph
            - generic [ref=e453]:
              - heading "Tabs" [level=2] [ref=e454]
              - generic "Tabs" [ref=e455]:
                - generic [ref=e456]:
                  - heading "Tabs" [level=2] [ref=e457]
                  - tablist "Tabs" [ref=e459]:
                    - tab "Related" [selected] [ref=e460] [cursor=pointer]
                    - tab "Details" [ref=e461] [cursor=pointer]
                    - tab "Skience Safe" [ref=e462] [cursor=pointer]
                  - tabpanel "Related" [ref=e465]:
                    - generic [ref=e466]:
                      - article [ref=e471]:
                        - generic [ref=e473]:
                          - img [ref=e478]
                          - heading "We found no potential duplicates of this Account." [level=2] [ref=e482]:
                            - generic "We found no potential duplicates of this Account." [ref=e483]
                        - generic [ref=e485]: No duplicate rules are activated. Activate duplicate rules to identify potential duplicate records.
                      - generic [ref=e489]:
                        - article "Contacts" [ref=e495]:
                          - generic [ref=e500]:
                            - generic [ref=e502]:
                              - img [ref=e506]
                              - heading "Contacts (0)" [level=2] [ref=e508]:
                                - link "Contacts (0)" [ref=e509] [cursor=pointer]:
                                  - /url: /lightning/r/Account/001dz00000G8L9QAAV/related/Contacts/view
                                  - generic "Contacts" [ref=e510]
                                  - generic "(0)" [ref=e511]
                            - generic "New" [ref=e515]:
                              - button "New" [ref=e520] [cursor=pointer]
                        - article "Cases" [ref=e526]:
                          - generic [ref=e531]:
                            - generic [ref=e533]:
                              - img [ref=e537]
                              - heading "Cases (0)" [level=2] [ref=e539]:
                                - link "Cases (0)" [ref=e540] [cursor=pointer]:
                                  - /url: /lightning/r/Account/001dz00000G8L9QAAV/related/Cases/view
                                  - generic "Cases" [ref=e541]
                                  - generic "(0)" [ref=e542]
                            - generic "New" [ref=e546]:
                              - button "New" [ref=e551] [cursor=pointer]
                        - article "Open Activities" [ref=e559]:
                          - generic [ref=e560]:
                            - heading "Open Activities (0)" [level=2] [ref=e566]:
                              - link "Open Activities (0)" [ref=e567] [cursor=pointer]:
                                - /url: /lightning/r/Account/001dz00000G8L9QAAV/related/OpenActivities/view
                                - generic "Open Activities" [ref=e568]
                                - generic "(0)" [ref=e569]
                            - list [ref=e572]:
                              - listitem [ref=e573]:
                                - button "New Task" [ref=e574] [cursor=pointer]:
                                  - generic "New Task" [ref=e575]
                        - article "Activity History" [ref=e583]:
                          - generic [ref=e584]:
                            - heading "Activity History (0)" [level=2] [ref=e590]:
                              - link "Activity History (0)" [ref=e591] [cursor=pointer]:
                                - /url: /lightning/r/Account/001dz00000G8L9QAAV/related/ActivityHistories/view
                                - generic "Activity History" [ref=e592]
                                - generic "(0)" [ref=e593]
                            - list [ref=e596]:
                              - listitem [ref=e597]:
                                - button "View All" [ref=e598] [cursor=pointer]:
                                  - generic "View All" [ref=e599]
                              - listitem [ref=e600]:
                                - button "Log a Call" [ref=e601] [cursor=pointer]:
                                  - generic "Log a Call" [ref=e602]
                        - article "Plan Customers" [ref=e608]:
                          - generic [ref=e609]:
                            - generic [ref=e610]:
                              - generic [ref=e613]:
                                - generic [ref=e615]:
                                  - img [ref=e619]
                                  - heading "Plan Customers (1)" [level=2] [ref=e621]:
                                    - link "Plan Customers (1)" [ref=e622] [cursor=pointer]:
                                      - /url: /lightning/r/Account/001dz00000G8L9QAAV/related/Plan_Customers__r/view
                                      - generic "Plan Customers" [ref=e623]
                                      - generic "(1)" [ref=e624]
                                - generic "New" [ref=e628]:
                                  - button "New" [active] [ref=e633] [cursor=pointer]
                              - generic [ref=e640]:
                                - generic [ref=e641]: Navigation Mode
                                - grid [ref=e645]:
                                  - rowgroup:
                                    - 'row "Name Source Plan Name Contract # Action"':
                                      - columnheader "Name":
                                        - generic "Name" [ref=e649]
                                      - columnheader "Source":
                                        - generic "Source" [ref=e653]
                                      - columnheader "Plan Name":
                                        - generic "Plan Name" [ref=e657]
                                      - 'columnheader "Contract #"':
                                        - 'generic "Contract #" [ref=e661]'
                                      - columnheader "Action":
                                        - generic [ref=e664]:
                                          - generic "Action"
                                  - rowgroup [ref=e665]:
                                    - row "TestCustPlan_1776064908047 Open TestCustPlan_1776064908047 Preview RPS Show Actions" [ref=e666]:
                                      - rowheader "TestCustPlan_1776064908047 Open TestCustPlan_1776064908047 Preview" [ref=e667]:
                                        - generic [ref=e676]:
                                          - link "TestCustPlan_1776064908047" [ref=e677] [cursor=pointer]:
                                            - /url: /lightning/r/a0adz000009jkSxAAI/view
                                            - generic [ref=e681]: TestCustPlan_1776064908047
                                          - button "Open TestCustPlan_1776064908047 Preview" [ref=e683] [cursor=pointer]:
                                            - img [ref=e685]
                                            - generic [ref=e688]: Open TestCustPlan_1776064908047 Preview
                                      - gridcell "RPS" [ref=e689]:
                                        - generic [ref=e695]: RPS
                                      - gridcell [ref=e696]
                                      - gridcell [ref=e699]
                                      - gridcell "Show Actions" [ref=e700]:
                                        - button "Show Actions" [ref=e707] [cursor=pointer]:
                                          - img [ref=e709]
                                          - generic [ref=e712]: Show Actions
                            - link "View All Plan Customers" [ref=e713] [cursor=pointer]:
                              - /url: /lightning/r/Account/001dz00000G8L9QAAV/related/Plan_Customers__r/view
                              - generic [ref=e714]:
                                - text: View All
                                - generic [ref=e715]: Plan Customers
                        - article [ref=e721]:
                          - generic [ref=e722]:
                            - img [ref=e724]
                            - heading "NextCapital Events" [level=2] [ref=e725]
                        - article [ref=e732]:
                          - generic [ref=e733]:
                            - img [ref=e735]
                            - heading "Opportunities" [level=2] [ref=e736]
                        - article [ref=e743]:
                          - generic [ref=e744]:
                            - img [ref=e746]
                            - heading "Related Accounts" [level=2] [ref=e747]
                        - article [ref=e754]:
                          - generic [ref=e755]:
                            - img [ref=e757]
                            - heading "Account History" [level=2] [ref=e758]
  - generic:
    - status
```

# Test source

```ts
  150 | 
  151 |     /**
  152 |      * Manual registration for records created via UI.
  153 |      */
  154 |     registerForCleanup(sObject: string, id: string, name?: string): void {
  155 |         // Avoid duplicate registrations for the same record
  156 |         const alreadyRegistered = this.recordsToCleanup.some(
  157 |             (r) => r.id === id && r.type === sObject
  158 |         );
  159 |         if (alreadyRegistered) {
  160 |             console.log(`⏭️  Already registered for cleanup: ${sObject} (${id})`);
  161 |             return;
  162 |         }
  163 |         this.recordsToCleanup.push({ type: sObject, id, name });
  164 |         console.log(
  165 |             `📌 Registered for cleanup: ${sObject} (${id})${name ? ` - ${name}` : ''}`
  166 |         );
  167 |     }
  168 | 
  169 |     /**
  170 |      * Deletes all registered records in REVERSE order.
  171 |      * This ensures child records are deleted before parents.
  172 |      * This method ALWAYS runs in afterAll/afterEach, regardless of test pass/fail.
  173 |      *
  174 |      * Cleanup is automatic in test automation — no opt-in required.
  175 |      */
  176 |     async teardown(): Promise<void> {
  177 |         if (this.recordsToCleanup.length === 0) {
  178 |             console.log('✅ No records to clean up');
  179 |             return;
  180 |         }
  181 | 
  182 |         console.log(
  183 |             `\n🧹 Starting automatic cleanup of ${this.recordsToCleanup.length} records...`
  184 |         );
  185 |         console.log('   (Cleanup runs regardless of test pass/fail)\n');
  186 | 
  187 |         let successCount = 0;
  188 |         let failCount = 0;
  189 | 
  190 |         for (const record of this.recordsToCleanup.reverse()) {
  191 |             try {
  192 |                 const response = await fetch(
  193 |                     `${this.instanceUrl}/services/data/v65.0/sobjects/${record.type}/${record.id}`,
  194 |                     {
  195 |                         method: 'DELETE',
  196 |                         headers: { Authorization: `Bearer ${this.accessToken}` },
  197 |                     }
  198 |                 );
  199 | 
  200 |                 if (response.ok || response.status === 404) {
  201 |                     console.log(
  202 |                         `✅ Deleted ${record.type}: ${record.id}${record.name ? ` - ${record.name}` : ''}`
  203 |                     );
  204 |                     successCount++;
  205 |                 } else {
  206 |                     const error = await response.text();
  207 |                     console.error(
  208 |                         `❌ Failed to delete ${record.type} ${record.id}: ${error}`
  209 |                     );
  210 |                     failCount++;
  211 |                 }
  212 |             } catch (error) {
  213 |                 console.error(
  214 |                     `❌ Exception deleting ${record.type} ${record.id}:`,
  215 |                     error
  216 |                 );
  217 |                 failCount++;
  218 |             }
  219 |         }
  220 | 
  221 |         this.recordsToCleanup = [];
  222 |         console.log(
  223 |             `\n✅ Cleanup completed: ${successCount} deleted, ${failCount} failed\n`
  224 |         );
  225 |     }
  226 | 
  227 |     /**
  228 |      * Extract recordId and objectApiName from a Salesforce record page URL
  229 |      * and register the record for cleanup.
  230 |      *
  231 |      * Use this when record creation redirects to the record's detail page.
  232 |      * URL format: /lightning/r/<ObjectName>/<RecordId>/view
  233 |      *
  234 |      * @param url - Full page URL (e.g., from `page.url()`)
  235 |      * @param name - Optional display name for logging
  236 |      * @returns Object with `objectApiName` and `recordId`
  237 |      * @throws Error if URL does not match Salesforce record page pattern
  238 |      *
  239 |      * @example
  240 |      * ```ts
  241 |      * const { objectApiName, recordId } = dataFactory.registerRecordFromUrl(page.url(), 'My Opportunity');
  242 |      * ```
  243 |      */
  244 |     registerRecordFromUrl(
  245 |         url: string,
  246 |         name?: string,
  247 |     ): { objectApiName: string; recordId: string } {
  248 |         const match = url.match(/\/lightning\/r\/([A-Za-z_][A-Za-z0-9_]*)\/([a-zA-Z0-9]{15,18})\/view/);
  249 |         if (!match) {
> 250 |             throw new Error(
      |                   ^ Error: Cannot extract record info from URL: https://jhancock--devlm2.sandbox.lightning.force.com/lightning/o/Account/new?recordTypeId=012G0000001BFsk&nooverride=true&inContextOfRef=1.eyJ0eXBlIjoic3RhbmRhcmRfX29iamVjdFBhZ2UiLCJhdHRyaWJ1dGVzIjp7Im9iamVjdEFwaU5hbWUiOiJBY2NvdW50IiwiYWN0aW9uTmFtZSI6Im5ldyJ9LCJzdGF0ZSI6eyJvcmlnaW5hbFVybCI6Imh0dHBzOi8vamhhbmNvY2stLWRldmxtMi0tYy5zYW5kYm94LnZmLmZvcmNlLmNvbS9hcGV4L3NlYXJjaEZpcnN0QWNjb3VudD9uYXZpZ2F0aW9uTG9jYXRpb249TElTVF9WSUVXJmxleGlTT2JqZWN0TmFtZT1BY2NvdW50JmxleGlBY3Rpb25OYW1lPW5ldyZzZmRjLm92ZXJyaWRlPTEmdmZSZXRVUkxJblNGWD0lMkYwMDElMkZvIiwiaW5Db250ZXh0T2ZSZWYiOiIxLmV5SjBlWEJsSWpvaWMzUmhibVJoY21SZlgyOWlhbVZqZEZCaFoyVWlMQ0poZEhSeWFXSjFkR1Z6SWpwN0ltOWlhbVZqZEVGd2FVNWhiV1VpT2lKQlkyTnZkVzUwSWl3aVlXTjBhVzl1VG1GdFpTSTZJbXhwYzNRaWZTd2ljM1JoZEdVaU9uc2labWxzZEdWeVRtRnRaU0k2SWw5ZlVtVmpaVzUwSW4xOSIsImNvdW50IjoiMSJ9fQ%3D%3D&count=1&backgroundContext=%2Flightning%2Fo%2FAccount%2Fnew%3ForiginalUrl%3Dhttps%253A%252F%252Fjhancock--devlm2--c.sandbox.vf.force.com%252Fapex%252FsearchFirstAccount%253FnavigationLocation%253DLIST_VIEW%2526lexiSObjectName%253DAccount%2526lexiActionName%253Dnew%2526sfdc.override%253D1%2526vfRetURLInSFX%253D%25252F001%25252Fo%26inContextOfRef%3D1.eyJ0eXBlIjoic3RhbmRhcmRfX29iamVjdFBhZ2UiLCJhdHRyaWJ1dGVzIjp7Im9iamVjdEFwaU5hbWUiOiJBY2NvdW50IiwiYWN0aW9uTmFtZSI6Imxpc3QifSwic3RhdGUiOnsiZmlsdGVyTmFtZSI6Il9fUmVjZW50In19%26count%3D1. Expected format: /lightning/r/<Object>/<RecordId>/view
  251 |                 `Cannot extract record info from URL: ${url}. Expected format: /lightning/r/<Object>/<RecordId>/view`,
  252 |             );
  253 |         }
  254 | 
  255 |         const objectApiName = match[1];
  256 |         console.log("ObjectName: ", objectApiName);
  257 |         const recordId = match[2];
  258 |         console.log("RecordId: ", recordId);
  259 | 
  260 |         this.registerForCleanup(objectApiName, recordId, name);
  261 |         return { objectApiName, recordId };
  262 |     }
  263 | 
  264 |     /**
  265 |      * Create a record in Salesforce via REST API.
  266 |      * Automatically registers the created record for cleanup.
  267 |      *
  268 |      * @param sObject - Salesforce object API name (e.g., 'Account', 'Contact', 'Lead')
  269 |      * @param payload - Record field data as a plain object
  270 |      * @param autoRegister - Automatically register for cleanup (default: true)
  271 |      * @returns The created record ID
  272 |      *
  273 |      * @example
  274 |      * ```ts
  275 |      * const payload = PayloadBuilder
  276 |      *   .fromFile('test-data/api/account-template.json')
  277 |      *   .set('Name', TestDataGenerator.uniqueName('Account'))
  278 |      *   .build();
  279 |      *
  280 |      * const accountId = await dataFactory.createRecord('Account', payload);
  281 |      * ```
  282 |      */
  283 |     async createRecord(
  284 |         sObject: string,
  285 |         payload: Record<string, unknown>,
  286 |         autoRegister: boolean = true
  287 |     ): Promise<string> {
  288 |         // await this.authenticate();
  289 | 
  290 |         const response = await fetch(
  291 |             `${this.instanceUrl}/services/data/v65.0/sobjects/${sObject}`,
  292 |             {
  293 |                 method: 'POST',
  294 |                 headers: {
  295 |                     Authorization: `Bearer ${this.accessToken}`,
  296 |                     'Content-Type': 'application/json',
  297 |                     // Bypass Salesforce duplicate rules for test data creation
  298 |                     'Sforce-Duplicate-Rule-Header': 'allowSave=true',
  299 |                 },
  300 |                 body: JSON.stringify(payload),
  301 |             }
  302 |         );
  303 | 
  304 |         const result = (await response.json()) as any;
  305 | 
  306 |         if (!response.ok) {
  307 |             const errors = result.errors || result;
  308 |             throw new Error(
  309 |                 `Failed to create ${sObject}: ${JSON.stringify(errors)}`
  310 |             );
  311 |         }
  312 | 
  313 |         const recordId = result.id;
  314 |         const recordName =
  315 |             (payload.Name as string) ||
  316 |             (payload.LastName as string) ||
  317 |             (payload.Subject as string) ||
  318 |             recordId;
  319 | 
  320 |         console.log(`✅ Created ${sObject} via API: ${recordId} - ${recordName}`);
  321 | 
  322 |         if (autoRegister) {
  323 |             this.registerForCleanup(sObject, recordId, recordName);
  324 |         }
  325 | 
  326 |         return recordId;
  327 |     }
  328 | 
  329 |     /**
  330 |      * Update an existing record in Salesforce via REST API (PATCH).
  331 |      * Supports partial updates — only the fields in the payload are changed.
  332 |      *
  333 |      * @param sObject - Salesforce object API name (e.g., 'Account', 'Contact')
  334 |      * @param recordId - The 15 or 18 character Salesforce record ID
  335 |      * @param payload - Fields to update (only changed fields are required)
  336 |      * @returns void — throws on failure
  337 |      *
  338 |      * @example
  339 |      * ```ts
  340 |      * await dataFactory.updateRecord('Contact', contactId, {
  341 |      *   Title: 'Senior QA Engineer',
  342 |      *   Department: 'Quality Assurance',
  343 |      * });
  344 |      * ```
  345 |      */
  346 |     async updateRecord(
  347 |         sObject: string,
  348 |         recordId: string,
  349 |         payload: Record<string, unknown>
  350 |     ): Promise<void> {
```