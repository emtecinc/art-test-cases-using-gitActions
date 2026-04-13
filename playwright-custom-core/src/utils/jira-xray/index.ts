/**
 * Jira / Xray utility module — public API.
 *
 * Re-exports all public symbols from the sub-modules. Import from
 * this entry point to avoid deep paths:
 *
 *   import { getIssue, XrayReporter, buildJql } from 'playwright-custom-core';
 */

// ── Shared configuration ──
export { resolveJiraConfig, jiraRequestConfig } from './config';

// ── Interfaces (Dependency Inversion) ──
export type {
  ResolvedJiraConfig,
  IJiraConfigResolver,
  IXrayAuthProvider,
} from './interfaces';

// ── Jira ──
export {
  // Read — single issue
  getIssue,
  getIssueField,
  getIssueFields,
  // Read — search / JQL
  searchIssues,
  findIssues,
  buildJql,
  // Read — filter a known set of keys by field criteria
  filterIssueKeys,
  // Read — descriptions
  getIssueDescriptions,
} from './jira';

// ── Xray ──
export {
  getXrayToken,
  XrayReporter,
  buildXrayPayload,
  getLinkedTestKeys,
  getFilteredLinkedTestKeys,
  findSpecFiles,
  scanTestKeyToFileMap,
  importExecution,
  importResults,
} from './xray';

// ── Env Parsers ──
export {
  parseCommaSeparated,
  parseJiraFieldNames,
  parseIssueFieldFilter,
  hasFilterCriteria,
} from './parsers';

// ── All types ──
export type {
  // Config
  JiraClientConfig,
  XrayAuthConfig,
  XrayClientConfig,
  // Base
  JiraOptions,
  // Xray options
  XrayReporterOptions,
  BuildPayloadOptions,
  ImportResultsOptions,
  GetLinkedTestKeysOptions,
  GetFilteredLinkedTestKeysOptions,
  IssueFieldFilter,
  FilterIssueKeysOptions,
  // Jira Read options
  GetDescriptionsOptions,
  JiraFieldName,
  GetIssueOptions,
  SearchIssuesOptions,
  JiraIssue,
  SearchResult,
  JqlFilter,
  // Test Data
  TestContext,
  TestResult,
} from './types';

// ── Service ──
export { 
  runTestsWithResultsUpload,
  fetchIssuesByLabel,
  fetchByKey,
  runSingleTest,
  handleTestExecInput
} from './jira-xray.service';