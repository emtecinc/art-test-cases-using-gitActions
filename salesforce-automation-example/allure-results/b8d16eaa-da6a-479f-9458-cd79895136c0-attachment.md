# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: opportunity/create-cla-classic-opportunity-fund-account-selection.spec.ts >> Opportunity - Create CLA Classic with Fund Account Selection @smoke >> should create CLA Classic opportunity with fund account selection @smoke
- Location: tests/opportunity/create-cla-classic-opportunity-fund-account-selection.spec.ts:61:7

# Error details

```
TimeoutError: page.waitForEvent: Timeout 15000ms exceeded while waiting for event "close"
=========================== logs ===========================
waiting for event "close"
============================================================
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
                - /url: /servlet/servlet.Integration?lid=01rG0000000owZn&ic=1&linkToken=VmpFPSxNakF5Tmkwd05DMHhNbFF3T1RveU5Ub3hNaTQ1TmpWYSw0RjFGbGNrZTVLUjFUdkJkU1ZUNElhd3pSd0NYQzB6eWFDMlh0RHBCT2pjPSxZV1prTUdKaA%3D%3D
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
                    - row "* Opportunity Name ClaClassic_1775726712355 Opportunity Owner Somya Sijaria" [ref=e103]:
                      - cell "* Opportunity Name" [ref=e104]:
                        - generic [ref=e105]:
                          - generic [ref=e106]: "*"
                          - text: Opportunity Name
                      - cell "ClaClassic_1775726712355" [ref=e107]:
                        - textbox "* Opportunity Name" [ref=e110]: ClaClassic_1775726712355
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
                    - row "* Plan TestPlan_1775124181119 Clear Plan Lookup (New Window) Opportunity Record Type Rollover" [ref=e128]:
                      - cell "* Plan" [ref=e129]:
                        - generic [ref=e130]:
                          - generic [ref=e131]: "*"
                          - text: Plan
                      - cell "TestPlan_1775124181119 Clear Plan Lookup (New Window)" [ref=e132]:
                        - generic [ref=e135]:
                          - textbox "* Plan" [active] [ref=e136]: TestPlan_1775124181119
                          - img "Clear" [ref=e137] [cursor=pointer]
                          - link "Plan Lookup (New Window)" [ref=e138] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3DCF00NG000000Dwu6z%26lktp%3D%27%20%2B%20getElementByIdCS%28%27CF00NG000000Dwu6z_lktp%27%29.value%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27CF00NG000000Dwu6z%27%29.value.substring%280%2C%2080%29%29%29
                            - img "Plan Lookup (New Window)" [ref=e139]
                      - cell "Opportunity Record Type" [ref=e141]
                      - cell "Rollover" [ref=e142]
                    - row "Spanish Speaker * Stage --None--" [ref=e143]:
                      - cell "Spanish Speaker" [ref=e144]
                      - cell "Spanish Speaker" [ref=e145]:
                        - checkbox "Spanish Speaker" [ref=e146]
                      - cell "* Stage" [ref=e147]:
                        - generic [ref=e148]:
                          - generic [ref=e149]: "*"
                          - text: Stage
                      - cell "--None--" [ref=e150]:
                        - combobox "* Stage" [ref=e154]:
                          - option "--None--" [selected]
                          - option "New"
                          - option "In Progress"
                          - option "Closed Won"
                          - option "Closed Lost"
                          - option "Cancelled"
                    - row "Priority --None-- Type Rollover" [ref=e155]:
                      - cell "Priority" [ref=e156]
                      - cell "--None--" [ref=e157]:
                        - combobox "Priority" [ref=e159]:
                          - option "--None--" [selected]
                          - option "High"
                          - option "Medium"
                          - option "Low"
                      - cell "Type" [ref=e160]
                      - cell "Rollover" [ref=e161]:
                        - combobox "Type" [ref=e163]:
                          - option "--None--"
                          - option "Rollover" [selected]
                          - option "Transfer of Assets"
                          - option "GIFL"
                    - row "Survey Opt Out Type Status --None--" [ref=e164]:
                      - cell "Survey Opt Out" [ref=e165]
                      - cell "Survey Opt Out" [ref=e166]:
                        - checkbox "Survey Opt Out" [ref=e167]
                      - cell "Type Status" [ref=e168]
                      - cell "--None--" [ref=e169]:
                        - combobox "Type Status" [ref=e172]:
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
                    - row "Registration Type --None-- DEF Future Approved" [ref=e174]:
                      - cell "Registration Type" [ref=e175]
                      - cell "--None--" [ref=e176]:
                        - combobox "Registration Type" [ref=e178]:
                          - option "--None--" [selected]
                          - option "MJHBS"
                          - option "Non-MJHBS"
                      - cell "DEF Future Approved" [ref=e179]
                      - cell "DEF Future Approved" [ref=e180]:
                        - checkbox "DEF Future Approved" [ref=e181]
                    - row "Approval Status --None-- DEF Approved Date [ 4/9/2026 ]" [ref=e182]:
                      - cell "Approval Status" [ref=e183]
                      - cell "--None--" [ref=e184]:
                        - combobox "Approval Status" [ref=e186]:
                          - option "--None--" [selected]
                          - option "Pending Approval"
                          - option "Rejected"
                          - option "Approved"
                          - option "Principal Review Required"
                      - cell "DEF Approved Date" [ref=e187]
                      - cell "[ 4/9/2026 ]" [ref=e188]:
                        - generic [ref=e189]:
                          - textbox "DEF Approved Date" [ref=e190]
                          - generic [ref=e191]:
                            - text: "["
                            - link "4/9/2026" [ref=e192] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00N4R00000JOGpy', true);
                            - text: "]"
                    - row "Account Recommendation Probability (%) 0" [ref=e193]:
                      - cell "Account Recommendation" [ref=e194]
                      - cell "Account Recommendation" [ref=e195]:
                        - checkbox "Account Recommendation" [ref=e196]
                      - cell "Probability (%)" [ref=e197]
                      - cell "0" [ref=e198]:
                        - textbox "Probability (%)" [ref=e199]: "0"
                    - row "Investment Recommendation Participant Online Distribution Allowed" [ref=e200]:
                      - cell "Investment Recommendation" [ref=e201]
                      - cell "Investment Recommendation" [ref=e202]:
                        - checkbox "Investment Recommendation" [ref=e203]
                      - cell "Participant Online Distribution Allowed" [ref=e204]:
                        - generic [ref=e205]: Participant Online Distribution Allowed
                      - cell "Participant Online Distribution Allowed" [ref=e206]:
                        - checkbox "Participant Online Distribution Allowed" [ref=e207]
                    - row "Digital Retention Source?" [ref=e208]:
                      - cell [ref=e209]
                      - cell [ref=e210]
                      - cell "Digital Retention Source?" [ref=e211]
                      - cell "Digital Retention Source?" [ref=e212]:
                        - checkbox "Digital Retention Source?" [ref=e213]
                    - row "JHSS NIGO Reason --None--" [ref=e214]:
                      - cell [ref=e215]
                      - cell [ref=e216]
                      - cell "JHSS NIGO Reason" [ref=e217]
                      - cell "--None--" [ref=e218]:
                        - combobox "JHSS NIGO Reason" [ref=e220]:
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
                    - row "Send Signed PPWK Issue --None--" [ref=e221]:
                      - cell [ref=e222]
                      - cell [ref=e223]
                      - cell "Send Signed PPWK Issue" [ref=e224]
                      - cell "--None--" [ref=e225]:
                        - combobox "Send Signed PPWK Issue" [ref=e227]:
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
                - heading "Other Information" [level=3] [ref=e229]
                - table [ref=e231]:
                  - rowgroup [ref=e232]:
                    - row "Amount Actual Amount" [ref=e233]:
                      - cell "Amount" [ref=e234]
                      - cell [ref=e235]:
                        - textbox "Amount" [ref=e236]
                      - cell "Actual Amount" [ref=e237]
                      - cell [ref=e238]:
                        - textbox "Actual Amount" [ref=e239]
                    - row "* Close Date [ 4/9/2026 ] Actual Destination --None--" [ref=e240]:
                      - cell "* Close Date" [ref=e241]:
                        - generic [ref=e242]:
                          - generic [ref=e243]: "*"
                          - text: Close Date
                      - cell "[ 4/9/2026 ]" [ref=e244]:
                        - generic [ref=e247]:
                          - textbox "* Close Date" [ref=e248]
                          - generic [ref=e249]:
                            - text: "["
                            - link "4/9/2026" [ref=e250] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', 'opp9', true);
                            - text: "]"
                      - cell "Actual Destination" [ref=e251]
                      - cell "--None--" [ref=e252]:
                        - combobox "Actual Destination" [ref=e254]:
                          - option "--None--" [selected]
                          - option "Mutual Funds"
                          - option "RPS"
                          - option "Annuity"
                          - option "Other"
                    - row "Actual Close Date [ 4/9/2026, 5:25 AM ]" [ref=e255]:
                      - cell [ref=e256]
                      - cell [ref=e257]
                      - cell "Actual Close Date" [ref=e258]
                      - cell "[ 4/9/2026, 5:25 AM ]" [ref=e259]:
                        - generic [ref=e260]:
                          - textbox "Actual Close Date" [ref=e261]
                          - generic [ref=e262]:
                            - text: "["
                            - link "4/9/2026, 5:25 AM" [ref=e263] [cursor=pointer]:
                              - /url: javascript:void(DatePicker.insertDate('4/9/2026, 5:25 AM', '00NG000000DwsUF', true));
                            - text: "]"
                    - row "Total Outbound Contact Task Count 0" [ref=e264]:
                      - cell [ref=e265]
                      - cell [ref=e266]
                      - cell "Total Outbound Contact Task Count" [ref=e267]:
                        - generic [ref=e268]: Total Outbound Contact Task Count
                      - cell "0" [ref=e269]:
                        - textbox "Total Outbound Contact Task Count" [ref=e270]: "0"
                - heading "Withdrawal Details" [level=3] [ref=e272]
                - table [ref=e274]:
                  - rowgroup [ref=e275]:
                    - row "Do not send PPWK CAR has completed WDF" [ref=e276]:
                      - cell "Do not send PPWK" [ref=e277]:
                        - generic [ref=e278]: Do not send PPWK
                      - cell "Do not send PPWK" [ref=e279]:
                        - checkbox "Do not send PPWK" [ref=e280]
                      - cell "CAR has completed WDF" [ref=e281]:
                        - generic [ref=e282]: CAR has completed WDF
                      - cell "CAR has completed WDF" [ref=e283]:
                        - checkbox "CAR has completed WDF" [ref=e284]
                    - row "Reason For Withdrawal --None-- Directed PPT to TPA/PS for WDF" [ref=e285]:
                      - cell "Reason For Withdrawal" [ref=e286]
                      - cell "--None--" [ref=e287]:
                        - combobox "Reason For Withdrawal" [ref=e289]:
                          - option "--None--" [selected]
                          - option "Termination = TE"
                          - option "Retirement = RE"
                          - option "Early Retirement = PD"
                          - option "Individual = ID"
                      - cell "Directed PPT to TPA/PS for WDF" [ref=e290]:
                        - generic [ref=e291]: Directed PPT to TPA/PS for WDF
                      - cell "Directed PPT to TPA/PS for WDF" [ref=e292]:
                        - checkbox "Directed PPT to TPA/PS for WDF" [ref=e293]
                    - row "Termination Date [ 4/9/2026 ] PPT already sent WDF to PS" [ref=e294]:
                      - cell "Termination Date" [ref=e295]
                      - cell "[ 4/9/2026 ]" [ref=e296]:
                        - generic [ref=e297]:
                          - textbox "Termination Date" [ref=e298]
                          - generic [ref=e299]:
                            - text: "["
                            - link "4/9/2026" [ref=e300] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsXR', true);
                            - text: "]"
                      - cell "PPT already sent WDF to PS" [ref=e301]:
                        - generic [ref=e302]: PPT already sent WDF to PS
                      - cell "PPT already sent WDF to PS" [ref=e303]:
                        - checkbox "PPT already sent WDF to PS" [ref=e304]
                    - row "Retirement Date [ 4/9/2026 ] PPT already sent WDF to TPA" [ref=e305]:
                      - cell "Retirement Date" [ref=e306]
                      - cell "[ 4/9/2026 ]" [ref=e307]:
                        - generic [ref=e308]:
                          - textbox "Retirement Date" [ref=e309]
                          - generic [ref=e310]:
                            - text: "["
                            - link "4/9/2026" [ref=e311] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsWZ', true);
                            - text: "]"
                      - cell "PPT already sent WDF to TPA" [ref=e312]:
                        - generic [ref=e313]: PPT already sent WDF to TPA
                      - cell "PPT already sent WDF to TPA" [ref=e314]:
                        - checkbox "PPT already sent WDF to TPA" [ref=e315]
                    - row "Direct Rollover Assisted PPT with WDDEATH – Non Spouse" [ref=e316]:
                      - cell "Direct Rollover" [ref=e317]
                      - cell "Direct Rollover" [ref=e318]:
                        - checkbox "Direct Rollover" [ref=e319]
                      - cell "Assisted PPT with WDDEATH – Non Spouse" [ref=e320]:
                        - generic [ref=e321]: Assisted PPT with WDDEATH – Non Spouse
                      - cell "Assisted PPT with WDDEATH – Non Spouse" [ref=e322]:
                        - checkbox "Assisted PPT with WDDEATH – Non Spouse" [ref=e323]
                    - row "Pay Directly Lump Sum & Rollover Balance Assisted PPT with WDDEATH form – Spouse" [ref=e324]:
                      - cell "Pay Directly Lump Sum & Rollover Balance" [ref=e325]:
                        - generic [ref=e326]: Pay Directly Lump Sum & Rollover Balance
                      - cell "Pay Directly Lump Sum & Rollover Balance" [ref=e327]:
                        - checkbox "Pay Directly Lump Sum & Rollover Balance" [ref=e328]
                      - cell "Assisted PPT with WDDEATH form – Spouse" [ref=e329]:
                        - generic [ref=e330]: Assisted PPT with WDDEATH form – Spouse
                      - cell "Assisted PPT with WDDEATH form – Spouse" [ref=e331]:
                        - checkbox "Assisted PPT with WDDEATH form – Spouse" [ref=e332]
                    - row "Lump Sum Amount $ Assisted PPT with QDRO WDF" [ref=e333]:
                      - cell "Lump Sum Amount $" [ref=e334]
                      - cell [ref=e335]:
                        - textbox "Lump Sum Amount $" [ref=e336]
                      - cell "Assisted PPT with QDRO WDF" [ref=e337]:
                        - generic [ref=e338]: Assisted PPT with QDRO WDF
                      - cell "Assisted PPT with QDRO WDF" [ref=e339]:
                        - checkbox "Assisted PPT with QDRO WDF" [ref=e340]
                    - row "Lump Sum Percent % Assisted with I-Withdrawal" [ref=e341]:
                      - cell "Lump Sum Percent %" [ref=e342]
                      - cell [ref=e343]:
                        - textbox "Lump Sum Percent %" [ref=e344]
                      - cell "Assisted with I-Withdrawal" [ref=e345]:
                        - generic [ref=e346]: Assisted with I-Withdrawal
                      - cell "Assisted with I-Withdrawal" [ref=e347]:
                        - checkbox "Assisted with I-Withdrawal" [ref=e348]
                - heading "Additional Paperwork" [level=3] [ref=e350]
                - table [ref=e352]:
                  - rowgroup [ref=e353]:
                    - row "Emailed Special Tax Notice Emailed ABI form" [ref=e354]:
                      - cell "Emailed Special Tax Notice" [ref=e355]
                      - cell "Emailed Special Tax Notice" [ref=e356]:
                        - checkbox "Emailed Special Tax Notice" [ref=e357]
                      - cell "Emailed ABI form" [ref=e358]
                      - cell "Emailed ABI form" [ref=e359]:
                        - checkbox "Emailed ABI form" [ref=e360]
                    - row "Emailed Spousal Consent Sent RMD form" [ref=e361]:
                      - cell "Emailed Spousal Consent" [ref=e362]
                      - cell "Emailed Spousal Consent" [ref=e363]:
                        - checkbox "Emailed Spousal Consent" [ref=e364]
                      - cell "Sent RMD form" [ref=e365]
                      - cell "Sent RMD form" [ref=e366]:
                        - checkbox "Sent RMD form" [ref=e367]
                    - row "Emailed TPA Specific PPWK" [ref=e368]:
                      - cell "Emailed TPA Specific PPWK" [ref=e369]
                      - cell "Emailed TPA Specific PPWK" [ref=e370]:
                        - checkbox "Emailed TPA Specific PPWK" [ref=e371]
                      - cell [ref=e372]
                      - cell [ref=e373]
                - heading "IRA Details" [level=3] [ref=e375]
                - table [ref=e377]:
                  - rowgroup [ref=e378]:
                    - row "eDelivery" [ref=e379]:
                      - cell "eDelivery" [ref=e380]
                      - cell "eDelivery" [ref=e381]:
                        - checkbox "eDelivery" [ref=e382]
                      - cell [ref=e383]
                      - cell [ref=e384]
                    - row "Sales Charge Reduction --None--" [ref=e385]:
                      - cell "Sales Charge Reduction" [ref=e386]
                      - cell "--None--" [ref=e387]:
                        - combobox "Sales Charge Reduction" [ref=e389]:
                          - option "--None--" [selected]
                          - option "RPS Rollover"
                          - option "Family member"
                          - option "JH Employee"
                          - option "Active RPS, not eligible for consolidation"
                      - cell [ref=e390]
                      - cell [ref=e391]
                - heading "Employment Details" [level=3] [ref=e393]
                - table [ref=e395]:
                  - rowgroup [ref=e396]:
                    - row "Employment Status --None-- Employer Name" [ref=e397]:
                      - cell "Employment Status" [ref=e398]
                      - cell "--None--" [ref=e399]:
                        - combobox "Employment Status" [ref=e401]:
                          - option "--None--" [selected]
                          - option "Employed"
                          - option "Retired"
                          - option "Not employed"
                          - option "Declined to answer"
                      - cell "Employer Name" [ref=e402]
                      - cell [ref=e403]:
                        - textbox "Employer Name" [ref=e404]
                    - row "Occupation Employer Address" [ref=e405]:
                      - cell "Occupation" [ref=e406]
                      - cell [ref=e407]:
                        - textbox "Occupation" [ref=e408]
                      - cell "Employer Address" [ref=e409]
                      - cell [ref=e410]:
                        - textbox "Employer Address" [ref=e411]
                - heading "Affiliation" [level=3] [ref=e413]
                - table [ref=e415]:
                  - rowgroup [ref=e416]:
                    - row "No to all affiliation questions Member of the board? --None--" [ref=e417]:
                      - cell "No to all affiliation questions" [ref=e418]
                      - cell "No to all affiliation questions" [ref=e419]:
                        - checkbox "No to all affiliation questions" [ref=e420]
                      - cell "Member of the board?" [ref=e421]:
                        - generic [ref=e422]: Member of the board?
                      - cell "--None--" [ref=e423]:
                        - combobox "Member of the board?" [ref=e426]:
                          - option "--None--" [selected]
                          - option "Yes"
                          - option "No"
                    - row "Are you affiliated with a Broker Dealer? --None-- Company Name" [ref=e428]:
                      - cell "Are you affiliated with a Broker Dealer?" [ref=e429]
                      - cell "--None--" [ref=e430]:
                        - combobox "Are you affiliated with a Broker Dealer?" [ref=e433]:
                          - option "--None--" [selected]
                          - option "Yes"
                          - option "No"
                      - cell "Company Name" [ref=e435]
                      - cell [ref=e436]:
                        - textbox "Company Name" [ref=e437]
                    - row "Broker Dealer Name Ticker Symbol" [ref=e438]:
                      - cell "Broker Dealer Name" [ref=e439]
                      - cell [ref=e440]:
                        - textbox "Broker Dealer Name" [ref=e441]
                      - cell "Ticker Symbol" [ref=e442]
                      - cell [ref=e443]:
                        - textbox "Ticker Symbol" [ref=e444]
                    - row "Broker Dealer Address Political figure? --None--" [ref=e445]:
                      - cell "Broker Dealer Address" [ref=e446]
                      - cell [ref=e447]:
                        - textbox "Broker Dealer Address" [ref=e448]
                      - cell "Political figure?" [ref=e449]:
                        - generic [ref=e450]: Political figure?
                      - cell "--None--" [ref=e451]:
                        - combobox "Political figure?" [ref=e454]:
                          - option "--None--" [selected]
                          - option "Yes"
                          - option "No"
                - heading "Trusted Contact" [level=3] [ref=e457]
                - table [ref=e459]:
                  - rowgroup [ref=e460]:
                    - row "Declined to provide? Email" [ref=e461]:
                      - cell "Declined to provide?" [ref=e462]
                      - cell "Declined to provide?" [ref=e463]:
                        - checkbox "Declined to provide?" [ref=e464]
                      - cell "Email" [ref=e465]
                      - cell [ref=e466]:
                        - textbox "Email" [ref=e467]
                    - row "First Name Address" [ref=e468]:
                      - cell "First Name" [ref=e469]
                      - cell [ref=e470]:
                        - textbox "First Name" [ref=e471]
                      - cell "Address" [ref=e472]
                      - cell [ref=e473]:
                        - textbox "Address" [ref=e474]
                    - row "Last Name Phone Number" [ref=e475]:
                      - cell "Last Name" [ref=e476]
                      - cell [ref=e477]:
                        - textbox "Last Name" [ref=e478]
                      - cell "Phone Number" [ref=e479]
                      - cell [ref=e480]:
                        - textbox "Phone Number" [ref=e481]
                    - row "Relationship" [ref=e482]:
                      - cell "Relationship" [ref=e483]
                      - cell [ref=e484]:
                        - textbox "Relationship" [ref=e485]
                      - cell [ref=e486]
                      - cell [ref=e487]
                - heading "Beneficiary Information" [level=3] [ref=e489]
                - table [ref=e491]:
                  - rowgroup [ref=e492]:
                    - row "Primary Beneficiary Name 1 Secondary Beneficiary Name 1" [ref=e493]:
                      - cell "Primary Beneficiary Name 1" [ref=e494]
                      - cell [ref=e495]:
                        - textbox "Primary Beneficiary Name 1" [ref=e496]
                      - cell "Secondary Beneficiary Name 1" [ref=e497]
                      - cell [ref=e498]:
                        - textbox "Secondary Beneficiary Name 1" [ref=e499]
                    - row "Primary % Share 1 Secondary % Share 1" [ref=e500]:
                      - cell "Primary % Share 1" [ref=e501]
                      - cell [ref=e502]:
                        - textbox "Primary % Share 1" [ref=e503]
                      - cell "Secondary % Share 1" [ref=e504]
                      - cell [ref=e505]:
                        - textbox "Secondary % Share 1" [ref=e506]
                    - row "Primary DOB 1 [ 4/9/2026 ] Secondary DOB 1 [ 4/9/2026 ]" [ref=e507]:
                      - cell "Primary DOB 1" [ref=e508]
                      - cell "[ 4/9/2026 ]" [ref=e509]:
                        - generic [ref=e510]:
                          - textbox "Primary DOB 1" [ref=e511]
                          - generic [ref=e512]:
                            - text: "["
                            - link "4/9/2026" [ref=e513] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsW0', true);
                            - text: "]"
                      - cell "Secondary DOB 1" [ref=e514]
                      - cell "[ 4/9/2026 ]" [ref=e515]:
                        - generic [ref=e516]:
                          - textbox "Secondary DOB 1" [ref=e517]
                          - generic [ref=e518]:
                            - text: "["
                            - link "4/9/2026" [ref=e519] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsWv', true);
                            - text: "]"
                    - row "Primary Relationship to Owner 1 --None-- Secondary Relationship to Owner 1 --None--" [ref=e520]:
                      - cell "Primary Relationship to Owner 1" [ref=e521]
                      - cell "--None--" [ref=e522]:
                        - combobox "Primary Relationship to Owner 1" [ref=e524]:
                          - option "--None--" [selected]
                          - option "spouse"
                          - option "other"
                      - cell "Secondary Relationship to Owner 1" [ref=e525]
                      - cell "--None--" [ref=e526]:
                        - combobox "Secondary Relationship to Owner 1" [ref=e528]:
                          - option "--None--" [selected]
                          - option "Spouse"
                          - option "Other"
                    - row [ref=e529]:
                      - cell [ref=e530]
                      - cell [ref=e531]
                      - cell [ref=e532]
                      - cell [ref=e533]
                    - row "Primary Beneficiary Name 2 Secondary Beneficiary Name 2" [ref=e534]:
                      - cell "Primary Beneficiary Name 2" [ref=e535]
                      - cell [ref=e536]:
                        - textbox "Primary Beneficiary Name 2" [ref=e537]
                      - cell "Secondary Beneficiary Name 2" [ref=e538]
                      - cell [ref=e539]:
                        - textbox "Secondary Beneficiary Name 2" [ref=e540]
                    - row "Primary % Share 2 Secondary % Share 2" [ref=e541]:
                      - cell "Primary % Share 2" [ref=e542]
                      - cell [ref=e543]:
                        - textbox "Primary % Share 2" [ref=e544]
                      - cell "Secondary % Share 2" [ref=e545]
                      - cell [ref=e546]:
                        - textbox "Secondary % Share 2" [ref=e547]
                    - row "Primary DOB 2 [ 4/9/2026 ] Secondary DOB 2 [ 4/9/2026 ]" [ref=e548]:
                      - cell "Primary DOB 2" [ref=e549]
                      - cell "[ 4/9/2026 ]" [ref=e550]:
                        - generic [ref=e551]:
                          - textbox "Primary DOB 2" [ref=e552]
                          - generic [ref=e553]:
                            - text: "["
                            - link "4/9/2026" [ref=e554] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsW1', true);
                            - text: "]"
                      - cell "Secondary DOB 2" [ref=e555]
                      - cell "[ 4/9/2026 ]" [ref=e556]:
                        - generic [ref=e557]:
                          - textbox "Secondary DOB 2" [ref=e558]
                          - generic [ref=e559]:
                            - text: "["
                            - link "4/9/2026" [ref=e560] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsWw', true);
                            - text: "]"
                    - row "Primary Relationship to Owner 2 --None-- Secondary Relationship to Owner 2 --None--" [ref=e561]:
                      - cell "Primary Relationship to Owner 2" [ref=e562]
                      - cell "--None--" [ref=e563]:
                        - combobox "Primary Relationship to Owner 2" [ref=e565]:
                          - option "--None--" [selected]
                          - option "spouse"
                          - option "other"
                      - cell "Secondary Relationship to Owner 2" [ref=e566]
                      - cell "--None--" [ref=e567]:
                        - combobox "Secondary Relationship to Owner 2" [ref=e569]:
                          - option "--None--" [selected]
                          - option "Spouse"
                          - option "Other"
                    - row [ref=e570]:
                      - cell [ref=e571]
                      - cell [ref=e572]
                      - cell [ref=e573]
                      - cell [ref=e574]
                    - row "Primary Beneficiary Name 3 Secondary Beneficiary Name 3" [ref=e575]:
                      - cell "Primary Beneficiary Name 3" [ref=e576]
                      - cell [ref=e577]:
                        - textbox "Primary Beneficiary Name 3" [ref=e578]
                      - cell "Secondary Beneficiary Name 3" [ref=e579]
                      - cell [ref=e580]:
                        - textbox "Secondary Beneficiary Name 3" [ref=e581]
                    - row "Primary % Share 3 Secondary % Share 3" [ref=e582]:
                      - cell "Primary % Share 3" [ref=e583]
                      - cell [ref=e584]:
                        - textbox "Primary % Share 3" [ref=e585]
                      - cell "Secondary % Share 3" [ref=e586]
                      - cell [ref=e587]:
                        - textbox "Secondary % Share 3" [ref=e588]
                    - row "Primary DOB 3 [ 4/9/2026 ] Secondary DOB 3 [ 4/9/2026 ]" [ref=e589]:
                      - cell "Primary DOB 3" [ref=e590]
                      - cell "[ 4/9/2026 ]" [ref=e591]:
                        - generic [ref=e592]:
                          - textbox "Primary DOB 3" [ref=e593]
                          - generic [ref=e594]:
                            - text: "["
                            - link "4/9/2026" [ref=e595] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsW2', true);
                            - text: "]"
                      - cell "Secondary DOB 3" [ref=e596]
                      - cell "[ 4/9/2026 ]" [ref=e597]:
                        - generic [ref=e598]:
                          - textbox "Secondary DOB 3" [ref=e599]
                          - generic [ref=e600]:
                            - text: "["
                            - link "4/9/2026" [ref=e601] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/9/2026', '00NG000000DwsWx', true);
                            - text: "]"
                    - row "Primary Relationship to Owner 3 --None-- Secondary Relationship to Owner 3 --None--" [ref=e602]:
                      - cell "Primary Relationship to Owner 3" [ref=e603]
                      - cell "--None--" [ref=e604]:
                        - combobox "Primary Relationship to Owner 3" [ref=e606]:
                          - option "--None--" [selected]
                          - option "spouse"
                          - option "other"
                      - cell "Secondary Relationship to Owner 3" [ref=e607]
                      - cell "--None--" [ref=e608]:
                        - combobox "Secondary Relationship to Owner 3" [ref=e610]:
                          - option "--None--" [selected]
                          - option "Spouse"
                          - option "Other"
                - heading "TOA Information" [level=3] [ref=e612]
                - table [ref=e614]:
                  - rowgroup [ref=e615]:
                    - row "Create Secondary Opportunity for TOA Statement Received" [ref=e616]:
                      - cell "Create Secondary Opportunity for TOA" [ref=e617]
                      - cell "Create Secondary Opportunity for TOA" [ref=e618]:
                        - checkbox "Create Secondary Opportunity for TOA" [ref=e619]
                      - cell "Statement Received" [ref=e620]:
                        - generic [ref=e621]: Statement Received
                      - cell "Statement Received" [ref=e622]:
                        - checkbox "Statement Received" [ref=e623]
                    - row "TOA Amount Rollover Service Specialist Rollover Service Specialist Lookup (New Window)" [ref=e624]:
                      - cell "TOA Amount" [ref=e625]:
                        - generic [ref=e626]: TOA Amount
                      - cell [ref=e627]:
                        - textbox "TOA Amount" [ref=e628]
                      - cell "Rollover Service Specialist" [ref=e629]:
                        - generic [ref=e630]: Rollover Service Specialist
                      - cell "Rollover Service Specialist Lookup (New Window)" [ref=e631]:
                        - generic [ref=e632]:
                          - textbox "Rollover Service Specialist" [ref=e633]
                          - link "Rollover Service Specialist Lookup (New Window)" [ref=e634] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3DCF00NG000000FChvs%26lktp%3D%27%20%2B%20getElementByIdCS%28%27CF00NG000000FChvs_lktp%27%29.value%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27CF00NG000000FChvs%27%29.value.substring%280%2C%2080%29%29%29
                            - img "Rollover Service Specialist Lookup (New Window)" [ref=e635]
                    - row "Carrier Carrier Lookup (New Window)" [ref=e636]:
                      - cell "Carrier" [ref=e637]
                      - cell "Carrier Lookup (New Window)" [ref=e638]:
                        - generic [ref=e639]:
                          - textbox "Carrier" [ref=e640]
                          - link "Carrier Lookup (New Window)" [ref=e641] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3DCF00NG000000DwsUa%26lkfield%3D00NG000000DwsUa%26lkent%3D006%26lktp%3D%27%20%2B%20getElementByIdCS%28%27CF00NG000000DwsUa_lktp%27%29.value%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27CF00NG000000DwsUa%27%29.value.substring%280%2C%2080%29%29%29
                            - img "Carrier Lookup (New Window)" [ref=e642]
                      - cell [ref=e643]
                      - cell [ref=e644]
                - heading "Additional Information" [level=3] [ref=e646]
                - table [ref=e648]:
                  - rowgroup [ref=e649]:
                    - row "Primary Campaign Source Primary Campaign Source Lookup (New Window) Lead Source --None--" [ref=e650]:
                      - cell "Primary Campaign Source" [ref=e651]
                      - cell "Primary Campaign Source Lookup (New Window)" [ref=e652]:
                        - generic [ref=e653]:
                          - textbox "Primary Campaign Source" [ref=e654]
                          - link "Primary Campaign Source Lookup (New Window)" [ref=e655] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3Dopp17%26lkfield%3DCampaign%26lkent%3D006%26lktp%3D%27%20%2B%20getElementByIdCS%28%27opp17_lktp%27%29.value%2B%27%26dplp%3D%27%20%2B%20encodeURIComponent%28dpdLkUtil.serialize%28sfdcPage.getReferredDomIds%28%27opp17%27%29%2C%20%27opp17%27%29%29%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27opp17%27%29.value.substring%280%2C%2080%29%29%29
                            - img "Primary Campaign Source Lookup (New Window)" [ref=e656]
                      - cell "Lead Source" [ref=e658]
                      - cell "--None--" [ref=e659]:
                        - combobox "Lead Source" [ref=e661]:
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
                    - row "Main Competitor(s)" [ref=e662]:
                      - cell [ref=e663]
                      - cell [ref=e664]
                      - cell "Main Competitor(s)" [ref=e665]
                      - cell [ref=e666]:
                        - textbox "Main Competitor(s)" [ref=e667]
                - heading "System Information" [level=3] [ref=e669]
                - table [ref=e671]:
                  - rowgroup [ref=e672]:
                    - row "CDL External Key" [ref=e673]:
                      - cell [ref=e674]
                      - cell [ref=e675]
                      - cell "CDL External Key" [ref=e676]
                      - cell [ref=e677]:
                        - textbox "CDL External Key" [ref=e678]
                    - row "Referring RES Referring RES Lookup (New Window)" [ref=e679]:
                      - cell [ref=e680]
                      - cell [ref=e681]
                      - cell "Referring RES" [ref=e682]
                      - cell "Referring RES Lookup (New Window)" [ref=e683]:
                        - generic [ref=e684]:
                          - textbox "Referring RES" [ref=e685]
                          - link "Referring RES Lookup (New Window)" [ref=e686] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3DCF00NG000000DwsWV%26lktp%3D%27%20%2B%20getElementByIdCS%28%27CF00NG000000DwsWV_lktp%27%29.value%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27CF00NG000000DwsWV%27%29.value.substring%280%2C%2080%29%29%29
                            - img "Referring RES Lookup (New Window)" [ref=e687]
              - table [ref=e689]:
                - rowgroup [ref=e690]:
                  - row "Save Save & New Cancel" [ref=e691]:
                    - cell [ref=e692]
                    - cell "Save Save & New Cancel" [ref=e693]:
                      - button "Save" [ref=e694] [cursor=pointer]
                      - button "Save & New" [ref=e695] [cursor=pointer]
                      - button "Cancel" [ref=e696] [cursor=pointer]
    - generic [ref=e698]:
      - text: Copyright © 2000-2026 salesforce.com, inc. All rights reserved. |
      - link "Privacy Statement" [ref=e699] [cursor=pointer]:
        - /url: http://www.salesforce.com/company/privacy.jsp
      - text: "|"
      - link "Security Statement" [ref=e700] [cursor=pointer]:
        - /url: http://www.salesforce.com/company/security.jsp
      - text: "|"
      - link "Terms of Use" [ref=e701] [cursor=pointer]:
        - /url: http://www.salesforce.com/company/msa.jsp
      - text: "|"
      - link "508 Compliance" [ref=e702] [cursor=pointer]:
        - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=accessibility_overview.htm&section=accessibility&language=en_US&release=260.12.1&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
      - text: "|"
      - link "Go to Salesforce mobile app" [ref=e703] [cursor=pointer]:
        - /url: /ltng/oneAppRedirect
  - iframe [ref=e704]:
    
  - generic:
    - button "Expand Quick Access Menu" [ref=e706]
    - generic [ref=e707]:
      - generic [ref=e708]:
        - link "Go to Setup" [ref=e709] [cursor=pointer]:
          - /url: /setup/forcecomHomepage.apexp?setupid=ForceCom&retURL=%2F006%2Fe%3FRecordType%3D012G0000001BFrD%26ent%3DOpportunity
          - img "Go to Setup" [ref=e710]
        - link "Help" [ref=e711] [cursor=pointer]:
          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?section=Dev_Tools&target=dev_quick_access_menu.htm&loc=help&language=en_US&release=260.12.1&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
          - img "Help" [ref=e712]
      - generic [ref=e713]:
        - list [ref=e714]:
          - listitem [ref=e715]:
            - link "View Fields" [ref=e716] [cursor=pointer]:
              - /url: /p/setup/layout/LayoutFieldList?type=Opportunity&setupid=OpportunityFields
          - listitem [ref=e717]:
            - link "View Object" [ref=e718] [cursor=pointer]:
              - /url: /ui/setup/Setup?setupid=Opportunity
          - listitem [ref=e719]:
            - link "View Validation Rules" [ref=e720] [cursor=pointer]:
              - /url: /_ui/common/config/entity/ValidationFormulaListUI/d?retURL=%2F006%2Fe%3FRecordType%3D012G0000001BFrD%26ent%3DOpportunity&tableEnumOrId=Opportunity&setupid=OpportunityValidations
          - listitem [ref=e721]:
            - link "View Approvals" [ref=e722] [cursor=pointer]:
              - /url: /p/process/ProcessDefinitionSetup?TableEnumOrId=Opportunity&setupid=ApprovalProcesses
        - separator [ref=e723]
        - list [ref=e724]:
          - listitem [ref=e725]:
            - link "Edit App" [ref=e726] [cursor=pointer]:
              - /url: /02uG0000000GeGC/e?retURL=%2F006%2Fe%3FRecordType%3D012G0000001BFrD%26ent%3DOpportunity&setupid=TabSet
          - listitem [ref=e727]:
            - link "Edit Layout" [ref=e728] [cursor=pointer]:
              - /url: /layouteditor/layoutEditor.apexp?type=Opportunity&lid=00h4R00000mxxnK&retURL=%2F006%2Fe%3FRecordType%3D012G0000001BFrD%26ent%3DOpportunity&setupid=OpportunityLayouts
          - listitem [ref=e729]:
            - link "View Record Type" [ref=e730] [cursor=pointer]:
              - /url: /setup/ui/recordtypefields.jsp?id=012G0000001BFrD&type=Opportunity&setupid=OpportunityRecords
      - link "Turn off menu" [ref=e732] [cursor=pointer]:
        - /url: "#"
```

