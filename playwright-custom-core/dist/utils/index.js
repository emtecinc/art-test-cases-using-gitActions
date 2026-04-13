"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForBatchCompletion = exports.getBatchStatus = exports.triggerBatch = exports.runBatch = exports.executeBatch = exports.handleTestExecInput = exports.runSingleTest = exports.fetchByKey = exports.fetchIssuesByLabel = exports.runTestsWithResultsUpload = exports.hasFilterCriteria = exports.parseIssueFieldFilter = exports.parseJiraFieldNames = exports.parseCommaSeparated = exports.importResults = exports.importExecution = exports.scanTestKeyToFileMap = exports.findSpecFiles = exports.getFilteredLinkedTestKeys = exports.getLinkedTestKeys = exports.buildXrayPayload = exports.XrayReporter = exports.getXrayToken = exports.getIssueDescriptions = exports.filterIssueKeys = exports.buildJql = exports.findIssues = exports.searchIssues = exports.getIssueFields = exports.getIssueField = exports.getIssue = exports.jiraRequestConfig = exports.resolveJiraConfig = exports.EmailVerificationService = exports.ImpersonationHelper = exports.SessionManager = exports.SalesforceSessionRefreshMiddleware = exports.SalesforceLoginService = exports.OutlookConnection = exports.SalesforceConnection = exports.OutlookInboxProvider = exports.MailosaurInboxProvider = exports.SalesforceEmailProvider = exports.PayloadBuilder = exports.SFDataFactory = exports.TestDataGenerator = exports.CsvReader = void 0;
// ─── Test Data Utilities ─────────────────────────────────────────────────────
var csv_reader_1 = require("./csv-reader");
Object.defineProperty(exports, "CsvReader", { enumerable: true, get: function () { return csv_reader_1.CsvReader; } });
var test_data_generator_1 = require("./test-data-generator");
Object.defineProperty(exports, "TestDataGenerator", { enumerable: true, get: function () { return test_data_generator_1.TestDataGenerator; } });
var sf_data_factory_1 = require("./sf-data-factory");
Object.defineProperty(exports, "SFDataFactory", { enumerable: true, get: function () { return sf_data_factory_1.SFDataFactory; } });
var payload_builder_1 = require("./payload-builder");
Object.defineProperty(exports, "PayloadBuilder", { enumerable: true, get: function () { return payload_builder_1.PayloadBuilder; } });
// ─── Concrete Providers ───────────────────────────────────────────────────────
var salesforce_email_provider_1 = require("./providers/salesforce-email-provider");
Object.defineProperty(exports, "SalesforceEmailProvider", { enumerable: true, get: function () { return salesforce_email_provider_1.SalesforceEmailProvider; } });
var mailosaur_inbox_provider_1 = require("./providers/mailosaur-inbox-provider");
Object.defineProperty(exports, "MailosaurInboxProvider", { enumerable: true, get: function () { return mailosaur_inbox_provider_1.MailosaurInboxProvider; } });
var outlook_inbox_provider_1 = require("./providers/outlook-inbox-provider");
Object.defineProperty(exports, "OutlookInboxProvider", { enumerable: true, get: function () { return outlook_inbox_provider_1.OutlookInboxProvider; } });
// ─── Infrastructure ───────────────────────────────────────────────────────────
var salesforce_connection_1 = require("./salesforce-connection");
Object.defineProperty(exports, "SalesforceConnection", { enumerable: true, get: function () { return salesforce_connection_1.SalesforceConnection; } });
var outlook_connection_1 = require("./outlook-connection");
Object.defineProperty(exports, "OutlookConnection", { enumerable: true, get: function () { return outlook_connection_1.OutlookConnection; } });
var salesforce_login_1 = require("./salesforce-login");
Object.defineProperty(exports, "SalesforceLoginService", { enumerable: true, get: function () { return salesforce_login_1.SalesforceLoginService; } });
var session_refresh_middleware_1 = require("./session-refresh-middleware");
Object.defineProperty(exports, "SalesforceSessionRefreshMiddleware", { enumerable: true, get: function () { return session_refresh_middleware_1.SalesforceSessionRefreshMiddleware; } });
var session_manager_1 = require("./session-manager");
Object.defineProperty(exports, "SessionManager", { enumerable: true, get: function () { return session_manager_1.SessionManager; } });
var impersonation_helper_1 = require("./impersonation-helper");
Object.defineProperty(exports, "ImpersonationHelper", { enumerable: true, get: function () { return impersonation_helper_1.ImpersonationHelper; } });
// ─── Services ─────────────────────────────────────────────────────────────────
var email_verification_service_1 = require("./email-verification.service");
Object.defineProperty(exports, "EmailVerificationService", { enumerable: true, get: function () { return email_verification_service_1.EmailVerificationService; } });
// ─── Jira-Xray ─────────────────────────────────────────────────────────────────
var jira_xray_1 = require("./jira-xray");
// ── Shared configuration ──
Object.defineProperty(exports, "resolveJiraConfig", { enumerable: true, get: function () { return jira_xray_1.resolveJiraConfig; } });
Object.defineProperty(exports, "jiraRequestConfig", { enumerable: true, get: function () { return jira_xray_1.jiraRequestConfig; } });
// ── Jira ──
// Read — single issue
Object.defineProperty(exports, "getIssue", { enumerable: true, get: function () { return jira_xray_1.getIssue; } });
Object.defineProperty(exports, "getIssueField", { enumerable: true, get: function () { return jira_xray_1.getIssueField; } });
Object.defineProperty(exports, "getIssueFields", { enumerable: true, get: function () { return jira_xray_1.getIssueFields; } });
// Read — search / JQL
Object.defineProperty(exports, "searchIssues", { enumerable: true, get: function () { return jira_xray_1.searchIssues; } });
Object.defineProperty(exports, "findIssues", { enumerable: true, get: function () { return jira_xray_1.findIssues; } });
Object.defineProperty(exports, "buildJql", { enumerable: true, get: function () { return jira_xray_1.buildJql; } });
// Read — filter a known set of keys by field criteria
Object.defineProperty(exports, "filterIssueKeys", { enumerable: true, get: function () { return jira_xray_1.filterIssueKeys; } });
// Read — descriptions
Object.defineProperty(exports, "getIssueDescriptions", { enumerable: true, get: function () { return jira_xray_1.getIssueDescriptions; } });
// ── Xray ──
Object.defineProperty(exports, "getXrayToken", { enumerable: true, get: function () { return jira_xray_1.getXrayToken; } });
Object.defineProperty(exports, "XrayReporter", { enumerable: true, get: function () { return jira_xray_1.XrayReporter; } });
Object.defineProperty(exports, "buildXrayPayload", { enumerable: true, get: function () { return jira_xray_1.buildXrayPayload; } });
Object.defineProperty(exports, "getLinkedTestKeys", { enumerable: true, get: function () { return jira_xray_1.getLinkedTestKeys; } });
Object.defineProperty(exports, "getFilteredLinkedTestKeys", { enumerable: true, get: function () { return jira_xray_1.getFilteredLinkedTestKeys; } });
Object.defineProperty(exports, "findSpecFiles", { enumerable: true, get: function () { return jira_xray_1.findSpecFiles; } });
Object.defineProperty(exports, "scanTestKeyToFileMap", { enumerable: true, get: function () { return jira_xray_1.scanTestKeyToFileMap; } });
Object.defineProperty(exports, "importExecution", { enumerable: true, get: function () { return jira_xray_1.importExecution; } });
Object.defineProperty(exports, "importResults", { enumerable: true, get: function () { return jira_xray_1.importResults; } });
// ── Env Parsers ──
Object.defineProperty(exports, "parseCommaSeparated", { enumerable: true, get: function () { return jira_xray_1.parseCommaSeparated; } });
Object.defineProperty(exports, "parseJiraFieldNames", { enumerable: true, get: function () { return jira_xray_1.parseJiraFieldNames; } });
Object.defineProperty(exports, "parseIssueFieldFilter", { enumerable: true, get: function () { return jira_xray_1.parseIssueFieldFilter; } });
Object.defineProperty(exports, "hasFilterCriteria", { enumerable: true, get: function () { return jira_xray_1.hasFilterCriteria; } });
// ── Service ──
Object.defineProperty(exports, "runTestsWithResultsUpload", { enumerable: true, get: function () { return jira_xray_1.runTestsWithResultsUpload; } });
Object.defineProperty(exports, "fetchIssuesByLabel", { enumerable: true, get: function () { return jira_xray_1.fetchIssuesByLabel; } });
Object.defineProperty(exports, "fetchByKey", { enumerable: true, get: function () { return jira_xray_1.fetchByKey; } });
Object.defineProperty(exports, "runSingleTest", { enumerable: true, get: function () { return jira_xray_1.runSingleTest; } });
Object.defineProperty(exports, "handleTestExecInput", { enumerable: true, get: function () { return jira_xray_1.handleTestExecInput; } });
// ─── Batch Utilities ──────────────────────────────────────────────────────────
var batch_1 = require("./batch");
Object.defineProperty(exports, "executeBatch", { enumerable: true, get: function () { return batch_1.executeBatch; } });
Object.defineProperty(exports, "runBatch", { enumerable: true, get: function () { return batch_1.runBatch; } });
Object.defineProperty(exports, "triggerBatch", { enumerable: true, get: function () { return batch_1.triggerBatch; } });
Object.defineProperty(exports, "getBatchStatus", { enumerable: true, get: function () { return batch_1.getBatchStatus; } });
Object.defineProperty(exports, "waitForBatchCompletion", { enumerable: true, get: function () { return batch_1.waitForBatchCompletion; } });
//# sourceMappingURL=index.js.map