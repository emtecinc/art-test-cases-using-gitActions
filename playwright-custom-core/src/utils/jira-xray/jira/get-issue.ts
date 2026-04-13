/**
 * get-issue.ts — Fetch a single Jira issue with only the fields you need.
 *
 * Uses `GET /rest/api/3/issue/{issueIdOrKey}?fields=f1,f2,...`
 */

import axios from 'axios';
import { resolveJiraConfig, jiraRequestConfig } from '../config/jira-config';
import type { JiraFieldName, GetIssueOptions, JiraIssue } from '../types';

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
export async function getIssue(
  issueKeyOrId: string,
  fields?: JiraFieldName[],
  options: GetIssueOptions = {},
): Promise<JiraIssue> {
  const cfg = resolveJiraConfig(options.jira);

  const params: Record<string, string> = {};
  if (fields && fields.length > 0) params.fields = fields.join(',');
  if (options.expand) params.expand = options.expand;

  const url = `${cfg.baseUrl}/rest/api/3/issue/${encodeURIComponent(issueKeyOrId)}`;

  const { data } = await axios.get(url, {
    ...jiraRequestConfig(cfg),
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
export async function getIssueField<T = any>(
  issueKeyOrId: string,
  field: JiraFieldName,
  options: GetIssueOptions = {},
): Promise<T> {
  const issue = await getIssue(issueKeyOrId, [field], options);
  return issue.fields[field] as T;
}

/**
 * Fetch multiple fields from a single issue — convenience wrapper.
 */
export async function getIssueFields(
  issueKeyOrId: string,
  fields: JiraFieldName[],
  options: GetIssueOptions = {},
): Promise<Record<string, any>> {
  const issue = await getIssue(issueKeyOrId, fields, options);
  return issue.fields;
}
