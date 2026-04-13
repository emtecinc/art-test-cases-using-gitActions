import type { ImportResultsOptions } from '../../types';
/**
 * Low-level: POST a payload to the Xray import endpoint using
 * an existing bearer token.
 *
 * Most callers should prefer `importResults()` which handles
 * authentication automatically.
 */
export declare function importExecution(token: string, apiUrl: string, payloadFile?: string): Promise<any>;
/**
 * Authenticate with Xray and import a test execution payload.
 *
 * @returns The Test Execution key, or `undefined` on failure.
 *
 * @example
 * ```ts
 * const execKey = await importResults({ xray: xrayConfig, payloadFile: "path/to/payload.json" });
 * ```
 */
export declare function importResults(options?: ImportResultsOptions): Promise<string | undefined>;
//# sourceMappingURL=import-results.d.ts.map