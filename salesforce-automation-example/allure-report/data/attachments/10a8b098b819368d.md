# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: opportunity/create-opportunity-fund-account-selection.spec.ts >> Opportunity - Create with Fund Account Selection @smoke >> should create opportunity with fund account selection @smoke
- Location: tests/opportunity/create-opportunity-fund-account-selection.spec.ts:62:7

# Error details

```
Test timeout of 300000ms exceeded.
```

```
Error: locator.click: Test timeout of 300000ms exceeded.
Call log:
  - waiting for getByRole('dialog', { name: 'New Opportunity' }).getByRole('radio', { name: 'Rollover', exact: true })

```

# Page snapshot

```yaml
- generic:
  - generic:
    - generic [ref=e2]:
      - generic [ref=e3]:
        - link [ref=e4] [cursor=pointer]:
          - /url: javascript:void(0);
          - text: Skip to Navigation
        - link [ref=e5] [cursor=pointer]:
          - /url: javascript:void(0);
          - text: Skip to Main Content
        - generic [ref=e9]:
          - generic [ref=e13]:
            - button [ref=e17] [cursor=pointer]:
              - img [ref=e21]
              - generic [ref=e24]: Menu
            - generic [ref=e29]:
              - img [ref=e33]
              - generic [ref=e37]: Sandbox (DEVLM2)
          - button [ref=e46] [cursor=pointer]:
            - img [ref=e48]
            - generic [ref=e51]: Show menu
        - generic [ref=e52]:
          - button [ref=e58]:
            - img [ref=e60]
            - text: Search...
          - navigation [ref=e63]:
            - list [ref=e65]:
              - listitem [ref=e66]:
                - group [ref=e67]:
                  - button [ref=e69] [cursor=pointer]:
                    - img [ref=e74]
                  - button [ref=e78] [cursor=pointer]:
                    - img [ref=e83]
              - listitem [ref=e86]:
                - button [ref=e92] [cursor=pointer]:
                  - img [ref=e97]
              - listitem [ref=e100]:
                - button [ref=e102] [cursor=pointer]:
                  - img [ref=e107]
              - listitem [ref=e110]:
                - button [ref=e113] [cursor=pointer]:
                  - img [ref=e118]
              - listitem [ref=e121]:
                - button [ref=e127] [cursor=pointer]:
                  - img [ref=e132]
              - listitem [ref=e135]:
                - button [ref=e138] [cursor=pointer]:
                  - img [ref=e144]
              - listitem [ref=e148]:
                - button [ref=e151] [cursor=pointer]
      - generic [ref=e156]:
        - generic [ref=e159]:
          - generic [ref=e161]:
            - navigation [ref=e162]:
              - button [ref=e164] [cursor=pointer]:
                - generic [ref=e175]: App Launcher
            - heading [level=1] [ref=e176]:
              - generic [ref=e177]: PFS
          - navigation [ref=e180]:
            - list [ref=e181]:
              - listitem [ref=e182]:
                - link [ref=e183] [cursor=pointer]:
                  - /url: /lightning/page/home
                  - generic [ref=e184]: Home
              - listitem [ref=e185]:
                - link [ref=e186] [cursor=pointer]:
                  - /url: /lightning/n/Tasks
                  - generic [ref=e187]: Tasks
              - listitem [ref=e188]:
                - link [ref=e189] [cursor=pointer]:
                  - /url: /lightning/o/Lead/home
                  - generic [ref=e190]: Leads
                - button [ref=e194] [cursor=pointer]:
                  - img [ref=e198]
                  - generic [ref=e201]: Leads List
              - listitem [ref=e202]:
                - link [ref=e203] [cursor=pointer]:
                  - /url: /lightning/o/Campaign/home
                  - generic [ref=e204]: Campaigns
                - button [ref=e208] [cursor=pointer]:
                  - img [ref=e212]
                  - generic [ref=e215]: Campaigns List
              - listitem [ref=e216]:
                - link [ref=e217] [cursor=pointer]:
                  - /url: /lightning/o/Account/home
                  - generic [ref=e218]: Accounts
                - button [ref=e222] [cursor=pointer]:
                  - img [ref=e226]
                  - generic [ref=e229]: Accounts List
              - listitem [ref=e230]:
                - link [ref=e231] [cursor=pointer]:
                  - /url: /lightning/o/Contact/home
                  - generic [ref=e232]: Contacts
                - button [ref=e236] [cursor=pointer]:
                  - img [ref=e240]
                  - generic [ref=e243]: Contacts List
              - listitem [ref=e244] [cursor=pointer]:
                - link [ref=e245]:
                  - /url: /lightning/o/Opportunity/home
                  - generic [ref=e246]: Opportunities
                - button [ref=e250]:
                  - img [ref=e254]
                  - generic [ref=e257]: Opportunities List
              - listitem [ref=e258]:
                - link [ref=e259] [cursor=pointer]:
                  - /url: /lightning/o/Report/home
                  - generic [ref=e260]: Reports
                - button [ref=e264] [cursor=pointer]:
                  - img [ref=e268]
                  - generic [ref=e271]: Reports List
              - listitem [ref=e272]:
                - link [ref=e273] [cursor=pointer]:
                  - /url: /lightning/o/Dashboard/home
                  - generic [ref=e274]: Dashboards
                - button [ref=e278] [cursor=pointer]:
                  - img [ref=e282]
                  - generic [ref=e285]: Dashboards List
              - listitem [ref=e286]:
                - link [ref=e287] [cursor=pointer]:
                  - /url: /lightning/o/Threshold__c/home
                  - generic [ref=e288]: Thresholds
                - button [ref=e292] [cursor=pointer]:
                  - img [ref=e296]
                  - generic [ref=e299]: Thresholds List
              - listitem [ref=e300]:
                - button [ref=e304] [cursor=pointer]:
                  - img [ref=e306]
                  - generic [ref=e309]: Help
        - generic [ref=e310]:
          - main [ref=e311]:
            - generic [ref=e321]:
              - generic [ref=e323]:
                - generic [ref=e324]:
                  - generic [ref=e326]:
                    - img [ref=e330]
                    - generic [ref=e331]:
                      - heading [level=1] [ref=e335]: Opportunities
                      - generic [ref=e336]:
                        - generic [ref=e338] [cursor=pointer]:
                          - heading [level=1] [ref=e339]:
                            - generic [ref=e340]: Opportunities
                            - generic [ref=e341]: Recently Viewed
                          - button [ref=e344]:
                            - img [ref=e346]
                            - generic [ref=e349]: "Select a List View: Opportunities"
                        - button [disabled] [ref=e353] [cursor=pointer]:
                          - img [ref=e355]
                          - generic [ref=e358]: This list is pinned.
                  - list [ref=e361]:
                    - listitem [ref=e362]:
                      - button [ref=e363] [cursor=pointer]:
                        - generic [ref=e364]: New
                    - listitem [ref=e365]:
                      - button [ref=e366] [cursor=pointer]:
                        - generic [ref=e367]: Assign Label
                - generic [ref=e368]:
                  - paragraph [ref=e370]:
                    - generic [ref=e372]:
                      - status [ref=e373]: 36 items •
                      - text: Updated 4 minutes ago
                  - generic [ref=e379]:
                    - generic [ref=e380]: Search this list...
                    - generic [ref=e381]:
                      - searchbox [ref=e382]
                      - img
                  - generic [ref=e383]:
                    - button [ref=e387] [cursor=pointer]:
                      - img [ref=e389]
                      - img [ref=e393]
                      - generic [ref=e396]: List View Controls
                    - button [ref=e399] [cursor=pointer]:
                      - img [ref=e401]
                      - img [ref=e405]
                      - generic [ref=e408]: Select list display
                    - generic [ref=e410]:
                      - button [ref=e413] [cursor=pointer]:
                        - img [ref=e415]
                        - generic [ref=e418]: Refresh
                      - button [ref=e421] [cursor=pointer]:
                        - img [ref=e423]
                        - generic [ref=e426]: Column sort
                      - button [ref=e429] [cursor=pointer]:
                        - img [ref=e431]
                        - generic [ref=e434]: Inline Edit is disabled. To edit, filter by one record type.
                      - group [ref=e435]:
                        - generic [ref=e437]:
                          - generic:
                            - generic:
                              - button [disabled]:
                                - generic:
                                  - img
                                - generic: Charts
                          - generic:
                            - generic:
                              - button [disabled]:
                                - generic:
                                  - img
                                - generic: Filters
              - generic [ref=e444]:
                - generic [ref=e445]: Navigation Mode
                - grid [ref=e449]:
                  - generic [ref=e453]:
                    - generic [ref=e454]: Choose a Row
                    - generic [ref=e456]:
                      - checkbox [ref=e457]
                      - generic [ref=e460]: Select 36 items
                  - generic [ref=e462]:
                    - button [ref=e463] [cursor=pointer]:
                      - generic [ref=e464]: "Sort by:"
                      - generic [ref=e465]: Opportunity Name
                    - generic [ref=e466]: "Sorted: None"
                    - button [ref=e468] [cursor=pointer]:
                      - img [ref=e470]
                      - generic [ref=e473]: Show Opportunity Name column actions
                    - slider [ref=e474]: "380"
                  - generic [ref=e478]:
                    - button [ref=e479] [cursor=pointer]:
                      - generic [ref=e480]: "Sort by:"
                      - generic [ref=e481]: Account Name
                    - generic [ref=e482]: "Sorted: None"
                    - button [ref=e484] [cursor=pointer]:
                      - img [ref=e486]
                      - generic [ref=e489]: Show Account Name column actions
                    - slider [ref=e490]: "288"
                  - generic [ref=e494]:
                    - button [ref=e495] [cursor=pointer]:
                      - generic [ref=e496]: "Sort by:"
                      - generic [ref=e497]: Account Site
                    - generic [ref=e498]: "Sorted: None"
                    - button [ref=e500] [cursor=pointer]:
                      - img [ref=e502]
                      - generic [ref=e505]: Show Account Site column actions
                    - slider [ref=e506]: "60"
                  - generic [ref=e510]:
                    - button [ref=e511] [cursor=pointer]:
                      - generic [ref=e512]: "Sort by:"
                      - generic [ref=e513]: Stage
                    - generic [ref=e514]: "Sorted: None"
                    - button [ref=e516] [cursor=pointer]:
                      - img [ref=e518]
                      - generic [ref=e521]: Show Stage column actions
                    - slider [ref=e522]: "102"
                  - generic [ref=e526]:
                    - button [ref=e527] [cursor=pointer]:
                      - generic [ref=e528]: "Sort by:"
                      - generic [ref=e529]: Close Date
                    - generic [ref=e530]: "Sorted: None"
                    - button [ref=e532] [cursor=pointer]:
                      - img [ref=e534]
                      - generic [ref=e537]: Show Close Date column actions
                    - slider [ref=e538]: "187"
                  - generic [ref=e542]:
                    - button [ref=e543] [cursor=pointer]:
                      - generic [ref=e544]: "Sort by:"
                      - generic [ref=e545]: Opportunity Owner Alias
                    - generic [ref=e546]: "Sorted: None"
                    - button [ref=e548] [cursor=pointer]:
                      - img [ref=e550]
                      - generic [ref=e553]: Show Opportunity Owner Alias column actions
                    - slider [ref=e554]: "103"
                  - rowgroup [ref=e560]:
                    - row [ref=e561]:
                      - gridcell [ref=e562]
                      - gridcell [ref=e566]:
                        - generic [ref=e567]:
                          - checkbox [ref=e568]
                          - generic [ref=e571]: Select Item 1
                      - rowheader [ref=e572]:
                        - link [ref=e579] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000E7ewmAAB/view
                          - generic [ref=e580]: Rol - - test new account
                      - gridcell [ref=e581]:
                        - link [ref=e587] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000FvD85AAF/view
                          - generic [ref=e588]: test new account
                      - gridcell [ref=e589]
                      - gridcell [ref=e590]:
                        - generic [ref=e594]: New
                      - gridcell [ref=e595]:
                        - generic [ref=e600]: 4/22/2026
                      - gridcell [ref=e601]:
                        - link [ref=e607] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e608]: ssija
                      - gridcell [ref=e609]:
                        - button [ref=e615] [cursor=pointer]:
                          - img [ref=e617]
                          - generic [ref=e620]: Show Actions
                    - row [ref=e621]:
                      - gridcell [ref=e622]
                      - gridcell [ref=e626]:
                        - generic [ref=e627]:
                          - checkbox [ref=e628]
                          - generic [ref=e631]: Select Item 2
                      - rowheader [ref=e632]:
                        - link [ref=e639] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000E6Q1OAAV/view
                          - generic [ref=e640]: Rol - - test account
                      - gridcell [ref=e641]:
                        - link [ref=e647] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Foz4WAAR/view
                          - generic [ref=e648]: test account
                      - gridcell [ref=e649]
                      - gridcell [ref=e650]:
                        - generic [ref=e654]: New
                      - gridcell [ref=e655]:
                        - generic [ref=e660]: 4/21/2026
                      - gridcell [ref=e661]:
                        - link [ref=e667] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e668]: ssija
                      - gridcell [ref=e669]:
                        - button [ref=e675] [cursor=pointer]:
                          - img [ref=e677]
                          - generic [ref=e680]: Show Actions
                    - row [ref=e681]:
                      - gridcell [ref=e682]
                      - gridcell [ref=e686]:
                        - generic [ref=e687]:
                          - checkbox [ref=e688]
                          - generic [ref=e691]: Select Item 3
                      - rowheader [ref=e692]:
                        - link [ref=e699] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000DxMTFAA3/view
                          - generic [ref=e700]: Rol - - employer_bridgenext
                      - gridcell [ref=e701]:
                        - link [ref=e707] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Fe1UbAAJ/view
                          - generic [ref=e708]: employer_bridgenext
                      - gridcell [ref=e709]
                      - gridcell [ref=e710]:
                        - generic [ref=e714]: New
                      - gridcell [ref=e715]:
                        - generic [ref=e720]: 4/14/2026
                      - gridcell [ref=e721]:
                        - link [ref=e727] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e728]: ssija
                      - gridcell [ref=e729]:
                        - button [ref=e735] [cursor=pointer]:
                          - img [ref=e737]
                          - generic [ref=e740]: Show Actions
                    - row [ref=e741]:
                      - gridcell [ref=e742]
                      - gridcell [ref=e746]:
                        - generic [ref=e747]:
                          - checkbox [ref=e748]
                          - generic [ref=e751]: Select Item 4
                      - rowheader [ref=e752]:
                        - link [ref=e759] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000E44mYAAR/view
                          - generic [ref=e760]: Rol - - test account
                      - gridcell [ref=e761]:
                        - link [ref=e767] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Foz4WAAR/view
                          - generic [ref=e768]: test account
                      - gridcell [ref=e769]
                      - gridcell [ref=e770]:
                        - generic [ref=e774]: New
                      - gridcell [ref=e775]:
                        - generic [ref=e780]: 4/20/2026
                      - gridcell [ref=e781]:
                        - link [ref=e787] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e788]: ssija
                      - gridcell [ref=e789]:
                        - button [ref=e795] [cursor=pointer]:
                          - img [ref=e797]
                          - generic [ref=e800]: Show Actions
                    - row [ref=e801]:
                      - gridcell [ref=e802]
                      - gridcell [ref=e806]:
                        - generic [ref=e807]:
                          - checkbox [ref=e808]
                          - generic [ref=e811]: Select Item 5
                      - rowheader [ref=e812]:
                        - link [ref=e819] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000E0HnBAAV/view
                          - generic [ref=e820]: Rol - - employer_bridgenext
                      - gridcell [ref=e821]:
                        - link [ref=e827] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Fe1UbAAJ/view
                          - generic [ref=e828]: employer_bridgenext
                      - gridcell [ref=e829]
                      - gridcell [ref=e830]:
                        - generic [ref=e834]: New
                      - gridcell [ref=e835]:
                        - generic [ref=e840]: 4/16/2026
                      - gridcell [ref=e841]:
                        - link [ref=e847] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e848]: ssija
                      - gridcell [ref=e849]:
                        - button [ref=e855] [cursor=pointer]:
                          - img [ref=e857]
                          - generic [ref=e860]: Show Actions
                    - row [ref=e861]:
                      - gridcell [ref=e862]
                      - gridcell [ref=e866]:
                        - generic [ref=e867]:
                          - checkbox [ref=e868]
                          - generic [ref=e871]: Select Item 6
                      - rowheader [ref=e872]:
                        - link [ref=e879] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000E0AqXAAV/view
                          - generic [ref=e880]: Rol - - TestEmployer_1775124181119
                      - gridcell [ref=e881]:
                        - link [ref=e887] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000FpT0vAAF/view
                          - generic [ref=e888]: TestEmployer_1775124181119
                      - gridcell [ref=e889]
                      - gridcell [ref=e890]:
                        - generic [ref=e894]: New
                      - gridcell [ref=e895]:
                        - generic [ref=e900]: 4/16/2026
                      - gridcell [ref=e901]:
                        - link [ref=e907] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000Bcoa9AAB/view
                          - generic [ref=e908]: ppot
                      - gridcell [ref=e909]:
                        - button [ref=e915] [cursor=pointer]:
                          - img [ref=e917]
                          - generic [ref=e920]: Show Actions
                    - row [ref=e921]:
                      - gridcell [ref=e922]
                      - gridcell [ref=e926]:
                        - generic [ref=e927]:
                          - checkbox [ref=e928]
                          - generic [ref=e931]: Select Item 7
                      - rowheader [ref=e932]:
                        - link [ref=e939] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000E09PpAAJ/view
                          - generic [ref=e940]: Rol - - TestEmployer_1775123097206
                      - gridcell [ref=e941]:
                        - link [ref=e947] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000FpOKdAAN/view
                          - generic [ref=e948]: TestEmployer_1775123097206
                      - gridcell [ref=e949]
                      - gridcell [ref=e950]:
                        - generic [ref=e954]: New
                      - gridcell [ref=e955]:
                        - generic [ref=e960]: 4/16/2026
                      - gridcell [ref=e961]:
                        - link [ref=e967] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e968]: ssija
                      - gridcell [ref=e969]:
                        - button [ref=e975] [cursor=pointer]:
                          - img [ref=e977]
                          - generic [ref=e980]: Show Actions
                    - row [ref=e981]:
                      - gridcell [ref=e982]
                      - gridcell [ref=e986]:
                        - generic [ref=e987]:
                          - checkbox [ref=e988]
                          - generic [ref=e991]: Select Item 8
                      - rowheader [ref=e992]:
                        - link [ref=e999] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000E02rNAAR/view
                          - generic [ref=e1000]: Rol - - test account
                      - gridcell [ref=e1001]:
                        - link [ref=e1007] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Foz4WAAR/view
                          - generic [ref=e1008]: test account
                      - gridcell [ref=e1009]
                      - gridcell [ref=e1010]:
                        - generic [ref=e1014]: New
                      - gridcell [ref=e1015]:
                        - generic [ref=e1020]: 4/16/2026
                      - gridcell [ref=e1021]:
                        - link [ref=e1027] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e1028]: ssija
                      - gridcell [ref=e1029]:
                        - button [ref=e1035] [cursor=pointer]:
                          - img [ref=e1037]
                          - generic [ref=e1040]: Show Actions
                    - row [ref=e1041]:
                      - gridcell [ref=e1042]
                      - gridcell [ref=e1046]:
                        - generic [ref=e1047]:
                          - checkbox [ref=e1048]
                          - generic [ref=e1051]: Select Item 9
                      - rowheader [ref=e1052]:
                        - link [ref=e1059] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000DzzzxAAB/view
                          - generic [ref=e1060]: Rol - - employer_bridgenext
                      - gridcell [ref=e1061]:
                        - link [ref=e1067] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Fe1UbAAJ/view
                          - generic [ref=e1068]: employer_bridgenext
                      - gridcell [ref=e1069]
                      - gridcell [ref=e1070]:
                        - generic [ref=e1074]: New
                      - gridcell [ref=e1075]:
                        - generic [ref=e1080]: 4/16/2026
                      - gridcell [ref=e1081]:
                        - link [ref=e1087] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e1088]: ssija
                      - gridcell [ref=e1089]:
                        - button [ref=e1095] [cursor=pointer]:
                          - img [ref=e1097]
                          - generic [ref=e1100]: Show Actions
                    - row [ref=e1101]:
                      - gridcell [ref=e1102]
                      - gridcell [ref=e1106]:
                        - generic [ref=e1107]:
                          - checkbox [ref=e1108]
                          - generic [ref=e1111]: Select Item 10
                      - rowheader [ref=e1112]:
                        - link [ref=e1119] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000DzG6nAAF/view
                          - generic [ref=e1120]: Rol - - employer_bridgenext
                      - gridcell [ref=e1121]:
                        - link [ref=e1127] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Fe1UbAAJ/view
                          - generic [ref=e1128]: employer_bridgenext
                      - gridcell [ref=e1129]
                      - gridcell [ref=e1130]:
                        - generic [ref=e1134]: New
                      - gridcell [ref=e1135]:
                        - generic [ref=e1140]: 4/15/2026
                      - gridcell [ref=e1141]:
                        - link [ref=e1147] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e1148]: ssija
                      - gridcell [ref=e1149]:
                        - button [ref=e1155] [cursor=pointer]:
                          - img [ref=e1157]
                          - generic [ref=e1160]: Show Actions
                    - row [ref=e1161]:
                      - gridcell [ref=e1162]
                      - gridcell [ref=e1166]:
                        - generic [ref=e1167]:
                          - checkbox [ref=e1168]
                          - generic [ref=e1171]: Select Item 11
                      - rowheader [ref=e1172]:
                        - link [ref=e1179] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000DzFp3AAF/view
                          - generic [ref=e1180]: Rol - - employer_bridgenext
                      - gridcell [ref=e1181]:
                        - link [ref=e1187] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Fe1UbAAJ/view
                          - generic [ref=e1188]: employer_bridgenext
                      - gridcell [ref=e1189]
                      - gridcell [ref=e1190]:
                        - generic [ref=e1194]: New
                      - gridcell [ref=e1195]:
                        - generic [ref=e1200]: 4/15/2026
                      - gridcell [ref=e1201]:
                        - link [ref=e1207] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e1208]: ssija
                      - gridcell [ref=e1209]:
                        - button [ref=e1215] [cursor=pointer]:
                          - img [ref=e1217]
                          - generic [ref=e1220]: Show Actions
                    - row [ref=e1221]:
                      - gridcell [ref=e1222]
                      - gridcell [ref=e1226]:
                        - generic [ref=e1227]:
                          - checkbox [ref=e1228]
                          - generic [ref=e1231]: Select Item 12
                      - rowheader [ref=e1232]:
                        - link [ref=e1239] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000Dz9dCAAR/view
                          - generic [ref=e1240]: Rol - - employer_bridgenext
                      - gridcell [ref=e1241]:
                        - link [ref=e1247] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Fe1UbAAJ/view
                          - generic [ref=e1248]: employer_bridgenext
                      - gridcell [ref=e1249]
                      - gridcell [ref=e1250]:
                        - generic [ref=e1254]: New
                      - gridcell [ref=e1255]:
                        - generic [ref=e1260]: 4/15/2026
                      - gridcell [ref=e1261]:
                        - link [ref=e1267] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e1268]: ssija
                      - gridcell [ref=e1269]:
                        - button [ref=e1275] [cursor=pointer]:
                          - img [ref=e1277]
                          - generic [ref=e1280]: Show Actions
                    - row [ref=e1281]:
                      - gridcell [ref=e1282]
                      - gridcell [ref=e1286]:
                        - generic [ref=e1287]:
                          - checkbox [ref=e1288]
                          - generic [ref=e1291]: Select Item 13
                      - rowheader [ref=e1292]:
                        - link [ref=e1299] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000DzE1lAAF/view
                          - generic [ref=e1300]: Rol - - employer_bridgenext
                      - gridcell [ref=e1301]:
                        - link [ref=e1307] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Fe1UbAAJ/view
                          - generic [ref=e1308]: employer_bridgenext
                      - gridcell [ref=e1309]
                      - gridcell [ref=e1310]:
                        - generic [ref=e1314]: New
                      - gridcell [ref=e1315]:
                        - generic [ref=e1320]: 4/15/2026
                      - gridcell [ref=e1321]:
                        - link [ref=e1327] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e1328]: ssija
                      - gridcell [ref=e1329]:
                        - button [ref=e1335] [cursor=pointer]:
                          - img [ref=e1337]
                          - generic [ref=e1340]: Show Actions
                    - row [ref=e1341]:
                      - gridcell [ref=e1342]
                      - gridcell [ref=e1346]:
                        - generic [ref=e1347]:
                          - checkbox [ref=e1348]
                          - generic [ref=e1351]: Select Item 14
                      - rowheader [ref=e1352]:
                        - link [ref=e1359] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000DzCSzAAN/view
                          - generic [ref=e1360]: Rol - - employer_bridgenext
                      - gridcell [ref=e1361]:
                        - link [ref=e1367] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Fe1UbAAJ/view
                          - generic [ref=e1368]: employer_bridgenext
                      - gridcell [ref=e1369]
                      - gridcell [ref=e1370]:
                        - generic [ref=e1374]: New
                      - gridcell [ref=e1375]:
                        - generic [ref=e1380]: 4/15/2026
                      - gridcell [ref=e1381]:
                        - link [ref=e1387] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e1388]: ssija
                      - gridcell [ref=e1389]:
                        - button [ref=e1395] [cursor=pointer]:
                          - img [ref=e1397]
                          - generic [ref=e1400]: Show Actions
                    - row [ref=e1401]:
                      - gridcell [ref=e1402]
                      - gridcell [ref=e1406]:
                        - generic [ref=e1407]:
                          - checkbox [ref=e1408]
                          - generic [ref=e1411]: Select Item 15
                      - rowheader [ref=e1412]:
                        - link [ref=e1419] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000DyzAqAAJ/view
                          - generic [ref=e1420]: Rol - - employer_bridgenext
                      - gridcell [ref=e1421]:
                        - link [ref=e1427] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Fe1UbAAJ/view
                          - generic [ref=e1428]: employer_bridgenext
                      - gridcell [ref=e1429]
                      - gridcell [ref=e1430]:
                        - generic [ref=e1434]: New
                      - gridcell [ref=e1435]:
                        - generic [ref=e1440]: 4/15/2026
                      - gridcell [ref=e1441]:
                        - link [ref=e1447] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e1448]: ssija
                      - gridcell [ref=e1449]:
                        - button [ref=e1455] [cursor=pointer]:
                          - img [ref=e1457]
                          - generic [ref=e1460]: Show Actions
                    - row [ref=e1461]:
                      - gridcell [ref=e1462]
                      - gridcell [ref=e1466]:
                        - generic [ref=e1467]:
                          - checkbox [ref=e1468]
                          - generic [ref=e1471]: Select Item 16
                      - rowheader [ref=e1472]:
                        - link [ref=e1479] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000DzCJJAA3/view
                          - generic [ref=e1480]: Rol - - employer_bridgenext
                      - gridcell [ref=e1481]:
                        - link [ref=e1487] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Fe1UbAAJ/view
                          - generic [ref=e1488]: employer_bridgenext
                      - gridcell [ref=e1489]
                      - gridcell [ref=e1490]:
                        - generic [ref=e1494]: New
                      - gridcell [ref=e1495]:
                        - generic [ref=e1500]: 4/15/2026
                      - gridcell [ref=e1501]:
                        - link [ref=e1507] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e1508]: ssija
                      - gridcell [ref=e1509]:
                        - button [ref=e1515] [cursor=pointer]:
                          - img [ref=e1517]
                          - generic [ref=e1520]: Show Actions
                    - row [ref=e1521]:
                      - gridcell [ref=e1522]
                      - gridcell [ref=e1526]:
                        - generic [ref=e1527]:
                          - checkbox [ref=e1528]
                          - generic [ref=e1531]: Select Item 17
                      - rowheader [ref=e1532]:
                        - link [ref=e1539] [cursor=pointer]:
                          - /url: /lightning/r/006dz00000Dz65rAAB/view
                          - generic [ref=e1540]: Rol - - employer_bridgenext
                      - gridcell [ref=e1541]:
                        - link [ref=e1547] [cursor=pointer]:
                          - /url: /lightning/r/001dz00000Fe1UbAAJ/view
                          - generic [ref=e1548]: employer_bridgenext
                      - gridcell [ref=e1549]
                      - gridcell [ref=e1550]:
                        - generic [ref=e1554]: New
                      - gridcell [ref=e1555]:
                        - generic [ref=e1560]: 4/15/2026
                      - gridcell [ref=e1561]:
                        - link [ref=e1567] [cursor=pointer]:
                          - /url: /lightning/r/005dz00000BSn13AAD/view
                          - generic [ref=e1568]: ssija
                      - gridcell [ref=e1569]:
                        - button [ref=e1575] [cursor=pointer]:
                          - img [ref=e1577]
                          - generic [ref=e1580]: Show Actions
          - text: · · · · ·
    - dialog "New Opportunity" [ref=e1586]:
      - generic [ref=e1587]:
        - button "Cancel and close" [active] [ref=e1588] [cursor=pointer]:
          - generic [ref=e1589]:
            - img
          - generic [ref=e1590]: Cancel and close
        - generic [ref=e1591]:
          - generic [ref=e1593]:
            - generic [ref=e1595]:
              - heading "New Opportunity" [level=2] [ref=e1596]
              - group "Select a record type" [ref=e1599]:
                - generic [ref=e1600]: Select a record type
                - generic [ref=e1601]:
                  - generic:
                    - generic:
                      - radio "Enrollment PFS Enrollment" [checked] [ref=e1603]
                      - generic [ref=e1605]:
                        - text: Enrollment
                        - generic [ref=e1606]: PFS Enrollment
                  - generic:
                    - generic:
                      - radio "Consolidation PFS Consolidation" [ref=e1608]
                      - generic [ref=e1610]:
                        - text: Consolidation
                        - generic [ref=e1611]: PFS Consolidation
                  - generic:
                    - generic:
                      - radio "Deferral RPS Deferral" [ref=e1613]
                      - generic [ref=e1615]:
                        - text: Deferral
                        - generic [ref=e1616]: RPS Deferral
                  - generic:
                    - generic:
                      - radio "Financial Center PFS Financial Center" [ref=e1618]
                      - generic [ref=e1620]:
                        - text: Financial Center
                        - generic [ref=e1621]: PFS Financial Center
                  - generic:
                    - generic:
                      - radio "In Plan Advice Record Type for In Plan Advice Opportunity" [ref=e1623]
                      - generic [ref=e1625]:
                        - text: In Plan Advice
                        - generic [ref=e1626]: Record Type for In Plan Advice Opportunity
                  - generic:
                    - generic:
                      - radio "NextCapital Rollover NextCapital Rollover" [ref=e1628]
                      - generic [ref=e1630]:
                        - text: NextCapital Rollover
                        - generic [ref=e1631]: NextCapital Rollover
                  - generic:
                    - generic:
                      - radio "Rollover PFS Rollover" [ref=e1633]
                      - generic [ref=e1635]:
                        - text: Rollover
                        - generic [ref=e1636]: PFS Rollover
                  - generic:
                    - generic:
                      - radio "TRS Consolidation TRS Consolidation" [ref=e1638]
                      - generic [ref=e1640]:
                        - text: TRS Consolidation
                        - generic [ref=e1641]: TRS Consolidation
            - generic [ref=e1643]:
              - button "Cancel" [ref=e1644] [cursor=pointer]:
                - generic [ref=e1645]: Cancel
              - button "Next" [ref=e1646] [cursor=pointer]:
                - generic [ref=e1647]: Next
          - status [ref=e1648]
  - generic:
    - status
```

