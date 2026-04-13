/**
 * Xray Cloud authentication — obtain a bearer token.
 *
 * Uses `POST /api/v2/authenticate`.
 * Conforms to the `IXrayAuthProvider` interface contract.
 */

import axios from 'axios';
import type { XrayAuthConfig } from '../../types';

const DEFAULT_AUTH_URL = 'https://xray.cloud.getxray.app/api/v2/authenticate';

/**
 * Authenticate with Xray Cloud and return a bearer token.
 *
 * @param config  Xray auth credentials.  Falls back to env vars
 *                `XRAY_CLIENT_ID` / `XRAY_CLIENT_SECRET`.
 * @throws {Error} if client ID or secret is missing.
 */
export async function getXrayToken(
  config: XrayAuthConfig = {},
): Promise<string> {
  const clientId = config.clientId ?? process.env.XRAY_CLIENT_ID;
  const clientSecret = config.clientSecret ?? process.env.XRAY_CLIENT_SECRET;
  const authenticateUrl = config.authenticateUrl ?? DEFAULT_AUTH_URL;

  if (!clientId || !clientSecret) {
    throw new Error(
      'Xray client_id and client_secret are required. ' +
        'Provide them via config or XRAY_CLIENT_ID / XRAY_CLIENT_SECRET env vars.',
    );
  }

  const response = await axios.post(authenticateUrl, {
    client_id: clientId,
    client_secret: clientSecret,
  });

  return response.data;
}