# Test source

```ts
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
  119 |    * Classic lookup popups open as a new browser window/tab containing a frameset
  120 |    * with two named <frame> elements: "searchFrame" and "resultsFrame".
  121 |    * We access them using Playwright's `frameLocator('frame[name="..."]')`.
  122 |    *
  123 |    * @param planName - The exact plan name to search for and select (e.g. "TestPlan_1775124181119")
  124 |    */
  125 |   async fillPlanLookupAndSelect(planName: string): Promise<void> {
  126 |     try {
  127 |       const popupPromise = this['page'].waitForEvent('popup');
  128 |       await this.planLookupLink.getLocator().click();
  129 |       const popupPage = await popupPromise;
  130 | 
  131 |       // The popup is a frameset with <frame name="searchFrame"> and <frame name="resultsFrame">
  132 |       // Use frameLocator which works for both <frame> and <iframe> elements
  133 |       const searchFrame = popupPage.frameLocator('frame[name="searchFrame"]');
  134 |       const resultsFrame = popupPage.frameLocator('frame[name="resultsFrame"]');
  135 | 
  136 |       // Wait for the search input in the search frame
  137 |       const searchInput = searchFrame.locator('input[name="lksrch"]');
  138 |       await expect(searchInput).toBeVisible({ timeout: 20_000 });
  139 |       await searchInput.fill(planName);
  140 |       await searchFrame.locator('input[name="go"]').click();
  141 | 
  142 |       // Results appear in the results frame — wait for the plan link to appear
  143 |       const resultLink = resultsFrame.getByRole('link', { name: planName });
  144 |       await expect(resultLink).toBeVisible({ timeout: 15_000 });
  145 |       await resultLink.click();
  146 | 
  147 |       // Popup closes after selection — wait for it to close
> 148 |       await popupPage.waitForEvent('close', { timeout: 15_000 });
      |                       ^ TimeoutError: page.waitForEvent: Timeout 15000ms exceeded while waiting for event "close"
  149 |     } catch (error) {
  150 |       console.error(`Failed to fill Plan lookup and select: ${planName}`);
  151 |       throw error;
  152 |     }
  153 |   }
  154 | 
  155 |   async selectStage(stage: string): Promise<void> {
  156 |     try {
  157 |       await this.stageSelect.getLocator().selectOption(stage);
  158 |     } catch (error) {
  159 |       console.error(`Failed to select Stage: ${stage}`);
  160 |       throw error;
  161 |     }
  162 |   }
  163 | 
  164 |   async fillCloseDate(date: string): Promise<void> {
  165 |     try {
  166 |       const input = this.closeDateInput.getLocator();
  167 |       await input.fill(date);
  168 |       await input.press('Tab');
  169 |     } catch (error) {
  170 |       console.error(`Failed to fill Close Date: ${date}`);
  171 |       throw error;
  172 |     }
  173 |   }
  174 | 
  175 |   /**
  176 |    * Clicks Save and waits for the redirect to the Opportunity detail page.
  177 |    * After saving, Salesforce Classic either stays in Classic or redirects to
  178 |    * the Lightning detail page depending on org settings. We wait for navigation
  179 |    * to complete.
  180 |    */
  181 |   async clickSave(): Promise<void> {
  182 |     try {
  183 |       await this.saveButton.getLocator().click();
  184 |       // Wait for navigation away from the edit form
  185 |       await this['page'].waitForURL((url) => !url.href.includes('/006/e'), { timeout: 30_000 });
  186 |     } catch (error) {
  187 |       console.error('Failed to click Save on Classic Opportunity form');
  188 |       throw error;
  189 |     }
  190 |   }
  191 | 
  192 |   // ── Verification ──────────────────────────────────────────────────────────
  193 | 
  194 |   async verifyFormLoaded(): Promise<void> {
  195 |     try {
  196 |       await expect(this.opportunityNameInput.getLocator()).toBeVisible({ timeout: 20_000 });
  197 |     } catch (error) {
  198 |       console.error('Classic Opportunity creation form is not visible');
  199 |       throw error;
  200 |     }
  201 |   }
  202 | }
  203 | 
```