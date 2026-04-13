/**
 * Batch Status Service
 *
 * Single Responsibility: Query AsyncApexJob for batch status.
 * Depends on: SalesforceCredentials (via DI)
 */
import { BatchJob } from './types';
import { SalesforceCredentials } from '../salesforce-connection';
/**
 * Fetch the latest batch job status from AsyncApexJob
 *
 * @param credentials - Salesforce authentication credentials
 * @param batchClassName - Name of the Apex batch class
 * @returns Latest batch job record
 * @throws Error if no batch job found or API call fails
 */
export declare function getBatchStatus(credentials: SalesforceCredentials, batchClassName: string): Promise<BatchJob>;
//# sourceMappingURL=batch-status.service.d.ts.map