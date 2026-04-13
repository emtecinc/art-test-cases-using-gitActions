"use strict";
/**
 * Outlook implementation of `IInboxProvider`.
 *
 * Searches a Microsoft Outlook mailbox (via Microsoft Graph API)
 * for emails received after a given timestamp that match
 * subject + sender.
 *
 * Includes configurable retry/polling to handle delivery delays.
 *
 * Single Responsibility: checking an Outlook inbox for matching emails.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlookInboxProvider = void 0;
const outlook_connection_1 = require("../outlook-connection");
const DEFAULT_RETRY = {
    maxAttempts: 3,
    delayMs: 5_000,
};
class OutlookInboxProvider {
    mailbox;
    /**
     * @param mailbox - mailbox to query ("me" or user email)
     */
    constructor(mailbox = 'me') {
        this.mailbox = mailbox;
    }
    async findMatchingEmails(sentAfter, subject, fromAddress, retryConfig) {
        const config = { ...DEFAULT_RETRY, ...retryConfig };
        for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
            console.log(`[OutlookInboxProvider] Checking inbox (attempt ${attempt}/${config.maxAttempts})…`);
            const matches = await this.queryInbox(sentAfter, subject, fromAddress);
            if (matches.length > 0) {
                console.log(`[OutlookInboxProvider] Found ${matches.length} matching email(s).`);
                return matches;
            }
            if (attempt < config.maxAttempts) {
                console.log(`[OutlookInboxProvider] No match yet — retrying in ${config.delayMs / 1000}s…`);
                await this.sleep(config.delayMs);
            }
        }
        console.log('[OutlookInboxProvider] No matching emails found after all retries.');
        return [];
    }
    // ── Private helpers ────────────────────────────────────────────
    async queryInbox(sentAfter, subject, fromAddress) {
        const client = await outlook_connection_1.OutlookConnection.getInstance().getClient();
        const isoDate = sentAfter.toISOString();
        const filter = [
            `receivedDateTime ge ${isoDate}`,
            `from/emailAddress/address eq '${fromAddress}'`,
        ].join(' and ');
        const response = await client.get(`/users/${this.mailbox}/mailFolders/inbox/messages`, {
            params: {
                $select: 'id,subject,from,toRecipients,receivedDateTime,bodyPreview',
                $orderby: 'receivedDateTime desc',
                $filter: filter,
                $top: 50,
            },
        });
        const messages = response.data?.value ?? [];
        return messages
            .filter((msg) => msg.subject === subject)
            .map((msg) => this.toInboxEmail(msg));
    }
    toInboxEmail(raw) {
        return {
            id: raw.id,
            subject: raw.subject,
            from: raw.from?.emailAddress?.address ?? '',
            to: raw.toRecipients?.[0]?.emailAddress?.address ?? '',
            receivedDate: new Date(raw.receivedDateTime),
            textBody: raw.bodyPreview ?? undefined,
            htmlBody: raw.bodyPreview ?? undefined,
        };
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
exports.OutlookInboxProvider = OutlookInboxProvider;
//# sourceMappingURL=outlook-inbox-provider.js.map