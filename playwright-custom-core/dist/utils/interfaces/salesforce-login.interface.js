"use strict";
/**
 * Contract for any Salesforce browser login implementation.
 *
 * Interface Segregation: this interface is narrow and focused solely on
 * establishing an authenticated browser context.  It knows nothing about
 * how the token is obtained or where the session is persisted.
 *
 * Dependency Inversion: callers (e.g. global-setup.ts) depend on this
 * abstraction, not on the concrete SalesforceLoginService.  This makes
 * it trivial to swap implementations (e.g. a mock in unit tests).
 */
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=salesforce-login.interface.js.map