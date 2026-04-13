/**
 * Scan all `.spec.ts` files under the given test directory and build
 * a map of `testKey → relative file path`.
 *
 * Matches annotations like: `type: 'test_key', description: 'ART-12'`
 */
export declare function scanTestKeyToFileMap(testDir?: string): Promise<Map<string, string>>;
/**
 * Given an array of Jira test keys, return the spec file paths that
 * contain those keys.
 */
export declare function findSpecFiles(testKeys: string[], testDir?: string): Promise<string[]>;
//# sourceMappingURL=find-spec-files.d.ts.map