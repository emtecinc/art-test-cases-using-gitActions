"use strict";
/**
 * Jira / Xray utility module — public API.
 *
 * Re-exports all public symbols from the sub-modules. Import from
 * this entry point to avoid deep paths:
 *
 *   import { getIssue, XrayReporter, buildJql } from 'playwright-custom-core';
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTestExecInput = exports.runSingleTest = exports.fetchByKey = exports.fetchIssuesByLabel = exports.runTestsWithResultsUpload = exports.hasFilterCriteria = exports.parseIssueFieldFilter = exports.parseJiraFieldNames = exports.parseCommaSeparated = exports.importResults = exports.importExecution = exports.scanTestKeyToFileMap = exports.findSpecFiles = exports.getFilteredLinkedTestKeys = exports.getLinkedTestKeys = exports.buildXrayPayload = exports.XrayReporter = exports.getXrayToken = exports.getIssueDescriptions = exports.filterIssueKeys = exports.buildJql = exports.findIssues = exports.searchIssues = exports.getIssueFields = exports.getIssueField = exports.getIssue = exports.jiraRequestConfig = exports.resolveJiraConfig = void 0;
// ── Shared configuration ──
var config_1 = require("./config");
Object.defineProperty(exports, "resolveJiraConfig", { enumerable: true, get: function () { return config_1.resolveJiraConfig; } });
Object.defineProperty(exports, "jiraRequestConfig", { enumerable: true, get: function () { return config_1.jiraRequestConfig; } });
// ── Jira ──
var jira_1 = require("./jira");
// Read — single issue
Object.defineProperty(exports, "getIssue", { enumerable: true, get: function () { return jira_1.getIssue; } });
Object.defineProperty(exports, "getIssueField", { enumerable: true, get: function () { return jira_1.getIssueField; } });
Object.defineProperty(exports, "getIssueFields", { enumerable: true, get: function () { return jira_1.getIssueFields; } });
// Read — search / JQL
Object.defineProperty(exports, "searchIssues", { enumerable: true, get: function () { return jira_1.searchIssues; } });
Object.defineProperty(exports, "findIssues", { enumerable: true, get: function () { return jira_1.findIssues; } });
Object.defineProperty(exports, "buildJql", { enumerable: true, get: function () { return jira_1.buildJql; } });
// Read — filter a known set of keys by field criteria
Object.defineProperty(exports, "filterIssueKeys", { enumerable: true, get: function () { return jira_1.filterIssueKeys; } });
// Read — descriptions
Object.defineProperty(exports, "getIssueDescriptions", { enumerable: true, get: function () { return jira_1.getIssueDescriptions; } });
// ── Xray ──
var xray_1 = require("./xray");
Object.defineProperty(exports, "getXrayToken", { enumerable: true, get: function () { return xray_1.getXrayToken; } });
Object.defineProperty(exports, "XrayReporter", { enumerable: true, get: function () { return xray_1.XrayReporter; } });
Object.defineProperty(exports, "buildXrayPayload", { enumerable: true, get: function () { return xray_1.buildXrayPayload; } });
Object.defineProperty(exports, "getLinkedTestKeys", { enumerable: true, get: function () { return xray_1.getLinkedTestKeys; } });
Object.defineProperty(exports, "getFilteredLinkedTestKeys", { enumerable: true, get: function () { return xray_1.getFilteredLinkedTestKeys; } });
Object.defineProperty(exports, "findSpecFiles", { enumerable: true, get: function () { return xray_1.findSpecFiles; } });
Object.defineProperty(exports, "scanTestKeyToFileMap", { enumerable: true, get: function () { return xray_1.scanTestKeyToFileMap; } });
Object.defineProperty(exports, "importExecution", { enumerable: true, get: function () { return xray_1.importExecution; } });
Object.defineProperty(exports, "importResults", { enumerable: true, get: function () { return xray_1.importResults; } });
// ── Env Parsers ──
var parsers_1 = require("./parsers");
Object.defineProperty(exports, "parseCommaSeparated", { enumerable: true, get: function () { return parsers_1.parseCommaSeparated; } });
Object.defineProperty(exports, "parseJiraFieldNames", { enumerable: true, get: function () { return parsers_1.parseJiraFieldNames; } });
Object.defineProperty(exports, "parseIssueFieldFilter", { enumerable: true, get: function () { return parsers_1.parseIssueFieldFilter; } });
Object.defineProperty(exports, "hasFilterCriteria", { enumerable: true, get: function () { return parsers_1.hasFilterCriteria; } });
// ── Service ──
var jira_xray_service_1 = require("./jira-xray.service");
Object.defineProperty(exports, "runTestsWithResultsUpload", { enumerable: true, get: function () { return jira_xray_service_1.runTestsWithResultsUpload; } });
Object.defineProperty(exports, "fetchIssuesByLabel", { enumerable: true, get: function () { return jira_xray_service_1.fetchIssuesByLabel; } });
Object.defineProperty(exports, "fetchByKey", { enumerable: true, get: function () { return jira_xray_service_1.fetchByKey; } });
Object.defineProperty(exports, "runSingleTest", { enumerable: true, get: function () { return jira_xray_service_1.runSingleTest; } });
Object.defineProperty(exports, "handleTestExecInput", { enumerable: true, get: function () { return jira_xray_service_1.handleTestExecInput; } });
//# sourceMappingURL=index.js.map