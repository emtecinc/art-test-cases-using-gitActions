"use strict";
/**
 * Batch Executor
 *
 * Single Responsibility: Orchestrate batch execution workflow.
 * Follows Open/Closed Principle: extensible via dependency injection.
 * Depends on: SalesforceConnection, triggerBatch, waitForBatchCompletion
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeBatch = executeBatch;
exports.runBatch = runBatch;
const salesforce_connection_1 = require("../salesforce-connection");
const batch_runner_service_1 = require("./batch-runner.service");
const batch_waiter_service_1 = require("./batch-waiter.service");
/**
 * Execute a Salesforce batch and wait for completion
 *
 * This high-level orchestrator:
 * 1. Authenticates via SalesforceConnection singleton
 * 2. Triggers the batch via Tooling API
 * 3. Polls for completion
 * 4. Returns execution result
 *
 * @param config - Batch execution configuration
 * @returns Batch execution result
 * @throws Error if authentication, trigger, or execution fails
 *
 * @example
 * ```typescript
 * const result = await executeBatch({
 *   batchClassName: 'AccountCleanupBatch',
 *   batchSize: 200,
 *   pollingInterval: 5000,
 *   maxPollingAttempts: 120
 * });
 * console.log(`Processed ${result.itemsProcessed} items`);
 * ```
 */
async function executeBatch(config) {
    const { batchClassName, batchSize = config.batchSize ?? 200, pollingInterval = config.pollingInterval ?? 5000, maxPollingAttempts = config.maxPollingAttempts ?? 120, } = config;
    console.log(`[BatchExecutor] Starting batch execution for: ${batchClassName}`);
    // Step 1: Authenticate using existing SalesforceConnection singleton
    console.log(`[BatchExecutor] Authenticating to Salesforce...`);
    const sfConnection = salesforce_connection_1.SalesforceConnection.getInstance();
    const credentials = await sfConnection.getConnection();
    // Step 2: Trigger batch
    console.log(`[BatchExecutor] Triggering batch: ${batchClassName}`);
    await (0, batch_runner_service_1.triggerBatch)(credentials, batchClassName, batchSize);
    // Step 3: Wait for completion
    console.log(`[BatchExecutor] Waiting for batch completion...`);
    const result = await (0, batch_waiter_service_1.waitForBatchCompletion)(credentials, batchClassName, pollingInterval, maxPollingAttempts);
    console.log(`[BatchExecutor] Batch execution completed. ` +
        `Job ID: ${result.jobId}, ` +
        `Status: ${result.status}, ` +
        `Items: ${result.itemsProcessed}/${result.totalItems}, ` +
        `Errors: ${result.errors}`);
    return result;
}
/**
 * Convenience function for simple batch execution
 *
 * @param batchClassName - Name of the Apex batch class
 * @returns Batch execution result
 *
 * @example
 * ```typescript
 * await runBatch('AccountCleanupBatch');
 * ```
 */
async function runBatch(batchClassName) {
    return executeBatch({ batchClassName });
}
//# sourceMappingURL=batch-executor.js.map