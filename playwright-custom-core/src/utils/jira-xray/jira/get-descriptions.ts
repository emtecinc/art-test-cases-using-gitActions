/**
 * get-descriptions.ts — Batch-fetch plain-text descriptions for Jira issues.
 *
 * Uses `POST /rest/api/3/search/jql` with `fields=["description"]` to
 * retrieve descriptions in a single call instead of N individual GETs.
 */

import axios from 'axios';
import { resolveJiraConfig, jiraRequestConfig } from '../config/jira-config';
import type { GetDescriptionsOptions } from '../types';

type IssueKey = string;

interface DescriptionMap {
  [issueKey: IssueKey]: string | null;
}

/**
 * Extract plain text from a Jira ADF (Atlassian Document Format) node.
 */
function extractTextFromAdf(adf: any): string | null {
  if (!adf || !adf.content) return null;

  const parts: string[] = [];

  function walk(nodes: any[]): void {
    for (const node of nodes) {
      if (node.type === 'text' && node.text) parts.push(node.text);
      if (Array.isArray(node.content)) walk(node.content);
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
export async function getIssueDescriptions(
  issueKeys: IssueKey | IssueKey[],
  options: GetDescriptionsOptions = {},
): Promise<DescriptionMap> {
  const cfg = resolveJiraConfig(options.jira);
  const keys = Array.isArray(issueKeys) ? issueKeys : [issueKeys];
  const result: DescriptionMap = {};

  // Pre-fill all keys with null
  for (const key of keys) result[key] = null;
  if (keys.length === 0) return result;

  const batchSize = 100;

  for (let i = 0; i < keys.length; i += batchSize) {
    const batch = keys.slice(i, i + batchSize);
    const jql = `key in (${batch.join(',')})`;

    try {
      const res = await axios.post(
        `${cfg.baseUrl}/rest/api/3/search/jql`,
        { jql, fields: ['description'], maxResults: batchSize },
        jiraRequestConfig(cfg),
      );

      for (const issue of res.data.issues ?? []) {
        try {
          result[issue.key] = extractTextFromAdf(issue.fields?.description);
        } catch {
          /* keep null */
        }
      }
    } catch (err: any) {
      console.warn(
        `Failed to fetch descriptions for batch starting at index ${i}: ${err.message}`,
      );
    }
  }

  return result;
}