# Test source

```ts
  30  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).getByRole('textbox', { name: 'Close Date' }),
  31  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).getByLabel('Close Date'),
  32  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).locator('input[name*="CloseDate"]'),
  33  |     ]);
  34  |   }
  35  | 
  36  |   private get stageCombobox() {
  37  |     return new ResilientLocator(this['page'], [
  38  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).getByRole('combobox', { name: 'Stage' }),
  39  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).getByLabel('Stage'),
  40  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).locator('button[name*="StageName"]'),
  41  |     ]);
  42  |   }
  43  | 
  44  |   private get saveButton() {
  45  |     return new ResilientLocator(this['page'], [
  46  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).getByRole('button', { name: 'Save', exact: true }),
  47  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).locator('button[name="SaveEdit"]'),
  48  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).locator('button').filter({ hasText: /^Save$/ }),
  49  |     ]);
  50  |   }
  51  | 
  52  |   private get nextButton() {
  53  |     return new ResilientLocator(this['page'], [
  54  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).getByRole('button', { name: 'Next', exact: true }),
  55  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).locator('button[name="Next"]'),
  56  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).locator('button').filter({ hasText: /^Next$/ }),
  57  |     ]);
  58  |   }
  59  | 
  60  |   private get accountNameLookupInput() {
  61  |     return new ResilientLocator(this['page'], [
  62  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).getByRole('combobox', { name: 'Account Name', exact: true }),
  63  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).getByLabel('Account Name', { exact: true }),
  64  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).locator('input[placeholder*="Search Accounts"]'),
  65  |     ]);
  66  |   }
  67  | 
  68  |   private get planLookupInput() {
  69  |     return new ResilientLocator(this['page'], [
  70  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).getByRole('combobox', { name: 'Plan', exact: true }),
  71  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).getByLabel('Plan', { exact: true }),
  72  |       (p) => p.getByRole('dialog', { name: 'New Opportunity' }).locator('input[placeholder*="Search Plans"]'),
  73  |     ]);
  74  |   }
  75  | 
  76  |   // ── Actions ───────────────────────────────────────────────────────────────
  77  | 
  78  |   async fillOpportunityName(name: string): Promise<void> {
  79  |     try {
  80  |       await this.opportunityNameInput.getLocator().fill(name);
  81  |     } catch (error) {
  82  |       console.error('Failed to fill Opportunity Name');
  83  |       throw error;
  84  |     }
  85  |   }
  86  | 
  87  |   async fillCloseDate(date: string): Promise<void> {
  88  |     try {
  89  |       await this.closeDateInput.getLocator().fill(date);
  90  |     } catch (error) {
  91  |       console.error('Failed to fill Close Date');
  92  |       throw error;
  93  |     }
  94  |   }
  95  | 
  96  |   async selectStage(stageName: string): Promise<void> {
  97  |     const combobox = this.stageCombobox.getLocator();
  98  |     const option = this.dialog.getByRole('option', { name: stageName });
  99  | 
  100 |     for (let attempt = 0; attempt < 3; attempt++) {
  101 |       try {
  102 |         await combobox.click({ timeout: 10_000 });
  103 |         await expect(option).toBeVisible({ timeout: 5_000 });
  104 |         await option.click();
  105 |         return;
  106 |       } catch { /* Dropdown closed by overlay — retry */ }
  107 |     }
  108 |     await combobox.click({ timeout: 10_000 });
  109 |     await expect(option).toBeVisible({ timeout: 5_000 });
  110 |     await option.click();
  111 |   }
  112 | 
  113 |   async clickSave(): Promise<void> {
  114 |     try {
  115 |       await this.saveButton.getLocator().click();
  116 |       await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
  117 |     } catch (error) {
  118 |       console.error('Failed to click Save');
  119 |       throw error;
  120 |     }
  121 |   }
  122 | 
  123 |   async selectRecordType(recordTypeName: string): Promise<void> {
  124 |     try {
  125 |       const radio = new ResilientLocator(this['page'], [
  126 |         (p) => p.getByRole('dialog', { name: 'New Opportunity' }).getByRole('radio', { name: recordTypeName, exact: true }),
  127 |         (p) => p.getByRole('dialog', { name: 'New Opportunity' }).locator(`label`).filter({ hasText: new RegExp(`^${recordTypeName}$`) }),
  128 |         (p) => p.getByRole('dialog', { name: 'New Opportunity' }).locator(`span.slds-radio__label`).filter({ hasText: new RegExp(`^${recordTypeName}$`) }),
  129 |       ]);
> 130 |       await radio.getLocator().click();
      |                                ^ Error: locator.click: Test timeout of 300000ms exceeded.
  131 |     } catch (error) {
  132 |       console.error(`Failed to select record type: ${recordTypeName}`);
  133 |       throw error;
  134 |     }
  135 |   }
  136 | 
  137 |   async clickNext(): Promise<void> {
  138 |     try {
  139 |       await this.nextButton.getLocator().click();
  140 |       await this['page'].locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
  141 |     } catch (error) {
  142 |       console.error('Failed to click Next on record type dialog');
  143 |       throw error;
  144 |     }
  145 |   }
  146 | 
  147 |   async fillAccountNameLookup(accountName: string): Promise<void> {
  148 |     try {
  149 |       await this.accountNameLookupInput.getLocator().fill(accountName);
  150 |     } catch (error) {
  151 |       console.error(`Failed to fill Account Name lookup with: ${accountName}`);
  152 |       throw error;
  153 |     }
  154 |   }
  155 | 
  156 |   async selectLookupOption(optionName: string): Promise<void> {
  157 |     try {
  158 |       const option = new ResilientLocator(this['page'], [
  159 |         (p) => p.getByRole('option', { name: optionName, exact: true }),
  160 |         (p) => p.locator(`[role="option"]`).filter({ hasText: new RegExp(`^${optionName}$`) }),
  161 |         (p) => p.locator(`[data-value="${optionName}"]`),
  162 |       ]);
  163 |       await expect(option.getLocator()).toBeVisible({ timeout: 10_000 });
  164 |       await option.getLocator().click();
  165 |     } catch (error) {
  166 |       console.error(`Failed to select lookup option: ${optionName}`);
  167 |       throw error;
  168 |     }
  169 |   }
  170 | 
  171 |   async fillPlanLookup(planName: string): Promise<void> {
  172 |     try {
  173 |       await this.planLookupInput.getLocator().fill(planName);
  174 |     } catch (error) {
  175 |       console.error(`Failed to fill Plan lookup with: ${planName}`);
  176 |       throw error;
  177 |     }
  178 |   }
  179 | }
  180 | 
```