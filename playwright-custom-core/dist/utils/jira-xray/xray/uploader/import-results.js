"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importExecution = importExecution;
exports.importResults = importResults;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const get_token_1 = require("../auth/get-token");
const DEFAULT_DIST_DIR = 'jira-xray-dist';
const DEFAULT_PAYLOAD_FILE = path_1.default.join(DEFAULT_DIST_DIR, 'xray-payload.json');
const DEFAULT_BASE_URL = 'https://xray.cloud.getxray.app';
/**
 * Low-level: POST a payload to the Xray import endpoint using
 * an existing bearer token.
 *
 * Most callers should prefer `importResults()` which handles
 * authentication automatically.
 */
async function importExecution(token, apiUrl, payloadFile = DEFAULT_PAYLOAD_FILE) {
    const resolvedPath = path_1.default.resolve(payloadFile);
    if (!fs_1.default.existsSync(resolvedPath)) {
        throw new Error(`Payload file not found: ${resolvedPath}`);
    }
    const payload = fs_1.default.readFileSync(resolvedPath, 'utf-8');
    console.log(`Uploading payload from ${payloadFile} to ${apiUrl}...`);
    try {
        const response = await axios_1.default.post(apiUrl, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            timeout: 300_000,
        });
        return response.data;
    }
    catch (err) {
        console.error('Import failed:', err.response?.data || err.message);
        if (err.response?.data) {
            console.error('Full Xray response:', JSON.stringify(err.response.data, null, 2));
        }
        throw err;
    }
}
/**
 * Authenticate with Xray and import a test execution payload.
 *
 * @returns The Test Execution key, or `undefined` on failure.
 *
 * @example
 * ```ts
 * const execKey = await importResults({ xray: xrayConfig, payloadFile: "path/to/payload.json" });
 * ```
 */
async function importResults(options = {}) {
    const baseUrl = options.xray?.baseUrl ?? process.env.XRAY_BASE_URL ?? DEFAULT_BASE_URL;
    const payloadFile = options.payloadFile ?? DEFAULT_PAYLOAD_FILE;
    const apiUrl = `${baseUrl}/api/v2/import/execution`;
    try {
        console.log('Authenticating with Xray...');
        const token = await (0, get_token_1.getXrayToken)(options.xray?.auth);
        console.log('Importing results to Xray...');
        const execution = await importExecution(token, apiUrl, payloadFile);
        const executionKey = execution.key || execution.id || execution.testExecution?.key;
        console.log(`Success! Results imported to: ${executionKey}`);
        return executionKey;
    }
    catch (error) {
        console.error('Upload failed:', error);
        return undefined;
    }
}
//# sourceMappingURL=import-results.js.map