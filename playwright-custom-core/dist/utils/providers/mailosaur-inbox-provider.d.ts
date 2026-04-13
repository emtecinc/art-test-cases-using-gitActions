/**
 * Mailosaur implementation of `IInboxProvider`.
 *
 * Searches a Mailosaur server for emails that were received after a
 * given timestamp and match on subject + sender (fromAddress).
 * Includes configurable retry/polling to handle delivery delays.
 *
 * Single Responsibility: checking a Mailosaur inbox for matching emails.
 */
import MailosaurClient from 'mailosaur';
import { IInboxProvider } from '../interfaces/inbox-provider.interface';
import { InboxEmail, RetryConfig } from '../interfaces/types';
export declare class MailosaurInboxProvider implements IInboxProvider {
    private readonly client;
    private readonly serverId;
    /**
     * @param serverId        - Mailosaur server/inbox ID
     * @param apiKey          - Mailosaur API key (defaults to `MAILOSAUR_API_KEY` env var)
     * @param mailosaurClient - Optional pre-built client (useful for testing)
     */
    constructor(serverId: string, apiKey?: string, mailosaurClient?: MailosaurClient);
    findMatchingEmails(sentAfter: Date, subject: string, fromAddress: string, retryConfig?: Partial<RetryConfig>): Promise<InboxEmail[]>;
    private queryInbox;
    private toInboxEmail;
    private sleep;
}
//# sourceMappingURL=mailosaur-inbox-provider.d.ts.map