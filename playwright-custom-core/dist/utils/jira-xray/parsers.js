"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommaSeparated = parseCommaSeparated;
exports.parseJiraFieldNames = parseJiraFieldNames;
exports.parseIssueFieldFilter = parseIssueFieldFilter;
exports.hasFilterCriteria = hasFilterCriteria;
// ── Primitives ───────────────────────────────────────────────────
/**
 * Split a comma-separated env string into a trimmed, non-empty array.
 *
 * @example
 * parseCommaSeparated("smoke, regression, ") // → ["smoke", "regression"]
 * parseCommaSeparated(undefined)             // → []
 */
function parseCommaSeparated(value) {
    if (!value?.trim())
        return [];
    return value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
}
// ── JiraFieldName[] ──────────────────────────────────────────────
/**
 * Parse a comma-separated env string into `JiraFieldName[]`.
 *
 * @example
 * parseJiraFieldNames("summary,status,labels") // → ["summary","status","labels"]
 * parseJiraFieldNames(undefined)                // → []
 */
function parseJiraFieldNames(value) {
    return parseCommaSeparated(value);
}
// ── IssueFieldFilter ─────────────────────────────────────────────
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
function parseIssueFieldFilter(env, prefix = 'TEST_EXEC_FILTER') {
    const filter = {};
    const labels = parseCommaSeparated(env[`${prefix}_LABELS`]);
    if (labels.length > 0)
        filter.labels = labels;
    return filter;
}
// ── Helpers ──────────────────────────────────────────────────────
/**
 * Returns `true` when at least one field criterion is set.
 *
 * Useful to decide whether to call `getFilteredLinkedTestKeys` vs
 * the simpler `getLinkedTestKeys`.
 */
function hasFilterCriteria(filter) {
    return !!filter.labels;
}
//# sourceMappingURL=parsers.js.map