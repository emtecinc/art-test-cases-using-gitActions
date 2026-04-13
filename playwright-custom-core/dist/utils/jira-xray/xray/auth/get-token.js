"use strict";
/**
 * Xray Cloud authentication — obtain a bearer token.
 *
 * Uses `POST /api/v2/authenticate`.
 * Conforms to the `IXrayAuthProvider` interface contract.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXrayToken = getXrayToken;
const axios_1 = __importDefault(require("axios"));
const DEFAULT_AUTH_URL = 'https://xray.cloud.getxray.app/api/v2/authenticate';
/**
 * Authenticate with Xray Cloud and return a bearer token.
 *
 * @param config  Xray auth credentials.  Falls back to env vars
 *                `XRAY_CLIENT_ID` / `XRAY_CLIENT_SECRET`.
 * @throws {Error} if client ID or secret is missing.
 */
async function getXrayToken(config = {}) {
    const clientId = config.clientId ?? process.env.XRAY_CLIENT_ID;
    const clientSecret = config.clientSecret ?? process.env.XRAY_CLIENT_SECRET;
    const authenticateUrl = config.authenticateUrl ?? DEFAULT_AUTH_URL;
    if (!clientId || !clientSecret) {
        throw new Error('Xray client_id and client_secret are required. ' +
            'Provide them via config or XRAY_CLIENT_ID / XRAY_CLIENT_SECRET env vars.');
    }
    const response = await axios_1.default.post(authenticateUrl, {
        client_id: clientId,
        client_secret: clientSecret,
    });
    return response.data;
}
//# sourceMappingURL=get-token.js.map