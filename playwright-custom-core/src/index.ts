/**
 * Playwright Node.js Framework
 *
 * Re-exports all public APIs from the framework modules.
 */

import { BasePage, BaseWorkflow } from "./framework";

// Framework
export { 
  BasePage,
  BaseWorkflow,
  ResilientLocator
} from './framework';

export type { 
  LocatorStrategy 
} from './framework';

// Fixtures - export the custom fixtures type but not test/expect
export type { 
  CustomFixtures 
} from './fixtures';

// Utils 
export { 
  // test data
  CsvReader,
  TestDataGenerator,
  SFDataFactory,
  

} from './utils';

// Utils — types & interfaces
export type {
  EmailQuery,
  EmailRecord,
  InboxEmail,
  MatchedEmailPair,
  RetryConfig,
  VerificationResult,
} from './utils';
export type { IEmailProvider } from './utils';
export type { IInboxProvider } from './utils';
export type { ISalesforceLoginService } from './utils';
export type { ISessionRefreshMiddleware } from './utils';

// Utils — concrete providers
export { SalesforceEmailProvider } from './utils';
export { MailosaurInboxProvider } from './utils';
export { OutlookInboxProvider } from './utils';

// Utils — infrastructure
export { SalesforceConnection } from './utils';
export { OutlookConnection } from './utils';
export { SalesforceLoginService } from './utils';
export { SalesforceSessionRefreshMiddleware } from './utils';
export { SessionManager } from './utils';
export { ImpersonationHelper } from './utils';

// Utils — services
export { EmailVerificationService } from './utils';

// ─── Batch Utilities ───────────────────────────────────────────────────────────
export {
  executeBatch,
  runBatch,
  triggerBatch,
  getBatchStatus,
  waitForBatchCompletion,
} from './utils';

export type {
  BatchJob,
  BatchConfig,
  BatchExecutionResult,
} from './utils';

// ─── Jira-Xray ─────────────────────────────────────────────────────────────────
export { 
// ── Shared configuration ──
  resolveJiraConfig,
  jiraRequestConfig,
 
// ── Jira ──
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

// ── Xray ──
  getXrayToken,
  XrayReporter,
  buildXrayPayload,
  getLinkedTestKeys,
  getFilteredLinkedTestKeys,
  findSpecFiles,
  scanTestKeyToFileMap,
  importExecution,
  importResults,

// ── Env Parsers ──
  parseCommaSeparated,
  parseJiraFieldNames,
  parseIssueFieldFilter,
  hasFilterCriteria,

// ── Service ──
  runTestsWithResultsUpload,
  fetchIssuesByLabel,
  fetchByKey,
  runSingleTest,
  handleTestExecInput
} from './utils';

export type {
// ── Interfaces ──
  ResolvedJiraConfig,
  IJiraConfigResolver,
  IXrayAuthProvider,

// ── All types ──
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
  TestResult
} from './utils';

