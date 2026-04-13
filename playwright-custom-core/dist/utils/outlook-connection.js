"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlookConnection = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class OutlookConnection {
    static instance;
    clientPromise = null;
    tokenExpiry = null;
    constructor() { }
    static getInstance() {
        if (!OutlookConnection.instance) {
            OutlookConnection.instance = new OutlookConnection();
        }
        return OutlookConnection.instance;
    }
    async getClient() {
        if (this.clientPromise &&
            this.tokenExpiry &&
            Date.now() < this.tokenExpiry) {
            return this.clientPromise;
        }
        this.clientPromise = this.authenticate();
        return this.clientPromise;
    }
    reset() {
        this.clientPromise = null;
        this.tokenExpiry = null;
    }
    // ── Private ─────────────────────────────────────────────
    async authenticate() {
        const tenantId = process.env.MS_TENANT_ID;
        const clientId = process.env.MS_CLIENT_ID;
        const privateKeyPath = process.env.MS_PRIVATE_KEY_PATH ||
            path_1.default.resolve(process.cwd(), 'graph.key');
        const certThumbprint = process.env.MS_CERT_THUMBPRINT;
        if (!tenantId) {
            throw new Error('OutlookConnection: MS_TENANT_ID environment variable is required.');
        }
        if (!clientId) {
            throw new Error('OutlookConnection: MS_CLIENT_ID environment variable is required.');
        }
        if (!certThumbprint) {
            throw new Error('OutlookConnection: MS_CERT_THUMBPRINT environment variable is required.');
        }
        if (!fs_1.default.existsSync(privateKeyPath)) {
            throw new Error(`OutlookConnection: Private key not found at "${privateKeyPath}".`);
        }
        const privateKey = fs_1.default.readFileSync(privateKeyPath, 'utf8');
        const jwtAssertion = this.buildJwt(tenantId, clientId, privateKey, certThumbprint);
        const tokenResponse = await this.exchangeJwt(jwtAssertion, tenantId);
        console.log('[OutlookConnection] Graph API authenticated.');
        this.tokenExpiry = Date.now() + (tokenResponse.expires_in - 60) * 1000;
        return axios_1.default.create({
            baseURL: 'https://graph.microsoft.com/v1.0',
            headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
            },
        });
    }
    buildJwt(tenantId, clientId, privateKey, thumbprint) {
        const now = Math.floor(Date.now() / 1000);
        const payload = {
            aud: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
            iss: clientId,
            sub: clientId,
            jti: crypto.randomUUID(),
            nbf: now,
            exp: now + 600,
        };
        return jsonwebtoken_1.default.sign(payload, privateKey, {
            algorithm: 'RS256',
            header: {
                alg: 'RS256',
                x5t: thumbprint,
            },
        });
    }
    async exchangeJwt(jwtAssertion, tenantId) {
        const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
        const params = new URLSearchParams({
            client_id: process.env.MS_CLIENT_ID,
            scope: 'https://graph.microsoft.com/.default',
            grant_type: 'client_credentials',
            client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            client_assertion: jwtAssertion,
        });
        try {
            const response = await axios_1.default.post(tokenUrl, params.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            return response.data;
        }
        catch (error) {
            const detail = error.response?.data
                ? JSON.stringify(error.response.data)
                : error.message;
            throw new Error(`OutlookConnection: JWT token exchange failed — ${detail}`);
        }
    }
}
exports.OutlookConnection = OutlookConnection;
//# sourceMappingURL=outlook-connection.js.map