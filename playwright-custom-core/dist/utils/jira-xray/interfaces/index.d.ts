/**
 * Jira / Xray — Formal interface contracts (Dependency Inversion Principle).
 *
 * These interfaces decouple consumers from concrete implementations.
 * The default functional implementations (resolveJiraConfig, getXrayToken)
 * satisfy these contracts.  Consumers who need custom config backends
 * (e.g. HashiCorp Vault, AWS Secrets Manager) or mock auth providers
 * for testing can provide alternative implementations.
 */
import type { JiraClientConfig, XrayAuthConfig } from '../types';
/** Fully-resolved Jira connection parameters — guaranteed non-empty. */
export interface ResolvedJiraConfig {
    baseUrl: string;
    auth: {
        username: string;
        password: string;
    };
}
/**
 * Contract for resolving Jira connection configuration.
 *
 * Implementations may resolve credentials from environment variables,
 * secret vaults, config files, or any other backend.
 */
export interface IJiraConfigResolver {
    resolve(config?: JiraClientConfig): ResolvedJiraConfig;
}
/**
 * Contract for obtaining an Xray Cloud bearer token.
 *
 * The default implementation authenticates via `POST /api/v2/authenticate`.
 * Test doubles or alternative auth flows can implement this interface.
 */
export interface IXrayAuthProvider {
    getToken(config?: XrayAuthConfig): Promise<string>;
}
//# sourceMappingURL=index.d.ts.map