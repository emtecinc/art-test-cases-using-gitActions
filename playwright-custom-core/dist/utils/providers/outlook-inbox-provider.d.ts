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
import { IInboxProvider } from '../interfaces/inbox-provider.interface';
import { InboxEmail, RetryConfig } from '../interfaces/types';
export declare class OutlookInboxProvider implements IInboxProvider {
    private readonly mailbox;
    /**
     * @param mailbox - mailbox to query ("me" or user email)
     */
    constructor(mailbox?: string);
    findMatchingEmails(sentAfter: Date, subject: string, fromAddress: string, retryConfig?: Partial<RetryConfig>): Promise<InboxEmail[]>;
    private queryInbox;
    private toInboxEmail;
    private sleep;
}
//# sourceMappingURL=outlook-inbox-provider.d.ts.map