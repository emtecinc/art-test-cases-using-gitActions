/**
 * Batch Status Service
 * 
 * Single Responsibility: Query AsyncApexJob for batch status.
 * Depends on: SalesforceCredentials (via DI)
 */

import axios from 'axios';
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
export async function getBatchStatus(
  credentials: SalesforceCredentials,
  batchClassName: string
): Promise<BatchJob> {
  const query = `
    SELECT Id, Status, JobItemsProcessed, TotalJobItems, NumberOfErrors
    FROM AsyncApexJob
    WHERE ApexClass.Name='${batchClassName}'
    ORDER BY CreatedDate DESC
    LIMIT 1
  `;

  const url = `${credentials.instanceUrl}/services/data/v65.0/query?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${credentials.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.data.records || response.data.records.length === 0) {
      throw new Error(`No batch job found for class: ${batchClassName}`);
    }

    return response.data.records[0];
  } catch (error: any) {
    const detail = error.response?.data
      ? JSON.stringify(error.response.data)
      : error.message;
    throw new Error(`Failed to fetch batch status: ${detail}`);
  }
}
