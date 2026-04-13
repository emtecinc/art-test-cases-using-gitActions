/**
 * search-issues.ts — Flexible JQL search with field selection.
 *
 * Uses `POST /rest/api/3/search/jql`.
 */

import axios from 'axios';
import { resolveJiraConfig, jiraRequestConfig } from '../config/jira-config';
import type {
  JiraFieldName,
  SearchIssuesOptions,
  JiraIssue,
  SearchResult,
  JqlFilter,
} from '../types';

// ── JQL Helpers (module-private) ─────────────────────────────────

/** Quote a value for JQL — wraps in double-quotes, escaping inner quotes. */
function q(value: string | number): string {
  if (typeof value === 'number') return String(value);
  return `"${value.replace(/"/g, '\\"')}"`;
}

/** Build an `x in (...)` clause from one or more values. */
function inClause(fieldName: string, values: string | string[]): string {
  const arr = Array.isArray(values) ? values : [values];
  if (arr.length === 1) return `${fieldName} = ${q(arr[0])}`;
  return `${fieldName} in (${arr.map(q).join(',')})`;
}

// ── JQL Builder ──────────────────────────────────────────────────

/**
 * Build a JQL string from a declarative filter object.
 *
 * All provided properties are AND-ed together.  Unset / undefined
 * properties are skipped.
 */
export function buildJql(filter: JqlFilter): string {
  const clauses: string[] = [];

  if (filter.project) clauses.push(`project = ${q(filter.project)}`);

  if (filter.issueKeys?.length) {
    clauses.push(
      filter.issueKeys.length === 1
        ? `issueKey = ${q(filter.issueKeys[0])}`
        : `issueKey in (${filter.issueKeys.map(q).join(',')})`,
    );
  }

  if (filter.issuetype) clauses.push(inClause('issuetype', filter.issuetype));
  if (filter.labels) clauses.push(inClause('labels', filter.labels));

  return clauses.join(' AND ');
}

// ── Search Issues ────────────────────────────────────────────────

/**
 * Execute a JQL query and return matching issues with only the
 * requested fields.  Auto-paginates up to `options.maxTotal`.
 */
export async function searchIssues(
  jql: string,
  fields?: JiraFieldName[],
  options: SearchIssuesOptions = {},
): Promise<SearchResult> {
  const cfg = resolveJiraConfig(options.jira);
  const url = `${cfg.baseUrl}/rest/api/3/search/jql`;

  const maxTotal = options.maxTotal ?? 100;
  const pageSize = Math.min(options.pageSize ?? 100, 100);

  const allIssues: JiraIssue[] = [];
  let nextPageToken: string | undefined;
  let total = 0;

  do {
    const body: Record<string, any> = {
      jql,
      maxResults: Math.min(pageSize, maxTotal - allIssues.length),
    };
    if (fields && fields.length > 0) body.fields = fields;
    if (options.expand) body.expand = options.expand;
    if (nextPageToken) body.nextPageToken = nextPageToken;

    const { data } = await axios.post(url, body, {
      ...jiraRequestConfig(cfg),
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
export async function findIssues(
  filter: JqlFilter,
  fields?: JiraFieldName[],
  options: SearchIssuesOptions = {},
): Promise<SearchResult> {
  const jql = buildJql(filter);
  console.log(`JQL: ${jql}`);
  return searchIssues(jql, fields, options);
}
