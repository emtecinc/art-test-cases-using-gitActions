/**
 * Parses a CSV file and returns an array of typed objects.
 * First row is treated as headers. Supports quoted fields with commas inside.
 */
export declare class CsvReader {
    /**
     * Read all rows from a CSV file as an array of objects keyed by header names.
     *
     * @param filePath - Absolute or relative path to the CSV file
     * @returns Array of row objects with header-keyed string values
     */
    static readAll<T extends Record<string, string>>(filePath: string): T[];
    /**
     * Read a single row by index (0-based, excluding header).
     *
     * @param filePath - Path to the CSV file
     * @param rowIndex - Zero-based row index (0 = first data row)
     * @returns Single row object or undefined if index is out of range
     */
    static readRow<T extends Record<string, string>>(filePath: string, rowIndex: number): T | undefined;
    /**
     * Read the first row that matches a predicate.
     *
     * @param filePath - Path to the CSV file
     * @param predicate - Function to match the desired row
     * @returns Matching row object or undefined
     */
    static findRow<T extends Record<string, string>>(filePath: string, predicate: (row: T) => boolean): T | undefined;
    /**
     * Parse CSV content string into typed objects.
     */
    private static parse;
    /**
     * Parse a single CSV line, respecting quoted fields.
     */
    private static parseLine;
}
//# sourceMappingURL=csv-reader.d.ts.map