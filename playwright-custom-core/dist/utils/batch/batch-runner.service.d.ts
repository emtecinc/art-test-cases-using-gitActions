/**
 * Batch Runner Service
 *
 * Single Responsibility: Trigger Salesforce batch execution via Tooling API.
 * Depends on: SalesforceCredentials (via DI)
 */
import { SalesforceCredentials } from '../salesforce-connection';
/**
 * Trigger a Salesforce batch class using executeAnonymous
 *
 * @param credentials - Salesforce authentication credentials
 * @param batchClassName - Name of the Apex batch class to execute
 * @param batchSize - Number of records per batch (default: 200)
 * @throws Error if batch trigger fails
 */
export declare function triggerBatch(credentials: SalesforceCredentials, batchClassName: string, batchSize?: number): Promise<void>;
//# sourceMappingURL=batch-runner.service.d.ts.map