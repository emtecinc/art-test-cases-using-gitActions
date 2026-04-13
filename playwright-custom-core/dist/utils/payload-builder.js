"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadBuilder = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
class PayloadBuilder {
    payload;
    strictMode = false;
    /**
     * Private constructor — use static factory methods.
     */
    constructor(base) {
        // Deep clone to avoid mutating the original
        this.payload = JSON.parse(JSON.stringify(base));
    }
    // ============================================
    // STATIC FACTORY METHODS
    // ============================================
    /**
     * Create a PayloadBuilder from a JSON template file.
     *
     * @param filePath - Absolute or relative path to the JSON template
     * @returns New PayloadBuilder with the file contents as the base payload
     * @throws Error if file does not exist or contains invalid JSON
     */
    static fromFile(filePath) {
        const resolvedPath = path_1.default.resolve(filePath);
        if (!fs_1.default.existsSync(resolvedPath)) {
            throw new Error(`Payload template file not found: ${resolvedPath}`);
        }
        const content = fs_1.default.readFileSync(resolvedPath, 'utf-8');
        try {
            const parsed = JSON.parse(content);
            return new PayloadBuilder(parsed);
        }
        catch (error) {
            throw new Error(`Invalid JSON in template ${resolvedPath}: ${error.message}`);
        }
    }
    /**
     * Create a PayloadBuilder from an existing object (no file).
     *
     * @param base - Base object to use as the starting payload
     * @returns New PayloadBuilder with a deep clone of the provided object
     */
    static fromObject(base) {
        if (base === null || base === undefined) {
            throw new Error('Cannot create PayloadBuilder from null or undefined');
        }
        return new PayloadBuilder(base);
    }
    /**
     * Create an empty PayloadBuilder.
     *
     * @returns New PayloadBuilder with an empty object
     */
    static empty() {
        return new PayloadBuilder({});
    }
    // ============================================
    // CONFIGURATION
    // ============================================
    /**
     * Enable strict mode — only allows setting keys that already exist
     * in the base payload. Prevents adding new unplanned fields.
     *
     * @returns this (for chaining)
     */
    strict() {
        this.strictMode = true;
        return this;
    }
    // ============================================
    // FIELD SETTERS
    // ============================================
    /**
     * Set a single top-level field value.
     * If value is null or undefined, the field is skipped (safe handling).
     *
     * @param key - Field name
     * @param value - Value to set (null/undefined are safely ignored)
     * @returns this (for chaining)
     */
    set(key, value) {
        if (value === null || value === undefined) {
            return this; // Safe skip
        }
        if (this.strictMode && !(key in this.payload)) {
            throw new Error(`Strict mode: key "${String(key)}" does not exist in base payload. ` +
                `Available keys: ${Object.keys(this.payload).join(', ')}`);
        }
        this.payload[key] = value;
        return this;
    }
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
    setNested(keyPath, value) {
        if (value === null || value === undefined) {
            return this; // Safe skip
        }
        const keys = keyPath.split('.');
        let current = this.payload;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (this.strictMode && !(key in current)) {
                throw new Error(`Strict mode: nested key "${key}" (in path "${keyPath}") does not exist in payload`);
            }
            if (current[key] === null || current[key] === undefined || typeof current[key] !== 'object') {
                if (this.strictMode) {
                    throw new Error(`Strict mode: cannot create intermediate object for "${key}" in path "${keyPath}"`);
                }
                current[key] = {};
            }
            current = current[key];
        }
        const finalKey = keys[keys.length - 1];
        if (this.strictMode && !(finalKey in current)) {
            throw new Error(`Strict mode: key "${finalKey}" (in path "${keyPath}") does not exist in payload`);
        }
        current[finalKey] = value;
        return this;
    }
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
    merge(overrides) {
        if (overrides === null || overrides === undefined) {
            return this; // Safe skip
        }
        for (const [key, value] of Object.entries(overrides)) {
            if (value === null || value === undefined) {
                continue; // Safe skip null/undefined
            }
            if (this.strictMode && !(key in this.payload)) {
                throw new Error(`Strict mode: key "${key}" does not exist in base payload. ` +
                    `Available keys: ${Object.keys(this.payload).join(', ')}`);
            }
            this.payload[key] = value;
        }
        return this;
    }
    /**
     * Remove a field from the payload.
     *
     * @param key - Field name to remove
     * @returns this (for chaining)
     */
    remove(key) {
        delete this.payload[key];
        return this;
    }
    // ============================================
    // OUTPUT
    // ============================================
    /**
     * Build and return the final payload object.
     * Returns a deep clone to prevent mutation of the builder's internal state.
     *
     * @returns Deep-cloned final payload
     */
    build() {
        return JSON.parse(JSON.stringify(this.payload));
    }
    /**
     * Build and return the payload as a JSON string.
     *
     * @param pretty - Whether to format with indentation (default: false)
     * @returns JSON string
     */
    toJSON(pretty = false) {
        return JSON.stringify(this.payload, null, pretty ? 2 : undefined);
    }
    /**
     * Peek at the current payload state without building (for debugging).
     *
     * @returns Read-only view of the current payload
     */
    peek() {
        return { ...this.payload };
    }
}
exports.PayloadBuilder = PayloadBuilder;
//# sourceMappingURL=payload-builder.js.map