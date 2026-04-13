/**
 * parsers.ts — Environment-variable → type parsers.
 *
 * Converts raw string env vars into the typed structures used by the
 * Jira / Xray utility library (IssueFieldFilter, JiraFieldName[]).
 *
 * Every function is pure and testable — it accepts values rather than
 * reading `process.env` directly (except `parseIssueFieldFilter`,
 * which takes an env-like record for convenience).
 */
import type { JiraFieldName, IssueFieldFilter } from './types';
/**
 * Split a comma-separated env string into a trimmed, non-empty array.
 *
 * @example
 * parseCommaSeparated("smoke, regression, ") // → ["smoke", "regression"]
 * parseCommaSeparated(undefined)             // → []
 */
export declare function parseCommaSeparated(value: string | undefined): string[];
/**
 * Parse a comma-separated env string into `JiraFieldName[]`.
 *
 * @example
 * parseJiraFieldNames("summary,status,labels") // → ["summary","status","labels"]
 * parseJiraFieldNames(undefined)                // → []
 */
export declare function parseJiraFieldNames(value: string | undefined): JiraFieldName[];
/**
 * Build an `IssueFieldFilter` from env-style key/value records.
 *
 * Reads keys with the given prefix (default `"TEST_EXEC_FILTER"`):
 *
 * | Env Variable              | Maps to         |
 * |---------------------------|-----------------|
 * | `{prefix}_LABELS`         | `filter.labels` |
 *
 * Only non-empty values are included.
 *
 * @param env     Key-value record (typically `process.env`).
 * @param prefix  Variable name prefix.  Default `"TEST_EXEC_FILTER"`.
 */
export declare function parseIssueFieldFilter(env: Record<string, string | undefined>, prefix?: string): IssueFieldFilter;
/**
 * Returns `true` when at least one field criterion is set.
 *
 * Useful to decide whether to call `getFilteredLinkedTestKeys` vs
 * the simpler `getLinkedTestKeys`.
 */
export declare function hasFilterCriteria(filter: IssueFieldFilter): boolean;
//# sourceMappingURL=parsers.d.ts.map