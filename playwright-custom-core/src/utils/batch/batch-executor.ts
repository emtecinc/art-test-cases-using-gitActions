/**
 * Batch Executor
 * 
 * Single Responsibility: Orchestrate batch execution workflow.
 * Follows Open/Closed Principle: extensible via dependency injection.
 * Depends on: SalesforceConnection, triggerBatch, waitForBatchCompletion
 */

import { SalesforceConnection } from '../salesforce-connection';
import { triggerBatch } from './batch-runner.service';
import { waitForBatchCompletion } from './batch-waiter.service';
import { BatchConfig, BatchExecutionResult } from './types';

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
export async function executeBatch(config: BatchConfig): Promise<BatchExecutionResult> {
  const {
    batchClassName,
    batchSize = config.batchSize ?? 200,
    pollingInterval = config.pollingInterval ?? 5000,
    maxPollingAttempts = config.maxPollingAttempts ?? 120,
  } = config;

  console.log(`[BatchExecutor] Starting batch execution for: ${batchClassName}`);

  // Step 1: Authenticate using existing SalesforceConnection singleton
  console.log(`[BatchExecutor] Authenticating to Salesforce...`);
  const sfConnection = SalesforceConnection.getInstance();
  const credentials = await sfConnection.getConnection();

  // Step 2: Trigger batch
  console.log(`[BatchExecutor] Triggering batch: ${batchClassName}`);
  await triggerBatch(credentials, batchClassName, batchSize);

  // Step 3: Wait for completion
  console.log(`[BatchExecutor] Waiting for batch completion...`);
  const result = await waitForBatchCompletion(
    credentials,
    batchClassName,
    pollingInterval,
    maxPollingAttempts
  );

  console.log(
    `[BatchExecutor] Batch execution completed. ` +
    `Job ID: ${result.jobId}, ` +
    `Status: ${result.status}, ` +
    `Items: ${result.itemsProcessed}/${result.totalItems}, ` +
    `Errors: ${result.errors}`
  );

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
export async function runBatch(batchClassName: string): Promise<BatchExecutionResult> {
  return executeBatch({ batchClassName });
}
