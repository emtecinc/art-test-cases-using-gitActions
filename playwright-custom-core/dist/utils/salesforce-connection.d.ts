/**
 * Manager for a jsforce Salesforce connection.
 *
 * Single Responsibility: manages the lifecycle of a Salesforce connection —
 * authentication, caching, and disposal.
 * Does NOT query any specific object; that is left to providers.
 *
 * Authentication: OAuth 2.0 JWT Bearer Flow
 *   - Reads credentials from flat environment variables:
 *       SF_USERNAME, SF_CLIENT_ID, SF_LOGIN_URL, SF_PRIVATE_KEY_PATH
 *   - Signs a JWT and exchanges it for an access token.
 *   - Constructs a jsforce Connection using the returned access token
 *     and instance URL.
 *
 * Usage:
 *   const conn = SalesforceConnection.getInstance();
 *   const jsforceConn = await conn.getConnection();
 */
export interface SalesforceCredentials {
    accessToken: string;
    instanceUrl: string;
}
export declare class SalesforceConnection {
    private connectionPromise;
    private static instance;
    private readonly username;
    private readonly clientId;
    private readonly loginUrl;
    private readonly privateKeyPath;
    private readonly _orgUrl;
    constructor();
    /**
     * Singleton accessor — most call-sites should use this.
     */
    static getInstance(): SalesforceConnection;
    /** Reset the singleton (useful after config changes or in test teardown). */
    static resetInstance(): void;
    /** The Salesforce org URL from BASE_URL. */
    get orgUrl(): string;
    /**
     * Get (or lazily create) an authenticated jsforce `Connection`.
     * The promise is cached — subsequent calls reuse the same connection.
     */
    getConnection(): Promise<SalesforceCredentials>;
    /** Force a fresh connection on the next `getConnection()` call. */
    reset(): void;
    private authenticate;
    private buildJwt;
    private exchangeJwt;
    private requireEnv;
}
//# sourceMappingURL=salesforce-connection.d.ts.map