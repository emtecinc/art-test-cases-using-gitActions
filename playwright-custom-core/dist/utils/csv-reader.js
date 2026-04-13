"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvReader = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Parses a CSV file and returns an array of typed objects.
 * First row is treated as headers. Supports quoted fields with commas inside.
 */
class CsvReader {
    /**
     * Read all rows from a CSV file as an array of objects keyed by header names.
     *
     * @param filePath - Absolute or relative path to the CSV file
     * @returns Array of row objects with header-keyed string values
     */
    static readAll(filePath) {
        const resolvedPath = path.resolve(filePath);
        const content = fs.readFileSync(resolvedPath, 'utf-8');
        return CsvReader.parse(content);
    }
    /**
     * Read a single row by index (0-based, excluding header).
     *
     * @param filePath - Path to the CSV file
     * @param rowIndex - Zero-based row index (0 = first data row)
     * @returns Single row object or undefined if index is out of range
     */
    static readRow(filePath, rowIndex) {
        const rows = CsvReader.readAll(filePath);
        return rows[rowIndex];
    }
    /**
     * Read the first row that matches a predicate.
     *
     * @param filePath - Path to the CSV file
     * @param predicate - Function to match the desired row
     * @returns Matching row object or undefined
     */
    static findRow(filePath, predicate) {
        const rows = CsvReader.readAll(filePath);
        return rows.find(predicate);
    }
    /**
     * Parse CSV content string into typed objects.
     */
    static parse(content) {
        const lines = content
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line.length > 0);
        if (lines.length < 2) {
            return [];
        }
        const headers = CsvReader.parseLine(lines[0]);
        const rows = [];
        for (let i = 1; i < lines.length; i++) {
            const values = CsvReader.parseLine(lines[i]);
            const row = {};
            for (let j = 0; j < headers.length; j++) {
                row[headers[j]] = values[j] ?? '';
            }
            rows.push(row);
        }
        return rows;
    }
    /**
     * Parse a single CSV line, respecting quoted fields.
     */
    static parseLine(line) {
        const fields = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (inQuotes) {
                if (char === '"') {
                    if (i + 1 < line.length && line[i + 1] === '"') {
                        current += '"';
                        i++;
                    }
                    else {
                        inQuotes = false;
                    }
                }
                else {
                    current += char;
                }
            }
            else {
                if (char === '"') {
                    inQuotes = true;
                }
                else if (char === ',') {
                    fields.push(current.trim());
                    current = '';
                }
                else {
                    current += char;
                }
            }
        }
        fields.push(current.trim());
        return fields;
    }
}
exports.CsvReader = CsvReader;
//# sourceMappingURL=csv-reader.js.map