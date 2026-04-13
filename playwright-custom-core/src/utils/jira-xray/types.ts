/**
 * Central type definitions for the Jira / Xray utility library.
 *
 * All configuration, option, and data interfaces live here and are
 * re-exported by sub-module barrel files.
 */

// ═══════════════════════════════════════════════════════════════════
//  Client Configuration
// ═══════════════════════════════════════════════════════════════════

/** Jira REST API connection settings. */
export interface JiraClientConfig {
  /** Jira instance base URL (e.g. "https://your-org.atlassian.net"). Falls back to JIRA_URL env var. */
  baseUrl?: string;
  /** Jira user email. Falls back to JIRA_EMAIL env var. */
  email?: string;
  /** Jira API token. Falls back to JIRA_TOKEN env var. */
  apiToken?: string;
}

/** Xray Cloud authentication credentials. */
export interface XrayAuthConfig {
  /** Xray client ID. Falls back to XRAY_CLIENT_ID env var. */
  clientId?: string;
  /** Xray client secret. Falls back to XRAY_CLIENT_SECRET env var. */
  clientSecret?: string;
  /** Override the authentication endpoint URL. */
  authenticateUrl?: string;
}

/** Xray Cloud connection settings (auth + base URL). */
export interface XrayClientConfig {
  /** Authentication credentials for Xray Cloud. */
  auth?: XrayAuthConfig;
  /** Xray Cloud base URL. Falls back to XRAY_BASE_URL env var, then "https://xray.cloud.getxray.app". */
  baseUrl?: string;
}

// ═══════════════════════════════════════════════════════════════════
//  Base Options
// ═══════════════════════════════════════════════════════════════════

/** Base options shared by all Jira API calls. */
export interface JiraOptions {
  /** Jira connection settings. */
  jira?: JiraClientConfig;
}

// ═══════════════════════════════════════════════════════════════════
//  Xray — Reporter / Transformer / Importer
// ═══════════════════════════════════════════════════════════════════

/** Options for the Playwright Xray Reporter. */
export interface XrayReporterOptions {
  /** Directory for intermediate per-test JSON files. */
  tempDir?: string;
  /** Path for the combined results JSON file. */
  outputFile?: string;
}

/** Options for building an Xray import payload from Playwright results. */
export interface BuildPayloadOptions {
  /** Path to the input results JSON. Defaults to "jira-xray-dist/xray-results.json". */
  inputFile?: string;
  /** Path for the generated Xray payload JSON. Defaults to "jira-xray-dist/xray-payload.json". */
  outputFile?: string;
  /** Test Execution issue key. Falls back to EXECUTION_KEY env var. */
  testExecutionKey?: string;
  /** Jira project key (e.g. "DEMO"). Falls back to PROJECT_KEY env var. */
  projectKey?: string;
}

/** Options for importing (uploading) an Xray payload. */
export interface ImportResultsOptions {
  /** Xray Cloud connection settings (includes auth). */
  xray?: XrayClientConfig;
  /** Path to the payload JSON file. Defaults to "jira-xray-dist/xray-payload.json". */
  payloadFile?: string;
}

// ═══════════════════════════════════════════════════════════════════
//  Xray — Execution Helpers
// ═══════════════════════════════════════════════════════════════════

/** Options for fetching linked test keys from a Jira Test Execution. */
export interface GetLinkedTestKeysOptions extends JiraOptions {}

/**
 * Field-based filter applied to a known set of issue keys.
 *
 * All provided properties are AND-ed together in the resulting JQL.
 * Used by `filterIssueKeys()` and `getFilteredLinkedTestKeys()`.
 */
export interface IssueFieldFilter {
  /** Match issues that carry (all / any of) these labels. */
  labels?: string | string[];
}

/** Options for `filterIssueKeys()`. */
export interface FilterIssueKeysOptions extends JiraOptions {}

/** Options for `getFilteredLinkedTestKeys()`. */
export interface GetFilteredLinkedTestKeysOptions extends JiraOptions {
  /** Field-based filter applied after linked keys are resolved. */
  filter?: IssueFieldFilter;
}

// ═══════════════════════════════════════════════════════════════════
//  Jira — Issue Descriptions
// ═══════════════════════════════════════════════════════════════════

/** Options for fetching Jira issue descriptions. */
export interface GetDescriptionsOptions extends JiraOptions {}

// ═══════════════════════════════════════════════════════════════════
//  Jira — Issue Reading
// ═══════════════════════════════════════════════════════════════════

/**
 * Common Jira field names for the `fields` parameter.
 *
 * Any string is still accepted so custom fields like
 * `"customfield_10020"` work without type errors.
 */
export type JiraFieldName =
  | "summary"
  | "description"
  | "status"
  | "issuetype"
  | "priority"
  | "labels"
  | "issuelinks"
  | "subtasks"
  | "assignee"
  | "created"
  | "duedate"
  | "environment"
  | "project"
  | (string & {});

/** Options for `getIssue()`. */
export interface GetIssueOptions extends JiraOptions {
  /** Jira REST API expand parameter (e.g. `"renderedFields"`, `"changelog"`). */
  expand?: string;
}

/** Options for `searchIssues()`. */
export interface SearchIssuesOptions extends JiraOptions {
  /** Maximum total results across all pages. Defaults to 100. */
  maxTotal?: number;
  /** Page size per API call (max 100). Defaults to 100. */
  pageSize?: number;
  /** Jira REST API expand parameter. */
  expand?: string;
}

/** A single Jira issue. */
export interface JiraIssue {
  id: string;
  key: string;
  self: string;
  fields: Record<string, any>;
}

/** Result returned by `searchIssues()`. */
export interface SearchResult {
  issues: JiraIssue[];
  total: number;
}

/**
 * Declarative JQL filter — each property maps to a JQL clause.
 * All provided properties are AND-ed together.
 */
export interface JqlFilter {
  project?: string;
  /** Restrict results to this exact set of issue keys (e.g. `["ART-9","ART-10"]`). */
  issueKeys?: string[];
  issuetype?: string | string[];
  labels?: string | string[];
}

// ═══════════════════════════════════════════════════════════════════
//  Test Data (Reporter ↔ Transformer)
// ═══════════════════════════════════════════════════════════════════

/** Per-test context collected by the reporter during a Playwright run. */
export interface TestContext {
  testId: string;
  title: string;
  annotations: any[];
  status: string;
  steps: any[];
  logs: any[];
  errors: any[];
  attachments: {
    screenshots: string[];
    video?: string;
    trace?: string;
  };
  startTime?: number;
  duration?: number;
  finishTime?: number;
}

/** Normalised test result used by the transformer to build the Xray payload. */
export interface TestResult {
  testKey: string;
  title: string;
  status: string;
  logs: { message: string }[];
  errors: { message: string; stack?: string }[];
  attachments: {
    screenshots: string[];
    video?: string;
  };
  startTime?: number;
  finishTime?: number;
  duration?: number;
  steps?: any[];
}
