"use strict";
/**
 * Jira / Xray — Formal interface contracts (Dependency Inversion Principle).
 *
 * These interfaces decouple consumers from concrete implementations.
 * The default functional implementations (resolveJiraConfig, getXrayToken)
 * satisfy these contracts.  Consumers who need custom config backends
 * (e.g. HashiCorp Vault, AWS Secrets Manager) or mock auth providers
 * for testing can provide alternative implementations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=index.js.map