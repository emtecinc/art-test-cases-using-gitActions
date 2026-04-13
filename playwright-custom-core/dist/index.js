"use strict";
/**
 * Playwright Node.js Framework
 *
 * Re-exports all public APIs from the framework modules.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTestExecInput = exports.runSingleTest = exports.fetchByKey = exports.fetchIssuesByLabel = exports.runTestsWithResultsUpload = exports.hasFilterCriteria = exports.parseIssueFieldFilter = exports.parseJiraFieldNames = exports.parseCommaSeparated = exports.importResults = exports.importExecution = exports.scanTestKeyToFileMap = exports.findSpecFiles = exports.getFilteredLinkedTestKeys = exports.getLinkedTestKeys = exports.buildXrayPayload = exports.XrayReporter = exports.getXrayToken = exports.getIssueDescriptions = exports.filterIssueKeys = exports.buildJql = exports.findIssues = exports.searchIssues = exports.getIssueFields = exports.getIssueField = exports.getIssue = exports.jiraRequestConfig = exports.resolveJiraConfig = exports.waitForBatchCompletion = exports.getBatchStatus = exports.triggerBatch = exports.runBatch = exports.executeBatch = exports.EmailVerificationService = exports.ImpersonationHelper = exports.SessionManager = exports.SalesforceSessionRefreshMiddleware = exports.SalesforceLoginService = exports.OutlookConnection = exports.SalesforceConnection = exports.OutlookInboxProvider = exports.MailosaurInboxProvider = exports.SalesforceEmailProvider = exports.SFDataFactory = exports.TestDataGenerator = exports.CsvReader = exports.ResilientLocator = exports.BaseWorkflow = exports.BasePage = void 0;
// Framework
var framework_1 = require("./framework");
Object.defineProperty(exports, "BasePage", { enumerable: true, get: function () { return framework_1.BasePage; } });
Object.defineProperty(exports, "BaseWorkflow", { enumerable: true, get: function () { return framework_1.BaseWorkflow; } });
Object.defineProperty(exports, "ResilientLocator", { enumerable: true, get: function () { return framework_1.ResilientLocator; } });
// Utils 
var utils_1 = require("./utils");
// test data
Object.defineProperty(exports, "CsvReader", { enumerable: true, get: function () { return utils_1.CsvReader; } });
Object.defineProperty(exports, "TestDataGenerator", { enumerable: true, get: function () { return utils_1.TestDataGenerator; } });
Object.defineProperty(exports, "SFDataFactory", { enumerable: true, get: function () { return utils_1.SFDataFactory; } });
// Utils — concrete providers
var utils_2 = require("./utils");
Object.defineProperty(exports, "SalesforceEmailProvider", { enumerable: true, get: function () { return utils_2.SalesforceEmailProvider; } });
var utils_3 = require("./utils");
Object.defineProperty(exports, "MailosaurInboxProvider", { enumerable: true, get: function () { return utils_3.MailosaurInboxProvider; } });
var utils_4 = require("./utils");
Object.defineProperty(exports, "OutlookInboxProvider", { enumerable: true, get: function () { return utils_4.OutlookInboxProvider; } });
// Utils — infrastructure
var utils_5 = require("./utils");
Object.defineProperty(exports, "SalesforceConnection", { enumerable: true, get: function () { return utils_5.SalesforceConnection; } });
var utils_6 = require("./utils");
Object.defineProperty(exports, "OutlookConnection", { enumerable: true, get: function () { return utils_6.OutlookConnection; } });
var utils_7 = require("./utils");
Object.defineProperty(exports, "SalesforceLoginService", { enumerable: true, get: function () { return utils_7.SalesforceLoginService; } });
var utils_8 = require("./utils");
Object.defineProperty(exports, "SalesforceSessionRefreshMiddleware", { enumerable: true, get: function () { return utils_8.SalesforceSessionRefreshMiddleware; } });
var utils_9 = require("./utils");
Object.defineProperty(exports, "SessionManager", { enumerable: true, get: function () { return utils_9.SessionManager; } });
var utils_10 = require("./utils");
Object.defineProperty(exports, "ImpersonationHelper", { enumerable: true, get: function () { return utils_10.ImpersonationHelper; } });
// Utils — services
var utils_11 = require("./utils");
Object.defineProperty(exports, "EmailVerificationService", { enumerable: true, get: function () { return utils_11.EmailVerificationService; } });
// ─── Batch Utilities ───────────────────────────────────────────────────────────
var utils_12 = require("./utils");
Object.defineProperty(exports, "executeBatch", { enumerable: true, get: function () { return utils_12.executeBatch; } });
Object.defineProperty(exports, "runBatch", { enumerable: true, get: function () { return utils_12.runBatch; } });
Object.defineProperty(exports, "triggerBatch", { enumerable: true, get: function () { return utils_12.triggerBatch; } });
Object.defineProperty(exports, "getBatchStatus", { enumerable: true, get: function () { return utils_12.getBatchStatus; } });
Object.defineProperty(exports, "waitForBatchCompletion", { enumerable: true, get: function () { return utils_12.waitForBatchCompletion; } });
// ─── Jira-Xray ─────────────────────────────────────────────────────────────────
var utils_13 = require("./utils");
// ── Shared configuration ──
Object.defineProperty(exports, "resolveJiraConfig", { enumerable: true, get: function () { return utils_13.resolveJiraConfig; } });
Object.defineProperty(exports, "jiraRequestConfig", { enumerable: true, get: function () { return utils_13.jiraRequestConfig; } });
// ── Jira ──
// Read — single issue
Object.defineProperty(exports, "getIssue", { enumerable: true, get: function () { return utils_13.getIssue; } });
Object.defineProperty(exports, "getIssueField", { enumerable: true, get: function () { return utils_13.getIssueField; } });
Object.defineProperty(exports, "getIssueFields", { enumerable: true, get: function () { return utils_13.getIssueFields; } });
// Read — search / JQL
Object.defineProperty(exports, "searchIssues", { enumerable: true, get: function () { return utils_13.searchIssues; } });
Object.defineProperty(exports, "findIssues", { enumerable: true, get: function () { return utils_13.findIssues; } });
Object.defineProperty(exports, "buildJql", { enumerable: true, get: function () { return utils_13.buildJql; } });
// Read — filter a known set of keys by field criteria
Object.defineProperty(exports, "filterIssueKeys", { enumerable: true, get: function () { return utils_13.filterIssueKeys; } });
// Read — descriptions
Object.defineProperty(exports, "getIssueDescriptions", { enumerable: true, get: function () { return utils_13.getIssueDescriptions; } });
// ── Xray ──
Object.defineProperty(exports, "getXrayToken", { enumerable: true, get: function () { return utils_13.getXrayToken; } });
Object.defineProperty(exports, "XrayReporter", { enumerable: true, get: function () { return utils_13.XrayReporter; } });
Object.defineProperty(exports, "buildXrayPayload", { enumerable: true, get: function () { return utils_13.buildXrayPayload; } });
Object.defineProperty(exports, "getLinkedTestKeys", { enumerable: true, get: function () { return utils_13.getLinkedTestKeys; } });
Object.defineProperty(exports, "getFilteredLinkedTestKeys", { enumerable: true, get: function () { return utils_13.getFilteredLinkedTestKeys; } });
Object.defineProperty(exports, "findSpecFiles", { enumerable: true, get: function () { return utils_13.findSpecFiles; } });
Object.defineProperty(exports, "scanTestKeyToFileMap", { enumerable: true, get: function () { return utils_13.scanTestKeyToFileMap; } });
Object.defineProperty(exports, "importExecution", { enumerable: true, get: function () { return utils_13.importExecution; } });
Object.defineProperty(exports, "importResults", { enumerable: true, get: function () { return utils_13.importResults; } });
// ── Env Parsers ──
Object.defineProperty(exports, "parseCommaSeparated", { enumerable: true, get: function () { return utils_13.parseCommaSeparated; } });
Object.defineProperty(exports, "parseJiraFieldNames", { enumerable: true, get: function () { return utils_13.parseJiraFieldNames; } });
Object.defineProperty(exports, "parseIssueFieldFilter", { enumerable: true, get: function () { return utils_13.parseIssueFieldFilter; } });
Object.defineProperty(exports, "hasFilterCriteria", { enumerable: true, get: function () { return utils_13.hasFilterCriteria; } });
// ── Service ──
Object.defineProperty(exports, "runTestsWithResultsUpload", { enumerable: true, get: function () { return utils_13.runTestsWithResultsUpload; } });
Object.defineProperty(exports, "fetchIssuesByLabel", { enumerable: true, get: function () { return utils_13.fetchIssuesByLabel; } });
Object.defineProperty(exports, "fetchByKey", { enumerable: true, get: function () { return utils_13.fetchByKey; } });
Object.defineProperty(exports, "runSingleTest", { enumerable: true, get: function () { return utils_13.runSingleTest; } });
Object.defineProperty(exports, "handleTestExecInput", { enumerable: true, get: function () { return utils_13.handleTestExecInput; } });
//# sourceMappingURL=index.js.map