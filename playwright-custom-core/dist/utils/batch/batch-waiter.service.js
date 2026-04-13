"use strict";
/**
 * Batch Waiter Service
 *
 * Single Responsibility: Poll Salesforce until batch completes.
 * Depends on: getBatchStatus service (via DI)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForBatchCompletion = waitForBatchCompletion;
const batch_status_service_1 = require("./batch-status.service");
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
async function waitForBatchCompletion(credentials, batchClassName, pollingInterval = 5000, maxAttempts = 120) {
    let attempts = 0;
    let status = 'Queued';
    console.log(`[BatchWaiter] Waiting for batch ${batchClassName} to complete...`);
    while (status !== 'Completed' && attempts < maxAttempts) {
        attempts++;
        const job = await (0, batch_status_service_1.getBatchStatus)(credentials, batchClassName);
        status = job.Status;
        console.log(`[BatchWaiter] Attempt ${attempts}/${maxAttempts} - ` +
            `Status: ${status} - ` +
            `Processed: ${job.JobItemsProcessed}/${job.TotalJobItems} - ` +
            `Errors: ${job.NumberOfErrors}`);
        // Check for failure states
        if (status === 'Failed') {
            throw new Error(`Batch execution failed. ` +
                `Job ID: ${job.Id}, ` +
                `Errors: ${job.NumberOfErrors}`);
        }
        if (status === 'Aborted') {
            throw new Error(`Batch execution was aborted. Job ID: ${job.Id}`);
        }
        // Return if completed
        if (status === 'Completed') {
            console.log(`[BatchWaiter] Batch completed successfully`);
            return {
                jobId: job.Id,
                status: job.Status,
                itemsProcessed: job.JobItemsProcessed,
                totalItems: job.TotalJobItems,
                errors: job.NumberOfErrors,
            };
        }
        // Wait before next poll
        await new Promise((resolve) => setTimeout(resolve, pollingInterval));
    }
    throw new Error(`Batch polling timeout after ${attempts} attempts. ` +
        `Last status: ${status}. ` +
        `Consider increasing maxPollingAttempts.`);
}
//# sourceMappingURL=batch-waiter.service.js.map