"use strict";
/**
 * get-descriptions.ts — Batch-fetch plain-text descriptions for Jira issues.
 *
 * Uses `POST /rest/api/3/search/jql` with `fields=["description"]` to
 * retrieve descriptions in a single call instead of N individual GETs.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIssueDescriptions = getIssueDescriptions;
const axios_1 = __importDefault(require("axios"));
const jira_config_1 = require("../config/jira-config");
/**
 * Extract plain text from a Jira ADF (Atlassian Document Format) node.
 */
function extractTextFromAdf(adf) {
    if (!adf || !adf.content)
        return null;
    const parts = [];
    function walk(nodes) {
        for (const node of nodes) {
            if (node.type === 'text' && node.text)
                parts.push(node.text);
            if (Array.isArray(node.content))
                walk(node.content);
        }
    }
    walk(adf.content);
    return parts.length > 0 ? parts.join('\n') : null;
}
// ── Public API ───────────────────────────────────────────────────
/**
 * Fetch plain-text descriptions for one or more Jira issue keys.
 *
 * Returns a map of `{ issueKey: plainTextDescription | null }`.
 * Keys with no description or that failed to fetch are `null`.
 *
 * @example
 * ```ts
 * const descs = await getIssueDescriptions(["ART-9", "ART-10"], { jira: config });
 * console.log(descs["ART-9"]); // "Login test description..."
 * ```
 */
async function getIssueDescriptions(issueKeys, options = {}) {
    const cfg = (0, jira_config_1.resolveJiraConfig)(options.jira);
    const keys = Array.isArray(issueKeys) ? issueKeys : [issueKeys];
    const result = {};
    // Pre-fill all keys with null
    for (const key of keys)
        result[key] = null;
    if (keys.length === 0)
        return result;
    const batchSize = 100;
    for (let i = 0; i < keys.length; i += batchSize) {
        const batch = keys.slice(i, i + batchSize);
        const jql = `key in (${batch.join(',')})`;
        try {
            const res = await axios_1.default.post(`${cfg.baseUrl}/rest/api/3/search/jql`, { jql, fields: ['description'], maxResults: batchSize }, (0, jira_config_1.jiraRequestConfig)(cfg));
            for (const issue of res.data.issues ?? []) {
                try {
                    result[issue.key] = extractTextFromAdf(issue.fields?.description);
                }
                catch {
                    /* keep null */
                }
            }
        }
        catch (err) {
            console.warn(`Failed to fetch descriptions for batch starting at index ${i}: ${err.message}`);
        }
    }
    return result;
}
//# sourceMappingURL=get-descriptions.js.map