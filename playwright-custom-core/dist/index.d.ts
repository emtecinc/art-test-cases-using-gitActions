/**
 * Playwright Node.js Framework
 *
 * Re-exports all public APIs from the framework modules.
 */
export { BasePage, BaseWorkflow, ResilientLocator } from './framework';
export type { LocatorStrategy } from './framework';
export type { CustomFixtures } from './fixtures';
export { CsvReader, TestDataGenerator, SFDataFactory, } from './utils';
export type { EmailQuery, EmailRecord, InboxEmail, MatchedEmailPair, RetryConfig, VerificationResult, } from './utils';
export type { IEmailProvider } from './utils';
export type { IInboxProvider } from './utils';
export type { ISalesforceLoginService } from './utils';
export type { ISessionRefreshMiddleware } from './utils';
export { SalesforceEmailProvider } from './utils';
export { MailosaurInboxProvider } from './utils';
export { OutlookInboxProvider } from './utils';
export { SalesforceConnection } from './utils';
export { OutlookConnection } from './utils';
export { SalesforceLoginService } from './utils';
export { SalesforceSessionRefreshMiddleware } from './utils';
export { SessionManager } from './utils';
export { ImpersonationHelper } from './utils';
export { EmailVerificationService } from './utils';
export { executeBatch, runBatch, triggerBatch, getBatchStatus, waitForBatchCompletion, } from './utils';
export type { BatchJob, BatchConfig, BatchExecutionResult, } from './utils';
export { resolveJiraConfig, jiraRequestConfig, getIssue, getIssueField, getIssueFields, searchIssues, findIssues, buildJql, filterIssueKeys, getIssueDescriptions, getXrayToken, XrayReporter, buildXrayPayload, getLinkedTestKeys, getFilteredLinkedTestKeys, findSpecFiles, scanTestKeyToFileMap, importExecution, importResults, parseCommaSeparated, parseJiraFieldNames, parseIssueFieldFilter, hasFilterCriteria, runTestsWithResultsUpload, fetchIssuesByLabel, fetchByKey, runSingleTest, handleTestExecInput } from './utils';
export type { ResolvedJiraConfig, IJiraConfigResolver, IXrayAuthProvider, JiraClientConfig, XrayAuthConfig, XrayClientConfig, JiraOptions, XrayReporterOptions, BuildPayloadOptions, ImportResultsOptions, GetLinkedTestKeysOptions, GetFilteredLinkedTestKeysOptions, IssueFieldFilter, FilterIssueKeysOptions, GetDescriptionsOptions, JiraFieldName, GetIssueOptions, SearchIssuesOptions, JiraIssue, SearchResult, JqlFilter, TestContext, TestResult } from './utils';
//# sourceMappingURL=index.d.ts.map