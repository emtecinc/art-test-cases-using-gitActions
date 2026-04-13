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
import { IEmailProvider } from './interfaces/email-provider.interface';
import { IInboxProvider } from './interfaces/inbox-provider.interface';
import { EmailQuery, EmailRecord, InboxEmail, RetryConfig, VerificationResult } from './interfaces/types';
export declare class EmailVerificationService {
    private readonly emailProvider;
    private readonly inboxProvider;
    constructor(emailProvider: IEmailProvider, inboxProvider: IInboxProvider);
    /**
     * Mailosaur verification
     */
    verifyWithMailosaur(query: EmailQuery, retryConfig?: Partial<RetryConfig>): Promise<InboxEmail[]>;
    /**
     * Salesforce verification
     */
    verifyWithSalesforce(query: EmailQuery, retryConfig?: Partial<RetryConfig>): Promise<EmailRecord[]>;
    /**
     * End-to-end verification: fetch emails from the source, then
     * confirm each one arrived in the inbox.
     *
     * @param query       - timestamp + recipient + subject used to find source emails
     * @param retryConfig - optional retry settings forwarded to the inbox provider
     * @returns A `VerificationResult` summarising matches and misses
     */
    verify(query: EmailQuery, retryConfig?: Partial<RetryConfig>): Promise<VerificationResult>;
}
//# sourceMappingURL=email-verification.service.d.ts.map