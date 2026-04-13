import axios from 'axios';
import { resolveJiraConfig, jiraRequestConfig } from '../../config/jira-config';
import type {
  GetLinkedTestKeysOptions,
  GetFilteredLinkedTestKeysOptions,
  IssueFieldFilter,
} from '../../types';
import { filterIssueKeys } from '../../jira';

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
export async function getLinkedTestKeys(
  issueKey: string,
  options: GetLinkedTestKeysOptions = {},
): Promise<string[]> {
  const cfg = resolveJiraConfig(options.jira);
  const url = `${cfg.baseUrl}/rest/api/3/issue/${issueKey}?fields=issuelinks`;
  console.log(`Fetching linked test keys from issue: ${issueKey}...`);

  try {
    const { data } = await axios.get(url, jiraRequestConfig(cfg));

    const issueLinks: any[] = data.fields?.issuelinks ?? [];

    const testKeys: string[] = issueLinks
      .map((link: any) => link.inwardIssue ?? link.outwardIssue)
      .filter((issue: any) => issue?.fields?.issuetype?.name === 'Xray Test')
      .map((issue: any) => issue.key)
      .filter(Boolean);

    console.log(
      `Found ${testKeys.length} test(s) in ${issueKey}: ${testKeys.join(', ')}`,
    );

    return testKeys;
  } catch (err: any) {
    console.error(
      `Failed to fetch tests from ${issueKey}:`,
      err.response?.data || err.message,
    );
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
export async function getFilteredLinkedTestKeys(
  issueKey: string,
  filter: IssueFieldFilter,
  options: GetFilteredLinkedTestKeysOptions = {},
): Promise<string[]> {
  const allKeys = await getLinkedTestKeys(issueKey, options);

  if (allKeys.length === 0) return [];

  return filterIssueKeys(allKeys, filter, options);
}
