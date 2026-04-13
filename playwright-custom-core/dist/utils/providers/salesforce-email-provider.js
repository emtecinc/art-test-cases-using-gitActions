"use strict";
/**
 * Salesforce implementation of `IEmailProvider`.
 *
 * Queries the `EmailMessage` object for records that match a given
 * timestamp, recipient (ToAddress), and subject.
 *
 * Single Responsibility: fetching email records from Salesforce.
 * Depends on the `SalesforceConnection` abstraction for connectivity.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesforceEmailProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const salesforce_connection_1 = require("../salesforce-connection");
/** REST API version — override with the SF_API_VERSION env var. */
const SF_API_VERSION = process.env.SF_API_VERSION ?? 'v65.0';
const DEFAULT_RETRY = {
    maxAttempts: 3,
    delayMs: 5_000,
};
class SalesforceEmailProvider {
    sfConnection;
    /**
     * @param sfConnection  Optional injected connection. Defaults to the singleton.
     */
    constructor(sfConnection) {
        this.sfConnection = sfConnection ?? salesforce_connection_1.SalesforceConnection.getInstance();
    }
    async fetchEmails(query, retryConfig) {
        const config = { ...DEFAULT_RETRY, ...retryConfig };
        for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
            console.log(`[SalesforceEmailProvider] Querying EmailMessage records (attempt ${attempt}/${config.maxAttempts})…`);
            const records = await this.queryEmails(query);
            if (records.length > 0) {
                console.log(`[SalesforceEmailProvider] Found ${records.length} matching record(s).`);
                return records;
            }
            if (attempt < config.maxAttempts) {
                console.log(`[SalesforceEmailProvider] No records yet — retrying in ${config.delayMs / 1000}s…`);
                await this.sleep(config.delayMs);
            }
        }
        console.log('[SalesforceEmailProvider] No matching email records found after all retries.');
        return [];
    }
    // ── Private helpers ────────────────────────────────────────────
    async queryEmails(query) {
        const { accessToken, instanceUrl } = await this.sfConnection.getConnection();
        const isoTimestamp = query.sentAfter.toISOString();
        const safeRecipient = this.escapeSOQL(query.address);
        const safeSubject = this.escapeSOQL(query.subject);
        // Build a single-line SOQL string — URLSearchParams will encode it safely.
        const soql = [
            'SELECT Id, Subject, ToAddress, FromAddress, TextBody, HtmlBody, CreatedDate',
            'FROM EmailMessage',
            `WHERE ToAddress = '${safeRecipient}'`,
            `AND Subject = '${safeSubject}'`,
            `AND CreatedDate >= ${isoTimestamp}`,
            'ORDER BY CreatedDate DESC',
        ].join(' ');
        const baseUrl = `${instanceUrl}/services/data/${SF_API_VERSION}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
        };
        // First page
        const firstPage = await axios_1.default.get(`${baseUrl}/query`, {
            headers,
            params: { q: soql },
        });
        const allRecords = [...firstPage.data.records];
        // Follow pagination cursors until done
        let nextUrl = firstPage.data.nextRecordsUrl;
        while (nextUrl) {
            const page = await axios_1.default.get(`${instanceUrl}${nextUrl}`, { headers });
            allRecords.push(...page.data.records);
            nextUrl = page.data.nextRecordsUrl;
        }
        return allRecords.map((record) => this.toEmailRecord(record));
    }
    toEmailRecord(raw) {
        return {
            id: raw.Id,
            subject: raw.Subject,
            toAddress: raw.ToAddress,
            fromAddress: raw.FromAddress,
            textBody: raw.TextBody ?? undefined,
            htmlBody: raw.HtmlBody ?? undefined,
            sentDate: new Date(raw.CreatedDate),
        };
    }
    escapeSOQL(value) {
        return value.replace(/'/g, "\\'");
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
exports.SalesforceEmailProvider = SalesforceEmailProvider;
//# sourceMappingURL=salesforce-email-provider.js.map