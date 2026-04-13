"use strict";
/**
 * Barrel export for concrete inbox/email provider implementations.
 *
 * Depend on the `IEmailProvider` or `IInboxProvider` interfaces at call-sites,
 * and inject the concrete provider via a constructor parameter.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlookInboxProvider = exports.MailosaurInboxProvider = exports.SalesforceEmailProvider = void 0;
var salesforce_email_provider_1 = require("./salesforce-email-provider");
Object.defineProperty(exports, "SalesforceEmailProvider", { enumerable: true, get: function () { return salesforce_email_provider_1.SalesforceEmailProvider; } });
var mailosaur_inbox_provider_1 = require("./mailosaur-inbox-provider");
Object.defineProperty(exports, "MailosaurInboxProvider", { enumerable: true, get: function () { return mailosaur_inbox_provider_1.MailosaurInboxProvider; } });
var outlook_inbox_provider_1 = require("./outlook-inbox-provider");
Object.defineProperty(exports, "OutlookInboxProvider", { enumerable: true, get: function () { return outlook_inbox_provider_1.OutlookInboxProvider; } });
//# sourceMappingURL=index.js.map