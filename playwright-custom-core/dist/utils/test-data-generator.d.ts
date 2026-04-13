/**
 * Dynamic test data generator utility.
 *
 * Generates unique, timestamped, or random values for use in tests
 * to prevent collisions with duplicate-detection rules.
 */
export declare class TestDataGenerator {
    /**
     * Generate a unique string with a prefix and timestamp.
     *
     * @param prefix - Descriptive prefix (e.g., 'TestContact', 'Account')
     * @returns Unique string like `TestContact_1710345678901`
     */
    static uniqueName(prefix: string): string;
    /**
     * Generate a unique serial number with a prefix.
     *
     * @param prefix - Prefix string (e.g., 'SN')
     * @returns String like `SN-1710345678901`
     */
    static uniqueSerial(prefix?: string): string;
    /**
     * Generate a unique email address.
     *
     * @param prefix - Local part prefix (e.g., 'testuser')
     * @param domain - Email domain (default: 'test.example.com')
     * @returns String like `testuser_1710345678901@test.example.com`
     */
    static uniqueEmail(prefix?: string, domain?: string): string;
    /**
     * Generate a random integer between min and max (inclusive).
     *
     * @param min - Minimum value
     * @param max - Maximum value
     * @returns Random integer in [min, max]
     */
    static randomInt(min: number, max: number): number;
    /**
     * Generate a random phone number string.
     *
     * @returns 10-digit phone string like `5551234567`
     */
    static randomPhone(): string;
    /**
     * Apply dynamic placeholders within a data object.
     * Replaces placeholder tokens in string values:
     *   - `{{UNIQUE}}` → timestamp
     *   - `{{UNIQUE_NAME:prefix}}` → `prefix_timestamp`
     *   - `{{UNIQUE_SERIAL:prefix}}` → `prefix-timestamp`
     *   - `{{UNIQUE_EMAIL}}` → unique email
     *   - `{{RANDOM_PHONE}}` → random phone
     *
     * Static values (no placeholders) are returned as-is.
     *
     * @param data - Object with string values potentially containing placeholders
     * @returns New object with placeholders resolved
     */
    static resolvePlaceholders<T extends Record<string, string>>(data: T): T;
}
//# sourceMappingURL=test-data-generator.d.ts.map