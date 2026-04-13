/**
 * Batch Runner Service
 * 
 * Single Responsibility: Trigger Salesforce batch execution via Tooling API.
 * Depends on: SalesforceCredentials (via DI)
 */

import axios from 'axios';
import { SalesforceCredentials } from '../salesforce-connection';

/**
 * Trigger a Salesforce batch class using executeAnonymous
 * 
 * @param credentials - Salesforce authentication credentials
 * @param batchClassName - Name of the Apex batch class to execute
 * @param batchSize - Number of records per batch (default: 200)
 * @throws Error if batch trigger fails
 */
export async function triggerBatch(
  credentials: SalesforceCredentials,
  batchClassName: string,
  batchSize: number = 200
): Promise<void> {
  const apexCode = `Database.executeBatch(new ${batchClassName}(), ${batchSize});`;

  const url = `${credentials.instanceUrl}/services/data/v65.0/tooling/executeAnonymous/?anonymousBody=${encodeURIComponent(apexCode)}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${credentials.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.data.success) {
      const errorMsg = response.data.compileProblem || response.data.exceptionMessage || 'Unknown error';
      throw new Error(`Batch trigger failed: ${errorMsg}`);
    }

    console.log(`[BatchRunner] Batch ${batchClassName} triggered successfully`);
  } catch (error: any) {
    if (error.message.includes('Batch trigger failed')) {
      throw error;
    }
    const detail = error.response?.data
      ? JSON.stringify(error.response.data)
      : error.message;
    throw new Error(`Failed to trigger batch: ${detail}`);
  }
}
