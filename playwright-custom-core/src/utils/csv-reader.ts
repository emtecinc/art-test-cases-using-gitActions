import * as fs from 'fs';
import * as path from 'path';

/**
 * Parses a CSV file and returns an array of typed objects.
 * First row is treated as headers. Supports quoted fields with commas inside.
 */
export class CsvReader {
  /**
   * Read all rows from a CSV file as an array of objects keyed by header names.
   *
   * @param filePath - Absolute or relative path to the CSV file
   * @returns Array of row objects with header-keyed string values
   */
  static readAll<T extends Record<string, string>>(filePath: string): T[] {
    const resolvedPath = path.resolve(filePath);
    const content = fs.readFileSync(resolvedPath, 'utf-8');
    return CsvReader.parse<T>(content);
  }

  /**
   * Read a single row by index (0-based, excluding header).
   *
   * @param filePath - Path to the CSV file
   * @param rowIndex - Zero-based row index (0 = first data row)
   * @returns Single row object or undefined if index is out of range
   */
  static readRow<T extends Record<string, string>>(filePath: string, rowIndex: number): T | undefined {
    const rows = CsvReader.readAll<T>(filePath);
    return rows[rowIndex];
  }

  /**
   * Read the first row that matches a predicate.
   *
   * @param filePath - Path to the CSV file
   * @param predicate - Function to match the desired row
   * @returns Matching row object or undefined
   */
  static findRow<T extends Record<string, string>>(
    filePath: string,
    predicate: (row: T) => boolean,
  ): T | undefined {
    const rows = CsvReader.readAll<T>(filePath);
    return rows.find(predicate);
  }

  /**
   * Parse CSV content string into typed objects.
   */
  private static parse<T extends Record<string, string>>(content: string): T[] {
    const lines = content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length < 2) {
      return [];
    }

    const headers = CsvReader.parseLine(lines[0]);
    const rows: T[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = CsvReader.parseLine(lines[i]);
      const row: Record<string, string> = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j] ?? '';
      }
      rows.push(row as T);
    }

    return rows;
  }

  /**
   * Parse a single CSV line, respecting quoted fields.
   */
  private static parseLine(line: string): string[] {
    const fields: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (inQuotes) {
        if (char === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          current += char;
        }
      } else {
        if (char === '"') {
          inQuotes = true;
        } else if (char === ',') {
          fields.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
    }

    fields.push(current.trim());
    return fields;
  }
}