/** Criteria used to locate emails sent from Salesforce. */
export interface EmailQuery {
    /** Only consider emails sent on or after this moment. */
    sentAfter: Date;
    /** The intended recipient (Salesforce `ToAddress`). */
    address: string;
    /** The email subject to match. */
    subject: string;
}
/** Normalised representation of a Salesforce `EmailMessage` record. */
export interface EmailRecord {
    id: string;
    subject: string;
    toAddress: string;
    fromAddress: string;
    textBody?: string;
    htmlBody?: string;
    sentDate: Date;
}
/** Normalised representation of an email retrieved from an inbox provider. */
export interface InboxEmail {
    id: string;
    subject: string;
    from: string;
    to: string;
    receivedDate: Date;
    textBody?: string;
    htmlBody?: string;
}
/** Outcome of matching Salesforce-sent emails against the inbox. */
export interface VerificationResult {
    /** `true` when every Salesforce email has a corresponding inbox match. */
    allVerified: boolean;
    /** Salesforce emails that were found in the inbox. */
    matchedEmails: MatchedEmailPair[];
    /** Salesforce emails for which no inbox match was found. */
    unmatchedEmails: EmailRecord[];
}
/** A single Salesforce ↔ Inbox match. */
export interface MatchedEmailPair {
    salesforceEmail: EmailRecord;
    inboxEmail: InboxEmail;
}
/** Configuration for retry behaviour when polling an inbox. */
export interface RetryConfig {
    /** Maximum number of attempts (default: 3). */
    maxAttempts: number;
    /** Delay in milliseconds between attempts (default: 5 000). */
    delayMs: number;
}
//# sourceMappingURL=types.d.ts.map