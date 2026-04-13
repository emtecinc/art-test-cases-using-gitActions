/**
 * Shared Jira configuration resolver.
 *
 * Centralises environment-variable fallback logic so that each module
 * does not duplicate it (DRY / Open-Closed).
 *
 * The exported functions conform to the `IJiraConfigResolver` interface
 * (Dependency Inversion Principle) while remaining usable as standalone
 * functions for simplicity.
 */
import type { JiraClientConfig } from '../types';
import type { ResolvedJiraConfig } from '../interfaces';
/**
 * Resolve Jira connection settings from an explicit config object,
 * falling back to environment variables when properties are omitted.
 *
 * @throws {Error} if any required value is missing.
 */
export declare function resolveJiraConfig(config?: JiraClientConfig): ResolvedJiraConfig;
/**
 * Build a reusable Axios request config from a resolved Jira config.
 *
 * Includes auth, standard headers, and a default 60 s timeout.
 * Callers may spread-override individual properties.
 */
export declare function jiraRequestConfig(resolved: ResolvedJiraConfig): {
    auth: {
        username: string;
        password: string;
    };
    headers: {
        Accept: string;
        'Content-Type': string;
    };
    timeout: number;
};
//# sourceMappingURL=jira-config.d.ts.map