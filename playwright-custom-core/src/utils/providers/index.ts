/**
 * Barrel export for concrete inbox/email provider implementations.
 *
 * Depend on the `IEmailProvider` or `IInboxProvider` interfaces at call-sites,
 * and inject the concrete provider via a constructor parameter.
 */

export { SalesforceEmailProvider } from './salesforce-email-provider';
export { MailosaurInboxProvider } from './mailosaur-inbox-provider';
export { OutlookInboxProvider } from './outlook-inbox-provider';
