// ─── Test Data Utilities ─────────────────────────────────────────────────────
export { CsvReader } from './csv-reader';
export { TestDataGenerator } from './test-data-generator';
export { SFDataFactory } from './sf-data-factory';
export { PayloadBuilder } from './payload-builder';

// ─── Types & Interfaces ───────────────────────────────────────────────────────
export type {
  EmailQuery,
  EmailRecord,
  InboxEmail,
  MatchedEmailPair,
  RetryConfig,
  VerificationResult,
} from './interfaces/types';
export type { IEmailProvider } from './interfaces/email-provider.interface';
export type { IInboxProvider } from './interfaces/inbox-provider.interface';
export type { ISalesforceLoginService } from './interfaces/salesforce-login.interface';
export type { ISessionRefreshMiddleware } from './interfaces/session-refresh.interface';

// ─── SFDataFactory Types ──────────────────────────────────────────────────────
export type {
  CompositeSubrequest,
  CompositeSubresponse
} from './sf-data-factory';

// ─── Concrete Providers ───────────────────────────────────────────────────────
export { SalesforceEmailProvider } from './providers/salesforce-email-provider';
export { MailosaurInboxProvider } from './providers/mailosaur-inbox-provider';
export { OutlookInboxProvider } from './providers/outlook-inbox-provider';

// ─── Infrastructure ───────────────────────────────────────────────────────────
export { SalesforceConnection } from './salesforce-connection';
export { OutlookConnection } from './outlook-connection';
export { SalesforceLoginService } from './salesforce-login';
export { SalesforceSessionRefreshMiddleware } from './session-refresh-middleware';
export { SessionManager } from './session-manager';
export { ImpersonationHelper } from './impersonation-helper';

// ─── Services ─────────────────────────────────────────────────────────────────
export { EmailVerificationService } from './email-verification.service';

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
} from './jira-xray';

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
} from './jira-xray';

// ─── Batch Utilities ──────────────────────────────────────────────────────────
export {
  executeBatch,
  runBatch,
  triggerBatch,
  getBatchStatus,
  waitForBatchCompletion,
} from './batch';

export type {
  BatchJob,
  BatchConfig,
  BatchExecutionResult,
} from './batch';

