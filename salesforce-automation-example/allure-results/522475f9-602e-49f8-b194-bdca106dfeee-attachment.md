# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: opportunity/create-classic-rollover-opportunity-fund-account.spec.ts >> Opportunity - Create Classic Rollover with Fund Account Selection @smoke >> should create classic rollover opportunity with fund account selection @smoke
- Location: tests/opportunity/create-classic-rollover-opportunity-fund-account.spec.ts:62:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('link', { name: /Fund Account Selections\[/ }) resolved to 2 elements:
    1) <a class="linklet" data-uidsfdc="25" id="006dz00000EDSck_00NG000000Dwu2H_link" href="#006dz00000EDSck_00NG000000Dwu2H_target">…</a> aka getByRole('link', { name: 'Fund Account Selections[0]', exact: true })
    2) <a class="linklet" data-uidsfdc="26" id="006dz00000EDSck_00N4R00000JODsv_link" href="#006dz00000EDSck_00N4R00000JODsv_target">…</a> aka getByRole('link', { name: 'Recommended Fund Account Selections[0]' })

Call log:
  - waiting for getByRole('link', { name: /Fund Account Selections\[/ })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#skiplink"
  - generic [ref=e3]:
    - generic [ref=e4]:
      - table [ref=e5]:
        - rowgroup [ref=e6]:
          - 'row "Salesforce.com Sandbox: DEVLM2 Switch to Lightning Experience Somya Sijaria SetupHelp & Training PFS" [ref=e7]':
            - cell "Salesforce.com" [ref=e8]:
              - img "Salesforce.com" [ref=e9]
            - 'cell "Sandbox: DEVLM2 Switch to Lightning Experience Somya Sijaria SetupHelp & Training PFS" [ref=e10]':
              - generic [ref=e11]:
                - generic [ref=e14]: "Sandbox: DEVLM2"
                - generic [ref=e17]:
                  - link "Switch to Lightning Experience" [ref=e18] [cursor=pointer]:
                    - /url: javascript:sfdcPage.handleSwitchToLightningClick(%27LightningExperiencePreferred%27,true,%27/ltng/switcher?destination=lex-campaign%27);
                    - img [ref=e19]
                    - text: Switch to Lightning Experience
                  - generic "User menu for Somya Sijaria" [ref=e23] [cursor=pointer]:
                    - generic [ref=e24]: Somya Sijaria
                  - link "Setup" [ref=e26] [cursor=pointer]:
                    - /url: /setup/forcecomHomepage.apexp?setupid=ForceCom&retURL=%2F006dz00000EDSck
                  - link "Help & Training" [ref=e27] [cursor=pointer]:
                    - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?resource=https%3A%2F%2Fhelp.salesforce.com%2F&version=2&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                - generic "App Menu" [ref=e29] [cursor=pointer]:
                  - generic [ref=e30]: PFS
      - navigation [ref=e33]:
        - heading "Tab Navigation" [level=1] [ref=e34]
        - navigation [ref=e35]:
          - list [ref=e36]:
            - listitem [ref=e37]:
              - link "Home" [ref=e38] [cursor=pointer]:
                - /url: /home/home.jsp
            - listitem [ref=e39]:
              - link "Tasks" [ref=e40] [cursor=pointer]:
                - /url: /servlet/servlet.Integration?lid=01rG0000000owZn&ic=1&linkToken=VmpFPSxNakF5Tmkwd05DMHhObFF3Tmpvd05Eb3pNeTQxTlRWYSxCTkp5clJva1RaSVpvcklfNVZjUjBobGVyeXVmaWJMVjVjYm9tS19HVFRRPSxZV1prTUdKaA%3D%3D
            - listitem [ref=e41]:
              - link "Leads" [ref=e42] [cursor=pointer]:
                - /url: /00Q/o
            - listitem [ref=e43]:
              - link "Campaigns" [ref=e44] [cursor=pointer]:
                - /url: /701/o
            - listitem [ref=e45]:
              - link "Accounts" [ref=e46] [cursor=pointer]:
                - /url: /001/o
            - listitem [ref=e47]:
              - link "Contacts" [ref=e48] [cursor=pointer]:
                - /url: /003/o
            - listitem [ref=e49]:
              - link "Opportunities" [ref=e50] [cursor=pointer]:
                - /url: /006/o
              - generic [ref=e51]: (Currently Selected)
            - listitem [ref=e52]:
              - link "Reports" [ref=e53] [cursor=pointer]:
                - /url: /00O/o
            - listitem [ref=e54]:
              - link "Dashboards" [ref=e55] [cursor=pointer]:
                - /url: /01Z/o
            - listitem [ref=e56]:
              - link "Thresholds" [ref=e57] [cursor=pointer]:
                - /url: /a1f/o
            - listitem [ref=e58]:
              - link "All Tabs" [ref=e59] [cursor=pointer]:
                - /url: /home/showAllTabs.jsp
                - img "All Tabs" [ref=e60]
    - table [ref=e62]:
      - rowgroup [ref=e63]:
        - row [ref=e64]:
          - cell "Click to Open Sidebar" [ref=e65]:
            - link "Click to Open Sidebar" [ref=e66]:
              - /url: javascript:void(0);
              - generic [ref=e67]: Click to Open Sidebar
          - cell [ref=e71]:
            - img "Content Starts Here" [ref=e72]
            - generic [ref=e74]:
              - generic [ref=e75]:
                - img "Opportunity" [ref=e76]
                - heading "Opportunity" [level=1] [ref=e77]
                - heading "Rol - - TestEmployer_1774952750468" [level=2] [ref=e78]
              - generic [ref=e79]:
                - link "Customize Page" [ref=e80] [cursor=pointer]:
                  - /url: /setup/ui/uiconfigrelatedlistsedit.jsp?retURL=%2F006dz00000EDSck&id=Opportunity
                - text: "|"
                - link "Edit Layout" [ref=e81] [cursor=pointer]:
                  - /url: /layouteditor/layoutEditor.apexp?type=Opportunity&lid=00h4R00000mxxnK&retURL=%2F006dz00000EDSck
                - text: "|"
                - link "Printable View" [ref=e82] [cursor=pointer]:
                  - /url: javascript:printWin(%27/006dz00000EDSck/p?retURL=%2F006dz00000EDSck%27)
                - text: "|"
                - link "Help for this Page" [ref=e83] [cursor=pointer]:
                  - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=opportunities.htm&section=Opportunities&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
            - generic [ref=e84]:
              - link "Digital Retention Interactions[0]" [ref=e85] [cursor=pointer]:
                - /url: "#006dz00000EDSck_00N4R00000IzlUS_target"
                - generic [ref=e86]: Digital Retention Interactions[0]
              - text: "|"
              - link "Recommendations[0]" [ref=e87] [cursor=pointer]:
                - /url: "#006dz00000EDSck_00N4R00000JODA2_target"
                - generic [ref=e88]: Recommendations[0]
              - text: "|"
              - link "Investment[0]" [ref=e89] [cursor=pointer]:
                - /url: "#006dz00000EDSck_00N4R00000JOD7z_target"
                - generic [ref=e90]: Investment[0]
              - text: "|"
              - link "Fund Account Selections[0]" [ref=e91] [cursor=pointer]:
                - /url: "#006dz00000EDSck_00NG000000Dwu2H_target"
                - generic [ref=e92]: Fund Account Selections[0]
              - text: "|"
              - link "Recommended Fund Account Selections[0]" [ref=e93] [cursor=pointer]:
                - /url: "#006dz00000EDSck_00N4R00000JODsv_target"
                - generic [ref=e94]: Recommended Fund Account Selections[0]
              - text: "|"
              - link "Open Activities[0]" [ref=e95] [cursor=pointer]:
                - /url: "#006dz00000EDSck_RelatedActivityList_target"
                - generic [ref=e96]: Open Activities[0]
              - text: "|"
              - link "Activity History[0]" [ref=e97] [cursor=pointer]:
                - /url: "#006dz00000EDSck_RelatedHistoryList_target"
                - generic [ref=e98]: Activity History[0]
              - text: "|"
              - link "DocuSign Status[0]" [ref=e99] [cursor=pointer]:
                - /url: "#006dz00000EDSck_00NG000000DwqLX_target"
                - generic [ref=e100]: DocuSign Status[0]
              - text: "|"
              - link "Opportunity Team[0]" [ref=e101] [cursor=pointer]:
                - /url: "#006dz00000EDSck_RelatedOpportunitySalesTeam_target"
                - generic [ref=e102]: Opportunity Team[0]
              - text: "|"
              - link "Campaign Influence[0]" [ref=e103] [cursor=pointer]:
                - /url: "#006dz00000EDSck_RelatedCampaignInfluenceList_target"
                - generic [ref=e104]: Campaign Influence[0]
              - text: "|"
              - link "Transaction Parties[0]" [ref=e105] [cursor=pointer]:
                - /url: "#006dz00000EDSck_00NG000000DwuAc_target"
                - generic [ref=e106]: Transaction Parties[0]
              - text: "|"
              - link "Contact Roles[0]" [ref=e107] [cursor=pointer]:
                - /url: "#006dz00000EDSck_RelatedContactRoleList_target"
                - generic [ref=e108]: Contact Roles[0]
              - text: "|"
              - link "Cases[0]" [ref=e109] [cursor=pointer]:
                - /url: "#006dz00000EDSck_00NG000000FDURj_target"
                - generic [ref=e110]: Cases[0]
              - text: "|"
              - link "Stage History[1]" [ref=e111] [cursor=pointer]:
                - /url: "#006dz00000EDSck_RelatedOpportunityHistoryList_target"
                - generic [ref=e112]: Stage History[1]
              - text: "|"
              - link "Opportunity Field History[2]" [ref=e113] [cursor=pointer]:
                - /url: "#006dz00000EDSck_RelatedEntityHistoryList_target"
                - generic [ref=e114]: Opportunity Field History[2]
              - text: "|"
              - link "Notes & Attachments[0]" [ref=e115] [cursor=pointer]:
                - /url: "#006dz00000EDSck_RelatedNoteList_target"
                - generic [ref=e116]: Notes & Attachments[0]
              - text: "|"
              - link "Approval History[0]" [ref=e117] [cursor=pointer]:
                - /url: "#006dz00000EDSck_RelatedProcessHistoryList_target"
                - generic [ref=e118]: Approval History[0]
            - generic [ref=e119]:
              - table [ref=e121]:
                - rowgroup [ref=e122]:
                  - row "Opportunity Detail Edit Delete Clone Rollover DDP Send with DocuSign Request Delete Send an Email Update Participant Online Distribution Status Update Digital Retention Interaction New Account Recommendation New Investment Recommendation Generate Documents" [ref=e123]:
                    - cell "Opportunity Detail" [ref=e124]:
                      - heading "Opportunity Detail" [level=2] [ref=e125]
                    - cell "Edit Delete Clone Rollover DDP Send with DocuSign Request Delete Send an Email Update Participant Online Distribution Status Update Digital Retention Interaction New Account Recommendation New Investment Recommendation Generate Documents" [ref=e126]:
                      - button "Edit" [ref=e127] [cursor=pointer]
                      - button "Delete" [ref=e128] [cursor=pointer]
                      - button "Clone" [ref=e129] [cursor=pointer]
                      - button "Rollover DDP" [ref=e130] [cursor=pointer]
                      - button "Send with DocuSign" [ref=e131] [cursor=pointer]
                      - button "Request Delete" [ref=e132] [cursor=pointer]
                      - button "Send an Email" [ref=e133] [cursor=pointer]
                      - button "Update Participant Online Distribution Status" [ref=e134] [cursor=pointer]
                      - button "Update Digital Retention Interaction" [ref=e135] [cursor=pointer]
                      - button "New Account Recommendation" [ref=e136] [cursor=pointer]
                      - button "New Investment Recommendation" [ref=e137] [cursor=pointer]
                      - button "Generate Documents" [ref=e138] [cursor=pointer]
              - generic [ref=e139]:
                - table [ref=e141]:
                  - rowgroup [ref=e142]:
                    - row "Opportunity Name Rol - - TestEmployer_1774952750468 Opportunity Owner Somya Sijaria [Change]" [ref=e143]:
                      - cell "Opportunity Name" [ref=e144]
                      - cell "Rol - - TestEmployer_1774952750468" [ref=e145]:
                        - generic [ref=e146]: Rol - - TestEmployer_1774952750468
                      - cell "Opportunity Owner" [ref=e147]
                      - cell "Somya Sijaria [Change]" [ref=e148]:
                        - generic [ref=e149]:
                          - link "Somya Sijaria" [ref=e150] [cursor=pointer]:
                            - /url: /005dz00000BSn13
                          - link "[Change]" [ref=e151] [cursor=pointer]:
                            - /url: /006dz00000EDSck/a?retURL=%2F006dz00000EDSck
                    - row "Account Name TestEmployer_1774952750468 Opportunity Owner Text Somya Sijaria" [ref=e152]:
                      - cell "Account Name" [ref=e153]
                      - cell "TestEmployer_1774952750468" [ref=e154]:
                        - link "TestEmployer_1774952750468" [ref=e156] [cursor=pointer]:
                          - /url: /001dz00000FlHXt
                      - cell "Opportunity Owner Text" [ref=e157]
                      - cell "Somya Sijaria" [ref=e158]:
                        - generic [ref=e159]: Somya Sijaria
                    - row "Plan TestPlan_1775123097206 Opportunity Record Type Rollover [Change]" [ref=e160]:
                      - cell "Plan" [ref=e161]
                      - cell "TestPlan_1775123097206" [ref=e162]:
                        - link "TestPlan_1775123097206" [ref=e164] [cursor=pointer]:
                          - /url: /a0edz000001H55x
                      - cell "Opportunity Record Type" [ref=e165]
                      - cell "Rollover [Change]" [ref=e166]:
                        - generic [ref=e167]:
                          - text: Rollover
                          - link "[Change]" [ref=e168] [cursor=pointer]:
                            - /url: /setup/ui/recordtypeselect.jsp?id=006dz00000EDSck&retURL=%2F006dz00000EDSck
                    - row "Spanish Speaker Not Checked Stage New" [ref=e169]:
                      - cell "Spanish Speaker" [ref=e170]
                      - cell "Not Checked" [ref=e171]:
                        - img "Not Checked" [ref=e173]
                      - cell "Stage" [ref=e174]
                      - cell "New" [ref=e175]:
                        - generic [ref=e176]: New
                    - row "Plan Term Not Checked Type Rollover" [ref=e177]:
                      - cell "Plan Term" [ref=e178]
                      - cell "Not Checked" [ref=e179]:
                        - img "Not Checked" [ref=e181]
                      - cell "Type" [ref=e182]
                      - cell "Rollover" [ref=e183]:
                        - generic [ref=e184]: Rollover
                    - row "Forms Due Date Plan Product Signature" [ref=e185]:
                      - cell "Forms Due Date" [ref=e186]
                      - cell [ref=e187]
                      - cell "Plan Product" [ref=e189]
                      - cell "Signature" [ref=e190]:
                        - generic [ref=e191]: Signature
                    - row "JH Due Date Type Status" [ref=e192]:
                      - cell "JH Due Date" [ref=e193]
                      - cell [ref=e194]
                      - cell "Type Status" [ref=e196]
                      - cell [ref=e197]
                    - row "Plan Deconversion Not Checked DEF Future Approved Not Checked" [ref=e199]:
                      - cell "Plan Deconversion" [ref=e200]
                      - cell "Not Checked" [ref=e201]:
                        - img "Not Checked" [ref=e203]
                      - cell "DEF Future Approved" [ref=e204]
                      - cell "Not Checked" [ref=e205]:
                        - img "Not Checked" [ref=e207]
                    - row "Priority DEF Approved Date" [ref=e208]:
                      - cell "Priority" [ref=e209]
                      - cell [ref=e210]
                      - cell "DEF Approved Date" [ref=e212]
                      - cell [ref=e213]
                    - row "Survey Opt Out Not Checked Probability (%) 10%" [ref=e215]:
                      - cell "Survey Opt Out" [ref=e216]
                      - cell "Not Checked" [ref=e217]:
                        - img "Not Checked" [ref=e219]
                      - cell "Probability (%)" [ref=e220]
                      - cell "10%" [ref=e221]:
                        - generic [ref=e222]: 10%
                    - row "Registration Type MJHBS Participant Online Distribution Allowed Not Checked" [ref=e223]:
                      - cell "Registration Type" [ref=e224]
                      - cell "MJHBS" [ref=e225]:
                        - generic [ref=e226]: MJHBS
                      - cell "Participant Online Distribution Allowed" [ref=e227]:
                        - generic [ref=e228]: Participant Online Distribution Allowed
                      - cell "Not Checked" [ref=e229]:
                        - img "Not Checked" [ref=e231]
                    - row "Approval Status Digital Retention Source? Not Checked" [ref=e232]:
                      - cell "Approval Status" [ref=e233]
                      - cell [ref=e234]
                      - cell "Digital Retention Source?" [ref=e236]
                      - cell "Not Checked" [ref=e237]:
                        - img "Not Checked" [ref=e239]
                    - row "Account Recommendation Not Checked JHSS NIGO Reason" [ref=e240]:
                      - cell "Account Recommendation" [ref=e241]
                      - cell "Not Checked" [ref=e242]:
                        - img "Not Checked" [ref=e244]
                      - cell "JHSS NIGO Reason" [ref=e245]
                      - cell [ref=e246]
                    - row "Investment Recommendation Not Checked Send Signed PPWK Issue" [ref=e248]:
                      - cell "Investment Recommendation" [ref=e249]
                      - cell "Not Checked" [ref=e250]:
                        - img "Not Checked" [ref=e252]
                      - cell "Send Signed PPWK Issue" [ref=e253]
                      - cell [ref=e254]
                - generic [ref=e256]:
                  - button "Hide Section - Other Information" [ref=e257] [cursor=pointer]
                  - heading "Other Information" [level=3] [ref=e258]
                - table [ref=e260]:
                  - rowgroup [ref=e261]:
                    - row "Amount Actual Amount" [ref=e262]:
                      - cell "Amount" [ref=e263]
                      - cell [ref=e264]
                      - cell "Actual Amount" [ref=e266]
                      - cell [ref=e267]
                    - row "Total Account Balance $0.00 Actual Destination" [ref=e269]:
                      - cell "Total Account Balance" [ref=e270]
                      - cell "$0.00" [ref=e271]:
                        - generic [ref=e272]: $0.00
                      - cell "Actual Destination" [ref=e273]
                      - cell [ref=e274]
                    - row "Rollover Amount $0.00 Actual Close Date" [ref=e276]:
                      - cell "Rollover Amount" [ref=e277]
                      - cell "$0.00" [ref=e278]:
                        - generic [ref=e279]: $0.00
                      - cell "Actual Close Date" [ref=e280]
                      - cell [ref=e281]
                    - row "Rollover % Total Outbound Contact Task Count 0" [ref=e283]:
                      - cell "Rollover %" [ref=e284]:
                        - generic [ref=e285]: Rollover %
                      - cell [ref=e286]
                      - cell "Total Outbound Contact Task Count" [ref=e288]:
                        - generic [ref=e289]: Total Outbound Contact Task Count
                      - cell "0" [ref=e290]:
                        - generic [ref=e291]: "0"
                    - row "Close Date 4/27/2026" [ref=e292]:
                      - cell "Close Date" [ref=e293]
                      - cell "4/27/2026" [ref=e294]:
                        - generic [ref=e295]: 4/27/2026
                      - cell [ref=e296]
                      - cell [ref=e297]
                - generic [ref=e298]:
                  - button "Hide Section - Withdrawal Details" [ref=e299] [cursor=pointer]
                  - heading "Withdrawal Details" [level=3] [ref=e300]
                - table [ref=e302]:
                  - rowgroup [ref=e303]:
                    - row "Do not send PPWK Not Checked CAR has completed WDF Not Checked" [ref=e304]:
                      - cell "Do not send PPWK" [ref=e305]:
                        - generic [ref=e306]: Do not send PPWK
                      - cell "Not Checked" [ref=e307]:
                        - img "Not Checked" [ref=e309]
                      - cell "CAR has completed WDF" [ref=e310]:
                        - generic [ref=e311]: CAR has completed WDF
                      - cell "Not Checked" [ref=e312]:
                        - img "Not Checked" [ref=e314]
                    - row "Reason For Withdrawal Directed PPT to TPA/PS for WDF Not Checked" [ref=e315]:
                      - cell "Reason For Withdrawal" [ref=e316]
                      - cell [ref=e317]
                      - cell "Directed PPT to TPA/PS for WDF" [ref=e319]:
                        - generic [ref=e320]: Directed PPT to TPA/PS for WDF
                      - cell "Not Checked" [ref=e321]:
                        - img "Not Checked" [ref=e323]
                    - row "Termination Date PPT already sent WDF to PS Not Checked" [ref=e324]:
                      - cell "Termination Date" [ref=e325]
                      - cell [ref=e326]
                      - cell "PPT already sent WDF to PS" [ref=e328]:
                        - generic [ref=e329]: PPT already sent WDF to PS
                      - cell "Not Checked" [ref=e330]:
                        - img "Not Checked" [ref=e332]
                    - row "Retirement Date PPT already sent WDF to TPA Not Checked" [ref=e333]:
                      - cell "Retirement Date" [ref=e334]
                      - cell [ref=e335]
                      - cell "PPT already sent WDF to TPA" [ref=e337]:
                        - generic [ref=e338]: PPT already sent WDF to TPA
                      - cell "Not Checked" [ref=e339]:
                        - img "Not Checked" [ref=e341]
                    - row "Direct Rollover Not Checked Assisted PPT with WDDEATH – Non Spouse Not Checked" [ref=e342]:
                      - cell "Direct Rollover" [ref=e343]
                      - cell "Not Checked" [ref=e344]:
                        - img "Not Checked" [ref=e346]
                      - cell "Assisted PPT with WDDEATH – Non Spouse" [ref=e347]:
                        - generic [ref=e348]: Assisted PPT with WDDEATH – Non Spouse
                      - cell "Not Checked" [ref=e349]:
                        - img "Not Checked" [ref=e351]
                    - row "Pay Directly Lump Sum & Rollover Balance Not Checked Assisted PPT with WDDEATH form – Spouse Not Checked" [ref=e352]:
                      - cell "Pay Directly Lump Sum & Rollover Balance" [ref=e353]:
                        - generic [ref=e354]: Pay Directly Lump Sum & Rollover Balance
                      - cell "Not Checked" [ref=e355]:
                        - img "Not Checked" [ref=e357]
                      - cell "Assisted PPT with WDDEATH form – Spouse" [ref=e358]:
                        - generic [ref=e359]: Assisted PPT with WDDEATH form – Spouse
                      - cell "Not Checked" [ref=e360]:
                        - img "Not Checked" [ref=e362]
                    - row "Lump Sum Amount $ Assisted PPT with QDRO WDF Not Checked" [ref=e363]:
                      - cell "Lump Sum Amount $" [ref=e364]
                      - cell [ref=e365]
                      - cell "Assisted PPT with QDRO WDF" [ref=e367]:
                        - generic [ref=e368]: Assisted PPT with QDRO WDF
                      - cell "Not Checked" [ref=e369]:
                        - img "Not Checked" [ref=e371]
                    - row "Lump Sum Percent % Assisted with I-Withdrawal Not Checked" [ref=e372]:
                      - cell "Lump Sum Percent %" [ref=e373]
                      - cell [ref=e374]
                      - cell "Assisted with I-Withdrawal" [ref=e376]:
                        - generic [ref=e377]: Assisted with I-Withdrawal
                      - cell "Not Checked" [ref=e378]:
                        - img "Not Checked" [ref=e380]
                - generic [ref=e381]:
                  - button "Hide Section - Additional Paperwork" [ref=e382] [cursor=pointer]
                  - heading "Additional Paperwork" [level=3] [ref=e383]
                - table [ref=e385]:
                  - rowgroup [ref=e386]:
                    - row "Emailed Special Tax Notice Not Checked Emailed ABI form Not Checked" [ref=e387]:
                      - cell "Emailed Special Tax Notice" [ref=e388]
                      - cell "Not Checked" [ref=e389]:
                        - img "Not Checked" [ref=e391]
                      - cell "Emailed ABI form" [ref=e392]
                      - cell "Not Checked" [ref=e393]:
                        - img "Not Checked" [ref=e395]
                    - row "Emailed Spousal Consent Not Checked Sent RMD form Not Checked" [ref=e396]:
                      - cell "Emailed Spousal Consent" [ref=e397]
                      - cell "Not Checked" [ref=e398]:
                        - img "Not Checked" [ref=e400]
                      - cell "Sent RMD form" [ref=e401]
                      - cell "Not Checked" [ref=e402]:
                        - img "Not Checked" [ref=e404]
                    - row "Emailed TPA Specific PPWK Not Checked" [ref=e405]:
                      - cell "Emailed TPA Specific PPWK" [ref=e406]
                      - cell "Not Checked" [ref=e407]:
                        - img "Not Checked" [ref=e409]
                      - cell [ref=e410]
                      - cell [ref=e411]
                - generic [ref=e412]:
                  - button "Hide Section - IRA Details" [ref=e413] [cursor=pointer]
                  - heading "IRA Details" [level=3] [ref=e414]
                - table [ref=e416]:
                  - rowgroup [ref=e417]:
                    - row "eDelivery Not Checked % of Investment in Traditional 0%" [ref=e418]:
                      - cell "eDelivery" [ref=e419]
                      - cell "Not Checked" [ref=e420]:
                        - img "Not Checked" [ref=e422]
                      - cell "% of Investment in Traditional" [ref=e423]
                      - cell "0%" [ref=e424]:
                        - generic [ref=e425]: 0%
                    - row "Sales Charge Reduction % of Investment in Roth 0%" [ref=e426]:
                      - cell "Sales Charge Reduction" [ref=e427]
                      - cell [ref=e428]
                      - cell "% of Investment in Roth" [ref=e430]
                      - cell "0%" [ref=e431]:
                        - generic [ref=e432]: 0%
                    - row "% of Investment in Inherited Roth 0%" [ref=e433]:
                      - cell [ref=e434]
                      - cell [ref=e435]
                      - cell "% of Investment in Inherited Roth" [ref=e436]
                      - cell "0%" [ref=e437]:
                        - generic [ref=e438]: 0%
                    - row "% of Investment in Inherited Trad 0%" [ref=e439]:
                      - cell [ref=e440]
                      - cell [ref=e441]
                      - cell "% of Investment in Inherited Trad" [ref=e442]
                      - cell "0%" [ref=e443]:
                        - generic [ref=e444]: 0%
                - generic [ref=e445]:
                  - button "Hide Section - Employment Details" [ref=e446] [cursor=pointer]
                  - heading "Employment Details" [level=3] [ref=e447]
                - table [ref=e449]:
                  - rowgroup [ref=e450]:
                    - row "Employment Status Employer Name" [ref=e451]:
                      - cell "Employment Status" [ref=e452]
                      - cell [ref=e453]
                      - cell "Employer Name" [ref=e455]
                      - cell [ref=e456]
                    - row "Occupation Employer Address" [ref=e458]:
                      - cell "Occupation" [ref=e459]
                      - cell [ref=e460]
                      - cell "Employer Address" [ref=e462]
                      - cell [ref=e463]
                - generic [ref=e465]:
                  - button "Hide Section - Affiliation" [ref=e466] [cursor=pointer]
                  - heading "Affiliation" [level=3] [ref=e467]
                - table [ref=e469]:
                  - rowgroup [ref=e470]:
                    - row "No to all affiliation questions Not Checked Member of the board?" [ref=e471]:
                      - cell "No to all affiliation questions" [ref=e472]
                      - cell "Not Checked" [ref=e473]:
                        - img "Not Checked" [ref=e475]
                      - cell "Member of the board?" [ref=e476]:
                        - generic [ref=e477]: Member of the board?
                      - cell [ref=e478]
                    - row "Are you affiliated with a Broker Dealer? Company Name" [ref=e480]:
                      - cell "Are you affiliated with a Broker Dealer?" [ref=e481]
                      - cell [ref=e482]
                      - cell "Company Name" [ref=e484]
                      - cell [ref=e485]
                    - row "Broker Dealer Name Ticker Symbol" [ref=e487]:
                      - cell "Broker Dealer Name" [ref=e488]
                      - cell [ref=e489]
                      - cell "Ticker Symbol" [ref=e491]
                      - cell [ref=e492]
                    - row "Broker Dealer Address Political figure?" [ref=e494]:
                      - cell "Broker Dealer Address" [ref=e495]
                      - cell [ref=e496]
                      - cell "Political figure?" [ref=e498]:
                        - generic [ref=e499]: Political figure?
                      - cell [ref=e500]
                - generic [ref=e502]:
                  - button "Hide Section - Trusted Contact" [ref=e503] [cursor=pointer]
                  - heading "Trusted Contact" [level=3] [ref=e504]
                - table [ref=e506]:
                  - rowgroup [ref=e507]:
                    - row "Declined to provide? Not Checked Email" [ref=e508]:
                      - cell "Declined to provide?" [ref=e509]
                      - cell "Not Checked" [ref=e510]:
                        - img "Not Checked" [ref=e512]
                      - cell "Email" [ref=e513]
                      - cell [ref=e514]
                    - row "First Name Address" [ref=e516]:
                      - cell "First Name" [ref=e517]
                      - cell [ref=e518]
                      - cell "Address" [ref=e520]
                      - cell [ref=e521]
                    - row "Last Name Phone Number" [ref=e523]:
                      - cell "Last Name" [ref=e524]
                      - cell [ref=e525]
                      - cell "Phone Number" [ref=e527]
                      - cell [ref=e528]
                    - row "Relationship" [ref=e530]:
                      - cell "Relationship" [ref=e531]
                      - cell [ref=e532]
                      - cell [ref=e534]
                      - cell [ref=e535]
                - generic [ref=e536]:
                  - button "Hide Section - Beneficiary Information" [ref=e537] [cursor=pointer]
                  - heading "Beneficiary Information" [level=3] [ref=e538]
                - table [ref=e540]:
                  - rowgroup [ref=e541]:
                    - row "Primary Beneficiary Name 1 Secondary Beneficiary Name 1" [ref=e542]:
                      - cell "Primary Beneficiary Name 1" [ref=e543]
                      - cell [ref=e544]
                      - cell "Secondary Beneficiary Name 1" [ref=e546]
                      - cell [ref=e547]
                    - row "Primary % Share 1 Secondary % Share 1" [ref=e549]:
                      - cell "Primary % Share 1" [ref=e550]
                      - cell [ref=e551]
                      - cell "Secondary % Share 1" [ref=e553]
                      - cell [ref=e554]
                    - row "Primary DOB 1 Secondary DOB 1" [ref=e556]:
                      - cell "Primary DOB 1" [ref=e557]
                      - cell [ref=e558]
                      - cell "Secondary DOB 1" [ref=e560]
                      - cell [ref=e561]
                    - row "Primary Relationship to Owner 1 Secondary Relationship to Owner 1" [ref=e563]:
                      - cell "Primary Relationship to Owner 1" [ref=e564]
                      - cell [ref=e565]
                      - cell "Secondary Relationship to Owner 1" [ref=e567]
                      - cell [ref=e568]
                    - row [ref=e570]:
                      - cell [ref=e571]
                      - cell [ref=e572]
                      - cell [ref=e573]
                      - cell [ref=e574]
                    - row "Primary Beneficiary Name 2 Secondary Beneficiary Name 2" [ref=e575]:
                      - cell "Primary Beneficiary Name 2" [ref=e576]
                      - cell [ref=e577]
                      - cell "Secondary Beneficiary Name 2" [ref=e579]
                      - cell [ref=e580]
                    - row "Primary % Share 2 Secondary % Share 2" [ref=e582]:
                      - cell "Primary % Share 2" [ref=e583]
                      - cell [ref=e584]
                      - cell "Secondary % Share 2" [ref=e586]
                      - cell [ref=e587]
                    - row "Primary DOB 2 Secondary DOB 2" [ref=e589]:
                      - cell "Primary DOB 2" [ref=e590]
                      - cell [ref=e591]
                      - cell "Secondary DOB 2" [ref=e593]
                      - cell [ref=e594]
                    - row "Primary Relationship to Owner 2 Secondary Relationship to Owner 2" [ref=e596]:
                      - cell "Primary Relationship to Owner 2" [ref=e597]
                      - cell [ref=e598]
                      - cell "Secondary Relationship to Owner 2" [ref=e600]
                      - cell [ref=e601]
                    - row [ref=e603]:
                      - cell [ref=e604]
                      - cell [ref=e605]
                      - cell [ref=e606]
                      - cell [ref=e607]
                    - row "Primary Beneficiary Name 3 Secondary Beneficiary Name 3" [ref=e608]:
                      - cell "Primary Beneficiary Name 3" [ref=e609]
                      - cell [ref=e610]
                      - cell "Secondary Beneficiary Name 3" [ref=e612]
                      - cell [ref=e613]
                    - row "Primary % Share 3 Secondary % Share 3" [ref=e615]:
                      - cell "Primary % Share 3" [ref=e616]
                      - cell [ref=e617]
                      - cell "Secondary % Share 3" [ref=e619]
                      - cell [ref=e620]
                    - row "Primary DOB 3 Secondary DOB 3" [ref=e622]:
                      - cell "Primary DOB 3" [ref=e623]
                      - cell [ref=e624]
                      - cell "Secondary DOB 3" [ref=e626]
                      - cell [ref=e627]
                    - row "Primary Relationship to Owner 3 Secondary Relationship to Owner 3" [ref=e629]:
                      - cell "Primary Relationship to Owner 3" [ref=e630]
                      - cell [ref=e631]
                      - cell "Secondary Relationship to Owner 3" [ref=e633]
                      - cell [ref=e634]
                - generic [ref=e636]:
                  - button "Hide Section - TOA Information" [ref=e637] [cursor=pointer]
                  - heading "TOA Information" [level=3] [ref=e638]
                - table [ref=e640]:
                  - rowgroup [ref=e641]:
                    - row "Create Secondary Opportunity for TOA Not Checked Statement Received Not Checked" [ref=e642]:
                      - cell "Create Secondary Opportunity for TOA" [ref=e643]
                      - cell "Not Checked" [ref=e644]:
                        - img "Not Checked" [ref=e646]
                      - cell "Statement Received" [ref=e647]:
                        - generic [ref=e648]: Statement Received
                      - cell "Not Checked" [ref=e649]:
                        - img "Not Checked" [ref=e651]
                    - row "TOA Amount Rollover Service Specialist" [ref=e652]:
                      - cell "TOA Amount" [ref=e653]:
                        - generic [ref=e654]: TOA Amount
                      - cell [ref=e655]
                      - cell "Rollover Service Specialist" [ref=e657]:
                        - generic [ref=e658]: Rollover Service Specialist
                      - cell [ref=e659]
                    - row "Carrier" [ref=e661]:
                      - cell "Carrier" [ref=e662]
                      - cell [ref=e663]
                      - cell [ref=e665]
                      - cell [ref=e666]
                - generic [ref=e667]:
                  - button "Hide Section - Additional Information" [ref=e668] [cursor=pointer]
                  - heading "Additional Information" [level=3] [ref=e669]
                - table [ref=e671]:
                  - rowgroup [ref=e672]:
                    - row "Primary Campaign Source Lead Source" [ref=e673]:
                      - cell "Primary Campaign Source" [ref=e674]
                      - cell [ref=e675]
                      - cell "Lead Source" [ref=e677]
                      - cell [ref=e678]
                    - row "Primary Campaign Type Main Competitor(s)" [ref=e680]:
                      - cell "Primary Campaign Type" [ref=e681]
                      - cell [ref=e682]
                      - cell "Main Competitor(s)" [ref=e683]
                      - cell [ref=e684]
                - generic [ref=e686]:
                  - button "Hide Section - System Information" [ref=e687] [cursor=pointer]
                  - heading "System Information" [level=3] [ref=e688]
                - table [ref=e690]:
                  - rowgroup [ref=e691]:
                    - row "Created By Somya Sijaria, 4/13/2026, 2:04 AM CDL External Key" [ref=e692]:
                      - cell "Created By" [ref=e693]
                      - cell "Somya Sijaria, 4/13/2026, 2:04 AM" [ref=e694]:
                        - generic [ref=e695]:
                          - link "Somya Sijaria" [ref=e696] [cursor=pointer]:
                            - /url: /005dz00000BSn13
                          - text: ", 4/13/2026, 2:04 AM"
                      - cell "CDL External Key" [ref=e697]
                      - cell [ref=e698]
                    - row "Last Modified By Somya Sijaria, 4/13/2026, 2:04 AM Referring RES" [ref=e700]:
                      - cell "Last Modified By" [ref=e701]
                      - cell "Somya Sijaria, 4/13/2026, 2:04 AM" [ref=e702]:
                        - generic [ref=e703]:
                          - link "Somya Sijaria" [ref=e704] [cursor=pointer]:
                            - /url: /005dz00000BSn13
                          - text: ", 4/13/2026, 2:04 AM"
                      - cell "Referring RES" [ref=e705]
                      - cell [ref=e706]
                - generic [ref=e708]:
                  - button "Hide Section - Plan Details Report" [ref=e709] [cursor=pointer]
                  - heading "Plan Details Report" [level=3] [ref=e710]
                - table [ref=e712]:
                  - rowgroup [ref=e713]:
                    - row "InlinePlanDetailReportOpportunity" [ref=e714]:
                      - cell "InlinePlanDetailReportOpportunity" [ref=e715]:
                        - iframe [ref=e716]:
                          - generic [active] [ref=f14e1]:
                            - heading "No Plans to display" [level=2] [ref=f14e4]
                            - iframe [ref=f14e6]:
                              
              - table [ref=e718]:
                - rowgroup [ref=e719]:
                  - row "Edit Delete Clone Rollover DDP Send with DocuSign Request Delete Send an Email Update Participant Online Distribution Status Update Digital Retention Interaction New Account Recommendation New Investment Recommendation Generate Documents" [ref=e720]:
                    - cell [ref=e721]
                    - cell "Edit Delete Clone Rollover DDP Send with DocuSign Request Delete Send an Email Update Participant Online Distribution Status Update Digital Retention Interaction New Account Recommendation New Investment Recommendation Generate Documents" [ref=e722]:
                      - button "Edit" [ref=e723] [cursor=pointer]
                      - button "Delete" [ref=e724] [cursor=pointer]
                      - button "Clone" [ref=e725] [cursor=pointer]
                      - button "Rollover DDP" [ref=e726] [cursor=pointer]
                      - button "Send with DocuSign" [ref=e727] [cursor=pointer]
                      - button "Request Delete" [ref=e728] [cursor=pointer]
                      - button "Send an Email" [ref=e729] [cursor=pointer]
                      - button "Update Participant Online Distribution Status" [ref=e730] [cursor=pointer]
                      - button "Update Digital Retention Interaction" [ref=e731] [cursor=pointer]
                      - button "New Account Recommendation" [ref=e732] [cursor=pointer]
                      - button "New Investment Recommendation" [ref=e733] [cursor=pointer]
                      - button "Generate Documents" [ref=e734] [cursor=pointer]
            - generic [ref=e737]:
              - table [ref=e739]:
                - rowgroup [ref=e740]:
                  - row "Digital Retention Interactions New Digital Retention Interaction Digital Retention Interactions Help Digital Retention Interactions Help (New Window)" [ref=e741]:
                    - cell "Digital Retention Interactions" [ref=e742]:
                      - heading "Digital Retention Interactions" [level=3] [ref=e743]
                    - cell "New Digital Retention Interaction" [ref=e744]:
                      - button "New Digital Retention Interaction" [ref=e745] [cursor=pointer]
                    - cell "Digital Retention Interactions Help Digital Retention Interactions Help (New Window)" [ref=e746]:
                      - generic "Digital Retention Interactions Help (New Window)" [ref=e747]:
                        - link "Digital Retention Interactions Help Digital Retention Interactions Help (New Window)" [ref=e748] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=co_relatedlist.htm&section=CustomObjects&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Digital Retention Interactions Help
                          - img "Digital Retention Interactions Help (New Window)" [ref=e749]
              - table [ref=e751]:
                - rowgroup [ref=e752]:
                  - row "No records to display" [ref=e753]:
                    - columnheader "No records to display" [ref=e754]
            - generic [ref=e757]:
              - table [ref=e759]:
                - rowgroup [ref=e760]:
                  - row "Recommendations Recommendations Help Recommendations Help (New Window)" [ref=e761]:
                    - cell "Recommendations" [ref=e762]:
                      - heading "Recommendations" [level=3] [ref=e763]
                    - cell [ref=e764]
                    - cell "Recommendations Help Recommendations Help (New Window)" [ref=e765]:
                      - generic "Recommendations Help (New Window)" [ref=e766]:
                        - link "Recommendations Help Recommendations Help (New Window)" [ref=e767] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=co_relatedlist.htm&section=CustomObjects&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Recommendations Help
                          - img "Recommendations Help (New Window)" [ref=e768]
              - table [ref=e770]:
                - rowgroup [ref=e771]:
                  - row "No records to display" [ref=e772]:
                    - columnheader "No records to display" [ref=e773]
            - generic [ref=e776]:
              - table [ref=e778]:
                - rowgroup [ref=e779]:
                  - row "Investment Investment Help Investment Help (New Window)" [ref=e780]:
                    - cell "Investment" [ref=e781]:
                      - heading "Investment" [level=3] [ref=e782]
                    - cell [ref=e783]
                    - cell "Investment Help Investment Help (New Window)" [ref=e784]:
                      - generic "Investment Help (New Window)" [ref=e785]:
                        - link "Investment Help Investment Help (New Window)" [ref=e786] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=co_relatedlist.htm&section=CustomObjects&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Investment Help
                          - img "Investment Help (New Window)" [ref=e787]
              - table [ref=e789]:
                - rowgroup [ref=e790]:
                  - row "No records to display" [ref=e791]:
                    - columnheader "No records to display" [ref=e792]
            - generic [ref=e796]:
              - table [ref=e798]:
                - rowgroup [ref=e799]:
                  - row "Fund Account Selection Fund Account Selections New Fund Account Selection Fund Account Selections Help Fund Account Selections Help (New Window)" [ref=e800]:
                    - cell "Fund Account Selection Fund Account Selections" [ref=e801]:
                      - img "Fund Account Selection" [ref=e802]
                      - heading "Fund Account Selections" [level=3] [ref=e803]
                    - cell "New Fund Account Selection" [ref=e804]:
                      - button "New Fund Account Selection" [ref=e805] [cursor=pointer]
                    - cell "Fund Account Selections Help Fund Account Selections Help (New Window)" [ref=e806]:
                      - generic "Fund Account Selections Help (New Window)" [ref=e807]:
                        - link "Fund Account Selections Help Fund Account Selections Help (New Window)" [ref=e808] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=co_relatedlist.htm&section=CustomObjects&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Fund Account Selections Help
                          - img "Fund Account Selections Help (New Window)" [ref=e809]
              - table [ref=e811]:
                - rowgroup [ref=e812]:
                  - row "No records to display" [ref=e813]:
                    - columnheader "No records to display" [ref=e814]
            - generic [ref=e817]:
              - table [ref=e819]:
                - rowgroup [ref=e820]:
                  - row "Recommended Fund Account Selections Recommended Fund Account Selections Help Recommended Fund Account Selections Help (New Window)" [ref=e821]:
                    - cell "Recommended Fund Account Selections" [ref=e822]:
                      - heading "Recommended Fund Account Selections" [level=3] [ref=e823]
                    - cell [ref=e824]
                    - cell "Recommended Fund Account Selections Help Recommended Fund Account Selections Help (New Window)" [ref=e825]:
                      - generic "Recommended Fund Account Selections Help (New Window)" [ref=e826]:
                        - link "Recommended Fund Account Selections Help Recommended Fund Account Selections Help (New Window)" [ref=e827] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=co_relatedlist.htm&section=CustomObjects&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Recommended Fund Account Selections Help
                          - img "Recommended Fund Account Selections Help (New Window)" [ref=e828]
              - table [ref=e830]:
                - rowgroup [ref=e831]:
                  - row "No records to display" [ref=e832]:
                    - columnheader "No records to display" [ref=e833]
            - generic [ref=e837]:
              - table [ref=e839]:
                - rowgroup [ref=e840]:
                  - row "Open Activities New Task Send an Email Open Activities Help Open Activities Help (New Window)" [ref=e841]:
                    - cell "Open Activities" [ref=e842]:
                      - heading "Open Activities" [level=3] [ref=e843]
                    - cell "New Task Send an Email" [ref=e844]:
                      - button "New Task" [ref=e845] [cursor=pointer]
                      - button "Send an Email" [ref=e846] [cursor=pointer]
                    - cell "Open Activities Help Open Activities Help (New Window)" [ref=e847]:
                      - generic "Open Activities Help (New Window)" [ref=e848]:
                        - link "Open Activities Help Open Activities Help (New Window)" [ref=e849] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=activities_view.htm&section=Activities&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Open Activities Help
                          - img "Open Activities Help (New Window)" [ref=e850]
              - table [ref=e852]:
                - rowgroup [ref=e853]:
                  - row "No records to display" [ref=e854]:
                    - columnheader "No records to display" [ref=e855]
            - generic [ref=e859]:
              - table [ref=e861]:
                - rowgroup [ref=e862]:
                  - row "Activity History Log a Call Activity History Help Activity History Help (New Window)" [ref=e863]:
                    - cell "Activity History" [ref=e864]:
                      - heading "Activity History" [level=3] [ref=e865]
                    - cell "Log a Call" [ref=e866]:
                      - button "Log a Call" [ref=e867] [cursor=pointer]
                    - cell "Activity History Help Activity History Help (New Window)" [ref=e868]:
                      - generic "Activity History Help (New Window)" [ref=e869]:
                        - link "Activity History Help Activity History Help (New Window)" [ref=e870] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=activities_view.htm&section=Activities&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Activity History Help
                          - img "Activity History Help (New Window)" [ref=e871]
              - table [ref=e873]:
                - rowgroup [ref=e874]:
                  - row "No records to display" [ref=e875]:
                    - columnheader "No records to display" [ref=e876]
            - generic [ref=e879]:
              - table [ref=e881]:
                - rowgroup [ref=e882]:
                  - row "DocuSign Status DocuSign Status New DocuSign Status DocuSign Status Help DocuSign Status Help (New Window)" [ref=e883]:
                    - cell "DocuSign Status DocuSign Status" [ref=e884]:
                      - img "DocuSign Status" [ref=e885]
                      - heading "DocuSign Status" [level=3] [ref=e886]
                    - cell "New DocuSign Status" [ref=e887]:
                      - button "New DocuSign Status" [ref=e888] [cursor=pointer]
                    - cell "DocuSign Status Help DocuSign Status Help (New Window)" [ref=e889]:
                      - generic "DocuSign Status Help (New Window)" [ref=e890]:
                        - link "DocuSign Status Help DocuSign Status Help (New Window)" [ref=e891] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=co_relatedlist.htm&section=CustomObjects&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: DocuSign Status Help
                          - img "DocuSign Status Help (New Window)" [ref=e892]
              - table [ref=e894]:
                - rowgroup [ref=e895]:
                  - row "No records to display" [ref=e896]:
                    - columnheader "No records to display" [ref=e897]
            - generic [ref=e900]:
              - table [ref=e902]:
                - rowgroup [ref=e903]:
                  - row "Opportunity Team Add Add Default Team Delete All Opportunity Team Help Opportunity Team Help (New Window)" [ref=e904]:
                    - cell "Opportunity Team" [ref=e905]:
                      - heading "Opportunity Team" [level=3] [ref=e906]
                    - cell "Add Add Default Team Delete All" [ref=e907]:
                      - button "Add" [ref=e908] [cursor=pointer]
                      - button "Add Default Team" [ref=e909] [cursor=pointer]
                      - button "Delete All" [ref=e910] [cursor=pointer]
                    - cell "Opportunity Team Help Opportunity Team Help (New Window)" [ref=e911]:
                      - generic "Opportunity Team Help (New Window)" [ref=e912]:
                        - link "Opportunity Team Help Opportunity Team Help (New Window)" [ref=e913] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=salesteam_def.htm&section=Team_Selling&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Opportunity Team Help
                          - img "Opportunity Team Help (New Window)" [ref=e914]
              - table [ref=e916]:
                - rowgroup [ref=e917]:
                  - row "No records to display" [ref=e918]:
                    - columnheader "No records to display" [ref=e919]
            - generic [ref=e922]:
              - table [ref=e924]:
                - rowgroup [ref=e925]:
                  - row "Campaign Influence Add to Campaign Campaign Influence Help Campaign Influence Help (New Window)" [ref=e926]:
                    - cell "Campaign Influence" [ref=e927]:
                      - heading "Campaign Influence" [level=3] [ref=e928]
                    - cell "Add to Campaign" [ref=e929]:
                      - button "Add to Campaign" [ref=e930] [cursor=pointer]
                    - cell "Campaign Influence Help Campaign Influence Help (New Window)" [ref=e931]:
                      - generic "Campaign Influence Help (New Window)" [ref=e932]:
                        - link "Campaign Influence Help Campaign Influence Help (New Window)" [ref=e933] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=campaigns_influence_using.htm&section=Cases&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Campaign Influence Help
                          - img "Campaign Influence Help (New Window)" [ref=e934]
              - table [ref=e936]:
                - rowgroup [ref=e937]:
                  - row "No records to display" [ref=e938]:
                    - columnheader "No records to display" [ref=e939]
            - generic [ref=e942]:
              - table [ref=e944]:
                - rowgroup [ref=e945]:
                  - row "Transaction Parties Transaction Parties Transaction Parties Help Transaction Parties Help (New Window)" [ref=e946]:
                    - cell "Transaction Parties Transaction Parties" [ref=e947]:
                      - img "Transaction Parties" [ref=e948]
                      - heading "Transaction Parties" [level=3] [ref=e949]
                    - cell [ref=e950]
                    - cell "Transaction Parties Help Transaction Parties Help (New Window)" [ref=e951]:
                      - generic "Transaction Parties Help (New Window)" [ref=e952]:
                        - link "Transaction Parties Help Transaction Parties Help (New Window)" [ref=e953] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=co_relatedlist.htm&section=CustomObjects&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Transaction Parties Help
                          - img "Transaction Parties Help (New Window)" [ref=e954]
              - table [ref=e956]:
                - rowgroup [ref=e957]:
                  - row "No records to display" [ref=e958]:
                    - columnheader "No records to display" [ref=e959]
            - generic [ref=e962]:
              - table [ref=e964]:
                - rowgroup [ref=e965]:
                  - row "Contact Roles New Contact Roles Help Contact Roles Help (New Window)" [ref=e966]:
                    - cell "Contact Roles" [ref=e967]:
                      - heading "Contact Roles" [level=3] [ref=e968]
                    - cell "New" [ref=e969]:
                      - button "New" [ref=e970] [cursor=pointer]
                    - cell "Contact Roles Help Contact Roles Help (New Window)" [ref=e971]:
                      - generic "Contact Roles Help (New Window)" [ref=e972]:
                        - link "Contact Roles Help Contact Roles Help (New Window)" [ref=e973] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=contactroles_add.htm&section=Contact_Roles&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Contact Roles Help
                          - img "Contact Roles Help (New Window)" [ref=e974]
              - table [ref=e976]:
                - rowgroup [ref=e977]:
                  - row "No records to display" [ref=e978]:
                    - columnheader "No records to display" [ref=e979]
            - generic [ref=e982]:
              - table [ref=e984]:
                - rowgroup [ref=e985]:
                  - row "Cases New Case Cases Help Cases Help (New Window)" [ref=e986]:
                    - cell "Cases" [ref=e987]:
                      - heading "Cases" [level=3] [ref=e988]
                    - cell "New Case" [ref=e989]:
                      - button "New Case" [ref=e990] [cursor=pointer]
                    - cell "Cases Help Cases Help (New Window)" [ref=e991]:
                      - generic "Cases Help (New Window)" [ref=e992]:
                        - link "Cases Help Cases Help (New Window)" [ref=e993] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=co_relatedlist.htm&section=CustomObjects&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Cases Help
                          - img "Cases Help (New Window)" [ref=e994]
              - table [ref=e996]:
                - rowgroup [ref=e997]:
                  - row "No records to display" [ref=e998]:
                    - columnheader "No records to display" [ref=e999]
            - generic [ref=e1002]:
              - table [ref=e1004]:
                - rowgroup [ref=e1005]:
                  - row "Stage History Stage History Help Stage History Help (New Window)" [ref=e1006]:
                    - cell "Stage History" [ref=e1007]:
                      - heading "Stage History" [level=3] [ref=e1008]
                    - cell [ref=e1009]
                    - cell "Stage History Help Stage History Help (New Window)" [ref=e1010]:
                      - generic "Stage History Help (New Window)" [ref=e1011]:
                        - link "Stage History Help Stage History Help (New Window)" [ref=e1012] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=opp_history.htm&section=Opportunities&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Stage History Help
                          - img "Stage History Help (New Window)" [ref=e1013]
              - table [ref=e1015]:
                - rowgroup [ref=e1016]:
                  - row "Stage Amount Probability (%) Expected Revenue Close Date Last Modified" [ref=e1017]:
                    - columnheader "Stage" [ref=e1018]
                    - columnheader "Amount" [ref=e1019]
                    - columnheader "Probability (%)" [ref=e1020]
                    - columnheader "Expected Revenue" [ref=e1021]
                    - columnheader "Close Date" [ref=e1022]
                    - columnheader "Last Modified" [ref=e1023]
                  - row "New $0.00 10% $0.00 4/27/2026 Somya Sijaria, 4/13/2026, 2:04 AM" [ref=e1024]:
                    - rowheader "New" [ref=e1025]
                    - cell "$0.00" [ref=e1026]
                    - cell "10%" [ref=e1027]
                    - cell "$0.00" [ref=e1028]
                    - cell "4/27/2026" [ref=e1029]
                    - cell "Somya Sijaria, 4/13/2026, 2:04 AM" [ref=e1030]:
                      - link "Somya Sijaria" [ref=e1031] [cursor=pointer]:
                        - /url: /005dz00000BSn13
                      - text: ", 4/13/2026, 2:04 AM"
            - generic [ref=e1034]:
              - table [ref=e1036]:
                - rowgroup [ref=e1037]:
                  - row "Opportunity Field History Opportunity Field History Help Opportunity Field History Help (New Window)" [ref=e1038]:
                    - cell "Opportunity Field History" [ref=e1039]:
                      - heading "Opportunity Field History" [level=3] [ref=e1040]
                    - cell [ref=e1041]
                    - cell "Opportunity Field History Help Opportunity Field History Help (New Window)" [ref=e1042]:
                      - generic "Opportunity Field History Help (New Window)" [ref=e1043]:
                        - link "Opportunity Field History Help Opportunity Field History Help (New Window)" [ref=e1044] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=opp_history.htm&section=Opportunities&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Opportunity Field History Help
                          - img "Opportunity Field History Help (New Window)" [ref=e1045]
              - table [ref=e1047]:
                - rowgroup [ref=e1048]:
                  - row "Date User Action" [ref=e1049]:
                    - columnheader "Date" [ref=e1050]
                    - columnheader "User" [ref=e1051]
                    - columnheader "Action" [ref=e1052]
                  - row "4/13/2026, 2:04 AM Somya Sijaria Changed Registration Type to MJHBS." [ref=e1053]:
                    - rowheader "4/13/2026, 2:04 AM" [ref=e1054]
                    - cell "Somya Sijaria" [ref=e1055]:
                      - link "Somya Sijaria" [ref=e1056] [cursor=pointer]:
                        - /url: /005dz00000BSn13
                    - cell "Changed Registration Type to MJHBS." [ref=e1057]:
                      - text: Changed
                      - strong [ref=e1058]: Registration Type
                      - text: to
                      - strong [ref=e1059]: MJHBS
                      - text: .
                  - row "Created." [ref=e1060]:
                    - rowheader [ref=e1061]
                    - cell [ref=e1062]
                    - cell "Created." [ref=e1063]
            - generic [ref=e1066]:
              - table [ref=e1068]:
                - rowgroup [ref=e1069]:
                  - row "Notes & Attachments New Note Attach File Notes & Attachments Help Notes & Attachments Help (New Window)" [ref=e1070]:
                    - cell "Notes & Attachments" [ref=e1071]:
                      - heading "Notes & Attachments" [level=3] [ref=e1072]
                    - cell "New Note Attach File" [ref=e1073]:
                      - button "New Note" [ref=e1074] [cursor=pointer]
                      - button "Attach File" [ref=e1075] [cursor=pointer]
                    - cell "Notes & Attachments Help Notes & Attachments Help (New Window)" [ref=e1076]:
                      - generic "Notes & Attachments Help (New Window)" [ref=e1077]:
                        - link "Notes & Attachments Help Notes & Attachments Help (New Window)" [ref=e1078] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=notes_admin_overview.htm&section=Notes_Attachments&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Notes & Attachments Help
                          - img "Notes & Attachments Help (New Window)" [ref=e1079]
              - table [ref=e1081]:
                - rowgroup [ref=e1082]:
                  - row "No records to display" [ref=e1083]:
                    - columnheader "No records to display" [ref=e1084]
            - generic [ref=e1087]:
              - table [ref=e1089]:
                - rowgroup [ref=e1090]:
                  - row "Approval History Submit for Approval Approval History Help Approval History Help (New Window)" [ref=e1091]:
                    - cell "Approval History" [ref=e1092]:
                      - heading "Approval History" [level=3] [ref=e1093]
                    - cell "Submit for Approval" [ref=e1094]:
                      - button "Submit for Approval" [ref=e1095] [cursor=pointer]
                    - cell "Approval History Help Approval History Help (New Window)" [ref=e1096]:
                      - generic "Approval History Help (New Window)" [ref=e1097]:
                        - link "Approval History Help Approval History Help (New Window)" [ref=e1098] [cursor=pointer]:
                          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=approvals_approval_history.htm&section=Dev_Tools&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
                          - text: Approval History Help
                          - img "Approval History Help (New Window)" [ref=e1099]
              - table [ref=e1101]:
                - rowgroup [ref=e1102]:
                  - row "No records to display" [ref=e1103]:
                    - columnheader "No records to display" [ref=e1104]
            - generic [ref=e1105]:
              - link "Back to TopBack To Top" [ref=e1107] [cursor=pointer]:
                - /url: "#skiplink"
                - img "Back to Top" [ref=e1108]
                - text: Back To Top
              - text: Always show me
              - link "Show Moremore" [ref=e1109] [cursor=pointer]:
                - /url: /006dz00000EDSck?rowsperlist=10
                - img "Show More" [ref=e1110]
                - text: more
              - text: records per related list
    - generic [ref=e1112]:
      - text: Copyright © 2000-2026 salesforce.com, inc. All rights reserved. |
      - link "Privacy Statement" [ref=e1113] [cursor=pointer]:
        - /url: http://www.salesforce.com/company/privacy.jsp
      - text: "|"
      - link "Security Statement" [ref=e1114] [cursor=pointer]:
        - /url: http://www.salesforce.com/company/security.jsp
      - text: "|"
      - link "Terms of Use" [ref=e1115] [cursor=pointer]:
        - /url: http://www.salesforce.com/company/msa.jsp
      - text: "|"
      - link "508 Compliance" [ref=e1116] [cursor=pointer]:
        - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=accessibility_overview.htm&section=accessibility&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
      - text: "|"
      - link "Go to Salesforce mobile app" [ref=e1117] [cursor=pointer]:
        - /url: /ltng/oneAppRedirect
  - iframe [ref=e1118]:
    
  - generic:
    - button "Expand Quick Access Menu" [ref=e1120]
    - generic [ref=e1121]:
      - generic [ref=e1122]:
        - link "Go to Setup" [ref=e1123] [cursor=pointer]:
          - /url: /setup/forcecomHomepage.apexp?setupid=ForceCom&retURL=%2F006dz00000EDSck
          - img "Go to Setup" [ref=e1124]
        - link "Help" [ref=e1125] [cursor=pointer]:
          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?section=Dev_Tools&target=dev_quick_access_menu.htm&loc=help&language=en_US&release=260.12.3&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
          - img "Help" [ref=e1126]
      - generic [ref=e1127]:
        - list [ref=e1128]:
          - listitem [ref=e1129]:
            - link "View Fields" [ref=e1130] [cursor=pointer]:
              - /url: /p/setup/layout/LayoutFieldList?type=Opportunity&setupid=OpportunityFields
          - listitem [ref=e1131]:
            - link "View Object" [ref=e1132] [cursor=pointer]:
              - /url: /ui/setup/Setup?setupid=Opportunity
          - listitem [ref=e1133]:
            - link "View Validation Rules" [ref=e1134] [cursor=pointer]:
              - /url: /_ui/common/config/entity/ValidationFormulaListUI/d?retURL=%2F006dz00000EDSck&tableEnumOrId=Opportunity&setupid=OpportunityValidations
          - listitem [ref=e1135]:
            - link "View Approvals" [ref=e1136] [cursor=pointer]:
              - /url: /p/process/ProcessDefinitionSetup?TableEnumOrId=Opportunity&setupid=ApprovalProcesses
        - separator [ref=e1137]
        - list [ref=e1138]:
          - listitem [ref=e1139]:
            - link "Edit App" [ref=e1140] [cursor=pointer]:
              - /url: /02uG0000000GeGC/e?retURL=%2F006dz00000EDSck&setupid=TabSet
          - listitem [ref=e1141]:
            - link "Edit Layout" [ref=e1142] [cursor=pointer]:
              - /url: /layouteditor/layoutEditor.apexp?type=Opportunity&lid=00h4R00000mxxnK&retURL=%2F006dz00000EDSck&setupid=OpportunityLayouts
          - listitem [ref=e1143]:
            - link "View Record Type" [ref=e1144] [cursor=pointer]:
              - /url: /setup/ui/recordtypefields.jsp?id=012G0000001BFrD&type=Opportunity&setupid=OpportunityRecords
      - link "Turn off menu" [ref=e1146] [cursor=pointer]:
        - /url: "#"
```

# Test source

```ts
  1   | import { Page, expect } from '@playwright/test';
  2   | import { BasePage, ResilientLocator } from 'playwright-custom-core';
  3   | 
  4   | /**
  5   |  * Page Object for the Salesforce Classic Opportunity detail page.
  6   |  *
  7   |  * After saving an Opportunity in Classic, the browser navigates to the detail
  8   |  * page at /{recordId}. This page displays the record information and related
  9   |  * lists including Fund Account Selections.
  10  |  *
  11  |  * The "New Fund Account Selection" button navigates to a standalone
  12  |  * Visualforce page (NOT an iframe) at /apex/InvestmentFundAccountSelection.
  13  |  */
  14  | export class OpportunityClassicDetailPage extends BasePage {
  15  |   readonly pageName = 'OpportunityClassicDetailPage';
  16  |   protected readonly relativeUrl = '';
  17  | 
  18  |   constructor(page: Page, baseUrl?: string) {
  19  |     super(page, baseUrl || process.env.BASE_URL || '');
  20  |   }
  21  | 
  22  |   // ── Locators ──────────────────────────────────────────────────────────────
  23  | 
  24  |   private get fundAccountSelectionsLink() {
  25  |     return new ResilientLocator(this['page'], [
  26  |       (p) => p.getByRole('link', { name: /Fund Account Selections\[/, exact: false }),
  27  |       (p) => p.locator('a').filter({ hasText: /^Fund Account Selections\[\d+\]$/ }),
  28  |       (p) => p.locator('a[href*="00NG000000Dwu2H_target"]'),
  29  |     ]);
  30  |   }
  31  | 
  32  |   private get newFundAccountSelectionButton() {
  33  |     return new ResilientLocator(this['page'], [
  34  |       (p) => p.locator('input[title="New Fund Account Selection"]'),
  35  |       (p) => p.locator('input[name="investment_fund_account_selection"]'),
  36  |       (p) => p.locator('input[value="New Fund Account Selection"]'),
  37  |     ]);
  38  |   }
  39  | 
  40  |   private get opportunityNameHeading() {
  41  |     return new ResilientLocator(this['page'], [
  42  |       (p) => p.getByRole('heading', { name: /Opportunity/i, level: 1 }),
  43  |       (p) => p.locator('h1.pageType'),
  44  |       (p) => p.locator('.topName'),
  45  |     ]);
  46  |   }
  47  | 
  48  |   // ── Actions ───────────────────────────────────────────────────────────────
  49  | 
  50  |   /**
  51  |    * Clicks the "Fund Account Selections[n]" link to scroll to that related list section.
  52  |    */
  53  |   async clickFundAccountSelectionsLink(): Promise<void> {
  54  |     try {
> 55  |       await this.fundAccountSelectionsLink.getLocator().click();
      |                                                         ^ Error: locator.click: Error: strict mode violation: getByRole('link', { name: /Fund Account Selections\[/ }) resolved to 2 elements:
  56  |     } catch (error) {
  57  |       console.error('Failed to click Fund Account Selections link');
  58  |       throw error;
  59  |     }
  60  |   }
  61  | 
  62  |   /**
  63  |    * Clicks the "New Fund Account Selection" button on the Classic detail page.
  64  |    * This navigates to the standalone Visualforce page for creating a Fund Account Selection.
  65  |    */
  66  |   async clickNewFundAccountSelectionButton(): Promise<void> {
  67  |     try {
  68  |       await this.newFundAccountSelectionButton.getLocator().click();
  69  |       await this['page'].waitForLoadState('domcontentloaded');
  70  |     } catch (error) {
  71  |       console.error('Failed to click New Fund Account Selection button');
  72  |       throw error;
  73  |     }
  74  |   }
  75  | 
  76  |   // ── Verification ──────────────────────────────────────────────────────────
  77  | 
  78  |   /**
  79  |    * Verifies the Classic detail page is displayed by checking the page title
  80  |    * contains the expected opportunity name.
  81  |    */
  82  |   async verifyDetailPageDisplayed(expectedName: string): Promise<void> {
  83  |     try {
  84  |       await expect(this['page']).toHaveTitle(new RegExp(expectedName), { timeout: 20_000 });
  85  |     } catch (error) {
  86  |       console.error(`Failed to verify Classic detail page for: ${expectedName}`);
  87  |       throw error;
  88  |     }
  89  |   }
  90  | 
  91  |   /**
  92  |    * Extracts the Opportunity record ID from the current Classic detail page URL.
  93  |    * Classic detail URLs follow the pattern: /{recordId}
  94  |    * Returns the record ID or empty string if not found.
  95  |    */
  96  |   extractRecordIdFromUrl(): string {
  97  |     try {
  98  |       const url = this['page'].url();
  99  |       const match = url.match(/\/([a-zA-Z0-9]{15,18})(?:#.*)?$/);
  100 |       return match ? match[1] : '';
  101 |     } catch {
  102 |       return '';
  103 |     }
  104 |   }
  105 | }
  106 | 
```