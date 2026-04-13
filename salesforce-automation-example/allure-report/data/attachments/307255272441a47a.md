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

Locator: locator('input[name="lksrch"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('input[name="lksrch"]')

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
                    - /url: /setup/forcecomHomepage.apexp?setupid=ForceCom&retURL=%2F006%2Fe%3FRecordType%3D012G0000001BFrD%26ent%3DOpportunity
                  - link "Help & Training" [ref=e27] [cursor=pointer]:
                    - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?resource=https%3A%2F%2Fhelp.salesforce.com%2F&version=2&language=en_US&release=260.12.1&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
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
                - /url: /servlet/servlet.Integration?lid=01rG0000000owZn&ic=1&linkToken=VmpFPSxNakF5Tmkwd05DMHhNbFF3TnpvME56b3hOQzQzTnpOYSxpR3p4TXpkZnh4MlBSb080NU03Q0s3TDAxSkU5YmNKMVZaM2JqdWpzbkpvPSxZV1prTUdKaA%3D%3D
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
                - heading "Opportunity Edit" [level=1] [ref=e77]
                - heading "New Opportunity" [level=2] [ref=e78]
              - link "Help for this Page" [ref=e80] [cursor=pointer]:
                - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=opportunities.htm&section=Opportunities&language=en_US&release=260.12.1&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
            - generic [ref=e82]:
              - table [ref=e84]:
                - rowgroup [ref=e85]:
                  - row "Opportunity Edit Save Save & New Cancel" [ref=e86]:
                    - cell "Opportunity Edit" [ref=e87]:
                      - heading "Opportunity Edit" [level=2] [ref=e88]
                    - cell "Save Save & New Cancel" [ref=e89]:
                      - button "Save" [ref=e90] [cursor=pointer]
                      - button "Save & New" [ref=e91] [cursor=pointer]
                      - button "Cancel" [ref=e92] [cursor=pointer]
              - generic [ref=e93]:
                - generic [ref=e94]:
                  - generic [ref=e96]:
                    - generic [ref=e98]: "*"
                    - text: = Required Information
                  - heading "Opportunity Information" [level=3] [ref=e99]
                - table [ref=e101]:
                  - rowgroup [ref=e102]:
                    - row "* Opportunity Name ClaClassic_1775720834526 Opportunity Owner Somya Sijaria" [ref=e103]:
                      - cell "* Opportunity Name" [ref=e104]:
                        - generic [ref=e105]:
                          - generic [ref=e106]: "*"
                          - text: Opportunity Name
                      - cell "ClaClassic_1775720834526" [ref=e107]:
                        - textbox "* Opportunity Name" [ref=e110]: ClaClassic_1775720834526
                      - cell "Opportunity Owner" [ref=e111]
                      - cell "Somya Sijaria" [ref=e112]
                    - row "* Account Name TestEmployer_1774951248072 Account Name Lookup (New Window) Opportunity Owner Text" [ref=e113]:
                      - cell "* Account Name" [ref=e114]:
                        - generic [ref=e115]:
                          - generic [ref=e116]: "*"
                          - text: Account Name
                      - cell "TestEmployer_1774951248072 Account Name Lookup (New Window)" [ref=e117]:
                        - generic [ref=e120]:
                          - textbox "* Account Name" [ref=e121]: TestEmployer_1774951248072
                          - link "Account Name Lookup (New Window)" [ref=e122] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3Dopp4%26lkfield%3DAccount%26lkent%3D006%26lktp%3D%27%20%2B%20getElementByIdCS%28%27opp4_lktp%27%29.value%2B%27%26dplp%3D%27%20%2B%20encodeURIComponent%28dpdLkUtil.serialize%28sfdcPage.getReferredDomIds%28%27opp4%27%29%2C%20%27opp4%27%29%29%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27opp4%27%29.value.substring%280%2C%2080%29%29%29
                            - img "Account Name Lookup (New Window)" [ref=e123]
                      - cell "Opportunity Owner Text" [ref=e125]
                      - cell [ref=e126]:
                        - textbox "Opportunity Owner Text" [ref=e127]
                    - row "* Plan Click lookup icon... Plan Lookup (New Window) Opportunity Record Type Rollover" [ref=e128]:
                      - cell "* Plan" [ref=e129]:
                        - generic [ref=e130]:
                          - generic [ref=e131]: "*"
                          - text: Plan
                      - cell "Click lookup icon... Plan Lookup (New Window)" [ref=e132]:
                        - generic [ref=e135]:
                          - textbox [ref=e136]: Click lookup icon...
                          - link "Plan Lookup (New Window)" [active] [ref=e137] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3DCF00NG000000Dwu6z%26lktp%3D%27%20%2B%20getElementByIdCS%28%27CF00NG000000Dwu6z_lktp%27%29.value%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27CF00NG000000Dwu6z%27%29.value.substring%280%2C%2080%29%29%29
                            - img "Plan Lookup (New Window)" [ref=e138]
                      - cell "Opportunity Record Type" [ref=e140]
                      - cell "Rollover" [ref=e141]
                    - row "Spanish Speaker * Stage --None--" [ref=e142]:
                      - cell "Spanish Speaker" [ref=e143]
                      - cell "Spanish Speaker" [ref=e144]:
                        - checkbox "Spanish Speaker" [ref=e145]
                      - cell "* Stage" [ref=e146]:
                        - generic [ref=e147]:
                          - generic [ref=e148]: "*"
                          - text: Stage
                      - cell "--None--" [ref=e149]:
                        - combobox "* Stage" [ref=e153]:
                          - option "--None--" [selected]
                          - option "New"
                          - option "In Progress"
                          - option "Closed Won"
                          - option "Closed Lost"
                          - option "Cancelled"
                    - row "Priority --None-- Type Rollover" [ref=e154]:
                      - cell "Priority" [ref=e155]
                      - cell "--None--" [ref=e156]:
                        - combobox "Priority" [ref=e158]:
                          - option "--None--" [selected]
                          - option "High"
                          - option "Medium"
                          - option "Low"
                      - cell "Type" [ref=e159]
                      - cell "Rollover" [ref=e160]:
                        - combobox "Type" [ref=e162]:
                          - option "--None--"
                          - option "Rollover" [selected]
                          - option "Transfer of Assets"
                          - option "GIFL"
                    - row "Survey Opt Out Type Status --None--" [ref=e163]:
                      - cell "Survey Opt Out" [ref=e164]
                      - cell "Survey Opt Out" [ref=e165]:
                        - checkbox "Survey Opt Out" [ref=e166]
                      - cell "Type Status" [ref=e167]
                      - cell "--None--" [ref=e168]:
                        - combobox "Type Status" [ref=e171]:
                          - option "--None--" [selected]
                          - option "Advisor follow-up"
                          - option "CAR follow-up"
                          - option "Cash out"
                          - option "Cash out confirmed"
                          - option "Confirm WDF Received"
                          - option "Contact not made"
                          - option "Digital Rollover Decision"
                          - option "External rollover"
                          - option "External Rollover confirmed"
                          - option "External Rollover with Advisor"
                          - option "Internal Transfer to another 401K plan"
                          - option "Leave in Plan"
                          - option "Not eligible"
                          - option "Outbound Contact"
                          - option "Paperwork signed"
                          - option "Pending Principal Review"
                          - option "Plan Sponsor Follow up"
                          - option "Plan Term Callout"
                          - option "PPT follow up"
                          - option "PT PPWK Confirm Received"
                          - option "Referral Advisor contacted"
                          - option "Referral Advisor not reached"
                          - option "Referral PPT consent"
                          - option "Referral to JHFC"
                          - option "Referral to ML"
                          - option "Referral to MS"
                          - option "Requested from MTC"
                          - option "Rollover PPWK sent"
                          - option "TPA Follow up"
                          - option "TRS Follow-up"
                          - option "Undecided"
                          - option "Wrong Phone Number"
                    - row "Registration Type --None-- DEF Future Approved" [ref=e173]:
                      - cell "Registration Type" [ref=e174]
                      - cell "--None--" [ref=e175]:
                        - combobox "Registration Type" [ref=e177]:
                          - option "--None--" [selected]
                          - option "MJHBS"
                          - option "Non-MJHBS"
                      - cell "DEF Future Approved" [ref=e178]
                      - cell "DEF Future Approved" [ref=e179]:
                        - checkbox "DEF Future Approved" [ref=e180]
                    - row "Approval Status --None-- DEF Approved Date [ 4/9/2026 ]" [ref=e181]:
                      - cell "Approval Status" [ref=e182]
                      - cell "--None--" [ref=e183]:
                        - combobox "Approval Status" [ref=e185]:
                          - option "--None--" [selected]
                          - option "Pending Approval"
                          - option "Rejected"
                          - option "Approved"
                          - option "Principal Review Required"
                      - cell "DEF Approved Date" [ref=e186]
                      - cell "[ 4/9/2026 ]" [ref=e187]:
                        - generic [ref=e188]:
                          - textbox "DEF Approved Date" [ref=e189]
                          - generic [ref=e190]:
                            - text: "["
                            - link "4/9/2026" [ref=e191] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00N4R00000JOGpy', true);
                            - text: "]"
                    - row "Account Recommendation Probability (%) 0" [ref=e192]:
                      - cell "Account Recommendation" [ref=e193]
                      - cell "Account Recommendation" [ref=e194]:
                        - checkbox "Account Recommendation" [ref=e195]
                      - cell "Probability (%)" [ref=e196]
                      - cell "0" [ref=e197]:
                        - textbox "Probability (%)" [ref=e198]: "0"
                    - row "Investment Recommendation Participant Online Distribution Allowed" [ref=e199]:
                      - cell "Investment Recommendation" [ref=e200]
                      - cell "Investment Recommendation" [ref=e201]:
                        - checkbox "Investment Recommendation" [ref=e202]
                      - cell "Participant Online Distribution Allowed" [ref=e203]:
                        - generic [ref=e204]: Participant Online Distribution Allowed
                      - cell "Participant Online Distribution Allowed" [ref=e205]:
                        - checkbox "Participant Online Distribution Allowed" [ref=e206]
                    - row "Digital Retention Source?" [ref=e207]:
                      - cell [ref=e208]
                      - cell [ref=e209]
                      - cell "Digital Retention Source?" [ref=e210]
                      - cell "Digital Retention Source?" [ref=e211]:
                        - checkbox "Digital Retention Source?" [ref=e212]
                    - row "JHSS NIGO Reason --None--" [ref=e213]:
                      - cell [ref=e214]
                      - cell [ref=e215]
                      - cell "JHSS NIGO Reason" [ref=e216]
                      - cell "--None--" [ref=e217]:
                        - combobox "JHSS NIGO Reason" [ref=e219]:
                          - option "--None--" [selected]
                          - option "No Application"
                          - option "Roth Account Not Created"
                          - option "Roth Created But Not On Form"
                          - option "Name Mismatch"
                          - option "Fund Minimum"
                          - option "Allocation Issue"
                          - option "Community Property"
                          - option "Beneficiary"
                          - option "CIP Issue - Address"
                          - option "CIP Issue - DOB"
                          - option "CIP Issue - SSN"
                          - option "Other"
                    - row "Send Signed PPWK Issue --None--" [ref=e220]:
                      - cell [ref=e221]
                      - cell [ref=e222]
                      - cell "Send Signed PPWK Issue" [ref=e223]
                      - cell "--None--" [ref=e224]:
                        - combobox "Send Signed PPWK Issue" [ref=e226]:
                          - option "--None--" [selected]
                          - option "No Application"
                          - option "Roth Account Not Created"
                          - option "Roth Created but NOT on form"
                          - option "Name Mismatch"
                          - option "Active TRS PPT"
                          - option "Spousal Consent Needed"
                          - option "Wrong WDF/DEF"
                          - option "Waiting on Ordered Paperwork For TRS"
                          - option "IWD Issue"
                          - option "Missed Plan/TPA Notes"
                          - option "App Only with No Notes"
                          - option "Wet Signature Required"
                          - option "SSN Discrepancy"
                          - option "Address Discrepancy"
                          - option "Other"
                - heading "Other Information" [level=3] [ref=e228]
                - table [ref=e230]:
                  - rowgroup [ref=e231]:
                    - row "Amount Actual Amount" [ref=e232]:
                      - cell "Amount" [ref=e233]
                      - cell [ref=e234]:
                        - textbox "Amount" [ref=e235]
                      - cell "Actual Amount" [ref=e236]
                      - cell [ref=e237]:
                        - textbox "Actual Amount" [ref=e238]
                    - row "* Close Date [ 4/9/2026 ] Actual Destination --None--" [ref=e239]:
                      - cell "* Close Date" [ref=e240]:
                        - generic [ref=e241]:
                          - generic [ref=e242]: "*"
                          - text: Close Date
                      - cell "[ 4/9/2026 ]" [ref=e243]:
                        - generic [ref=e246]:
                          - textbox "* Close Date" [ref=e247]
                          - generic [ref=e248]:
                            - text: "["
                            - link "4/9/2026" [ref=e249] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', 'opp9', true);
                            - text: "]"
                      - cell "Actual Destination" [ref=e250]
                      - cell "--None--" [ref=e251]:
                        - combobox "Actual Destination" [ref=e253]:
                          - option "--None--" [selected]
                          - option "Mutual Funds"
                          - option "RPS"
                          - option "Annuity"
                          - option "Other"
                    - row "Actual Close Date [ 4/9/2026, 3:47 AM ]" [ref=e254]:
                      - cell [ref=e255]
                      - cell [ref=e256]
                      - cell "Actual Close Date" [ref=e257]
                      - cell "[ 4/9/2026, 3:47 AM ]" [ref=e258]:
                        - generic [ref=e259]:
                          - textbox "Actual Close Date" [ref=e260]
                          - generic [ref=e261]:
                            - text: "["
                            - link "4/9/2026, 3:47 AM" [ref=e262] [cursor=pointer]:
                              - /url: javascript:void(DatePicker.insertDate('4/9/2026, 3:47 AM', '00NG000000DwsUF', true));
                            - text: "]"
                    - row "Total Outbound Contact Task Count 0" [ref=e263]:
                      - cell [ref=e264]
                      - cell [ref=e265]
                      - cell "Total Outbound Contact Task Count" [ref=e266]:
                        - generic [ref=e267]: Total Outbound Contact Task Count
                      - cell "0" [ref=e268]:
                        - textbox "Total Outbound Contact Task Count" [ref=e269]: "0"
                - heading "Withdrawal Details" [level=3] [ref=e271]
                - table [ref=e273]:
                  - rowgroup [ref=e274]:
                    - row "Do not send PPWK CAR has completed WDF" [ref=e275]:
                      - cell "Do not send PPWK" [ref=e276]:
                        - generic [ref=e277]: Do not send PPWK
                      - cell "Do not send PPWK" [ref=e278]:
                        - checkbox "Do not send PPWK" [ref=e279]
                      - cell "CAR has completed WDF" [ref=e280]:
                        - generic [ref=e281]: CAR has completed WDF
                      - cell "CAR has completed WDF" [ref=e282]:
                        - checkbox "CAR has completed WDF" [ref=e283]
                    - row "Reason For Withdrawal --None-- Directed PPT to TPA/PS for WDF" [ref=e284]:
                      - cell "Reason For Withdrawal" [ref=e285]
                      - cell "--None--" [ref=e286]:
                        - combobox "Reason For Withdrawal" [ref=e288]:
                          - option "--None--" [selected]
                          - option "Termination = TE"
                          - option "Retirement = RE"
                          - option "Early Retirement = PD"
                          - option "Individual = ID"
                      - cell "Directed PPT to TPA/PS for WDF" [ref=e289]:
                        - generic [ref=e290]: Directed PPT to TPA/PS for WDF
                      - cell "Directed PPT to TPA/PS for WDF" [ref=e291]:
                        - checkbox "Directed PPT to TPA/PS for WDF" [ref=e292]
                    - row "Termination Date [ 4/9/2026 ] PPT already sent WDF to PS" [ref=e293]:
                      - cell "Termination Date" [ref=e294]
                      - cell "[ 4/9/2026 ]" [ref=e295]:
                        - generic [ref=e296]:
                          - textbox "Termination Date" [ref=e297]
                          - generic [ref=e298]:
                            - text: "["
                            - link "4/9/2026" [ref=e299] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsXR', true);
                            - text: "]"
                      - cell "PPT already sent WDF to PS" [ref=e300]:
                        - generic [ref=e301]: PPT already sent WDF to PS
                      - cell "PPT already sent WDF to PS" [ref=e302]:
                        - checkbox "PPT already sent WDF to PS" [ref=e303]
                    - row "Retirement Date [ 4/9/2026 ] PPT already sent WDF to TPA" [ref=e304]:
                      - cell "Retirement Date" [ref=e305]
                      - cell "[ 4/9/2026 ]" [ref=e306]:
                        - generic [ref=e307]:
                          - textbox "Retirement Date" [ref=e308]
                          - generic [ref=e309]:
                            - text: "["
                            - link "4/9/2026" [ref=e310] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsWZ', true);
                            - text: "]"
                      - cell "PPT already sent WDF to TPA" [ref=e311]:
                        - generic [ref=e312]: PPT already sent WDF to TPA
                      - cell "PPT already sent WDF to TPA" [ref=e313]:
                        - checkbox "PPT already sent WDF to TPA" [ref=e314]
                    - row "Direct Rollover Assisted PPT with WDDEATH – Non Spouse" [ref=e315]:
                      - cell "Direct Rollover" [ref=e316]
                      - cell "Direct Rollover" [ref=e317]:
                        - checkbox "Direct Rollover" [ref=e318]
                      - cell "Assisted PPT with WDDEATH – Non Spouse" [ref=e319]:
                        - generic [ref=e320]: Assisted PPT with WDDEATH – Non Spouse
                      - cell "Assisted PPT with WDDEATH – Non Spouse" [ref=e321]:
                        - checkbox "Assisted PPT with WDDEATH – Non Spouse" [ref=e322]
                    - row "Pay Directly Lump Sum & Rollover Balance Assisted PPT with WDDEATH form – Spouse" [ref=e323]:
                      - cell "Pay Directly Lump Sum & Rollover Balance" [ref=e324]:
                        - generic [ref=e325]: Pay Directly Lump Sum & Rollover Balance
                      - cell "Pay Directly Lump Sum & Rollover Balance" [ref=e326]:
                        - checkbox "Pay Directly Lump Sum & Rollover Balance" [ref=e327]
                      - cell "Assisted PPT with WDDEATH form – Spouse" [ref=e328]:
                        - generic [ref=e329]: Assisted PPT with WDDEATH form – Spouse
                      - cell "Assisted PPT with WDDEATH form – Spouse" [ref=e330]:
                        - checkbox "Assisted PPT with WDDEATH form – Spouse" [ref=e331]
                    - row "Lump Sum Amount $ Assisted PPT with QDRO WDF" [ref=e332]:
                      - cell "Lump Sum Amount $" [ref=e333]
                      - cell [ref=e334]:
                        - textbox "Lump Sum Amount $" [ref=e335]
                      - cell "Assisted PPT with QDRO WDF" [ref=e336]:
                        - generic [ref=e337]: Assisted PPT with QDRO WDF
                      - cell "Assisted PPT with QDRO WDF" [ref=e338]:
                        - checkbox "Assisted PPT with QDRO WDF" [ref=e339]
                    - row "Lump Sum Percent % Assisted with I-Withdrawal" [ref=e340]:
                      - cell "Lump Sum Percent %" [ref=e341]
                      - cell [ref=e342]:
                        - textbox "Lump Sum Percent %" [ref=e343]
                      - cell "Assisted with I-Withdrawal" [ref=e344]:
                        - generic [ref=e345]: Assisted with I-Withdrawal
                      - cell "Assisted with I-Withdrawal" [ref=e346]:
                        - checkbox "Assisted with I-Withdrawal" [ref=e347]
                - heading "Additional Paperwork" [level=3] [ref=e349]
                - table [ref=e351]:
                  - rowgroup [ref=e352]:
                    - row "Emailed Special Tax Notice Emailed ABI form" [ref=e353]:
                      - cell "Emailed Special Tax Notice" [ref=e354]
                      - cell "Emailed Special Tax Notice" [ref=e355]:
                        - checkbox "Emailed Special Tax Notice" [ref=e356]
                      - cell "Emailed ABI form" [ref=e357]
                      - cell "Emailed ABI form" [ref=e358]:
                        - checkbox "Emailed ABI form" [ref=e359]
                    - row "Emailed Spousal Consent Sent RMD form" [ref=e360]:
                      - cell "Emailed Spousal Consent" [ref=e361]
                      - cell "Emailed Spousal Consent" [ref=e362]:
                        - checkbox "Emailed Spousal Consent" [ref=e363]
                      - cell "Sent RMD form" [ref=e364]
                      - cell "Sent RMD form" [ref=e365]:
                        - checkbox "Sent RMD form" [ref=e366]
                    - row "Emailed TPA Specific PPWK" [ref=e367]:
                      - cell "Emailed TPA Specific PPWK" [ref=e368]
                      - cell "Emailed TPA Specific PPWK" [ref=e369]:
                        - checkbox "Emailed TPA Specific PPWK" [ref=e370]
                      - cell [ref=e371]
                      - cell [ref=e372]
                - heading "IRA Details" [level=3] [ref=e374]
                - table [ref=e376]:
                  - rowgroup [ref=e377]:
                    - row "eDelivery" [ref=e378]:
                      - cell "eDelivery" [ref=e379]
                      - cell "eDelivery" [ref=e380]:
                        - checkbox "eDelivery" [ref=e381]
                      - cell [ref=e382]
                      - cell [ref=e383]
                    - row "Sales Charge Reduction --None--" [ref=e384]:
                      - cell "Sales Charge Reduction" [ref=e385]
                      - cell "--None--" [ref=e386]:
                        - combobox "Sales Charge Reduction" [ref=e388]:
                          - option "--None--" [selected]
                          - option "RPS Rollover"
                          - option "Family member"
                          - option "JH Employee"
                          - option "Active RPS, not eligible for consolidation"
                      - cell [ref=e389]
                      - cell [ref=e390]
                - heading "Employment Details" [level=3] [ref=e392]
                - table [ref=e394]:
                  - rowgroup [ref=e395]:
                    - row "Employment Status --None-- Employer Name" [ref=e396]:
                      - cell "Employment Status" [ref=e397]
                      - cell "--None--" [ref=e398]:
                        - combobox "Employment Status" [ref=e400]:
                          - option "--None--" [selected]
                          - option "Employed"
                          - option "Retired"
                          - option "Not employed"
                          - option "Declined to answer"
                      - cell "Employer Name" [ref=e401]
                      - cell [ref=e402]:
                        - textbox "Employer Name" [ref=e403]
                    - row "Occupation Employer Address" [ref=e404]:
                      - cell "Occupation" [ref=e405]
                      - cell [ref=e406]:
                        - textbox "Occupation" [ref=e407]
                      - cell "Employer Address" [ref=e408]
                      - cell [ref=e409]:
                        - textbox "Employer Address" [ref=e410]
                - heading "Affiliation" [level=3] [ref=e412]
                - table [ref=e414]:
                  - rowgroup [ref=e415]:
                    - row "No to all affiliation questions Member of the board? --None--" [ref=e416]:
                      - cell "No to all affiliation questions" [ref=e417]
                      - cell "No to all affiliation questions" [ref=e418]:
                        - checkbox "No to all affiliation questions" [ref=e419]
                      - cell "Member of the board?" [ref=e420]:
                        - generic [ref=e421]: Member of the board?
                      - cell "--None--" [ref=e422]:
                        - combobox "Member of the board?" [ref=e425]:
                          - option "--None--" [selected]
                          - option "Yes"
                          - option "No"
                    - row "Are you affiliated with a Broker Dealer? --None-- Company Name" [ref=e427]:
                      - cell "Are you affiliated with a Broker Dealer?" [ref=e428]
                      - cell "--None--" [ref=e429]:
                        - combobox "Are you affiliated with a Broker Dealer?" [ref=e432]:
                          - option "--None--" [selected]
                          - option "Yes"
                          - option "No"
                      - cell "Company Name" [ref=e434]
                      - cell [ref=e435]:
                        - textbox "Company Name" [ref=e436]
                    - row "Broker Dealer Name Ticker Symbol" [ref=e437]:
                      - cell "Broker Dealer Name" [ref=e438]
                      - cell [ref=e439]:
                        - textbox "Broker Dealer Name" [ref=e440]
                      - cell "Ticker Symbol" [ref=e441]
                      - cell [ref=e442]:
                        - textbox "Ticker Symbol" [ref=e443]
                    - row "Broker Dealer Address Political figure? --None--" [ref=e444]:
                      - cell "Broker Dealer Address" [ref=e445]
                      - cell [ref=e446]:
                        - textbox "Broker Dealer Address" [ref=e447]
                      - cell "Political figure?" [ref=e448]:
                        - generic [ref=e449]: Political figure?
                      - cell "--None--" [ref=e450]:
                        - combobox "Political figure?" [ref=e453]:
                          - option "--None--" [selected]
                          - option "Yes"
                          - option "No"
                - heading "Trusted Contact" [level=3] [ref=e456]
                - table [ref=e458]:
                  - rowgroup [ref=e459]:
                    - row "Declined to provide? Email" [ref=e460]:
                      - cell "Declined to provide?" [ref=e461]
                      - cell "Declined to provide?" [ref=e462]:
                        - checkbox "Declined to provide?" [ref=e463]
                      - cell "Email" [ref=e464]
                      - cell [ref=e465]:
                        - textbox "Email" [ref=e466]
                    - row "First Name Address" [ref=e467]:
                      - cell "First Name" [ref=e468]
                      - cell [ref=e469]:
                        - textbox "First Name" [ref=e470]
                      - cell "Address" [ref=e471]
                      - cell [ref=e472]:
                        - textbox "Address" [ref=e473]
                    - row "Last Name Phone Number" [ref=e474]:
                      - cell "Last Name" [ref=e475]
                      - cell [ref=e476]:
                        - textbox "Last Name" [ref=e477]
                      - cell "Phone Number" [ref=e478]
                      - cell [ref=e479]:
                        - textbox "Phone Number" [ref=e480]
                    - row "Relationship" [ref=e481]:
                      - cell "Relationship" [ref=e482]
                      - cell [ref=e483]:
                        - textbox "Relationship" [ref=e484]
                      - cell [ref=e485]
                      - cell [ref=e486]
                - heading "Beneficiary Information" [level=3] [ref=e488]
                - table [ref=e490]:
                  - rowgroup [ref=e491]:
                    - row "Primary Beneficiary Name 1 Secondary Beneficiary Name 1" [ref=e492]:
                      - cell "Primary Beneficiary Name 1" [ref=e493]
                      - cell [ref=e494]:
                        - textbox "Primary Beneficiary Name 1" [ref=e495]
                      - cell "Secondary Beneficiary Name 1" [ref=e496]
                      - cell [ref=e497]:
                        - textbox "Secondary Beneficiary Name 1" [ref=e498]
                    - row "Primary % Share 1 Secondary % Share 1" [ref=e499]:
                      - cell "Primary % Share 1" [ref=e500]
                      - cell [ref=e501]:
                        - textbox "Primary % Share 1" [ref=e502]
                      - cell "Secondary % Share 1" [ref=e503]
                      - cell [ref=e504]:
                        - textbox "Secondary % Share 1" [ref=e505]
                    - row "Primary DOB 1 [ 4/9/2026 ] Secondary DOB 1 [ 4/9/2026 ]" [ref=e506]:
                      - cell "Primary DOB 1" [ref=e507]
                      - cell "[ 4/9/2026 ]" [ref=e508]:
                        - generic [ref=e509]:
                          - textbox "Primary DOB 1" [ref=e510]
                          - generic [ref=e511]:
                            - text: "["
                            - link "4/9/2026" [ref=e512] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsW0', true);
                            - text: "]"
                      - cell "Secondary DOB 1" [ref=e513]
                      - cell "[ 4/9/2026 ]" [ref=e514]:
                        - generic [ref=e515]:
                          - textbox "Secondary DOB 1" [ref=e516]
                          - generic [ref=e517]:
                            - text: "["
                            - link "4/9/2026" [ref=e518] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsWv', true);
                            - text: "]"
                    - row "Primary Relationship to Owner 1 --None-- Secondary Relationship to Owner 1 --None--" [ref=e519]:
                      - cell "Primary Relationship to Owner 1" [ref=e520]
                      - cell "--None--" [ref=e521]:
                        - combobox "Primary Relationship to Owner 1" [ref=e523]:
                          - option "--None--" [selected]
                          - option "spouse"
                          - option "other"
                      - cell "Secondary Relationship to Owner 1" [ref=e524]
                      - cell "--None--" [ref=e525]:
                        - combobox "Secondary Relationship to Owner 1" [ref=e527]:
                          - option "--None--" [selected]
                          - option "Spouse"
                          - option "Other"
                    - row [ref=e528]:
                      - cell [ref=e529]
                      - cell [ref=e530]
                      - cell [ref=e531]
                      - cell [ref=e532]
                    - row "Primary Beneficiary Name 2 Secondary Beneficiary Name 2" [ref=e533]:
                      - cell "Primary Beneficiary Name 2" [ref=e534]
                      - cell [ref=e535]:
                        - textbox "Primary Beneficiary Name 2" [ref=e536]
                      - cell "Secondary Beneficiary Name 2" [ref=e537]
                      - cell [ref=e538]:
                        - textbox "Secondary Beneficiary Name 2" [ref=e539]
                    - row "Primary % Share 2 Secondary % Share 2" [ref=e540]:
                      - cell "Primary % Share 2" [ref=e541]
                      - cell [ref=e542]:
                        - textbox "Primary % Share 2" [ref=e543]
                      - cell "Secondary % Share 2" [ref=e544]
                      - cell [ref=e545]:
                        - textbox "Secondary % Share 2" [ref=e546]
                    - row "Primary DOB 2 [ 4/9/2026 ] Secondary DOB 2 [ 4/9/2026 ]" [ref=e547]:
                      - cell "Primary DOB 2" [ref=e548]
                      - cell "[ 4/9/2026 ]" [ref=e549]:
                        - generic [ref=e550]:
                          - textbox "Primary DOB 2" [ref=e551]
                          - generic [ref=e552]:
                            - text: "["
                            - link "4/9/2026" [ref=e553] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsW1', true);
                            - text: "]"
                      - cell "Secondary DOB 2" [ref=e554]
                      - cell "[ 4/9/2026 ]" [ref=e555]:
                        - generic [ref=e556]:
                          - textbox "Secondary DOB 2" [ref=e557]
                          - generic [ref=e558]:
                            - text: "["
                            - link "4/9/2026" [ref=e559] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsWw', true);
                            - text: "]"
                    - row "Primary Relationship to Owner 2 --None-- Secondary Relationship to Owner 2 --None--" [ref=e560]:
                      - cell "Primary Relationship to Owner 2" [ref=e561]
                      - cell "--None--" [ref=e562]:
                        - combobox "Primary Relationship to Owner 2" [ref=e564]:
                          - option "--None--" [selected]
                          - option "spouse"
                          - option "other"
                      - cell "Secondary Relationship to Owner 2" [ref=e565]
                      - cell "--None--" [ref=e566]:
                        - combobox "Secondary Relationship to Owner 2" [ref=e568]:
                          - option "--None--" [selected]
                          - option "Spouse"
                          - option "Other"
                    - row [ref=e569]:
                      - cell [ref=e570]
                      - cell [ref=e571]
                      - cell [ref=e572]
                      - cell [ref=e573]
                    - row "Primary Beneficiary Name 3 Secondary Beneficiary Name 3" [ref=e574]:
                      - cell "Primary Beneficiary Name 3" [ref=e575]
                      - cell [ref=e576]:
                        - textbox "Primary Beneficiary Name 3" [ref=e577]
                      - cell "Secondary Beneficiary Name 3" [ref=e578]
                      - cell [ref=e579]:
                        - textbox "Secondary Beneficiary Name 3" [ref=e580]
                    - row "Primary % Share 3 Secondary % Share 3" [ref=e581]:
                      - cell "Primary % Share 3" [ref=e582]
                      - cell [ref=e583]:
                        - textbox "Primary % Share 3" [ref=e584]
                      - cell "Secondary % Share 3" [ref=e585]
                      - cell [ref=e586]:
                        - textbox "Secondary % Share 3" [ref=e587]
                    - row "Primary DOB 3 [ 4/9/2026 ] Secondary DOB 3 [ 4/9/2026 ]" [ref=e588]:
                      - cell "Primary DOB 3" [ref=e589]
                      - cell "[ 4/9/2026 ]" [ref=e590]:
                        - generic [ref=e591]:
                          - textbox "Primary DOB 3" [ref=e592]
                          - generic [ref=e593]:
                            - text: "["
                            - link "4/9/2026" [ref=e594] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsW2', true);
                            - text: "]"
                      - cell "Secondary DOB 3" [ref=e595]
                      - cell "[ 4/9/2026 ]" [ref=e596]:
                        - generic [ref=e597]:
                          - textbox "Secondary DOB 3" [ref=e598]
                          - generic [ref=e599]:
                            - text: "["
                            - link "4/9/2026" [ref=e600] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsWx', true);
                            - text: "]"
                    - row "Primary Relationship to Owner 3 --None-- Secondary Relationship to Owner 3 --None--" [ref=e601]:
                      - cell "Primary Relationship to Owner 3" [ref=e602]
                      - cell "--None--" [ref=e603]:
                        - combobox "Primary Relationship to Owner 3" [ref=e605]:
                          - option "--None--" [selected]
                          - option "spouse"
                          - option "other"
                      - cell "Secondary Relationship to Owner 3" [ref=e606]
                      - cell "--None--" [ref=e607]:
                        - combobox "Secondary Relationship to Owner 3" [ref=e609]:
                          - option "--None--" [selected]
                          - option "Spouse"
                          - option "Other"
                - heading "TOA Information" [level=3] [ref=e611]
                - table [ref=e613]:
                  - rowgroup [ref=e614]:
                    - row "Create Secondary Opportunity for TOA Statement Received" [ref=e615]:
                      - cell "Create Secondary Opportunity for TOA" [ref=e616]
                      - cell "Create Secondary Opportunity for TOA" [ref=e617]:
                        - checkbox "Create Secondary Opportunity for TOA" [ref=e618]
                      - cell "Statement Received" [ref=e619]:
                        - generic [ref=e620]: Statement Received
                      - cell "Statement Received" [ref=e621]:
                        - checkbox "Statement Received" [ref=e622]
                    - row "TOA Amount Rollover Service Specialist Rollover Service Specialist Lookup (New Window)" [ref=e623]:
                      - cell "TOA Amount" [ref=e624]:
                        - generic [ref=e625]: TOA Amount
                      - cell [ref=e626]:
                        - textbox "TOA Amount" [ref=e627]
                      - cell "Rollover Service Specialist" [ref=e628]:
                        - generic [ref=e629]: Rollover Service Specialist
                      - cell "Rollover Service Specialist Lookup (New Window)" [ref=e630]:
                        - generic [ref=e631]:
                          - textbox "Rollover Service Specialist" [ref=e632]
                          - link "Rollover Service Specialist Lookup (New Window)" [ref=e633] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3DCF00NG000000FChvs%26lktp%3D%27%20%2B%20getElementByIdCS%28%27CF00NG000000FChvs_lktp%27%29.value%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27CF00NG000000FChvs%27%29.value.substring%280%2C%2080%29%29%29
                            - img "Rollover Service Specialist Lookup (New Window)" [ref=e634]
                    - row "Carrier Carrier Lookup (New Window)" [ref=e635]:
                      - cell "Carrier" [ref=e636]
                      - cell "Carrier Lookup (New Window)" [ref=e637]:
                        - generic [ref=e638]:
                          - textbox "Carrier" [ref=e639]
                          - link "Carrier Lookup (New Window)" [ref=e640] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3DCF00NG000000DwsUa%26lkfield%3D00NG000000DwsUa%26lkent%3D006%26lktp%3D%27%20%2B%20getElementByIdCS%28%27CF00NG000000DwsUa_lktp%27%29.value%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27CF00NG000000DwsUa%27%29.value.substring%280%2C%2080%29%29%29
                            - img "Carrier Lookup (New Window)" [ref=e641]
                      - cell [ref=e642]
                      - cell [ref=e643]
                - heading "Additional Information" [level=3] [ref=e645]
                - table [ref=e647]:
                  - rowgroup [ref=e648]:
                    - row "Primary Campaign Source Primary Campaign Source Lookup (New Window) Lead Source --None--" [ref=e649]:
                      - cell "Primary Campaign Source" [ref=e650]
                      - cell "Primary Campaign Source Lookup (New Window)" [ref=e651]:
                        - generic [ref=e652]:
                          - textbox "Primary Campaign Source" [ref=e653]
                          - link "Primary Campaign Source Lookup (New Window)" [ref=e654] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3Dopp17%26lkfield%3DCampaign%26lkent%3D006%26lktp%3D%27%20%2B%20getElementByIdCS%28%27opp17_lktp%27%29.value%2B%27%26dplp%3D%27%20%2B%20encodeURIComponent%28dpdLkUtil.serialize%28sfdcPage.getReferredDomIds%28%27opp17%27%29%2C%20%27opp17%27%29%29%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27opp17%27%29.value.substring%280%2C%2080%29%29%29
                            - img "Primary Campaign Source Lookup (New Window)" [ref=e655]
                      - cell "Lead Source" [ref=e657]
                      - cell "--None--" [ref=e658]:
                        - combobox "Lead Source" [ref=e660]:
                          - option "--None--" [selected]
                          - option "Employee Referral"
                          - option "External Referral"
                          - option "Other"
                          - option "Purchased List"
                          - option "RCG Referral"
                          - option "REC Referral"
                          - option "Web"
                          - option "MTC"
                          - option "AA"
                    - row "Main Competitor(s)" [ref=e661]:
                      - cell [ref=e662]
                      - cell [ref=e663]
                      - cell "Main Competitor(s)" [ref=e664]
                      - cell [ref=e665]:
                        - textbox "Main Competitor(s)" [ref=e666]
                - heading "System Information" [level=3] [ref=e668]
                - table [ref=e670]:
                  - rowgroup [ref=e671]:
                    - row "CDL External Key" [ref=e672]:
                      - cell [ref=e673]
                      - cell [ref=e674]
                      - cell "CDL External Key" [ref=e675]
                      - cell [ref=e676]:
                        - textbox "CDL External Key" [ref=e677]
                    - row "Referring RES Referring RES Lookup (New Window)" [ref=e678]:
                      - cell [ref=e679]
                      - cell [ref=e680]
                      - cell "Referring RES" [ref=e681]
                      - cell "Referring RES Lookup (New Window)" [ref=e682]:
                        - generic [ref=e683]:
                          - textbox "Referring RES" [ref=e684]
                          - link "Referring RES Lookup (New Window)" [ref=e685] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3DCF00NG000000DwsWV%26lktp%3D%27%20%2B%20getElementByIdCS%28%27CF00NG000000DwsWV_lktp%27%29.value%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27CF00NG000000DwsWV%27%29.value.substring%280%2C%2080%29%29%29
                            - img "Referring RES Lookup (New Window)" [ref=e686]
              - table [ref=e688]:
                - rowgroup [ref=e689]:
                  - row "Save Save & New Cancel" [ref=e690]:
                    - cell [ref=e691]
                    - cell "Save Save & New Cancel" [ref=e692]:
                      - button "Save" [ref=e693] [cursor=pointer]
                      - button "Save & New" [ref=e694] [cursor=pointer]
                      - button "Cancel" [ref=e695] [cursor=pointer]
    - generic [ref=e697]:
      - text: Copyright © 2000-2026 salesforce.com, inc. All rights reserved. |
      - link "Privacy Statement" [ref=e698] [cursor=pointer]:
        - /url: http://www.salesforce.com/company/privacy.jsp
      - text: "|"
      - link "Security Statement" [ref=e699] [cursor=pointer]:
        - /url: http://www.salesforce.com/company/security.jsp
      - text: "|"
      - link "Terms of Use" [ref=e700] [cursor=pointer]:
        - /url: http://www.salesforce.com/company/msa.jsp
      - text: "|"
      - link "508 Compliance" [ref=e701] [cursor=pointer]:
        - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=accessibility_overview.htm&section=accessibility&language=en_US&release=260.12.1&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
      - text: "|"
      - link "Go to Salesforce mobile app" [ref=e702] [cursor=pointer]:
        - /url: /ltng/oneAppRedirect
  - iframe [ref=e703]:
    
  - generic:
    - button "Expand Quick Access Menu" [ref=e705]
    - generic [ref=e706]:
      - generic [ref=e707]:
        - link "Go to Setup" [ref=e708] [cursor=pointer]:
          - /url: /setup/forcecomHomepage.apexp?setupid=ForceCom&retURL=%2F006%2Fe%3FRecordType%3D012G0000001BFrD%26ent%3DOpportunity
          - img "Go to Setup" [ref=e709]
        - link "Help" [ref=e710] [cursor=pointer]:
          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?section=Dev_Tools&target=dev_quick_access_menu.htm&loc=help&language=en_US&release=260.12.1&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
          - img "Help" [ref=e711]
      - generic [ref=e712]:
        - list [ref=e713]:
          - listitem [ref=e714]:
            - link "View Fields" [ref=e715] [cursor=pointer]:
              - /url: /p/setup/layout/LayoutFieldList?type=Opportunity&setupid=OpportunityFields
          - listitem [ref=e716]:
            - link "View Object" [ref=e717] [cursor=pointer]:
              - /url: /ui/setup/Setup?setupid=Opportunity
          - listitem [ref=e718]:
            - link "View Validation Rules" [ref=e719] [cursor=pointer]:
              - /url: /_ui/common/config/entity/ValidationFormulaListUI/d?retURL=%2F006%2Fe%3FRecordType%3D012G0000001BFrD%26ent%3DOpportunity&tableEnumOrId=Opportunity&setupid=OpportunityValidations
          - listitem [ref=e720]:
            - link "View Approvals" [ref=e721] [cursor=pointer]:
              - /url: /p/process/ProcessDefinitionSetup?TableEnumOrId=Opportunity&setupid=ApprovalProcesses
        - separator [ref=e722]
        - list [ref=e723]:
          - listitem [ref=e724]:
            - link "Edit App" [ref=e725] [cursor=pointer]:
              - /url: /02uG0000000GeGC/e?retURL=%2F006%2Fe%3FRecordType%3D012G0000001BFrD%26ent%3DOpportunity&setupid=TabSet
          - listitem [ref=e726]:
            - link "Edit Layout" [ref=e727] [cursor=pointer]:
              - /url: /layouteditor/layoutEditor.apexp?type=Opportunity&lid=00h4R00000mxxnK&retURL=%2F006%2Fe%3FRecordType%3D012G0000001BFrD%26ent%3DOpportunity&setupid=OpportunityLayouts
          - listitem [ref=e728]:
            - link "View Record Type" [ref=e729] [cursor=pointer]:
              - /url: /setup/ui/recordtypefields.jsp?id=012G0000001BFrD&type=Opportunity&setupid=OpportunityRecords
      - link "Turn off menu" [ref=e731] [cursor=pointer]:
        - /url: "#"
```

# Test source

```ts
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
  47  |   private get planLookupLink() {
  48  |     return new ResilientLocator(this['page'], [
  49  |       (p) => p.locator('a[title="Plan Lookup (New Window)"]'),
  50  |       (p) => p.getByRole('link', { name: 'Plan Lookup (New Window)' }),
  51  |       (p) => p.locator('a[href*="CF00NG000000Dwu6z"]'),
  52  |     ]);
  53  |   }
  54  | 
  55  |   private get stageSelect() {
  56  |     return new ResilientLocator(this['page'], [
  57  |       (p) => p.locator('select[id="opp11"]'),
  58  |       (p) => p.getByLabel('* Stage'),
  59  |       (p) => p.locator('select[name="opp11"]'),
  60  |     ]);
  61  |   }
  62  | 
  63  |   private get closeDateInput() {
  64  |     return new ResilientLocator(this['page'], [
  65  |       (p) => p.getByRole('textbox', { name: '* Close Date' }),
  66  |       (p) => p.locator('#opp9'),
  67  |       (p) => p.locator('input[name="opp9"]'),
  68  |     ]);
  69  |   }
  70  | 
  71  |   private get saveButton() {
  72  |     return new ResilientLocator(this['page'], [
  73  |       (p) => p.locator('input[name="save"]').first(),
  74  |       (p) => p.locator('td.pbButton input[value="Save"]').first(),
  75  |       (p) => p.locator('input[type="submit"][value="Save"]').first(),
  76  |     ]);
  77  |   }
  78  | 
  79  |   // ── Actions ───────────────────────────────────────────────────────────────
  80  | 
  81  |   /**
  82  |    * Navigate directly to the CLA Classic opportunity creation form.
  83  |    */
  84  |   async navigateToClassicCreateForm(): Promise<void> {
  85  |     try {
  86  |       await this['page'].goto(this.pageUrl, { timeout: 60_000, waitUntil: 'domcontentloaded' });
  87  |       await expect(this.opportunityNameInput.getLocator()).toBeVisible({ timeout: 20_000 });
  88  |     } catch (error) {
  89  |       console.error('Failed to navigate to Classic Opportunity create form');
  90  |       throw error;
  91  |     }
  92  |   }
  93  | 
  94  |   async fillOpportunityName(name: string): Promise<void> {
  95  |     try {
  96  |       await this.opportunityNameInput.getLocator().fill(name);
  97  |     } catch (error) {
  98  |       console.error(`Failed to fill Opportunity Name: ${name}`);
  99  |       throw error;
  100 |     }
  101 |   }
  102 | 
  103 |   /**
  104 |    * Fills the Account Name field directly (it is a plain text input, not readonly).
  105 |    */
  106 |   async fillAccountName(accountName: string): Promise<void> {
  107 |     try {
  108 |       await this.accountNameInput.getLocator().fill(accountName);
  109 |     } catch (error) {
  110 |       console.error(`Failed to fill Account Name: ${accountName}`);
  111 |       throw error;
  112 |     }
  113 |   }
  114 | 
  115 |   /**
  116 |    * Clicks the "Plan Lookup (New Window)" link, waits for the popup window to open,
  117 |    * searches for the plan name, and selects the matching result from the popup.
  118 |    *
  119 |    * Classic lookup popups open as a new browser window/tab. We await the popup
  120 |    * using `page.waitForEvent('popup')` before clicking the link.
  121 |    *
  122 |    * @param planName - The exact plan name to search for and select (e.g. "TestPlan_1775124181119")
  123 |    */
  124 |   async fillPlanLookupAndSelect(planName: string): Promise<void> {
  125 |     try {
  126 |       const popupPromise = this['page'].waitForEvent('popup');
  127 |       await this.planLookupLink.getLocator().click();
  128 |       const popupPage = await popupPromise;
  129 |       await popupPage.waitForLoadState('domcontentloaded');
  130 | 
  131 |       // The popup has a search input and a "Go!" button
  132 |       const searchInput = popupPage.locator('input[name="lksrch"]');
> 133 |       await expect(searchInput).toBeVisible({ timeout: 15_000 });
      |                                 ^ Error: expect(locator).toBeVisible() failed
  134 |       await searchInput.fill(planName);
  135 |       await popupPage.locator('input[name="go"]').click();
  136 | 
  137 |       // Wait for results iframe (Classic lookup uses an iframe for results)
  138 |       const resultsFrame = popupPage.getByTitle('Results').contentFrame();
  139 |       const resultLink = resultsFrame.getByRole('link', { name: planName });
  140 |       await expect(resultLink).toBeVisible({ timeout: 15_000 });
  141 |       await resultLink.click();
  142 | 
  143 |       // Popup closes after selection — wait for it to close
  144 |       await popupPage.waitForEvent('close', { timeout: 15_000 });
  145 |     } catch (error) {
  146 |       console.error(`Failed to fill Plan lookup and select: ${planName}`);
  147 |       throw error;
  148 |     }
  149 |   }
  150 | 
  151 |   async selectStage(stage: string): Promise<void> {
  152 |     try {
  153 |       await this.stageSelect.getLocator().selectOption(stage);
  154 |     } catch (error) {
  155 |       console.error(`Failed to select Stage: ${stage}`);
  156 |       throw error;
  157 |     }
  158 |   }
  159 | 
  160 |   async fillCloseDate(date: string): Promise<void> {
  161 |     try {
  162 |       const input = this.closeDateInput.getLocator();
  163 |       await input.fill(date);
  164 |       await input.press('Tab');
  165 |     } catch (error) {
  166 |       console.error(`Failed to fill Close Date: ${date}`);
  167 |       throw error;
  168 |     }
  169 |   }
  170 | 
  171 |   /**
  172 |    * Clicks Save and waits for the redirect to the Opportunity detail page.
  173 |    * After saving, Salesforce Classic either stays in Classic or redirects to
  174 |    * the Lightning detail page depending on org settings. We wait for navigation
  175 |    * to complete.
  176 |    */
  177 |   async clickSave(): Promise<void> {
  178 |     try {
  179 |       await this.saveButton.getLocator().click();
  180 |       // Wait for navigation away from the edit form
  181 |       await this['page'].waitForURL((url) => !url.href.includes('/006/e'), { timeout: 30_000 });
  182 |     } catch (error) {
  183 |       console.error('Failed to click Save on Classic Opportunity form');
  184 |       throw error;
  185 |     }
  186 |   }
  187 | 
  188 |   // ── Verification ──────────────────────────────────────────────────────────
  189 | 
  190 |   async verifyFormLoaded(): Promise<void> {
  191 |     try {
  192 |       await expect(this.opportunityNameInput.getLocator()).toBeVisible({ timeout: 20_000 });
  193 |     } catch (error) {
  194 |       console.error('Classic Opportunity creation form is not visible');
  195 |       throw error;
  196 |     }
  197 |   }
  198 | }
  199 | 
```