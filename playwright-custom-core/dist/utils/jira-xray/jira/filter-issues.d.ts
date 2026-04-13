/**
 * filter-issues.ts — Narrow a known set of issue keys by Jira field criteria.
 */
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
export declare function filterIssueKeys(keys: string[], filter: IssueFieldFilter, options?: FilterIssueKeysOptions): Promise<string[]>;
//# sourceMappingURL=filter-issues.d.ts.map