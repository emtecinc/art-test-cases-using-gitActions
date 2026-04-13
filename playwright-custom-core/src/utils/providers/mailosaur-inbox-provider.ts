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

const DEFAULT_RETRY: RetryConfig = {
  maxAttempts: 3,
  delayMs: 5_000,
};

export class MailosaurInboxProvider implements IInboxProvider {
  private readonly client: MailosaurClient;
  private readonly serverId: string;

  /**
   * @param serverId        - Mailosaur server/inbox ID
   * @param apiKey          - Mailosaur API key (defaults to `MAILOSAUR_API_KEY` env var)
   * @param mailosaurClient - Optional pre-built client (useful for testing)
   */
  constructor(
    serverId: string,
    apiKey?: string,
    mailosaurClient?: MailosaurClient
  ) {
    this.serverId = serverId;
    const resolvedKey = apiKey ?? (process.env.MAILOSAUR_API_KEY as string);
    if (!resolvedKey) {
      throw new Error(
        'MailosaurInboxProvider: an API key is required (pass it or set MAILOSAUR_API_KEY).'
      );
    }
    this.client = mailosaurClient ?? new MailosaurClient(resolvedKey);
  }

  async findMatchingEmails(
    sentAfter: Date,
    subject: string,
    fromAddress: string,
    retryConfig?: Partial<RetryConfig>
  ): Promise<InboxEmail[]> {
    const config: RetryConfig = { ...DEFAULT_RETRY, ...retryConfig };

    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
      console.log(
        `[MailosaurInboxProvider] Checking inbox (attempt ${attempt}/${config.maxAttempts})…`
      );

      const matches = await this.queryInbox(sentAfter, subject, fromAddress);

      if (matches.length > 0) {
        console.log(
          `[MailosaurInboxProvider] Found ${matches.length} matching email(s).`
        );
        return matches;
      }

      if (attempt < config.maxAttempts) {
        console.log(
          `[MailosaurInboxProvider] No match yet — retrying in ${config.delayMs / 1000}s…`
        );
        await this.sleep(config.delayMs);
      }
    }

    console.log('[MailosaurInboxProvider] No matching emails found after all retries.');
    return [];
  }

  // ── Private helpers ────────────────────────────────────────────

  private async queryInbox(
    sentAfter: Date,
    subject: string,
    fromAddress: string
  ): Promise<InboxEmail[]> {
    const result = await this.client.messages.list(this.serverId, { receivedAfter: sentAfter });

    if (!result?.items?.length) {
      return [];
    }

    return result.items
      .filter((msg: any) => {
        const subjectMatch = msg.subject === subject;
        const fromMatch = msg.from?.some(
          (sender: any) =>
            sender.email?.toLowerCase() === fromAddress.toLowerCase()
        );
        return subjectMatch && fromMatch;
      })
      .map((msg: any) => this.toInboxEmail(msg));
  }

  private toInboxEmail(raw: any): InboxEmail {
    return {
      id: raw.id,
      subject: raw.subject,
      from: raw.from?.[0]?.email ?? '',
      to: raw.to?.[0]?.email ?? '',
      receivedDate: new Date(raw.received),
      textBody: raw.summary ?? undefined,
      htmlBody: raw.summary ?? undefined,
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
