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

import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface GraphTokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
}

export class OutlookConnection {
  private static instance: OutlookConnection;

  private clientPromise: Promise<AxiosInstance> | null = null;
  private tokenExpiry: number | null = null;

  private constructor() {}

  static getInstance(): OutlookConnection {
    if (!OutlookConnection.instance) {
      OutlookConnection.instance = new OutlookConnection();
    }
    return OutlookConnection.instance;
  }

  async getClient(): Promise<AxiosInstance> {
    if (
      this.clientPromise &&
      this.tokenExpiry &&
      Date.now() < this.tokenExpiry
    ) {
      return this.clientPromise;
    }

    this.clientPromise = this.authenticate();
    return this.clientPromise;
  }

  reset(): void {
    this.clientPromise = null;
    this.tokenExpiry = null;
  }

  // ── Private ─────────────────────────────────────────────

  private async authenticate(): Promise<AxiosInstance> {
    const tenantId = process.env.MS_TENANT_ID;
    const clientId = process.env.MS_CLIENT_ID;
    const privateKeyPath =
      process.env.MS_PRIVATE_KEY_PATH ||
      path.resolve(process.cwd(), 'graph.key');
    const certThumbprint = process.env.MS_CERT_THUMBPRINT;

    if (!tenantId) {
      throw new Error(
        'OutlookConnection: MS_TENANT_ID environment variable is required.'
      );
    }
    if (!clientId) {
      throw new Error(
        'OutlookConnection: MS_CLIENT_ID environment variable is required.'
      );
    }
    if (!certThumbprint) {
      throw new Error(
        'OutlookConnection: MS_CERT_THUMBPRINT environment variable is required.'
      );
    }
    if (!fs.existsSync(privateKeyPath)) {
      throw new Error(
        `OutlookConnection: Private key not found at "${privateKeyPath}".`
      );
    }

    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    const jwtAssertion = this.buildJwt(tenantId, clientId, privateKey, certThumbprint);
    const tokenResponse = await this.exchangeJwt(jwtAssertion, tenantId);

    console.log('[OutlookConnection] Graph API authenticated.');

    this.tokenExpiry = Date.now() + (tokenResponse.expires_in - 60) * 1000;

    return axios.create({
      baseURL: 'https://graph.microsoft.com/v1.0',
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
    });
  }

  private buildJwt(
    tenantId: string,
    clientId: string,
    privateKey: string,
    thumbprint: string
  ): string {
    const now = Math.floor(Date.now() / 1000);

    const payload = {
      aud: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      iss: clientId,
      sub: clientId,
      jti: crypto.randomUUID(),
      nbf: now,
      exp: now + 600,
    };

    return jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      header: {
        alg: 'RS256',
        x5t: thumbprint,
      },
    } as Parameters<typeof jwt.sign>[2]);
  }

  private async exchangeJwt(
    jwtAssertion: string,
    tenantId: string
  ): Promise<GraphTokenResponse> {
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    const params = new URLSearchParams({
      client_id: process.env.MS_CLIENT_ID!,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
      client_assertion_type:
        'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: jwtAssertion,
    });

    try {
      const response = await axios.post<GraphTokenResponse>(
        tokenUrl,
        params.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      return response.data;
    } catch (error: any) {
      const detail = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      throw new Error(
        `OutlookConnection: JWT token exchange failed — ${detail}`
      );
    }
  }
}
