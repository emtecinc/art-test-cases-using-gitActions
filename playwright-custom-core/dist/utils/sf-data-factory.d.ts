/**
* A single subrequest inside a Composite API call.
* `method`      — HTTP verb: POST | PATCH | DELETE | GET
* `url`         — Relative Salesforce REST URL, e.g.
*                 "/services/data/v65.0/sobjects/Account"
* `referenceId` — Unique alphanumeric ID used to cross-reference
*                 this subrequest's result in later steps, e.g.
*                 `@{refAccount.id}`
* `body`        — Request payload (omit for DELETE / GET)
*/
export interface CompositeSubrequest {
    method: 'POST' | 'PATCH' | 'DELETE' | 'GET';
    url: string;
    referenceId: string;
    body?: Record<string, unknown>;
}
/**
* The response for a single subrequest inside a Composite API response.
* `body`           — Parsed response body (null for 204 No Content)
* `httpStatusCode` — HTTP status of this individual subrequest
* `referenceId`    — Matches the referenceId sent in the subrequest
* `httpHeaders`    — Response headers (e.g. Location for created records)
*/
export interface CompositeSubresponse {
    body: Record<string, unknown> | null;
    httpStatusCode: number;
    referenceId: string;
    httpHeaders: Record<string, string>;
}
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
export declare class SFDataFactory {
    private accessToken;
    private instanceUrl;
    private recordsToCleanup;
    /**
     * Authenticate with Salesforce using OAuth 2.0 password flow.
     * Credentials are loaded from environment variables.
     */
    authenticate(): Promise<void>;
    /**
     * Get the access token (useful for external API calls like Tooling API).
     * Ensures authentication has occurred before returning.
     */
    getAccessToken(): Promise<string>;
    /**
     * Get the instance URL (useful for external API calls).
     * Ensures authentication has occurred before returning.
     */
    getInstanceUrl(): Promise<string>;
    /**
     * Generates a unique value for primary fields to avoid "Duplicate Value" errors.
     */
    generateUniqueName(baseName: string): string;
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
    getRecordIdByField(sObject: string, fieldName: string, value: string, autoRegister?: boolean): Promise<string>;
    /**
     * Manual registration for records created via UI.
     */
    registerForCleanup(sObject: string, id: string, name?: string): void;
    /**
     * Deletes all registered records in REVERSE order.
     * This ensures child records are deleted before parents.
     * This method ALWAYS runs in afterAll/afterEach, regardless of test pass/fail.
     *
     * Cleanup is automatic in test automation — no opt-in required.
     */
    teardown(): Promise<void>;
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
    registerRecordFromUrl(url: string, name?: string): {
        objectApiName: string;
        recordId: string;
    };
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
    createRecord(sObject: string, payload: Record<string, unknown>, autoRegister?: boolean): Promise<string>;
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
    updateRecord(sObject: string, recordId: string, payload: Record<string, unknown>): Promise<void>;
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
    fetchRecord<T extends Record<string, unknown> = Record<string, unknown>>(sObject: string, recordId: string, fields?: string[]): Promise<T>;
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
    deleteRecord(sObject: string, recordId: string, name?: string): Promise<void>;
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
    executeCompositeRequest(subrequests: CompositeSubrequest[], allOrNone?: boolean): Promise<CompositeSubresponse[]>;
    /**
     * Get count of records pending cleanup.
     */
    getCleanupCount(): number;
    /**
     * Get a snapshot of records currently registered for cleanup (read-only).
     */
    getRegisteredRecords(): ReadonlyArray<{
        type: string;
        id: string;
        name?: string;
    }>;
}
//# sourceMappingURL=sf-data-factory.d.ts.map