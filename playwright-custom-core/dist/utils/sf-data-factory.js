"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SFDataFactory = void 0;
const index_1 = require("../utils/index");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
* Salesforce Data Factory
*
* Handles authentication and automatic cleanup of test data in Salesforce.
* Uses a **unique-field approach**: after creating a record via UI, the test
* calls `getRecordIdByField()` with the unique field value used during creation.
* This queries Salesforce, finds the record ID, and registers it for cleanup.
* On `teardown()`, all registered records are deleted in reverse order.
*
* Provides utilities for:
* - Record retrieval by unique field value
* - Automatic cleanup registration
* - Teardown of created records (reverse order for child-before-parent)
*
* @example
* ```ts
* const dataFactory = new SFDataFactory();
* await dataFactory.authenticate();
*
* // After creating a record via UI with a unique name
* const accountId = await dataFactory.getRecordIdByField('Account', 'Name', uniqueAccountName);
*
* // Cleanup automatically happens in teardown (reverse order)
* await dataFactory.teardown();
* ```
*/
class SFDataFactory {
    accessToken = '';
    instanceUrl = '';
    recordsToCleanup = [];
    /**
     * Authenticate with Salesforce using OAuth 2.0 password flow.
     * Credentials are loaded from environment variables.
     */
    async authenticate() {
        if (this.accessToken)
            return; // Already populated — skip
        const { accessToken, instanceUrl } = await index_1.SalesforceConnection.getInstance().getConnection();
        this.accessToken = accessToken;
        this.instanceUrl = instanceUrl;
    }
    /**
     * Get the access token (useful for external API calls like Tooling API).
     * Ensures authentication has occurred before returning.
     */
    async getAccessToken() {
        await this.authenticate();
        return this.accessToken;
    }
    /**
     * Get the instance URL (useful for external API calls).
     * Ensures authentication has occurred before returning.
     */
    async getInstanceUrl() {
        await this.authenticate();
        return this.instanceUrl;
    }
    /**
     * Generates a unique value for primary fields to avoid "Duplicate Value" errors.
     */
    generateUniqueName(baseName) {
        return `${baseName}_${Math.random().toString(36).substring(2, 8)}_${Date.now()}`;
    }
    /**
     * Finds a record ID by a specific field and value.
     * Use this immediately after page.click('Save') to get the ID.
     * Automatically registers the record for cleanup.
     *
     * @param sObject - Salesforce object API name (e.g., 'Account', 'Contact')
     * @param fieldName - Field to search by (e.g., 'Name', 'Email')
     * @param value - Unique value to search for
     * @param autoRegister - Automatically register for cleanup (default: true)
     * @returns Record ID (15 or 18 characters)
     */
    async getRecordIdByField(sObject, fieldName, value, autoRegister = true) {
        const query = encodeURIComponent(`SELECT Id FROM ${sObject} WHERE ${fieldName} = '${value}' LIMIT 1`);
        const response = await fetch(`${this.instanceUrl}/services/data/v65.0/query?q=${query}`, {
            headers: { Authorization: `Bearer ${this.accessToken}` },
        });
        const result = (await response.json());
        if (result.records && result.records.length > 0) {
            const recordId = result.records[0].Id;
            // Auto-register for cleanup (default behavior for automation testing)
            if (autoRegister) {
                this.registerForCleanup(sObject, recordId, value);
            }
            return recordId;
        }
        throw new Error(`Record not found for ${sObject} where ${fieldName}='${value}'`);
    }
    /**
     * Manual registration for records created via UI.
     */
    registerForCleanup(sObject, id, name) {
        // Avoid duplicate registrations for the same record
        const alreadyRegistered = this.recordsToCleanup.some((r) => r.id === id && r.type === sObject);
        if (alreadyRegistered) {
            console.log(`⏭️  Already registered for cleanup: ${sObject} (${id})`);
            return;
        }
        this.recordsToCleanup.push({ type: sObject, id, name });
        console.log(`📌 Registered for cleanup: ${sObject} (${id})${name ? ` - ${name}` : ''}`);
    }
    /**
     * Deletes all registered records in REVERSE order.
     * This ensures child records are deleted before parents.
     * This method ALWAYS runs in afterAll/afterEach, regardless of test pass/fail.
     *
     * Cleanup is automatic in test automation — no opt-in required.
     */
    async teardown() {
        if (this.recordsToCleanup.length === 0) {
            console.log('✅ No records to clean up');
            return;
        }
        console.log(`\n🧹 Starting automatic cleanup of ${this.recordsToCleanup.length} records...`);
        console.log('   (Cleanup runs regardless of test pass/fail)\n');
        let successCount = 0;
        let failCount = 0;
        for (const record of this.recordsToCleanup.reverse()) {
            try {
                const response = await fetch(`${this.instanceUrl}/services/data/v65.0/sobjects/${record.type}/${record.id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${this.accessToken}` },
                });
                if (response.ok || response.status === 404) {
                    console.log(`✅ Deleted ${record.type}: ${record.id}${record.name ? ` - ${record.name}` : ''}`);
                    successCount++;
                }
                else {
                    const error = await response.text();
                    console.error(`❌ Failed to delete ${record.type} ${record.id}: ${error}`);
                    failCount++;
                }
            }
            catch (error) {
                console.error(`❌ Exception deleting ${record.type} ${record.id}:`, error);
                failCount++;
            }
        }
        this.recordsToCleanup = [];
        console.log(`\n✅ Cleanup completed: ${successCount} deleted, ${failCount} failed\n`);
    }
    /**
     * Extract recordId and objectApiName from a Salesforce record page URL
     * and register the record for cleanup.
     *
     * Use this when record creation redirects to the record's detail page.
     * URL format: /lightning/r/<ObjectName>/<RecordId>/view
     *
     * @param url - Full page URL (e.g., from `page.url()`)
     * @param name - Optional display name for logging
     * @returns Object with `objectApiName` and `recordId`
     * @throws Error if URL does not match Salesforce record page pattern
     *
     * @example
     * ```ts
     * const { objectApiName, recordId } = dataFactory.registerRecordFromUrl(page.url(), 'My Opportunity');
     * ```
     */
    registerRecordFromUrl(url, name) {
        const match = url.match(/\/lightning\/r\/([A-Za-z_][A-Za-z0-9_]*)\/([a-zA-Z0-9]{15,18})\/view/);
        if (!match) {
            throw new Error(`Cannot extract record info from URL: ${url}. Expected format: /lightning/r/<Object>/<RecordId>/view`);
        }
        const objectApiName = match[1];
        console.log("ObjectName: ", objectApiName);
        const recordId = match[2];
        console.log("RecordId: ", recordId);
        this.registerForCleanup(objectApiName, recordId, name);
        return { objectApiName, recordId };
    }
    /**
     * Create a record in Salesforce via REST API.
     * Automatically registers the created record for cleanup.
     *
     * @param sObject - Salesforce object API name (e.g., 'Account', 'Contact', 'Lead')
     * @param payload - Record field data as a plain object
     * @param autoRegister - Automatically register for cleanup (default: true)
     * @returns The created record ID
     *
     * @example
     * ```ts
     * const payload = PayloadBuilder
     *   .fromFile('test-data/api/account-template.json')
     *   .set('Name', TestDataGenerator.uniqueName('Account'))
     *   .build();
     *
     * const accountId = await dataFactory.createRecord('Account', payload);
     * ```
     */
    async createRecord(sObject, payload, autoRegister = true) {
        // await this.authenticate();
        const response = await fetch(`${this.instanceUrl}/services/data/v65.0/sobjects/${sObject}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
                // Bypass Salesforce duplicate rules for test data creation
                'Sforce-Duplicate-Rule-Header': 'allowSave=true',
            },
            body: JSON.stringify(payload),
        });
        const result = (await response.json());
        if (!response.ok) {
            const errors = result.errors || result;
            throw new Error(`Failed to create ${sObject}: ${JSON.stringify(errors)}`);
        }
        const recordId = result.id;
        const recordName = payload.Name ||
            payload.LastName ||
            payload.Subject ||
            recordId;
        console.log(`✅ Created ${sObject} via API: ${recordId} - ${recordName}`);
        if (autoRegister) {
            this.registerForCleanup(sObject, recordId, recordName);
        }
        return recordId;
    }
    /**
     * Update an existing record in Salesforce via REST API (PATCH).
     * Supports partial updates — only the fields in the payload are changed.
     *
     * @param sObject - Salesforce object API name (e.g., 'Account', 'Contact')
     * @param recordId - The 15 or 18 character Salesforce record ID
     * @param payload - Fields to update (only changed fields are required)
     * @returns void — throws on failure
     *
     * @example
     * ```ts
     * await dataFactory.updateRecord('Contact', contactId, {
     *   Title: 'Senior QA Engineer',
     *   Department: 'Quality Assurance',
     * });
     * ```
     */
    async updateRecord(sObject, recordId, payload) {
        // await this.authenticate();
        const response = await fetch(`${this.instanceUrl}/services/data/v65.0/sobjects/${sObject}/${recordId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        // Salesforce PATCH returns 204 No Content on success — there is no response body
        if (!response.ok) {
            const errorText = await response.text();
            let errors;
            try {
                errors = JSON.parse(errorText);
            }
            catch {
                errors = errorText;
            }
            throw new Error(`Failed to update ${sObject} (${recordId}): ${JSON.stringify(errors)}`);
        }
        const updatedFields = Object.keys(payload);
        console.log(`✏️  Updated ${sObject} (${recordId}) — fields: ${updatedFields.join(', ')}`);
    }
    /**
     * Fetch a single record from Salesforce via the SOQL Query API.
     *
     * Builds: SELECT {fields} FROM {sObject} WHERE Id = '{recordId}'
     * If no fields are provided, uses FIELDS(ALL) to return every field.
     *
     * Endpoint: GET /services/data/v65.0/query/?q=SELECT ...
     * Response shape: { totalSize, done, records: [ { attributes, ...fields } ] }
     *
     * @param sObject  - Salesforce object API name (e.g., 'Account', 'Contact')
     * @param recordId - The 15 or 18 character Salesforce record ID
     * @param fields   - Field API names to retrieve. Omit to fetch all fields.
     * @returns The first matching record as a typed object (attributes stripped)
     * @throws Error if the record is not found or the request fails
     *
     * @example
     * // Fetch specific fields
     * const contact = await dataFactory.fetchRecord<ContactRecord>(
     *   'Contact', contactId, ['Id', 'FirstName', 'LastName', 'Email']
     * );
     *
     * // Fetch all fields
     * const contact = await dataFactory.fetchRecord('Contact', contactId);
     */
    async fetchRecord(sObject, recordId, fields) {
        // await this.authenticate();
        // Build the SELECT clause
        const selectClause = fields && fields.length > 0
            ? fields.join(', ')
            : 'FIELDS(ALL)';
        // FIELDS(ALL) requires LIMIT when used without a WHERE clause that returns one row
        const limitClause = (!fields || fields.length === 0) ? ' LIMIT 1' : '';
        const soql = `SELECT ${selectClause} FROM ${sObject} WHERE Id = '${recordId}'${limitClause}`;
        const url = `${this.instanceUrl}/services/data/v65.0/query/?q=${encodeURIComponent(soql)}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${this.accessToken}` },
        });
        if (!response.ok) {
            const errorText = await response.text();
            let errors;
            try {
                errors = JSON.parse(errorText);
            }
            catch {
                errors = errorText;
            }
            if (response.status === 404) {
                throw new Error(`Record not found: ${sObject} (${recordId})`);
            }
            throw new Error(`Failed to fetch ${sObject} (${recordId}): ${JSON.stringify(errors)}`);
        }
        const result = (await response.json());
        if (result.totalSize === 0 || result.records.length === 0) {
            throw new Error(`Record not found: ${sObject} (${recordId})`);
        }
        // Strip the Salesforce metadata `attributes` key from the returned record
        const { attributes: _attr, ...record } = result.records[0];
        const label = fields && fields.length > 0 ? fields.join(', ') : 'FIELDS(ALL)';
        console.log(`📥 Fetched ${sObject} (${recordId}) — ${label}`);
        console.log('   Record', JSON.stringify(record, null, 2));
        return record;
    }
    /**
     * Delete a single record in Salesforce via REST API (DELETE).
     * Useful for writing explicit "delete" test scenarios.
     *
     * Note: The record remains in the cleanup registry. `teardown()` handles
     * the resulting 404 gracefully — no double-deletion errors.
     *
     * @param sObject - Salesforce object API name (e.g., 'Account', 'Contact')
     * @param recordId - The 15 or 18 character Salesforce record ID
     * @param name    - Optional display name for logging
     * @returns void — throws on failure (non-404 errors)
     *
     * @example
     * ```ts
     * await dataFactory.deleteRecord('Contact', contactId, 'John Doe');
     * // → 🗑️  Deleted Contact (003xx000000...) - John Doe
     * ```
     */
    async deleteRecord(sObject, recordId, name) {
        // await this.authenticate();
        const response = await fetch(`${this.instanceUrl}/services/data/v65.0/sobjects/${sObject}/${recordId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${this.accessToken}` },
        });
        // 204 No Content = success; 404 = already deleted (treat as success)
        if (!response.ok && response.status !== 404) {
            const errorText = await response.text();
            let errors;
            try {
                errors = JSON.parse(errorText);
            }
            catch {
                errors = errorText;
            }
            throw new Error(`Failed to delete ${sObject} (${recordId}): ${JSON.stringify(errors)}`);
        }
        const label = name ? ` - ${name}` : '';
        console.log(`🗑️  Deleted ${sObject} (${recordId})${label}`);
    }
    /**
     * ================================================================
     * COMPOSITE API
     * ================================================================
     *
     * Execute a Salesforce Composite API request — up to 25 subrequests
     * in a single HTTP round-trip.  Results preserve the same order as
     * the input subrequests.  Cross-reference earlier results with the
     * `@{referenceId.field}` syntax directly inside `body` values.
     *
     * Endpoint: POST /services/data/v65.0/composite/
     *
     * @param subrequests - Ordered list of subrequests to execute.
     * @param allOrNone   - When true, all subrequests are rolled back if
     *                      any one fails.  Default: false (partial success
     *                      allowed — more resilient for test data setup).
     * @returns Ordered array of `CompositeSubresponse` matching the input.
     *
     * @example
     * ```ts
     * const results = await dataFactory.executeCompositeRequest([
     *   {
     *     method: 'POST',
     *     url: '/services/data/v65.0/sobjects/Account',
     *     referenceId: 'refAccount',
     *     body: { Name: 'Composite Account' },
     *   },
     *   {
     *     method: 'POST',
     *     url: '/services/data/v65.0/sobjects/Contact',
     *     referenceId: 'refContact',
     *     body: { LastName: 'Composite Contact', AccountId: '@{refAccount.id}' },
     *   },
     * ]);
     * // results[0].body.id → Account record ID
     * // results[1].body.id → Contact record ID
     * ```
     */
    async executeCompositeRequest(subrequests, allOrNone = false) {
        // await this.authenticate();
        if (subrequests.length === 0) {
            throw new Error('executeCompositeRequest: subrequests array must not be empty');
        }
        if (subrequests.length > 25) {
            throw new Error(`executeCompositeRequest: Salesforce Composite API allows at most 25 subrequests per call, got ${subrequests.length}`);
        }
        const requestBody = { allOrNone, compositeRequest: subrequests };
        const response = await fetch(`${this.instanceUrl}/services/data/v65.0/composite/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
                'Sforce-Duplicate-Rule-Header': 'allowSave=true',
            },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            const errorText = await response.text();
            let errors;
            try {
                errors = JSON.parse(errorText);
            }
            catch {
                errors = errorText;
            }
            throw new Error(`Composite API request failed (${response.status}): ${JSON.stringify(errors)}`);
        }
        const result = (await response.json());
        // Log & surface any individual subrequest failures
        const failed = result.compositeResponse.filter((r) => r.httpStatusCode < 200 || r.httpStatusCode >= 300);
        if (failed.length > 0) {
            const details = failed
                .map((r) => `[${r.referenceId}] HTTP ${r.httpStatusCode}: ${JSON.stringify(r.body)}`)
                .join('\n  ');
            throw new Error(`Composite API: ${failed.length} subrequest(s) failed:\n  ${details}`);
        }
        console.log(`🔗 Composite API: ${subrequests.length} subrequest(s) completed successfully`);
        return result.compositeResponse;
    }
    /**
     * Get count of records pending cleanup.
     */
    getCleanupCount() {
        return this.recordsToCleanup.length;
    }
    /**
     * Get a snapshot of records currently registered for cleanup (read-only).
     */
    getRegisteredRecords() {
        return [...this.recordsToCleanup];
    }
}
exports.SFDataFactory = SFDataFactory;
//# sourceMappingURL=sf-data-factory.js.map