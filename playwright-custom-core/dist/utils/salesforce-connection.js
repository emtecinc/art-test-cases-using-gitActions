"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesforceConnection = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ── Connection class ────────────────────────────────────────────────
class SalesforceConnection {
    connectionPromise = null;
    static instance = null;
    username;
    clientId;
    loginUrl;
    privateKeyPath;
    _orgUrl;
    constructor() {
        this.username = this.requireEnv('SF_USERNAME');
        this.clientId = this.requireEnv('SF_CLIENT_ID');
        this.loginUrl = process.env.SF_LOGIN_URL || 'https://login.salesforce.com';
        this.privateKeyPath = process.env.SF_PRIVATE_KEY_PATH || './server.key';
        this._orgUrl = process.env.BASE_URL || '';
    }
    /**
     * Singleton accessor — most call-sites should use this.
     */
    static getInstance() {
        if (!SalesforceConnection.instance) {
            SalesforceConnection.instance = new SalesforceConnection();
        }
        return SalesforceConnection.instance;
    }
    /** Reset the singleton (useful after config changes or in test teardown). */
    static resetInstance() {
        SalesforceConnection.instance = null;
    }
    /** The Salesforce org URL from BASE_URL. */
    get orgUrl() {
        return this._orgUrl;
    }
    /**
     * Get (or lazily create) an authenticated jsforce `Connection`.
     * The promise is cached — subsequent calls reuse the same connection.
     */
    async getConnection() {
        if (!this.connectionPromise) {
            this.connectionPromise = this.authenticate();
        }
        return this.connectionPromise;
    }
    /** Force a fresh connection on the next `getConnection()` call. */
    reset() {
        this.connectionPromise = null;
    }
    // ── Private ────────────────────────────────────────────────────
    async authenticate() {
        const resolvedKeyPath = path_1.default.isAbsolute(this.privateKeyPath)
            ? this.privateKeyPath
            : path_1.default.resolve(process.cwd(), this.privateKeyPath);
        if (!fs_1.default.existsSync(resolvedKeyPath)) {
            throw new Error(`[SalesforceConnection] Private key not found at "${resolvedKeyPath}".`);
        }
        const privateKey = fs_1.default.readFileSync(resolvedKeyPath, 'utf8');
        const jwtToken = this.buildJwt(privateKey);
        console.log(`[SalesforceConnection] JWT token generated: ${JSON.stringify(jwtToken)}`);
        const tokenResponse = await this.exchangeJwt(jwtToken);
        console.log(`[SalesforceConnection] Authenticated as ${this.username} ` +
            `(instance: ${tokenResponse.instance_url})`);
        return {
            instanceUrl: tokenResponse.instance_url,
            accessToken: tokenResponse.access_token,
        };
    }
    buildJwt(privateKey) {
        const payload = {
            iss: this.clientId,
            sub: this.username,
            aud: this.loginUrl,
            exp: Math.floor(Date.now() / 1000) + 180,
        };
        return jsonwebtoken_1.default.sign(payload, privateKey, { algorithm: 'RS256' });
    }
    async exchangeJwt(jwtToken) {
        console.log("Dtatatatatatata", jwtToken);
        const tokenUrl = `${this.loginUrl}/services/oauth2/token`;
        const params = new URLSearchParams({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: jwtToken,
        });
        console.log("Dtatatata", tokenUrl, params.toString());
        try {
            const response = await axios_1.default.post(tokenUrl, params.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
            return response.data;
        }
        catch (error) {
            const detail = error.response?.data
                ? JSON.stringify(error.response.data)
                : error.message;
            throw new Error(`[SalesforceConnection] JWT token exchange failed — ${detail}`);
        }
    }
    requireEnv(varName) {
        const value = process.env[varName];
        if (!value) {
            throw new Error(`[SalesforceConnection] ${varName} env var is required.`);
        }
        return value;
    }
}
exports.SalesforceConnection = SalesforceConnection;
//# sourceMappingURL=salesforce-connection.js.map