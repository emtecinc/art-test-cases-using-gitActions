/**
 * Xray Cloud authentication — obtain a bearer token.
 *
 * Uses `POST /api/v2/authenticate`.
 * Conforms to the `IXrayAuthProvider` interface contract.
 */
import type { XrayAuthConfig } from '../../types';
/**
 * Authenticate with Xray Cloud and return a bearer token.
 *
 * @param config  Xray auth credentials.  Falls back to env vars
 *                `XRAY_CLIENT_ID` / `XRAY_CLIENT_SECRET`.
 * @throws {Error} if client ID or secret is missing.
 */
export declare function getXrayToken(config?: XrayAuthConfig): Promise<string>;
//# sourceMappingURL=get-token.d.ts.map