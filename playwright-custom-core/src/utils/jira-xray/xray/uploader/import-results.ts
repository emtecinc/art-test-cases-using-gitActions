import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { getXrayToken } from '../auth/get-token';
import type { ImportResultsOptions } from '../../types';

const DEFAULT_DIST_DIR = 'jira-xray-dist';
const DEFAULT_PAYLOAD_FILE = path.join(DEFAULT_DIST_DIR, 'xray-payload.json');
const DEFAULT_BASE_URL = 'https://xray.cloud.getxray.app';

/**
 * Low-level: POST a payload to the Xray import endpoint using
 * an existing bearer token.
 *
 * Most callers should prefer `importResults()` which handles
 * authentication automatically.
 */
export async function importExecution(
  token: string,
  apiUrl: string,
  payloadFile: string = DEFAULT_PAYLOAD_FILE,
): Promise<any> {
  const resolvedPath = path.resolve(payloadFile);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Payload file not found: ${resolvedPath}`);
  }

  const payload = fs.readFileSync(resolvedPath, 'utf-8');
  console.log(`Uploading payload from ${payloadFile} to ${apiUrl}...`);

  try {
    const response = await axios.post(apiUrl, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: 300_000,
    });

    return response.data;
  } catch (err: any) {
    console.error('Import failed:', err.response?.data || err.message);
    if (err.response?.data) {
      console.error(
        'Full Xray response:',
        JSON.stringify(err.response.data, null, 2),
      );
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
export async function importResults(
  options: ImportResultsOptions = {},
): Promise<string | undefined> {
  const baseUrl =
    options.xray?.baseUrl ?? process.env.XRAY_BASE_URL ?? DEFAULT_BASE_URL;
  const payloadFile = options.payloadFile ?? DEFAULT_PAYLOAD_FILE;
  const apiUrl = `${baseUrl}/api/v2/import/execution`;

  try {
    console.log('Authenticating with Xray...');
    const token = await getXrayToken(options.xray?.auth);

    console.log('Importing results to Xray...');
    const execution = await importExecution(token, apiUrl, payloadFile);

    const executionKey: string | undefined =
      execution.key || execution.id || execution.testExecution?.key;

    console.log(`Success! Results imported to: ${executionKey}`);
    return executionKey;
  } catch (error: any) {
    console.error('Upload failed:', error);
    return undefined;
  }
}
