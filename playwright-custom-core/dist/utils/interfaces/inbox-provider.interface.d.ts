/**
 * Abstraction for any inbox that **receives** emails and can be
 * searched (e.g. Mailosaur, Gmail API, IMAP).
 */
import { InboxEmail, RetryConfig } from './types';
export interface IInboxProvider {
    /**
     * Search the inbox for emails that match the given criteria.
     *
     * Implementations should apply retry/polling logic internally so
     * callers don't need to worry about delivery delays.
     *
     * @param sentAfter   - Only consider emails received on or after this moment
     * @param subject     - Expected subject line
     * @param fromAddress - Expected sender address
     * @param retryConfig - Optional retry/polling configuration
     * @returns Array of matching inbox emails (may be empty after exhausting retries)
     */
    findMatchingEmails(sentAfter: Date, subject: string, fromAddress: string, retryConfig?: Partial<RetryConfig>): Promise<InboxEmail[]>;
}
//# sourceMappingURL=inbox-provider.interface.d.ts.map