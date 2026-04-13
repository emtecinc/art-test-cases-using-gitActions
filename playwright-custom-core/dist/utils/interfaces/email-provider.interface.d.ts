/**
 * Abstraction for any system that **sends** emails and can be queried
 * for historical send records (e.g. Salesforce EmailMessage).
 *
 * Follows the Interface Segregation Principle — consumers that only
 * need to *fetch* sent emails depend on this narrow contract.
 */
import { EmailQuery, EmailRecord, RetryConfig } from './types';
export interface IEmailProvider {
    /**
     * Return all email records that match the given query criteria.
     *
     * @param query - timestamp + recipient + subject filter
     * @returns Array of matching email records (may be empty)
     */
    fetchEmails(query: EmailQuery, retryConfig?: Partial<RetryConfig>): Promise<EmailRecord[]>;
}
//# sourceMappingURL=email-provider.interface.d.ts.map