"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkedTestKeys = getLinkedTestKeys;
exports.getFilteredLinkedTestKeys = getFilteredLinkedTestKeys;
const axios_1 = __importDefault(require("axios"));
const jira_config_1 = require("../../config/jira-config");
const jira_1 = require("../../jira");
/**
 * Fetch the Xray Test issue keys linked to a Test Execution.
 *
 * Uses `GET /rest/api/3/issue/{key}?fields=issuelinks` to pull only
 * the link data, then filters for inward/outward issues of type
 * "Xray Test".
 *
 * @param issueKey      Issue key (e.g. "ART-8", "ART-25").
 * @param options       Jira connection settings.
 * @returns             Array of linked test keys (e.g. ["ART-9", "ART-10"]).
 */
async function getLinkedTestKeys(issueKey, options = {}) {
    const cfg = (0, jira_config_1.resolveJiraConfig)(options.jira);
    const url = `${cfg.baseUrl}/rest/api/3/issue/${issueKey}?fields=issuelinks`;
    console.log(`Fetching linked test keys from issue: ${issueKey}...`);
    try {
        const { data } = await axios_1.default.get(url, (0, jira_config_1.jiraRequestConfig)(cfg));
        const issueLinks = data.fields?.issuelinks ?? [];
        const testKeys = issueLinks
            .map((link) => link.inwardIssue ?? link.outwardIssue)
            .filter((issue) => issue?.fields?.issuetype?.name === 'Xray Test')
            .map((issue) => issue.key)
            .filter(Boolean);
        console.log(`Found ${testKeys.length} test(s) in ${issueKey}: ${testKeys.join(', ')}`);
        return testKeys;
    }
    catch (err) {
        console.error(`Failed to fetch tests from ${issueKey}:`, err.response?.data || err.message);
        throw err;
    }
}
/**
 * Fetch the Xray Test keys linked to an issue **and** narrow them
 * down to those that satisfy the supplied field filter.
 *
 * This is a convenience composition of `getLinkedTestKeys` (fetches
 * the linked keys) + `filterIssueKeys` (applies field criteria via a
 * single JQL query).  Both responsibilities stay in their own modules
 * — this function only orchestrates them.
 *
 * @param issueKey  Parent issue key (Test Set, Test Execution, etc.).
 * @param filter    Field-based criteria — labels, status, priority,
 *                  duedate, or raw JQL.  All properties are AND-ed.
 * @param options   Jira connection settings.
 * @returns         Filtered subset of linked test keys.
 *
 * @example
 * const keys = await getFilteredLinkedTestKeys(
 *   "ART-126",
 *   { labels: "auto" },
 *   { jira: JIRA },
 * );
 */
async function getFilteredLinkedTestKeys(issueKey, filter, options = {}) {
    const allKeys = await getLinkedTestKeys(issueKey, options);
    if (allKeys.length === 0)
        return [];
    return (0, jira_1.filterIssueKeys)(allKeys, filter, options);
}
//# sourceMappingURL=get-linked-test-keys.js.map