/**
 * get-issue.ts — Fetch a single Jira issue with only the fields you need.
 *
 * Uses `GET /rest/api/3/issue/{issueIdOrKey}?fields=f1,f2,...`
 */
import type { JiraFieldName, GetIssueOptions, JiraIssue } from '../types';
/**
 * Fetch a single Jira issue by key or ID, returning only the
 * requested fields.
 *
 * @param issueKeyOrId  e.g. `"ART-8"` or `"10042"`
 * @param fields        Field names to retrieve.  Omit or pass `[]`
 *                      for all fields (not recommended).
 * @param options       Jira connection + expand settings.
 */
export declare function getIssue(issueKeyOrId: string, fields?: JiraFieldName[], options?: GetIssueOptions): Promise<JiraIssue>;
/**
 * Fetch a single field value from an issue — convenience wrapper.
 */
export declare function getIssueField<T = any>(issueKeyOrId: string, field: JiraFieldName, options?: GetIssueOptions): Promise<T>;
/**
 * Fetch multiple fields from a single issue — convenience wrapper.
 */
export declare function getIssueFields(issueKeyOrId: string, fields: JiraFieldName[], options?: GetIssueOptions): Promise<Record<string, any>>;
//# sourceMappingURL=get-issue.d.ts.map