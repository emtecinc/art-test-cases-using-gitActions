"use strict";
/**
 * search-issues.ts — Flexible JQL search with field selection.
 *
 * Uses `POST /rest/api/3/search/jql`.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildJql = buildJql;
exports.searchIssues = searchIssues;
exports.findIssues = findIssues;
const axios_1 = __importDefault(require("axios"));
const jira_config_1 = require("../config/jira-config");
// ── JQL Helpers (module-private) ─────────────────────────────────
/** Quote a value for JQL — wraps in double-quotes, escaping inner quotes. */
function q(value) {
    if (typeof value === 'number')
        return String(value);
    return `"${value.replace(/"/g, '\\"')}"`;
}
/** Build an `x in (...)` clause from one or more values. */
function inClause(fieldName, values) {
    const arr = Array.isArray(values) ? values : [values];
    if (arr.length === 1)
        return `${fieldName} = ${q(arr[0])}`;
    return `${fieldName} in (${arr.map(q).join(',')})`;
}
// ── JQL Builder ──────────────────────────────────────────────────
/**
 * Build a JQL string from a declarative filter object.
 *
 * All provided properties are AND-ed together.  Unset / undefined
 * properties are skipped.
 */
function buildJql(filter) {
    const clauses = [];
    if (filter.project)
        clauses.push(`project = ${q(filter.project)}`);
    if (filter.issueKeys?.length) {
        clauses.push(filter.issueKeys.length === 1
            ? `issueKey = ${q(filter.issueKeys[0])}`
            : `issueKey in (${filter.issueKeys.map(q).join(',')})`);
    }
    if (filter.issuetype)
        clauses.push(inClause('issuetype', filter.issuetype));
    if (filter.labels)
        clauses.push(inClause('labels', filter.labels));
    return clauses.join(' AND ');
}
// ── Search Issues ────────────────────────────────────────────────
/**
 * Execute a JQL query and return matching issues with only the
 * requested fields.  Auto-paginates up to `options.maxTotal`.
 */
async function searchIssues(jql, fields, options = {}) {
    const cfg = (0, jira_config_1.resolveJiraConfig)(options.jira);
    const url = `${cfg.baseUrl}/rest/api/3/search/jql`;
    const maxTotal = options.maxTotal ?? 100;
    const pageSize = Math.min(options.pageSize ?? 100, 100);
    const allIssues = [];
    let nextPageToken;
    let total = 0;
    do {
        const body = {
            jql,
            maxResults: Math.min(pageSize, maxTotal - allIssues.length),
        };
        if (fields && fields.length > 0)
            body.fields = fields;
        if (options.expand)
            body.expand = options.expand;
        if (nextPageToken)
            body.nextPageToken = nextPageToken;
        const { data } = await axios_1.default.post(url, body, {
            ...(0, jira_config_1.jiraRequestConfig)(cfg),
            timeout: 120_000,
        });
        total = data.total ?? 0;
        for (const raw of data.issues ?? []) {
            allIssues.push({
                id: raw.id,
                key: raw.key,
                self: raw.self,
                fields: raw.fields ?? {},
            });
        }
        nextPageToken = data.nextPageToken ?? undefined;
    } while (nextPageToken && allIssues.length < maxTotal);
    return { issues: allIssues, total: total || allIssues.length };
}
// ── Convenience: filter → search in one call ─────────────────────
/**
 * Build a JQL query from a declarative filter and search for
 * matching issues.  Combines `buildJql()` + `searchIssues()`.
 */
async function findIssues(filter, fields, options = {}) {
    const jql = buildJql(filter);
    console.log(`JQL: ${jql}`);
    return searchIssues(jql, fields, options);
}
//# sourceMappingURL=search-issues.js.map