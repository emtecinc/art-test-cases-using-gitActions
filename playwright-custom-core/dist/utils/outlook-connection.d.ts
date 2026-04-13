/**
 * Singleton manager for the Microsoft Graph connection.
 *
 * Single Responsibility: manages authentication and lifecycle
 * of a Microsoft Graph API client.
 *
 * Authentication: OAuth 2.0 Client Credentials with Certificate
 *   - Reads a private key from MS_PRIVATE_KEY_PATH
 *   - Signs a JWT assertion
 *   - Exchanges it for a Microsoft Graph access token
 *
 * Required environment variables:
 *   MS_TENANT_ID, MS_CLIENT_ID, MS_CERT_THUMBPRINT, MS_PRIVATE_KEY_PATH
 */
import { AxiosInstance } from 'axios';
export declare class OutlookConnection {
    private static instance;
    private clientPromise;
    private tokenExpiry;
    private constructor();
    static getInstance(): OutlookConnection;
    getClient(): Promise<AxiosInstance>;
    reset(): void;
    private authenticate;
    private buildJwt;
    private exchangeJwt;
}
//# sourceMappingURL=outlook-connection.d.ts.map