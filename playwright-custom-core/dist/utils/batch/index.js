"use strict";
/**
 * Salesforce Batch Utility
 *
 * A production-ready utility for executing and monitoring Salesforce batch jobs.
 *
 * Architecture:
 * - Follows SOLID principles with clear separation of concerns
 * - Uses existing SalesforceConnection for authentication (no duplication)
 * - Dependency injection for testability
 * - Single Responsibility: each service handles one aspect
 *
 * @example Basic Usage
 * ```typescript
 * import { runBatch } from 'playwright-custom-core';
 *
 * await runBatch('AccountCleanupBatch');
 * ```
 *
 * @example Advanced Usage
 * ```typescript
 * import { executeBatch } from 'playwright-custom-core';
 *
 * const result = await executeBatch({
 *   batchClassName: 'OpportunityProcessingBatch',
 *   batchSize: 100,
 *   pollingInterval: 3000,
 *   maxPollingAttempts: 200
 * });
 *
 * console.log(`Processed: ${result.itemsProcessed}/${result.totalItems}`);
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForBatchCompletion = exports.getBatchStatus = exports.triggerBatch = exports.runBatch = exports.executeBatch = void 0;
// ─── Main API ─────────────────────────────────────────────────────────────────
var batch_executor_1 = require("./batch-executor");
Object.defineProperty(exports, "executeBatch", { enumerable: true, get: function () { return batch_executor_1.executeBatch; } });
Object.defineProperty(exports, "runBatch", { enumerable: true, get: function () { return batch_executor_1.runBatch; } });
// ─── Services (for advanced usage/testing) ────────────────────────────────────
var batch_runner_service_1 = require("./batch-runner.service");
Object.defineProperty(exports, "triggerBatch", { enumerable: true, get: function () { return batch_runner_service_1.triggerBatch; } });
var batch_status_service_1 = require("./batch-status.service");
Object.defineProperty(exports, "getBatchStatus", { enumerable: true, get: function () { return batch_status_service_1.getBatchStatus; } });
var batch_waiter_service_1 = require("./batch-waiter.service");
Object.defineProperty(exports, "waitForBatchCompletion", { enumerable: true, get: function () { return batch_waiter_service_1.waitForBatchCompletion; } });
//# sourceMappingURL=index.js.map