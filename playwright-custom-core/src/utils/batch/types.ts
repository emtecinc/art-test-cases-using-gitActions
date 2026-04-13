/**
 * Salesforce Batch Utility Types
 * 
 * Type definitions for Salesforce batch operations.
 */

/**
 * AsyncApexJob response structure from Salesforce API
 */
export interface BatchJob {
  Id: string;
  Status: string;
  JobItemsProcessed: number;
  TotalJobItems: number;
  NumberOfErrors: number;
}

/**
 * Batch execution configuration
 */
export interface BatchConfig {
  /** Name of the Apex batch class to execute */
  batchClassName: string;
  /** Batch size (default: 200) */
  batchSize?: number;
  /** Polling interval in milliseconds (default: 5000) */
  pollingInterval?: number;
  /** Maximum polling attempts (default: 120) */
  maxPollingAttempts?: number;
}

/**
 * Batch execution result
 */
export interface BatchExecutionResult {
  /** Batch job ID */
  jobId: string;
  /** Final status */
  status: string;
  /** Total items processed */
  itemsProcessed: number;
  /** Total items in batch */
  totalItems: number;
  /** Number of errors encountered */
  errors: number;
}
