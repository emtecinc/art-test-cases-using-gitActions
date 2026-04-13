"use strict";
/**
 * Mailosaur implementation of `IInboxProvider`.
 *
 * Searches a Mailosaur server for emails that were received after a
 * given timestamp and match on subject + sender (fromAddress).
 * Includes configurable retry/polling to handle delivery delays.
 *
 * Single Responsibility: checking a Mailosaur inbox for matching emails.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailosaurInboxProvider = void 0;
const mailosaur_1 = __importDefault(require("mailosaur"));
const DEFAULT_RETRY = {
    maxAttempts: 3,
    delayMs: 5_000,
};
class MailosaurInboxProvider {
    client;
    serverId;
    /**
     * @param serverId        - Mailosaur server/inbox ID
     * @param apiKey          - Mailosaur API key (defaults to `MAILOSAUR_API_KEY` env var)
     * @param mailosaurClient - Optional pre-built client (useful for testing)
     */
    constructor(serverId, apiKey, mailosaurClient) {
        this.serverId = serverId;
        const resolvedKey = apiKey ?? process.env.MAILOSAUR_API_KEY;
        if (!resolvedKey) {
            throw new Error('MailosaurInboxProvider: an API key is required (pass it or set MAILOSAUR_API_KEY).');
        }
        this.client = mailosaurClient ?? new mailosaur_1.default(resolvedKey);
    }
    async findMatchingEmails(sentAfter, subject, fromAddress, retryConfig) {
        const config = { ...DEFAULT_RETRY, ...retryConfig };
        for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
            console.log(`[MailosaurInboxProvider] Checking inbox (attempt ${attempt}/${config.maxAttempts})…`);
            const matches = await this.queryInbox(sentAfter, subject, fromAddress);
            if (matches.length > 0) {
                console.log(`[MailosaurInboxProvider] Found ${matches.length} matching email(s).`);
                return matches;
            }
            if (attempt < config.maxAttempts) {
                console.log(`[MailosaurInboxProvider] No match yet — retrying in ${config.delayMs / 1000}s…`);
                await this.sleep(config.delayMs);
            }
        }
        console.log('[MailosaurInboxProvider] No matching emails found after all retries.');
        return [];
    }
    // ── Private helpers ────────────────────────────────────────────
    async queryInbox(sentAfter, subject, fromAddress) {
        const result = await this.client.messages.list(this.serverId, { receivedAfter: sentAfter });
        if (!result?.items?.length) {
            return [];
        }
        return result.items
            .filter((msg) => {
            const subjectMatch = msg.subject === subject;
            const fromMatch = msg.from?.some((sender) => sender.email?.toLowerCase() === fromAddress.toLowerCase());
            return subjectMatch && fromMatch;
        })
            .map((msg) => this.toInboxEmail(msg));
    }
    toInboxEmail(raw) {
        return {
            id: raw.id,
            subject: raw.subject,
            from: raw.from?.[0]?.email ?? '',
            to: raw.to?.[0]?.email ?? '',
            receivedDate: new Date(raw.received),
            textBody: raw.summary ?? undefined,
            htmlBody: raw.summary ?? undefined,
        };
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
exports.MailosaurInboxProvider = MailosaurInboxProvider;
//# sourceMappingURL=mailosaur-inbox-provider.js.map