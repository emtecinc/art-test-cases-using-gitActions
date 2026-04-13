/**
 * get-descriptions.ts — Batch-fetch plain-text descriptions for Jira issues.
 *
 * Uses `POST /rest/api/3/search/jql` with `fields=["description"]` to
 * retrieve descriptions in a single call instead of N individual GETs.
 */
import type { GetDescriptionsOptions } from '../types';
type IssueKey = string;
interface DescriptionMap {
    [issueKey: IssueKey]: string | null;
}
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
export declare function getIssueDescriptions(issueKeys: IssueKey | IssueKey[], options?: GetDescriptionsOptions): Promise<DescriptionMap>;
export {};
//# sourceMappingURL=get-descriptions.d.ts.map