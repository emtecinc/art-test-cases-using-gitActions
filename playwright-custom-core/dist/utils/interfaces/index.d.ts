/**
 * Barrel export for all types and interfaces in the utils/interfaces layer.
 *
 * Import from this entry point to avoid deep import paths:
 *
 *   import type { EmailQuery, IEmailProvider } from 'playwright-custom-core';
 */
export type { EmailQuery, EmailRecord, InboxEmail, MatchedEmailPair, RetryConfig, VerificationResult, } from './types';
export type { IEmailProvider } from './email-provider.interface';
export type { IInboxProvider } from './inbox-provider.interface';
export type { ISalesforceLoginService } from './salesforce-login.interface';
export type { ISessionRefreshMiddleware } from './session-refresh.interface';
//# sourceMappingURL=index.d.ts.map