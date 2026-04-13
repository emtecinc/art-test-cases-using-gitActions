/**
 * search-issues.ts — Flexible JQL search with field selection.
 *
 * Uses `POST /rest/api/3/search/jql`.
 */
import type { JiraFieldName, SearchIssuesOptions, SearchResult, JqlFilter } from '../types';
/**
 * Build a JQL string from a declarative filter object.
 *
 * All provided properties are AND-ed together.  Unset / undefined
 * properties are skipped.
 */
export declare function buildJql(filter: JqlFilter): string;
/**
 * Execute a JQL query and return matching issues with only the
 * requested fields.  Auto-paginates up to `options.maxTotal`.
 */
export declare function searchIssues(jql: string, fields?: JiraFieldName[], options?: SearchIssuesOptions): Promise<SearchResult>;
/**
 * Build a JQL query from a declarative filter and search for
 * matching issues.  Combines `buildJql()` + `searchIssues()`.
 */
export declare function findIssues(filter: JqlFilter, fields?: JiraFieldName[], options?: SearchIssuesOptions): Promise<SearchResult>;
//# sourceMappingURL=search-issues.d.ts.map