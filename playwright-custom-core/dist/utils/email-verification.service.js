"use strict";
/**
 * Orchestrates the two-step email verification flow:
 *
 *   1. Fetch email record(s) from the **email provider** (e.g. Salesforce)
 *      matching a timestamp + recipient + subject.
 *   2. For each fetched email, search the **inbox provider** (e.g. Mailosaur)
 *      for a matching message received after the same timestamp with the
 *      same subject and sender (fromAddress).
 *
 * OR
 *
 *   1. Use verifyWithMailosaur() to directly query the inbox provider for messages matching
 *     the timestamp + recipient + subject criteria, without first fetching from the email provider.
 *
 *   2. Use verifyWithSalesforce() to directly query the email provider for sent emails matching
 *      the timestamp + recipient + subject criteria, without first querying the inbox provider.
 *
 * Depends on abstractions (IEmailProvider, IInboxProvider) — never on concrete
 * implementations.  Swap providers via constructor injection (DIP).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerificationService = void 0;
class EmailVerificationService {
    emailProvider;
    inboxProvider;
    constructor(emailProvider, inboxProvider) {
        this.emailProvider = emailProvider;
        this.inboxProvider = inboxProvider;
    }
    /**
     * Mailosaur verification
     */
    async verifyWithMailosaur(query, retryConfig) {
        const inboxMatches = await this.inboxProvider.findMatchingEmails(query.sentAfter, query.subject, query.address, retryConfig);
        if (inboxMatches.length > 0) {
            return inboxMatches;
        }
        else {
            throw new Error(`No matching emails found in inbox for subject="${query.subject}" and address="${query.address}"`);
        }
    }
    /**
     * Salesforce verification
     */
    async verifyWithSalesforce(query, retryConfig) {
        const sentEmails = await this.emailProvider.fetchEmails(query, retryConfig);
        if (sentEmails.length > 0) {
            return sentEmails;
        }
        else {
            throw new Error(`No matching emails found in Salesforce for subject="${query.subject}" and address="${query.address}"`);
        }
    }
    /**
     * End-to-end verification: fetch emails from the source, then
     * confirm each one arrived in the inbox.
     *
     * @param query       - timestamp + recipient + subject used to find source emails
     * @param retryConfig - optional retry settings forwarded to the inbox provider
     * @returns A `VerificationResult` summarising matches and misses
     */
    async verify(query, retryConfig) {
        // Step 1 — Fetch sent emails from the provider
        console.log(`[EmailVerificationService] Fetching emails from provider (subject="${query.subject}", recipient="${query.address}")…`);
        const sentEmails = await this.emailProvider.fetchEmails(query);
        if (sentEmails.length === 0) {
            console.log('[EmailVerificationService] No emails found in the provider — nothing to verify.');
            return { allVerified: false, matchedEmails: [], unmatchedEmails: [] };
        }
        console.log(`[EmailVerificationService] Found ${sentEmails.length} email(s) in the provider.`);
        // Step 2 — For each sent email, look for a matching inbox message
        const matched = [];
        const unmatched = [];
        for (const sentEmail of sentEmails) {
            console.log(`[EmailVerificationService] Verifying inbox delivery for email id=${sentEmail.id} subject="${sentEmail.subject}"…`);
            const inboxMatches = await this.inboxProvider.findMatchingEmails(query.sentAfter, sentEmail.subject, sentEmail.fromAddress, retryConfig);
            if (inboxMatches.length > 0) {
                matched.push({
                    salesforceEmail: sentEmail,
                    inboxEmail: inboxMatches[0], // best match (most recent)
                });
            }
            else {
                unmatched.push(sentEmail);
            }
        }
        const allVerified = unmatched.length === 0;
        console.log(`[EmailVerificationService] Verification complete — ` +
            `${matched.length} matched, ${unmatched.length} unmatched.`);
        return { allVerified, matchedEmails: matched, unmatchedEmails: unmatched };
    }
}
exports.EmailVerificationService = EmailVerificationService;
//# sourceMappingURL=email-verification.service.js.map