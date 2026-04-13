/**
 * Dynamic test data generator utility.
 *
 * Generates unique, timestamped, or random values for use in tests
 * to prevent collisions with duplicate-detection rules.
 */
export class TestDataGenerator {
  /**
   * Generate a unique string with a prefix and timestamp.
   *
   * @param prefix - Descriptive prefix (e.g., 'TestContact', 'Account')
   * @returns Unique string like `TestContact_1710345678901`
   */
  static uniqueName(prefix: string): string {
    return `${prefix}_${Date.now()}`;
  }

  /**
   * Generate a unique serial number with a prefix.
   *
   * @param prefix - Prefix string (e.g., 'SN')
   * @returns String like `SN-1710345678901`
   */
  static uniqueSerial(prefix: string = 'SN'): string {
    return `${prefix}-${Date.now()}`;
  }

  /**
   * Generate a unique email address.
   *
   * @param prefix - Local part prefix (e.g., 'testuser')
   * @param domain - Email domain (default: 'test.example.com')
   * @returns String like `testuser_1710345678901@test.example.com`
   */
  static uniqueEmail(prefix: string = 'testuser', domain: string = 'test.example.com'): string {
    return `${prefix}_${Date.now()}@${domain}`;
  }

  /**
   * Generate a random integer between min and max (inclusive).
   *
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns Random integer in [min, max]
   */
  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random phone number string.
   *
   * @returns 10-digit phone string like `5551234567`
   */
  static randomPhone(): string {
    return `555${TestDataGenerator.randomInt(1000000, 9999999)}`;
  }

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
  static resolvePlaceholders<T extends Record<string, string>>(data: T): T {
    const resolved: Record<string, string> = {};
    const timestamp = Date.now().toString();

    for (const [key, value] of Object.entries(data)) {
      let result = value;

      result = result.replace(/\{\{UNIQUE\}\}/g, timestamp);
      result = result.replace(/\{\{UNIQUE_NAME:(\w+)\}\}/g, (_, prefix: string) => `${prefix}_${timestamp}`);
      result = result.replace(/\{\{UNIQUE_SERIAL:(\w+)\}\}/g, (_, prefix: string) => `${prefix}-${timestamp}`);
      result = result.replace(/\{\{UNIQUE_EMAIL\}\}/g, `testuser_${timestamp}@test.example.com`);
      result = result.replace(/\{\{RANDOM_PHONE\}\}/g, TestDataGenerator.randomPhone());

      resolved[key] = result;
    }

    return resolved as T;
  }
}