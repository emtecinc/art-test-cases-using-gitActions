# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: account/create-account-plan-customer-propensity-scores.spec.ts >> Account with Plan Customer - Propensity Scores @smoke >> should create account with plan customer and update propensity scores @smoke
- Location: tests/account/create-account-plan-customer-propensity-scores.spec.ts:61:7

# Error details

```
Error: Record not found for Plan_Customer__c where Name='TestCustPlan_1775562091185'
```

# Test source

```ts
  48  | * This queries Salesforce, finds the record ID, and registers it for cleanup.
  49  | * On `teardown()`, all registered records are deleted in reverse order.
  50  | *
  51  | * Provides utilities for:
  52  | * - Record retrieval by unique field value
  53  | * - Automatic cleanup registration
  54  | * - Teardown of created records (reverse order for child-before-parent)
  55  | *
  56  | * @example
  57  | * ```ts
  58  | * const dataFactory = new SFDataFactory();
  59  | * await dataFactory.authenticate();
  60  | *
  61  | * // After creating a record via UI with a unique name
  62  | * const accountId = await dataFactory.getRecordIdByField('Account', 'Name', uniqueAccountName);
  63  | *
  64  | * // Cleanup automatically happens in teardown (reverse order)
  65  | * await dataFactory.teardown();
  66  | * ```
  67  | */
  68  | export class SFDataFactory {
  69  |     private accessToken: string = '';
  70  |     private instanceUrl: string = '';
  71  |     private recordsToCleanup: { type: string; id: string; name?: string }[] = [];
  72  | 
  73  |     /**
  74  |      * Authenticate with Salesforce using OAuth 2.0 password flow.
  75  |      * Credentials are loaded from environment variables.
  76  |      */
  77  |     async authenticate(): Promise<void> {
  78  |             if (this.accessToken) return; // Already populated — skip
  79  | 
  80  |             const { accessToken, instanceUrl } = await SalesforceConnection.getInstance().getConnection();
  81  |             this.accessToken = accessToken;
  82  |             this.instanceUrl = instanceUrl;
  83  |         }
  84  | 
  85  |     /**
  86  |      * Get the access token (useful for external API calls like Tooling API).
  87  |      * Ensures authentication has occurred before returning.
  88  |      */
  89  |     async getAccessToken(): Promise<string> {
  90  |         await this.authenticate();
  91  |         return this.accessToken;
  92  |     }
  93  | 
  94  |     /**
  95  |      * Get the instance URL (useful for external API calls).
  96  |      * Ensures authentication has occurred before returning.
  97  |      */
  98  |     async getInstanceUrl(): Promise<string> {
  99  |         await this.authenticate();
  100 |         return this.instanceUrl;
  101 |     }
  102 | 
  103 |     /**
  104 |      * Generates a unique value for primary fields to avoid "Duplicate Value" errors.
  105 |      */
  106 |     generateUniqueName(baseName: string): string {
  107 |         return `${baseName}_${Math.random().toString(36).substring(2, 8)}_${Date.now()}`;
  108 |     }
  109 | 
  110 |     /**
  111 |      * Finds a record ID by a specific field and value.
  112 |      * Use this immediately after page.click('Save') to get the ID.
  113 |      * Automatically registers the record for cleanup.
  114 |      *
  115 |      * @param sObject - Salesforce object API name (e.g., 'Account', 'Contact')
  116 |      * @param fieldName - Field to search by (e.g., 'Name', 'Email')
  117 |      * @param value - Unique value to search for
  118 |      * @param autoRegister - Automatically register for cleanup (default: true)
  119 |      * @returns Record ID (15 or 18 characters)
  120 |      */
  121 |     async getRecordIdByField(
  122 |         sObject: string,
  123 |         fieldName: string,
  124 |         value: string,
  125 |         autoRegister: boolean = true
  126 |     ): Promise<string> {
  127 |         const query = encodeURIComponent(
  128 |             `SELECT Id FROM ${sObject} WHERE ${fieldName} = '${value}' LIMIT 1`
  129 |         );
  130 |         const response = await fetch(
  131 |             `${this.instanceUrl}/services/data/v65.0/query?q=${query}`,
  132 |             {
  133 |                 headers: { Authorization: `Bearer ${this.accessToken}` },
  134 |             }
  135 |         );
  136 | 
  137 |         const result = (await response.json()) as any;
  138 |         if (result.records && result.records.length > 0) {
  139 |             const recordId = result.records[0].Id;
  140 | 
  141 |             // Auto-register for cleanup (default behavior for automation testing)
  142 |             if (autoRegister) {
  143 |                 this.registerForCleanup(sObject, recordId, value);
  144 |             }
  145 | 
  146 |             return recordId;
  147 |         }
> 148 |         throw new Error(`Record not found for ${sObject} where ${fieldName}='${value}'`);
      |               ^ Error: Record not found for Plan_Customer__c where Name='TestCustPlan_1775562091185'
  149 |     }
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
```