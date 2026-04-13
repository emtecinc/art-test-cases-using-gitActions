"use strict";
/**
 * Batch Status Service
 *
 * Single Responsibility: Query AsyncApexJob for batch status.
 * Depends on: SalesforceCredentials (via DI)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBatchStatus = getBatchStatus;
const axios_1 = __importDefault(require("axios"));
/**
 * Fetch the latest batch job status from AsyncApexJob
 *
 * @param credentials - Salesforce authentication credentials
 * @param batchClassName - Name of the Apex batch class
 * @returns Latest batch job record
 * @throws Error if no batch job found or API call fails
 */
async function getBatchStatus(credentials, batchClassName) {
    const query = `
    SELECT Id, Status, JobItemsProcessed, TotalJobItems, NumberOfErrors
    FROM AsyncApexJob
    WHERE ApexClass.Name='${batchClassName}'
    ORDER BY CreatedDate DESC
    LIMIT 1
  `;
    const url = `${credentials.instanceUrl}/services/data/v65.0/query?q=${encodeURIComponent(query)}`;
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${credentials.accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.data.records || response.data.records.length === 0) {
            throw new Error(`No batch job found for class: ${batchClassName}`);
        }
        return response.data.records[0];
    }
    catch (error) {
        const detail = error.response?.data
            ? JSON.stringify(error.response.data)
            : error.message;
        throw new Error(`Failed to fetch batch status: ${detail}`);
    }
}
//# sourceMappingURL=batch-status.service.js.map