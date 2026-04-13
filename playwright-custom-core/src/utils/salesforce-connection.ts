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

import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// ── Internal types ─────────────────────────────────────────────────

interface JwtTokenResponse {
  access_token: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
}

export interface SalesforceCredentials {
  accessToken: string;
  instanceUrl: string;
}

// ── Connection class ────────────────────────────────────────────────

export class SalesforceConnection {
  private connectionPromise: Promise<SalesforceCredentials> | null = null;
  private static instance: SalesforceConnection | null = null;

  private readonly username: string;
  private readonly clientId: string;
  private readonly loginUrl: string;
  private readonly privateKeyPath: string;
  private readonly _orgUrl: string;

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
  static getInstance(): SalesforceConnection {
    if (!SalesforceConnection.instance) {
      SalesforceConnection.instance = new SalesforceConnection();
    }
    return SalesforceConnection.instance;
  }

  /** Reset the singleton (useful after config changes or in test teardown). */
  static resetInstance(): void {
    SalesforceConnection.instance = null;
  }

  /** The Salesforce org URL from BASE_URL. */
  get orgUrl(): string {
    return this._orgUrl;
  }

  /**
   * Get (or lazily create) an authenticated jsforce `Connection`.
   * The promise is cached — subsequent calls reuse the same connection.
   */
  async getConnection(): Promise<SalesforceCredentials> {
    if (!this.connectionPromise) {
      this.connectionPromise = this.authenticate();
    }
    return this.connectionPromise;
  }

  /** Force a fresh connection on the next `getConnection()` call. */
  reset(): void {
    this.connectionPromise = null;
  }

  // ── Private ────────────────────────────────────────────────────

  private async authenticate(): Promise<SalesforceCredentials> {
    const resolvedKeyPath = path.isAbsolute(this.privateKeyPath)
      ? this.privateKeyPath
      : path.resolve(process.cwd(), this.privateKeyPath);

    if (!fs.existsSync(resolvedKeyPath)) {
      throw new Error(
        `[SalesforceConnection] Private key not found at "${resolvedKeyPath}".`
      );
    }

    const privateKey = fs.readFileSync(resolvedKeyPath, 'utf8');
    const jwtToken = this.buildJwt(privateKey);
    console.log(`[SalesforceConnection] JWT token generated: ${JSON.stringify(jwtToken)}`);

    const tokenResponse = await this.exchangeJwt(jwtToken);
    console.log(
      `[SalesforceConnection] Authenticated as ${this.username} ` +
      `(instance: ${tokenResponse.instance_url})`
    );

    return {
      instanceUrl: tokenResponse.instance_url,
      accessToken: tokenResponse.access_token,
    };
  }

  private buildJwt(privateKey: string): string {
    const payload = {
      iss: this.clientId,
      sub: this.username,
      aud: this.loginUrl,
      exp: Math.floor(Date.now() / 1000) + 180,
    };
    return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
  }

  private async exchangeJwt(jwtToken: string): Promise<JwtTokenResponse> {
    console.log("Dtatatatatatata", jwtToken);
    const tokenUrl = `${this.loginUrl}/services/oauth2/token`;
    const params = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwtToken,
    });
console.log("Dtatatata", tokenUrl, params.toString());
    try {
      const response = await axios.post<JwtTokenResponse>(
        tokenUrl,
        params.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      return response.data;
    } catch (error: any) {
      const detail = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      throw new Error(
        `[SalesforceConnection] JWT token exchange failed — ${detail}`
      );
    }
  }

  private requireEnv(varName: string): string {
    const value = process.env[varName];
    if (!value) {
      throw new Error(`[SalesforceConnection] ${varName} env var is required.`);
    }
    return value;
  }
}
