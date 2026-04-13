/**
 * Salesforce implementation of `IEmailProvider`.
 *
 * Queries the `EmailMessage` object for records that match a given
 * timestamp, recipient (ToAddress), and subject.
 *
 * Single Responsibility: fetching email records from Salesforce.
 * Depends on the `SalesforceConnection` abstraction for connectivity.
 */

import axios from 'axios';

import { IEmailProvider } from '../interfaces/email-provider.interface';
import { EmailQuery, EmailRecord, RetryConfig } from '../interfaces/types';
import { SalesforceConnection } from '../salesforce-connection';

/** REST API version — override with the SF_API_VERSION env var. */
const SF_API_VERSION = process.env.SF_API_VERSION ?? 'v65.0';

/** Shape returned by the Salesforce SOQL query endpoint. */
interface SoqlQueryResult {
  totalSize: number;
  done: boolean;
  records: any[];
  nextRecordsUrl?: string;
}

const DEFAULT_RETRY: RetryConfig = {
  maxAttempts: 3,
  delayMs: 5_000,
};

export class SalesforceEmailProvider implements IEmailProvider {
  private readonly sfConnection: SalesforceConnection;

  /**
   * @param sfConnection  Optional injected connection. Defaults to the singleton.
   */
  constructor(sfConnection?: SalesforceConnection) {
    this.sfConnection = sfConnection ?? SalesforceConnection.getInstance();
  }

  async fetchEmails(query: EmailQuery, retryConfig?: Partial<RetryConfig>): Promise<EmailRecord[]> {
    const config: RetryConfig = { ...DEFAULT_RETRY, ...retryConfig };

    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
      console.log(
        `[SalesforceEmailProvider] Querying EmailMessage records (attempt ${attempt}/${config.maxAttempts})…`
      );

      const records = await this.queryEmails(query);

      if (records.length > 0) {
        console.log(
          `[SalesforceEmailProvider] Found ${records.length} matching record(s).`
        );
        return records;
      }

      if (attempt < config.maxAttempts) {
        console.log(
          `[SalesforceEmailProvider] No records yet — retrying in ${config.delayMs / 1000}s…`
        );
        await this.sleep(config.delayMs);
      }
    }

    console.log('[SalesforceEmailProvider] No matching email records found after all retries.');
    return [];
  }

  // ── Private helpers ────────────────────────────────────────────

  private async queryEmails(query: EmailQuery): Promise<EmailRecord[]> {
    const { accessToken, instanceUrl } = await this.sfConnection.getConnection();

    const isoTimestamp = query.sentAfter.toISOString();
    const safeRecipient = this.escapeSOQL(query.address);
    const safeSubject = this.escapeSOQL(query.subject);

    // Build a single-line SOQL string — URLSearchParams will encode it safely.
    const soql = [
      'SELECT Id, Subject, ToAddress, FromAddress, TextBody, HtmlBody, CreatedDate',
      'FROM EmailMessage',
      `WHERE ToAddress = '${safeRecipient}'`,
      `AND Subject = '${safeSubject}'`,
      `AND CreatedDate >= ${isoTimestamp}`,
      'ORDER BY CreatedDate DESC',
    ].join(' ');

    const baseUrl = `${instanceUrl}/services/data/${SF_API_VERSION}`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    };

    // First page
    const firstPage = await axios.get<SoqlQueryResult>(`${baseUrl}/query`, {
      headers,
      params: { q: soql },
    });

    const allRecords: any[] = [...firstPage.data.records];

    // Follow pagination cursors until done
    let nextUrl = firstPage.data.nextRecordsUrl;
    while (nextUrl) {
      const page = await axios.get<SoqlQueryResult>(`${instanceUrl}${nextUrl}`, { headers });
      allRecords.push(...page.data.records);
      nextUrl = page.data.nextRecordsUrl;
    }

    return allRecords.map((record) => this.toEmailRecord(record));
  }

  private toEmailRecord(raw: any): EmailRecord {
    return {
      id: raw.Id,
      subject: raw.Subject,
      toAddress: raw.ToAddress,
      fromAddress: raw.FromAddress,
      textBody: raw.TextBody ?? undefined,
      htmlBody: raw.HtmlBody ?? undefined,
      sentDate: new Date(raw.CreatedDate),
    };
  }

  private escapeSOQL(value: string): string {
    return value.replace(/'/g, "\\'");
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
