/**
 * Batch Executor
 *
 * Single Responsibility: Orchestrate batch execution workflow.
 * Follows Open/Closed Principle: extensible via dependency injection.
 * Depends on: SalesforceConnection, triggerBatch, waitForBatchCompletion
 */
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
export declare function executeBatch(config: BatchConfig): Promise<BatchExecutionResult>;
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
export declare function runBatch(batchClassName: string): Promise<BatchExecutionResult>;
//# sourceMappingURL=batch-executor.d.ts.map