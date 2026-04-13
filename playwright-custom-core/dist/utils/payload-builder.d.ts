/**
 * Payload Builder
 *
 * Reads a JSON template file, merges dynamic overrides, and produces
 * a ready-to-send API payload. Designed for Salesforce REST API record
 * creation where a base JSON template defines the full field structure
 * and tests only override the fields that need unique/dynamic values.
 *
 * Features:
 * - Read JSON from file → parse into typed object
 * - Use file data as the base structure
 * - Update only required dynamic fields (shallow or nested)
 * - Add additional fields to extend the payload
 * - Safe handling of null / undefined inputs
 * - Option to restrict updates to existing keys only
 * - Nested JSON updates via dot-notation paths
 *
 * @example
 * ```ts
 * // Base JSON template (test-data/api/contact-template.json):
 * // { "FirstName": "Test", "LastName": "Contact", "Email": "test@example.com" }
 *
 * const payload = PayloadBuilder
 *   .fromFile<ContactPayload>('test-data/api/contact-template.json')
 *   .set('LastName', TestDataGenerator.uniqueName('Contact'))
 *   .set('Email', TestDataGenerator.uniqueEmail('contact'))
 *   .build();
 *
 * // payload = { FirstName: "Test", LastName: "Contact_1710345678901", Email: "contact_1710345678901@test.example.com" }
 * ```
 */
export declare class PayloadBuilder<T extends Record<string, unknown> = Record<string, unknown>> {
    private payload;
    private strictMode;
    /**
     * Private constructor — use static factory methods.
     */
    private constructor();
    /**
     * Create a PayloadBuilder from a JSON template file.
     *
     * @param filePath - Absolute or relative path to the JSON template
     * @returns New PayloadBuilder with the file contents as the base payload
     * @throws Error if file does not exist or contains invalid JSON
     */
    static fromFile<T extends Record<string, unknown> = Record<string, unknown>>(filePath: string): PayloadBuilder<T>;
    /**
     * Create a PayloadBuilder from an existing object (no file).
     *
     * @param base - Base object to use as the starting payload
     * @returns New PayloadBuilder with a deep clone of the provided object
     */
    static fromObject<T extends Record<string, unknown> = Record<string, unknown>>(base: T): PayloadBuilder<T>;
    /**
     * Create an empty PayloadBuilder.
     *
     * @returns New PayloadBuilder with an empty object
     */
    static empty<T extends Record<string, unknown> = Record<string, unknown>>(): PayloadBuilder<T>;
    /**
     * Enable strict mode — only allows setting keys that already exist
     * in the base payload. Prevents adding new unplanned fields.
     *
     * @returns this (for chaining)
     */
    strict(): PayloadBuilder<T>;
    /**
     * Set a single top-level field value.
     * If value is null or undefined, the field is skipped (safe handling).
     *
     * @param key - Field name
     * @param value - Value to set (null/undefined are safely ignored)
     * @returns this (for chaining)
     */
    set<K extends keyof T>(key: K, value: T[K] | null | undefined): PayloadBuilder<T>;
    /**
     * Set a nested field value using dot-notation path.
     * Creates intermediate objects if they don't exist (unless strict mode).
     *
     * @param keyPath - Dot-separated path (e.g., 'BillingAddress.City')
     * @param value - Value to set
     * @returns this (for chaining)
     *
     * @example
     * ```ts
     * builder.setNested('BillingAddress.City', 'San Francisco');
     * // payload = { ..., BillingAddress: { ..., City: 'San Francisco' } }
     * ```
     */
    setNested(keyPath: string, value: unknown): PayloadBuilder<T>;
    /**
     * Merge multiple field overrides at once.
     * Only non-null/non-undefined values are applied.
     *
     * @param overrides - Object with fields to merge into the base payload
     * @returns this (for chaining)
     *
     * @example
     * ```ts
     * builder.merge({
     *   LastName: 'UniqueContact_12345',
     *   Email: 'unique@test.com',
     *   Phone: null,  // safely ignored
     * });
     * ```
     */
    merge(overrides: Partial<T> | Record<string, unknown>): PayloadBuilder<T>;
    /**
     * Remove a field from the payload.
     *
     * @param key - Field name to remove
     * @returns this (for chaining)
     */
    remove<K extends keyof T>(key: K): PayloadBuilder<T>;
    /**
     * Build and return the final payload object.
     * Returns a deep clone to prevent mutation of the builder's internal state.
     *
     * @returns Deep-cloned final payload
     */
    build(): T;
    /**
     * Build and return the payload as a JSON string.
     *
     * @param pretty - Whether to format with indentation (default: false)
     * @returns JSON string
     */
    toJSON(pretty?: boolean): string;
    /**
     * Peek at the current payload state without building (for debugging).
     *
     * @returns Read-only view of the current payload
     */
    peek(): Readonly<T>;
}
//# sourceMappingURL=payload-builder.d.ts.map