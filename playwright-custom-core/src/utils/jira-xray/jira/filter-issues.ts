/**
 * filter-issues.ts — Narrow a known set of issue keys by Jira field criteria.
 */

import { findIssues } from './search-issues';
import type { IssueFieldFilter, FilterIssueKeysOptions } from '../types';

/**
 * Return only those issue keys from `keys` that satisfy `filter`.
 *
 * The original key ordering is preserved in the result.
 *
 * @param keys    Candidate issue keys (e.g. `["ART-9", "ART-10", "ART-11"]`).
 * @param filter  Field-based criteria — all provided properties are AND-ed.
 * @param options Jira connection settings.
 * @returns       Subset of `keys` that match, in the same order.
 *
 * @example
 * // Keep only tests labelled "auto"
 * const autoKeys = await filterIssueKeys(allKeys, { labels: "auto" }, { jira });
 */
export async function filterIssueKeys(
  keys: string[],
  filter: IssueFieldFilter,
  options: FilterIssueKeysOptions = {},
): Promise<string[]> {
  if (keys.length === 0) {
    console.log('filterIssueKeys: received an empty key list — nothing to filter.');
    return [];
  }

  console.log(`Filtering ${keys.length} key(s) by field criteria...`);

  // Delegate to findIssues — it owns JQL building + pagination (DIP).
  // We pass issueKeys so buildJql emits the issueKey in (...) constraint.
  const { issues } = await findIssues(
    {
      issueKeys: keys,
      labels: filter.labels,
    },
    ['summary', 'labels', 'status', 'priority', 'duedate'],
    {
      ...options,
      // We can never get more matches than we put in.
      maxTotal: keys.length,
    },
  );

  // Use a Set for O(1) look-ups, then filter to preserve original order.
  const matchedSet = new Set(issues.map((i) => i.key));
  const filtered = keys.filter((k) => matchedSet.has(k));

  console.log(
    `  → ${filtered.length} of ${keys.length} key(s) matched:`,
    filtered.join(', ') || '(none)',
  );

  return filtered;
}
