# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: account/create-classic-account-plan-customer-propensity-scores.spec.ts >> Classic Account with Plan Customer - Propensity Scores @smoke >> should create classic account with plan customer and update propensity score @smoke
- Location: tests/account/create-classic-account-plan-customer-propensity-scores.spec.ts:58:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /New Account|Account Edit/, level: 2 })
Expected: visible
Error: strict mode violation: getByRole('heading', { name: /New Account|Account Edit/, level: 2 }) resolved to 2 elements:
    1) <h2 class="pageDescription"> New Account</h2> aka getByRole('heading', { name: 'New Account' })
    2) <h2 class="mainTitle">Account Edit</h2> aka getByText('Account Edit', { exact: true })

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('heading', { name: /New Account|Account Edit/, level: 2 })

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
                    - /url: /setup/forcecomHomepage.apexp?setupid=ForceCom&retURL=%2F001%2Fe%3FretURL%3D%252F001%252Fo%26RecordType%3D012G0000001BFsk%26acc2%3Ddata%26ent%3DAccount%26nooverride%3D1
                  - link "Help & Training" [ref=e27] [cursor=pointer]:
                    - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?resource=https%3A%2F%2Fhelp.salesforce.com%2F&version=2&language=en_US&release=260.12.2&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
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
                - /url: /servlet/servlet.Integration?lid=01rG0000000owZn&ic=1&linkToken=VmpFPSxNakF5Tmkwd05DMHhNMVF3Tnpvek5Eb3dNUzQ1TlRkYSxNTmwzbXhmeXNnYkFicWpwbm1mcVdtRl9OMVAxZ2lyRFU2LVhsSFlsQklBPSxZV1prTUdKaA%3D%3D
            - listitem [ref=e41]:
              - link "Leads" [ref=e42] [cursor=pointer]:
                - /url: /00Q/o
            - listitem [ref=e43]:
              - link "Campaigns" [ref=e44] [cursor=pointer]:
                - /url: /701/o
            - listitem [ref=e45]:
              - link "Accounts" [ref=e46] [cursor=pointer]:
                - /url: /001/o
              - generic [ref=e47]: (Currently Selected)
            - listitem [ref=e48]:
              - link "Contacts" [ref=e49] [cursor=pointer]:
                - /url: /003/o
            - listitem [ref=e50]:
              - link "Opportunities" [ref=e51] [cursor=pointer]:
                - /url: /006/o
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
                - img "Account" [ref=e76]
                - heading "Account Edit" [level=1] [ref=e77]
                - heading "New Account" [level=2] [ref=e78]
              - link "Help for this Page" [ref=e80] [cursor=pointer]:
                - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=accounts_manage.htm&section=Accounts&language=en_US&release=260.12.2&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
            - generic [ref=e82]:
              - table [ref=e84]:
                - rowgroup [ref=e85]:
                  - row "Account Edit Save Save & New Cancel" [ref=e86]:
                    - cell "Account Edit" [ref=e87]:
                      - heading "Account Edit" [level=2] [ref=e88]
                    - cell "Save Save & New Cancel" [ref=e89]:
                      - button "Save" [ref=e90] [cursor=pointer]
                      - button "Save & New" [ref=e91] [cursor=pointer]
                      - button "Cancel" [ref=e92] [cursor=pointer]
              - generic [ref=e93]:
                - generic [ref=e94]:
                  - generic [ref=e96]:
                    - generic [ref=e98]: "*"
                    - text: = Required Information
                  - heading "Account Information" [level=3] [ref=e99]
                - table [ref=e101]:
                  - rowgroup [ref=e102]:
                    - row "* Account Name data Account Record Type Individual" [ref=e103]:
                      - cell "* Account Name" [ref=e104]:
                        - generic [ref=e105]:
                          - generic [ref=e106]: "*"
                          - text: Account Name
                      - cell "data" [ref=e107]:
                        - textbox "* Account Name" [active] [ref=e110]: data
                      - cell "Account Record Type" [ref=e111]
                      - cell "Individual" [ref=e112]
                    - row "SSN JHFC Advisor JHFC Advisor Lookup (New Window)" [ref=e113]:
                      - cell "SSN" [ref=e114]:
                        - generic [ref=e115]: SSN
                      - cell [ref=e116]:
                        - textbox "SSN" [ref=e117]
                      - cell "JHFC Advisor" [ref=e118]
                      - cell "JHFC Advisor Lookup (New Window)" [ref=e119]:
                        - generic [ref=e120]:
                          - textbox "JHFC Advisor" [ref=e121]
                          - link "JHFC Advisor Lookup (New Window)" [ref=e122] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3DCF00NG000000EsRie%26lkfield%3D00NG000000EsRie%26lkent%3D001%26lktp%3D%27%20%2B%20getElementByIdCS%28%27CF00NG000000EsRie_lktp%27%29.value%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27CF00NG000000EsRie%27%29.value.substring%280%2C%2080%29%29%29
                            - img "JHFC Advisor Lookup (New Window)" [ref=e123]
                    - row "Last 4 SSN Digits Conversion Propensity Score" [ref=e124]:
                      - cell "Last 4 SSN Digits" [ref=e125]
                      - cell [ref=e126]:
                        - textbox "Last 4 SSN Digits" [ref=e127]
                      - cell "Conversion Propensity Score" [ref=e128]
                      - cell [ref=e129]:
                        - textbox "Conversion Propensity Score" [ref=e130]
                    - row "Birthdate [ 4/10/2026 ] Total Account Balance" [ref=e131]:
                      - cell "Birthdate" [ref=e132]
                      - cell "[ 4/10/2026 ]" [ref=e133]:
                        - generic [ref=e134]:
                          - textbox "Birthdate" [ref=e135]
                          - generic [ref=e136]:
                            - text: "["
                            - link "4/10/2026" [ref=e137] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/10/2026', '00NG000000Dwu3L', true);
                            - text: "]"
                      - cell "Total Account Balance" [ref=e138]
                      - cell [ref=e139]:
                        - textbox "Total Account Balance" [ref=e140]
                    - row "NC IRA Account Number Balance Effective Date [ 4/10/2026 ]" [ref=e141]:
                      - cell "NC IRA Account Number" [ref=e142]
                      - cell [ref=e143]:
                        - textbox "NC IRA Account Number" [ref=e144]
                      - cell "Balance Effective Date" [ref=e145]
                      - cell "[ 4/10/2026 ]" [ref=e146]:
                        - generic [ref=e147]:
                          - textbox "Balance Effective Date" [ref=e148]
                          - generic [ref=e149]:
                            - text: "["
                            - link "4/10/2026" [ref=e150] [cursor=pointer]:
                              - /url: javascript:DatePicker.insertDate('4/10/2026', '00NG000000FDIvE', true);
                            - text: "]"
                    - row "NC Roth IRA Account Number NC Client ID" [ref=e151]:
                      - cell "NC Roth IRA Account Number" [ref=e152]
                      - cell [ref=e153]:
                        - textbox "NC Roth IRA Account Number" [ref=e154]
                      - cell "NC Client ID" [ref=e155]:
                        - generic [ref=e156]: NC Client ID
                      - cell [ref=e157]:
                        - textbox "NC Client ID" [ref=e158]
                    - row "JH NFS IRA Account Number PRA" [ref=e159]:
                      - cell "JH NFS IRA Account Number" [ref=e160]
                      - cell [ref=e161]:
                        - textbox "JH NFS IRA Account Number" [ref=e162]
                      - cell "PRA" [ref=e163]
                      - cell "PRA" [ref=e164]:
                        - checkbox "PRA" [ref=e165]
                    - row "JH NFS Roth IRA Account Number" [ref=e166]:
                      - cell "JH NFS Roth IRA Account Number" [ref=e167]
                      - cell [ref=e168]:
                        - textbox "JH NFS Roth IRA Account Number" [ref=e169]
                      - cell [ref=e170]
                      - cell [ref=e171]
                - generic [ref=e172]:
                  - link "Copy Mailing Address to Residential/Overnight Address" [ref=e175] [cursor=pointer]:
                    - /url: javascript:%20copyAddr%28%27acc17street%27%2C%27acc17city%27%2C%27acc17zip%27%2C%27acc17country%27%2C%27acc17state%27%2C%27acc18street%27%2C%27acc18city%27%2C%27acc18zip%27%2C%27acc18country%27%2C%27acc18state%27%2C%20true%2C%20true%2C%20true%29
                  - heading "Address Information" [level=3] [ref=e176]
                - table [ref=e178]:
                  - rowgroup [ref=e179]:
                    - row "Mailing Country United States Residential/Overnight Country United States" [ref=e180]:
                      - cell "Mailing Country" [ref=e181]
                      - cell "United States" [ref=e182]:
                        - combobox "Mailing Country" [ref=e184]:
                          - option "--None--"
                          - option "Afghanistan"
                          - option "Aland Islands"
                          - option "Albania"
                          - option "Algeria"
                          - option "Andorra"
                          - option "Angola"
                          - option "Anguilla"
                          - option "Antarctica"
                          - option "Antigua and Barbuda"
                          - option "Argentina"
                          - option "Armenia"
                          - option "Aruba"
                          - option "Australia"
                          - option "Austria"
                          - option "Azerbaijan"
                          - option "Bahamas"
                          - option "Bahrain"
                          - option "Bangladesh"
                          - option "Barbados"
                          - option "Belarus"
                          - option "Belgium"
                          - option "Belize"
                          - option "Benin"
                          - option "Bermuda"
                          - option "Bhutan"
                          - option "Bolivia, Plurinational State of"
                          - option "Bonaire, Sint Eustatius and Saba"
                          - option "Bosnia and Herzegovina"
                          - option "Botswana"
                          - option "Bouvet Island"
                          - option "Brazil"
                          - option "British Indian Ocean Territory"
                          - option "Brunei Darussalam"
                          - option "Bulgaria"
                          - option "Burkina Faso"
                          - option "Burundi"
                          - option "Cambodia"
                          - option "Cameroon"
                          - option "Canada"
                          - option "Cape Verde"
                          - option "Cayman Islands"
                          - option "Central African Republic"
                          - option "Chad"
                          - option "Chile"
                          - option "China"
                          - option "Chinese Taipei"
                          - option "Christmas Island"
                          - option "Cocos (Keeling) Islands"
                          - option "Colombia"
                          - option "Comoros"
                          - option "Congo"
                          - option "Congo, the Democratic Republic of the"
                          - option "Cook Islands"
                          - option "Costa Rica"
                          - option "Cote d'Ivoire"
                          - option "Croatia"
                          - option "Cuba"
                          - option "Curaçao"
                          - option "Cyprus"
                          - option "Czech Republic"
                          - option "Denmark"
                          - option "Djibouti"
                          - option "Dominica"
                          - option "Dominican Republic"
                          - option "Ecuador"
                          - option "Egypt"
                          - option "El Salvador"
                          - option "Equatorial Guinea"
                          - option "Eritrea"
                          - option "Estonia"
                          - option "Ethiopia"
                          - option "Falkland Islands (Malvinas)"
                          - option "Faroe Islands"
                          - option "Fiji"
                          - option "Finland"
                          - option "France"
                          - option "French Guiana"
                          - option "French Polynesia"
                          - option "French Southern Territories"
                          - option "Gabon"
                          - option "Gambia"
                          - option "Georgia"
                          - option "Germany"
                          - option "Ghana"
                          - option "Gibraltar"
                          - option "Greece"
                          - option "Greenland"
                          - option "Grenada"
                          - option "Guadeloupe"
                          - option "Guatemala"
                          - option "Guernsey"
                          - option "Guinea"
                          - option "Guinea-Bissau"
                          - option "Guyana"
                          - option "Haiti"
                          - option "Heard Island and McDonald Islands"
                          - option "Holy See (Vatican City State)"
                          - option "Honduras"
                          - option "Hungary"
                          - option "Iceland"
                          - option "India"
                          - option "Indonesia"
                          - option "Iran, Islamic Republic of"
                          - option "Iraq"
                          - option "Ireland"
                          - option "Isle of Man"
                          - option "Israel"
                          - option "Italy"
                          - option "Jamaica"
                          - option "Japan"
                          - option "Jersey"
                          - option "Jordan"
                          - option "Kazakhstan"
                          - option "Kenya"
                          - option "Kiribati"
                          - option "Korea, Democratic People's Republic of"
                          - option "Korea, Republic of"
                          - option "Kuwait"
                          - option "Kyrgyzstan"
                          - option "Lao People's Democratic Republic"
                          - option "Latvia"
                          - option "Lebanon"
                          - option "Lesotho"
                          - option "Liberia"
                          - option "Libyan Arab Jamahiriya"
                          - option "Liechtenstein"
                          - option "Lithuania"
                          - option "Luxembourg"
                          - option "Macao"
                          - option "Macedonia, the former Yugoslav Republic of"
                          - option "Madagascar"
                          - option "Malawi"
                          - option "Malaysia"
                          - option "Maldives"
                          - option "Mali"
                          - option "Malta"
                          - option "Martinique"
                          - option "Mauritania"
                          - option "Mauritius"
                          - option "Mayotte"
                          - option "Mexico"
                          - option "Moldova, Republic of"
                          - option "Monaco"
                          - option "Mongolia"
                          - option "Montenegro"
                          - option "Montserrat"
                          - option "Morocco"
                          - option "Mozambique"
                          - option "Myanmar"
                          - option "Namibia"
                          - option "Nauru"
                          - option "Nepal"
                          - option "Netherlands"
                          - option "New Caledonia"
                          - option "New Zealand"
                          - option "Nicaragua"
                          - option "Niger"
                          - option "Nigeria"
                          - option "Niue"
                          - option "Norfolk Island"
                          - option "Norway"
                          - option "Oman"
                          - option "Pakistan"
                          - option "Palestinian Territory, Occupied"
                          - option "Panama"
                          - option "Papua New Guinea"
                          - option "Paraguay"
                          - option "Peru"
                          - option "Philippines"
                          - option "Pitcairn"
                          - option "Poland"
                          - option "Portugal"
                          - option "Puerto Rico"
                          - option "Qatar"
                          - option "Reunion"
                          - option "Romania"
                          - option "Russian Federation"
                          - option "Rwanda"
                          - option "Saint Barthélemy"
                          - option "Saint Helena, Ascension and Tristan da Cunha"
                          - option "Saint Kitts and Nevis"
                          - option "Saint Lucia"
                          - option "Saint Martin (French part)"
                          - option "Saint Pierre and Miquelon"
                          - option "Saint Vincent and the Grenadines"
                          - option "Samoa"
                          - option "San Marino"
                          - option "Sao Tome and Principe"
                          - option "Saudi Arabia"
                          - option "Senegal"
                          - option "Serbia"
                          - option "Seychelles"
                          - option "Sierra Leone"
                          - option "Singapore"
                          - option "Sint Maarten (Dutch part)"
                          - option "Slovakia"
                          - option "Slovenia"
                          - option "Solomon Islands"
                          - option "Somalia"
                          - option "South Africa"
                          - option "South Georgia and the South Sandwich Islands"
                          - option "South Sudan"
                          - option "Spain"
                          - option "Sri Lanka"
                          - option "Sudan"
                          - option "Suriname"
                          - option "Svalbard and Jan Mayen"
                          - option "Swaziland"
                          - option "Sweden"
                          - option "Switzerland"
                          - option "Syrian Arab Republic"
                          - option "Tajikistan"
                          - option "Tanzania, United Republic of"
                          - option "Thailand"
                          - option "Timor-Leste"
                          - option "Togo"
                          - option "Tokelau"
                          - option "Tonga"
                          - option "Trinidad and Tobago"
                          - option "Tunisia"
                          - option "Turkey"
                          - option "Turkmenistan"
                          - option "Turks and Caicos Islands"
                          - option "Tuvalu"
                          - option "Uganda"
                          - option "Ukraine"
                          - option "United Arab Emirates"
                          - option "United Kingdom"
                          - option "United States" [selected]
                          - option "Uruguay"
                          - option "Uzbekistan"
                          - option "Vanuatu"
                          - option "Venezuela, Bolivarian Republic of"
                          - option "Viet Nam"
                          - option "Virgin Islands, British"
                          - option "Wallis and Futuna"
                          - option "Western Sahara"
                          - option "Yemen"
                          - option "Zambia"
                          - option "Zimbabwe"
                      - cell "Residential/Overnight Country" [ref=e185]
                      - cell "United States" [ref=e186]:
                        - combobox "Residential/Overnight Country" [ref=e188]:
                          - option "--None--"
                          - option "Afghanistan"
                          - option "Aland Islands"
                          - option "Albania"
                          - option "Algeria"
                          - option "Andorra"
                          - option "Angola"
                          - option "Anguilla"
                          - option "Antarctica"
                          - option "Antigua and Barbuda"
                          - option "Argentina"
                          - option "Armenia"
                          - option "Aruba"
                          - option "Australia"
                          - option "Austria"
                          - option "Azerbaijan"
                          - option "Bahamas"
                          - option "Bahrain"
                          - option "Bangladesh"
                          - option "Barbados"
                          - option "Belarus"
                          - option "Belgium"
                          - option "Belize"
                          - option "Benin"
                          - option "Bermuda"
                          - option "Bhutan"
                          - option "Bolivia, Plurinational State of"
                          - option "Bonaire, Sint Eustatius and Saba"
                          - option "Bosnia and Herzegovina"
                          - option "Botswana"
                          - option "Bouvet Island"
                          - option "Brazil"
                          - option "British Indian Ocean Territory"
                          - option "Brunei Darussalam"
                          - option "Bulgaria"
                          - option "Burkina Faso"
                          - option "Burundi"
                          - option "Cambodia"
                          - option "Cameroon"
                          - option "Canada"
                          - option "Cape Verde"
                          - option "Cayman Islands"
                          - option "Central African Republic"
                          - option "Chad"
                          - option "Chile"
                          - option "China"
                          - option "Chinese Taipei"
                          - option "Christmas Island"
                          - option "Cocos (Keeling) Islands"
                          - option "Colombia"
                          - option "Comoros"
                          - option "Congo"
                          - option "Congo, the Democratic Republic of the"
                          - option "Cook Islands"
                          - option "Costa Rica"
                          - option "Cote d'Ivoire"
                          - option "Croatia"
                          - option "Cuba"
                          - option "Curaçao"
                          - option "Cyprus"
                          - option "Czech Republic"
                          - option "Denmark"
                          - option "Djibouti"
                          - option "Dominica"
                          - option "Dominican Republic"
                          - option "Ecuador"
                          - option "Egypt"
                          - option "El Salvador"
                          - option "Equatorial Guinea"
                          - option "Eritrea"
                          - option "Estonia"
                          - option "Ethiopia"
                          - option "Falkland Islands (Malvinas)"
                          - option "Faroe Islands"
                          - option "Fiji"
                          - option "Finland"
                          - option "France"
                          - option "French Guiana"
                          - option "French Polynesia"
                          - option "French Southern Territories"
                          - option "Gabon"
                          - option "Gambia"
                          - option "Georgia"
                          - option "Germany"
                          - option "Ghana"
                          - option "Gibraltar"
                          - option "Greece"
                          - option "Greenland"
                          - option "Grenada"
                          - option "Guadeloupe"
                          - option "Guatemala"
                          - option "Guernsey"
                          - option "Guinea"
                          - option "Guinea-Bissau"
                          - option "Guyana"
                          - option "Haiti"
                          - option "Heard Island and McDonald Islands"
                          - option "Holy See (Vatican City State)"
                          - option "Honduras"
                          - option "Hungary"
                          - option "Iceland"
                          - option "India"
                          - option "Indonesia"
                          - option "Iran, Islamic Republic of"
                          - option "Iraq"
                          - option "Ireland"
                          - option "Isle of Man"
                          - option "Israel"
                          - option "Italy"
                          - option "Jamaica"
                          - option "Japan"
                          - option "Jersey"
                          - option "Jordan"
                          - option "Kazakhstan"
                          - option "Kenya"
                          - option "Kiribati"
                          - option "Korea, Democratic People's Republic of"
                          - option "Korea, Republic of"
                          - option "Kuwait"
                          - option "Kyrgyzstan"
                          - option "Lao People's Democratic Republic"
                          - option "Latvia"
                          - option "Lebanon"
                          - option "Lesotho"
                          - option "Liberia"
                          - option "Libyan Arab Jamahiriya"
                          - option "Liechtenstein"
                          - option "Lithuania"
                          - option "Luxembourg"
                          - option "Macao"
                          - option "Macedonia, the former Yugoslav Republic of"
                          - option "Madagascar"
                          - option "Malawi"
                          - option "Malaysia"
                          - option "Maldives"
                          - option "Mali"
                          - option "Malta"
                          - option "Martinique"
                          - option "Mauritania"
                          - option "Mauritius"
                          - option "Mayotte"
                          - option "Mexico"
                          - option "Moldova, Republic of"
                          - option "Monaco"
                          - option "Mongolia"
                          - option "Montenegro"
                          - option "Montserrat"
                          - option "Morocco"
                          - option "Mozambique"
                          - option "Myanmar"
                          - option "Namibia"
                          - option "Nauru"
                          - option "Nepal"
                          - option "Netherlands"
                          - option "New Caledonia"
                          - option "New Zealand"
                          - option "Nicaragua"
                          - option "Niger"
                          - option "Nigeria"
                          - option "Niue"
                          - option "Norfolk Island"
                          - option "Norway"
                          - option "Oman"
                          - option "Pakistan"
                          - option "Palestinian Territory, Occupied"
                          - option "Panama"
                          - option "Papua New Guinea"
                          - option "Paraguay"
                          - option "Peru"
                          - option "Philippines"
                          - option "Pitcairn"
                          - option "Poland"
                          - option "Portugal"
                          - option "Puerto Rico"
                          - option "Qatar"
                          - option "Reunion"
                          - option "Romania"
                          - option "Russian Federation"
                          - option "Rwanda"
                          - option "Saint Barthélemy"
                          - option "Saint Helena, Ascension and Tristan da Cunha"
                          - option "Saint Kitts and Nevis"
                          - option "Saint Lucia"
                          - option "Saint Martin (French part)"
                          - option "Saint Pierre and Miquelon"
                          - option "Saint Vincent and the Grenadines"
                          - option "Samoa"
                          - option "San Marino"
                          - option "Sao Tome and Principe"
                          - option "Saudi Arabia"
                          - option "Senegal"
                          - option "Serbia"
                          - option "Seychelles"
                          - option "Sierra Leone"
                          - option "Singapore"
                          - option "Sint Maarten (Dutch part)"
                          - option "Slovakia"
                          - option "Slovenia"
                          - option "Solomon Islands"
                          - option "Somalia"
                          - option "South Africa"
                          - option "South Georgia and the South Sandwich Islands"
                          - option "South Sudan"
                          - option "Spain"
                          - option "Sri Lanka"
                          - option "Sudan"
                          - option "Suriname"
                          - option "Svalbard and Jan Mayen"
                          - option "Swaziland"
                          - option "Sweden"
                          - option "Switzerland"
                          - option "Syrian Arab Republic"
                          - option "Tajikistan"
                          - option "Tanzania, United Republic of"
                          - option "Thailand"
                          - option "Timor-Leste"
                          - option "Togo"
                          - option "Tokelau"
                          - option "Tonga"
                          - option "Trinidad and Tobago"
                          - option "Tunisia"
                          - option "Turkey"
                          - option "Turkmenistan"
                          - option "Turks and Caicos Islands"
                          - option "Tuvalu"
                          - option "Uganda"
                          - option "Ukraine"
                          - option "United Arab Emirates"
                          - option "United Kingdom"
                          - option "United States" [selected]
                          - option "Uruguay"
                          - option "Uzbekistan"
                          - option "Vanuatu"
                          - option "Venezuela, Bolivarian Republic of"
                          - option "Viet Nam"
                          - option "Virgin Islands, British"
                          - option "Wallis and Futuna"
                          - option "Western Sahara"
                          - option "Yemen"
                          - option "Zambia"
                          - option "Zimbabwe"
                    - row "Mailing Street Residential/Overnight Street" [ref=e189]:
                      - cell "Mailing Street" [ref=e190]
                      - cell [ref=e191]:
                        - textbox "Mailing Street" [ref=e192]
                      - cell "Residential/Overnight Street" [ref=e193]
                      - cell [ref=e194]:
                        - textbox "Residential/Overnight Street" [ref=e195]
                    - row "Mailing City Residential/Overnight City" [ref=e196]:
                      - cell "Mailing City" [ref=e197]
                      - cell [ref=e198]:
                        - textbox "Mailing City" [ref=e199]
                      - cell "Residential/Overnight City" [ref=e200]
                      - cell [ref=e201]:
                        - textbox "Residential/Overnight City" [ref=e202]
                    - row "Mailing State/Province --None-- Residential/Overnight State/Province --None--" [ref=e203]:
                      - cell "Mailing State/Province" [ref=e204]
                      - cell "--None--" [ref=e205]:
                        - combobox "Mailing State/Province" [ref=e208]:
                          - option "--None--" [selected]
                          - option "Alabama"
                          - option "Alaska"
                          - option "American Samoa"
                          - option "Arizona"
                          - option "Arkansas"
                          - option "Armed Forces Americas"
                          - option "Armed Forces Europe"
                          - option "Armed Forces Pacific"
                          - option "California"
                          - option "Colorado"
                          - option "Connecticut"
                          - option "Delaware"
                          - option "District of Columbia"
                          - option "Federated Micronesia"
                          - option "Florida"
                          - option "Georgia"
                          - option "Guam"
                          - option "Hawaii"
                          - option "Idaho"
                          - option "Illinois"
                          - option "Indiana"
                          - option "Iowa"
                          - option "Kansas"
                          - option "Kentucky"
                          - option "Louisiana"
                          - option "Maine"
                          - option "Marshall Islands"
                          - option "Maryland"
                          - option "Massachusetts"
                          - option "Michigan"
                          - option "Minnesota"
                          - option "Mississippi"
                          - option "Missouri"
                          - option "Montana"
                          - option "Nebraska"
                          - option "Nevada"
                          - option "New Hampshire"
                          - option "New Jersey"
                          - option "New Mexico"
                          - option "New York"
                          - option "North Carolina"
                          - option "North Dakota"
                          - option "Northern Mariana Islands"
                          - option "Ohio"
                          - option "Oklahoma"
                          - option "Oregon"
                          - option "Palau"
                          - option "Pennsylvania"
                          - option "Puerto Rico"
                          - option "Rhode Island"
                          - option "South Carolina"
                          - option "South Dakota"
                          - option "Tennessee"
                          - option "Texas"
                          - option "United States Minor Outlying Islands"
                          - option "Utah"
                          - option "Vermont"
                          - option "Virginia"
                          - option "Virgin Islands"
                          - option "Washington"
                          - option "West Virginia"
                          - option "Wisconsin"
                          - option "Wyoming"
                      - cell "Residential/Overnight State/Province" [ref=e210]
                      - cell "--None--" [ref=e211]:
                        - combobox "Residential/Overnight State/Province" [ref=e214]:
                          - option "--None--" [selected]
                          - option "Alabama"
                          - option "Alaska"
                          - option "American Samoa"
                          - option "Arizona"
                          - option "Arkansas"
                          - option "Armed Forces Americas"
                          - option "Armed Forces Europe"
                          - option "Armed Forces Pacific"
                          - option "California"
                          - option "Colorado"
                          - option "Connecticut"
                          - option "Delaware"
                          - option "District of Columbia"
                          - option "Federated Micronesia"
                          - option "Florida"
                          - option "Georgia"
                          - option "Guam"
                          - option "Hawaii"
                          - option "Idaho"
                          - option "Illinois"
                          - option "Indiana"
                          - option "Iowa"
                          - option "Kansas"
                          - option "Kentucky"
                          - option "Louisiana"
                          - option "Maine"
                          - option "Marshall Islands"
                          - option "Maryland"
                          - option "Massachusetts"
                          - option "Michigan"
                          - option "Minnesota"
                          - option "Mississippi"
                          - option "Missouri"
                          - option "Montana"
                          - option "Nebraska"
                          - option "Nevada"
                          - option "New Hampshire"
                          - option "New Jersey"
                          - option "New Mexico"
                          - option "New York"
                          - option "North Carolina"
                          - option "North Dakota"
                          - option "Northern Mariana Islands"
                          - option "Ohio"
                          - option "Oklahoma"
                          - option "Oregon"
                          - option "Palau"
                          - option "Pennsylvania"
                          - option "Puerto Rico"
                          - option "Rhode Island"
                          - option "South Carolina"
                          - option "South Dakota"
                          - option "Tennessee"
                          - option "Texas"
                          - option "United States Minor Outlying Islands"
                          - option "Utah"
                          - option "Vermont"
                          - option "Virginia"
                          - option "Virgin Islands"
                          - option "Washington"
                          - option "West Virginia"
                          - option "Wisconsin"
                          - option "Wyoming"
                    - row "Mailing Zip/Postal Code Residential/Overnight Zip/Postal Code" [ref=e216]:
                      - cell "Mailing Zip/Postal Code" [ref=e217]
                      - cell [ref=e218]:
                        - textbox "Mailing Zip/Postal Code" [ref=e219]
                      - cell "Residential/Overnight Zip/Postal Code" [ref=e220]
                      - cell [ref=e221]:
                        - textbox "Residential/Overnight Zip/Postal Code" [ref=e222]
                - heading "Contact Information" [level=3] [ref=e224]
                - table [ref=e226]:
                  - rowgroup [ref=e227]:
                    - row "Phone Email" [ref=e228]:
                      - cell "Phone" [ref=e229]
                      - cell [ref=e230]:
                        - textbox "Phone" [ref=e231]
                      - cell "Email" [ref=e232]
                      - cell [ref=e233]:
                        - textbox "Email" [ref=e234]
                    - row "Phone Extension Alternate Email" [ref=e235]:
                      - cell "Phone Extension" [ref=e236]
                      - cell [ref=e237]:
                        - textbox "Phone Extension" [ref=e238]
                      - cell "Alternate Email" [ref=e239]
                      - cell [ref=e240]:
                        - textbox "Alternate Email" [ref=e241]
                    - row "Home Phone" [ref=e242]:
                      - cell "Home Phone" [ref=e243]
                      - cell [ref=e244]:
                        - textbox "Home Phone" [ref=e245]
                      - cell [ref=e246]
                      - cell [ref=e247]
                    - row "Mobile Phone" [ref=e248]:
                      - cell "Mobile Phone" [ref=e249]
                      - cell [ref=e250]:
                        - textbox "Mobile Phone" [ref=e251]
                      - cell [ref=e252]
                      - cell [ref=e253]
                    - row "Other Phone" [ref=e254]:
                      - cell "Other Phone" [ref=e255]
                      - cell [ref=e256]:
                        - textbox "Other Phone" [ref=e257]
                      - cell [ref=e258]
                      - cell [ref=e259]
                - heading "LexisNexis Contact Information" [level=3] [ref=e261]
                - table [ref=e263]:
                  - rowgroup [ref=e264]:
                    - row "LexisNexis Phone 1 LexisNexis Email 1" [ref=e265]:
                      - cell "LexisNexis Phone 1" [ref=e266]:
                        - generic [ref=e267]: LexisNexis Phone 1
                      - cell [ref=e268]:
                        - textbox "LexisNexis Phone 1" [ref=e269]
                      - cell "LexisNexis Email 1" [ref=e270]:
                        - generic [ref=e271]: LexisNexis Email 1
                      - cell [ref=e272]:
                        - textbox "LexisNexis Email 1" [ref=e273]
                    - row "LexisNexis Phone 2 LexisNexis Email 2" [ref=e274]:
                      - cell "LexisNexis Phone 2" [ref=e275]:
                        - generic [ref=e276]: LexisNexis Phone 2
                      - cell [ref=e277]:
                        - textbox "LexisNexis Phone 2" [ref=e278]
                      - cell "LexisNexis Email 2" [ref=e279]:
                        - generic [ref=e280]: LexisNexis Email 2
                      - cell [ref=e281]:
                        - textbox "LexisNexis Email 2" [ref=e282]
                    - row "LexisNexis Phone 3" [ref=e283]:
                      - cell "LexisNexis Phone 3" [ref=e284]:
                        - generic [ref=e285]: LexisNexis Phone 3
                      - cell [ref=e286]:
                        - textbox "LexisNexis Phone 3" [ref=e287]
                      - cell [ref=e288]
                      - cell [ref=e289]
                - heading "Outbound Call Campaign" [level=3] [ref=e291]
                - table [ref=e293]:
                  - rowgroup [ref=e294]:
                    - row "Outbound Call List Name Date of Last Outbound Call [ 4/10/2026, 3:34 AM ]" [ref=e295]:
                      - cell "Outbound Call List Name" [ref=e296]
                      - cell [ref=e297]:
                        - textbox "Outbound Call List Name" [ref=e298]
                      - cell "Date of Last Outbound Call" [ref=e299]
                      - cell "[ 4/10/2026, 3:34 AM ]" [ref=e300]:
                        - generic [ref=e301]:
                          - textbox "Date of Last Outbound Call" [ref=e302]
                          - generic [ref=e303]:
                            - text: "["
                            - link "4/10/2026, 3:34 AM" [ref=e304] [cursor=pointer]:
                              - /url: javascript:void(DatePicker.insertDate('4/10/2026, 3:34 AM', '00N4R00000JOH5r', true));
                            - text: "]"
                    - row "Outbound Call List Owner Outbound Call List Owner Lookup (New Window) Spoke to Participant" [ref=e305]:
                      - cell "Outbound Call List Owner" [ref=e306]
                      - cell "Outbound Call List Owner Lookup (New Window)" [ref=e307]:
                        - generic [ref=e308]:
                          - textbox "Outbound Call List Owner" [ref=e309]
                          - link "Outbound Call List Owner Lookup (New Window)" [ref=e310] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3DCF00N4R00000JOH5u%26lktp%3D%27%20%2B%20getElementByIdCS%28%27CF00N4R00000JOH5u_lktp%27%29.value%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27CF00N4R00000JOH5u%27%29.value.substring%280%2C%2080%29%29%29
                            - img "Outbound Call List Owner Lookup (New Window)" [ref=e311]
                      - cell "Spoke to Participant" [ref=e312]
                      - cell "Spoke to Participant" [ref=e313]:
                        - checkbox "Spoke to Participant" [ref=e314]
                    - row "Number of Outbound Calls Number of Outbound Call Days" [ref=e315]:
                      - cell "Number of Outbound Calls" [ref=e316]
                      - cell [ref=e317]:
                        - textbox "Number of Outbound Calls" [ref=e318]
                      - cell "Number of Outbound Call Days" [ref=e319]
                      - cell [ref=e320]:
                        - textbox "Number of Outbound Call Days" [ref=e321]
                    - row "Outbound Call Campaign Phone" [ref=e322]:
                      - cell "Outbound Call Campaign Phone" [ref=e323]
                      - cell [ref=e324]:
                        - textbox "Outbound Call Campaign Phone" [ref=e325]
                      - cell [ref=e326]
                      - cell [ref=e327]
                - heading "Description Information" [level=3] [ref=e329]
                - table [ref=e331]:
                  - rowgroup [ref=e332]:
                    - row "Description" [ref=e333]:
                      - cell "Description" [ref=e334]: Description
                      - cell [ref=e336]:
                        - textbox "Description" [ref=e337]
                - heading "System Information" [level=3] [ref=e339]
                - table [ref=e341]:
                  - rowgroup [ref=e342]:
                    - row "Account Owner Somya Sijaria CDL External Key" [ref=e343]:
                      - cell "Account Owner" [ref=e344]
                      - cell "Somya Sijaria" [ref=e345]
                      - cell "CDL External Key" [ref=e346]
                      - cell [ref=e347]:
                        - textbox "CDL External Key" [ref=e348]
                    - row "MDM UUID" [ref=e349]:
                      - cell [ref=e350]
                      - cell [ref=e351]
                      - cell "MDM UUID" [ref=e352]
                      - cell [ref=e353]:
                        - textbox "MDM UUID" [ref=e354]
                    - row "Migration ID" [ref=e355]:
                      - cell [ref=e356]
                      - cell [ref=e357]
                      - cell "Migration ID" [ref=e358]
                      - cell [ref=e359]:
                        - textbox "Migration ID" [ref=e360]
                    - row "Parent Account Parent Account Lookup (New Window)" [ref=e361]:
                      - cell [ref=e362]
                      - cell [ref=e363]
                      - cell "Parent Account" [ref=e364]
                      - cell "Parent Account Lookup (New Window)" [ref=e365]:
                        - generic [ref=e366]:
                          - textbox "Parent Account" [ref=e367]
                          - link "Parent Account Lookup (New Window)" [ref=e368] [cursor=pointer]:
                            - /url: javascript:%20openLookup%28%27%2F_ui%2Fcommon%2Fdata%2FLookupPage%3Flkfm%3DeditPage%26lknm%3Dacc3%26lktp%3D%27%20%2B%20getElementByIdCS%28%27acc3_lktp%27%29.value%2C670%2C%271%27%2C%27%26lksrch%3D%27%20%2B%20escapeUTF%28getElementByIdCS%28%27acc3%27%29.value.substring%280%2C%2080%29%29%29
                            - img "Parent Account Lookup (New Window)" [ref=e369]
                    - row "Enrollment Duplicate" [ref=e370]:
                      - cell [ref=e371]
                      - cell [ref=e372]
                      - cell "Enrollment Duplicate" [ref=e373]
                      - cell "Enrollment Duplicate" [ref=e374]:
                        - checkbox "Enrollment Duplicate" [ref=e375]
              - table [ref=e377]:
                - rowgroup [ref=e378]:
                  - row "Save Save & New Cancel" [ref=e379]:
                    - cell [ref=e380]
                    - cell "Save Save & New Cancel" [ref=e381]:
                      - button "Save" [ref=e382] [cursor=pointer]
                      - button "Save & New" [ref=e383] [cursor=pointer]
                      - button "Cancel" [ref=e384] [cursor=pointer]
    - generic [ref=e386]:
      - text: Copyright © 2000-2026 salesforce.com, inc. All rights reserved. |
      - link "Privacy Statement" [ref=e387] [cursor=pointer]:
        - /url: http://www.salesforce.com/company/privacy.jsp
      - text: "|"
      - link "Security Statement" [ref=e388] [cursor=pointer]:
        - /url: http://www.salesforce.com/company/security.jsp
      - text: "|"
      - link "Terms of Use" [ref=e389] [cursor=pointer]:
        - /url: http://www.salesforce.com/company/msa.jsp
      - text: "|"
      - link "508 Compliance" [ref=e390] [cursor=pointer]:
        - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?loc=help&target=accessibility_overview.htm&section=accessibility&language=en_US&release=260.12.2&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
      - text: "|"
      - link "Go to Salesforce mobile app" [ref=e391] [cursor=pointer]:
        - /url: /ltng/oneAppRedirect
  - iframe [ref=e392]:
    
  - generic:
    - button "Expand Quick Access Menu" [ref=e394]
    - generic [ref=e395]:
      - generic [ref=e396]:
        - link "Go to Setup" [ref=e397] [cursor=pointer]:
          - /url: /setup/forcecomHomepage.apexp?setupid=ForceCom&retURL=%2F001%2Fe%3FretURL%3D%252F001%252Fo%26RecordType%3D012G0000001BFsk%26acc2%3Ddata%26ent%3DAccount%26nooverride%3D1
          - img "Go to Setup" [ref=e398]
        - link "Help" [ref=e399] [cursor=pointer]:
          - /url: javascript:openPopupFocusEscapePounds(%27https://help.salesforce.com/apex/htdoor?section=Dev_Tools&target=dev_quick_access_menu.htm&loc=help&language=en_US&release=260.12.2&instance=USA952S&showSplash=true%27, %27Help%27, 700, 600, %27width=700,height=600,resizable=yes,toolbar=yes,status=no,scrollbars=yes,menubar=yes,directories=no,location=no,dependant=no%27, false, false);
          - img "Help" [ref=e400]
      - generic [ref=e401]:
        - list [ref=e402]:
          - listitem [ref=e403]:
            - link "View Fields" [ref=e404] [cursor=pointer]:
              - /url: /p/setup/layout/LayoutFieldList?type=Account&setupid=AccountFields
          - listitem [ref=e405]:
            - link "View Object" [ref=e406] [cursor=pointer]:
              - /url: /ui/setup/Setup?setupid=Account
          - listitem [ref=e407]:
            - link "View Validation Rules" [ref=e408] [cursor=pointer]:
              - /url: /_ui/common/config/entity/ValidationFormulaListUI/d?retURL=%2F001%2Fe%3FretURL%3D%252F001%252Fo%26RecordType%3D012G0000001BFsk%26acc2%3Ddata%26ent%3DAccount%26nooverride%3D1&tableEnumOrId=Account&setupid=AccountValidations
          - listitem [ref=e409]:
            - link "View Approvals" [ref=e410] [cursor=pointer]:
              - /url: /p/process/ProcessDefinitionSetup?TableEnumOrId=Account&setupid=ApprovalProcesses
        - separator [ref=e411]
        - list [ref=e412]:
          - listitem [ref=e413]:
            - link "Edit App" [ref=e414] [cursor=pointer]:
              - /url: /02uG0000000GeGC/e?retURL=%2F001%2Fe%3FretURL%3D%252F001%252Fo%26RecordType%3D012G0000001BFsk%26acc2%3Ddata%26ent%3DAccount%26nooverride%3D1&setupid=TabSet
          - listitem [ref=e415]:
            - link "Edit Layout" [ref=e416] [cursor=pointer]:
              - /url: /layouteditor/layoutEditor.apexp?type=Account&lid=00hG000000hD80e&retURL=%2F001%2Fe%3FretURL%3D%252F001%252Fo%26RecordType%3D012G0000001BFsk%26acc2%3Ddata%26ent%3DAccount%26nooverride%3D1&setupid=AccountLayouts
          - listitem [ref=e417]:
            - link "View Record Type" [ref=e418] [cursor=pointer]:
              - /url: /setup/ui/recordtypefields.jsp?id=012G0000001BFsk&type=Account&setupid=AccountRecords
        - separator [ref=e419]
        - list [ref=e420]:
          - listitem [ref=e421]:
            - link "Import Data" [ref=e422] [cursor=pointer]:
              - /url: /ui/setup/dataimporter/DataImporterAdminLandingPage
      - link "Turn off menu" [ref=e424] [cursor=pointer]:
        - /url: "#"
```

# Test source

```ts
  1   | import { Page, expect } from '@playwright/test';
  2   | import { BasePage, ResilientLocator } from 'playwright-custom-core';
  3   | 
  4   | /**
  5   |  * Handles the Salesforce Classic Account creation and edit form.
  6   |  * Classic forms use standard HTML table layouts with input fields.
  7   |  * URL pattern: /001/e (new) or /001dz00000XXXXX/e (edit)
  8   |  */
  9   | export class AccountClassicFormPage extends BasePage {
  10  |   readonly pageName = 'AccountClassicFormPage';
  11  |   protected readonly relativeUrl = '/001/e';
  12  | 
  13  |   constructor(page: Page, baseUrl?: string) {
  14  |     super(page, baseUrl || process.env.BASE_URL || '');
  15  |   }
  16  | 
  17  |   // ── Locators ──────────────────────────────────────────────────────────────
  18  | 
  19  |   private get accountNameInput() {
  20  |     return new ResilientLocator(this['page'], [
  21  |       (p) => p.locator('input[name="acc2"]'),
  22  |       (p) => p.getByRole('textbox', { name: /Account Name/ }),
  23  |       (p) => p.locator('tr').filter({ hasText: 'Account Name' }).locator('input[type="text"]'),
  24  |     ]);
  25  |   }
  26  | 
  27  |   private get conversionPropensityScoreInput() {
  28  |     return new ResilientLocator(this['page'], [
  29  |       (p) => p.locator('input[name="00N4R00000JCbxN"]'),
  30  |       (p) => p.getByRole('textbox', { name: /Conversion Propensity Score/ }),
  31  |       (p) => p.locator('tr').filter({ hasText: 'Conversion Propensity Score' }).locator('input[type="text"]'),
  32  |     ]);
  33  |   }
  34  | 
  35  |   private get saveButton() {
  36  |     return new ResilientLocator(this['page'], [
  37  |       (p) => p.locator('input[name="save"][title="Save"]').first(),
  38  |       (p) => p.getByRole('button', { name: 'Save', exact: true }).first(),
  39  |       (p) => p.locator('input[type="submit"][value=" Save "]').first(),
  40  |     ]);
  41  |   }
  42  | 
  43  |   // ── Actions ───────────────────────────────────────────────────────────────
  44  | 
  45  |   async fillAccountName(name: string): Promise<void> {
  46  |     try {
  47  |       const locator = this.accountNameInput.getLocator();
  48  |       await expect(locator).toBeVisible({ timeout: 15_000 });
  49  |       await locator.fill(name);
  50  |     } catch (error) {
  51  |       console.error('Failed to fill Account Name on Classic form');
  52  |       throw error;
  53  |     }
  54  |   }
  55  | 
  56  |   async fillConversionPropensityScore(score: string): Promise<void> {
  57  |     try {
  58  |       const locator = this.conversionPropensityScoreInput.getLocator();
  59  |       await expect(locator).toBeVisible({ timeout: 15_000 });
  60  |       await locator.fill(score);
  61  |     } catch (error) {
  62  |       console.error('Failed to fill Conversion Propensity Score on Classic form');
  63  |       throw error;
  64  |     }
  65  |   }
  66  | 
  67  |   async clearAndFillConversionPropensityScore(score: string): Promise<void> {
  68  |     try {
  69  |       const locator = this.conversionPropensityScoreInput.getLocator();
  70  |       await expect(locator).toBeVisible({ timeout: 15_000 });
  71  |       await locator.clear();
  72  |       await locator.fill(score);
  73  |     } catch (error) {
  74  |       console.error('Failed to clear and fill Conversion Propensity Score');
  75  |       throw error;
  76  |     }
  77  |   }
  78  | 
  79  |   async clickSave(): Promise<void> {
  80  |     try {
  81  |       await this.saveButton.getLocator().click();
  82  |       await this['page'].waitForLoadState('domcontentloaded');
  83  |     } catch (error) {
  84  |       console.error('Failed to click Save on Classic account form');
  85  |       throw error;
  86  |     }
  87  |   }
  88  | 
  89  |   // ── Verification ──────────────────────────────────────────────────────────
  90  | 
  91  |   async verifyFormDisplayed(): Promise<void> {
  92  |     try {
  93  |       const heading = this['page'].getByRole('heading', { name: /New Account|Account Edit/, level: 2 });
> 94  |       await expect(heading).toBeVisible({ timeout: 15_000 });
      |                             ^ Error: expect(locator).toBeVisible() failed
  95  |     } catch (error) {
  96  |       console.error('Failed to verify Classic account form is displayed');
  97  |       throw error;
  98  |     }
  99  |   }
  100 | 
  101 |   async verifyValidationError(): Promise<void> {
  102 |     try {
  103 |       const errorAlert = this['page'].getByRole('alert').filter({ hasText: 'Error' });
  104 |       await expect(errorAlert).toBeVisible({ timeout: 10_000 });
  105 |     } catch (error) {
  106 |       console.error('Failed to verify validation error');
  107 |       throw error;
  108 |     }
  109 |   }
  110 | }
  111 | 
```