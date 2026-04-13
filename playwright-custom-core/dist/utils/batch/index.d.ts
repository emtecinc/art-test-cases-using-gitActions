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
export { executeBatch, runBatch } from './batch-executor';
export { triggerBatch } from './batch-runner.service';
export { getBatchStatus } from './batch-status.service';
export { waitForBatchCompletion } from './batch-waiter.service';
export type { BatchJob, BatchConfig, BatchExecutionResult, } from './types';
//# sourceMappingURL=index.d.ts.map