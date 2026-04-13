"use strict";
/**
 * get-issue.ts — Fetch a single Jira issue with only the fields you need.
 *
 * Uses `GET /rest/api/3/issue/{issueIdOrKey}?fields=f1,f2,...`
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIssue = getIssue;
exports.getIssueField = getIssueField;
exports.getIssueFields = getIssueFields;
const axios_1 = __importDefault(require("axios"));
const jira_config_1 = require("../config/jira-config");
// ── Public API ───────────────────────────────────────────────────
/**
 * Fetch a single Jira issue by key or ID, returning only the
 * requested fields.
 *
 * @param issueKeyOrId  e.g. `"ART-8"` or `"10042"`
 * @param fields        Field names to retrieve.  Omit or pass `[]`
 *                      for all fields (not recommended).
 * @param options       Jira connection + expand settings.
 */
async function getIssue(issueKeyOrId, fields, options = {}) {
    const cfg = (0, jira_config_1.resolveJiraConfig)(options.jira);
    const params = {};
    if (fields && fields.length > 0)
        params.fields = fields.join(',');
    if (options.expand)
        params.expand = options.expand;
    const url = `${cfg.baseUrl}/rest/api/3/issue/${encodeURIComponent(issueKeyOrId)}`;
    const { data } = await axios_1.default.get(url, {
        ...(0, jira_config_1.jiraRequestConfig)(cfg),
        params,
    });
    return {
        id: data.id,
        key: data.key,
        self: data.self,
        fields: data.fields ?? {},
    };
}
/**
 * Fetch a single field value from an issue — convenience wrapper.
 */
async function getIssueField(issueKeyOrId, field, options = {}) {
    const issue = await getIssue(issueKeyOrId, [field], options);
    return issue.fields[field];
}
/**
 * Fetch multiple fields from a single issue — convenience wrapper.
 */
async function getIssueFields(issueKeyOrId, fields, options = {}) {
    const issue = await getIssue(issueKeyOrId, fields, options);
    return issue.fields;
}
//# sourceMappingURL=get-issue.js.map