/**
 * Batch Waiter Service
 *
 * Single Responsibility: Poll Salesforce until batch completes.
 * Depends on: getBatchStatus service (via DI)
 */
import { SalesforceCredentials } from '../salesforce-connection';
import { BatchExecutionResult } from './types';
/**
 * Poll Salesforce until batch execution completes
 *
 * @param credentials - Salesforce authentication credentials
 * @param batchClassName - Name of the Apex batch class
 * @param pollingInterval - Time to wait between polls in milliseconds (default: 5000)
 * @param maxAttempts - Maximum number of polling attempts (default: 120)
 * @returns Batch execution result
 * @throws Error if batch fails, is aborted, or max attempts exceeded
 */
export declare function waitForBatchCompletion(credentials: SalesforceCredentials, batchClassName: string, pollingInterval?: number, maxAttempts?: number): Promise<BatchExecutionResult>;
//# sourceMappingURL=batch-waiter.service.d.ts.map