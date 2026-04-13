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

// ── Public API ───────────────────────────────────────────────────

/**
 * Resolve Jira connection settings from an explicit config object,
 * falling back to environment variables when properties are omitted.
 *
 * @throws {Error} if any required value is missing.
 */
export function resolveJiraConfig(
  config?: JiraClientConfig,
): ResolvedJiraConfig {
  const baseUrl = (config?.baseUrl ?? process.env.JIRA_URL ?? '').replace(
    /\/+$/,
    '',
  );
  const email = config?.email ?? process.env.JIRA_EMAIL ?? '';
  const apiToken = config?.apiToken ?? process.env.JIRA_TOKEN ?? '';

  if (!baseUrl)
    throw new Error(
      'Jira base URL is required (config.baseUrl or JIRA_URL env var).',
    );
  if (!email || !apiToken)
    throw new Error('Jira email and API token are required.');

  return { baseUrl, auth: { username: email, password: apiToken } };
}

/**
 * Build a reusable Axios request config from a resolved Jira config.
 *
 * Includes auth, standard headers, and a default 60 s timeout.
 * Callers may spread-override individual properties.
 */
export function jiraRequestConfig(resolved: ResolvedJiraConfig) {
  return {
    auth: resolved.auth,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 60_000,
  };
}
