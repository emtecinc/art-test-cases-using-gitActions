"use strict";
/**
 * Batch Runner Service
 *
 * Single Responsibility: Trigger Salesforce batch execution via Tooling API.
 * Depends on: SalesforceCredentials (via DI)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerBatch = triggerBatch;
const axios_1 = __importDefault(require("axios"));
/**
 * Trigger a Salesforce batch class using executeAnonymous
 *
 * @param credentials - Salesforce authentication credentials
 * @param batchClassName - Name of the Apex batch class to execute
 * @param batchSize - Number of records per batch (default: 200)
 * @throws Error if batch trigger fails
 */
async function triggerBatch(credentials, batchClassName, batchSize = 200) {
    const apexCode = `Database.executeBatch(new ${batchClassName}(), ${batchSize});`;
    const url = `${credentials.instanceUrl}/services/data/v65.0/tooling/executeAnonymous/?anonymousBody=${encodeURIComponent(apexCode)}`;
    try {
        const response = await axios_1.default.get(url, {
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
    }
    catch (error) {
        if (error.message.includes('Batch trigger failed')) {
            throw error;
        }
        const detail = error.response?.data
            ? JSON.stringify(error.response.data)
            : error.message;
        throw new Error(`Failed to trigger batch: ${detail}`);
    }
}
//# sourceMappingURL=batch-runner.service.js.map