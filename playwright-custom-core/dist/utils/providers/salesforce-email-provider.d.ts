/**
 * Salesforce implementation of `IEmailProvider`.
 *
 * Queries the `EmailMessage` object for records that match a given
 * timestamp, recipient (ToAddress), and subject.
 *
 * Single Responsibility: fetching email records from Salesforce.
 * Depends on the `SalesforceConnection` abstraction for connectivity.
 */
import { IEmailProvider } from '../interfaces/email-provider.interface';
import { EmailQuery, EmailRecord, RetryConfig } from '../interfaces/types';
import { SalesforceConnection } from '../salesforce-connection';
export declare class SalesforceEmailProvider implements IEmailProvider {
    private readonly sfConnection;
    /**
     * @param sfConnection  Optional injected connection. Defaults to the singleton.
     */
    constructor(sfConnection?: SalesforceConnection);
    fetchEmails(query: EmailQuery, retryConfig?: Partial<RetryConfig>): Promise<EmailRecord[]>;
    private queryEmails;
    private toEmailRecord;
    private escapeSOQL;
    private sleep;
}
//# sourceMappingURL=salesforce-email-provider.d.ts.map