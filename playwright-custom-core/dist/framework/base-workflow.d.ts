import { type Page } from '@playwright/test';
/**
 * Base Workflow
 *
 * Abstract base class for multi-step test workflows.
 * Provides authentication state tracking and structured step execution.
 *
 * @example
 * ```ts
 * class CheckoutWorkflow extends BaseWorkflow {
 *   readonly workflowName = 'CheckoutWorkflow';
 *
 *   constructor(page: Page) {
 *     super(page);
 *   }
 *
 *   async completeCheckout(): Promise<void> {
 *     await this.step('Add item to cart', async () => { ... });
 *     await this.step('Enter shipping info', async () => { ... });
 *     await this.step('Confirm order', async () => { ... });
 *   }
 * }
 * ```
 */
export declare abstract class BaseWorkflow {
    protected readonly page: Page;
    /** Human-readable name for this workflow */
    abstract readonly workflowName: string;
    /** Whether the workflow has an authenticated session */
    private _isAuthenticated;
    constructor(page: Page);
    /**
     * Execute a named workflow step.
     *
     * @param description - Human-readable step description
     * @param action - Async action to execute within the step
     */
    protected testStep(description: string, action: () => Promise<void>): Promise<void>;
    /** Mark the workflow as authenticated */
    protected setAuthenticated(): void;
    /** Clear the authentication state */
    protected clearAuthentication(): void;
    /** Check whether the workflow currently has an authenticated session */
    get isAuthenticated(): boolean;
}
//# sourceMappingURL=base-workflow.d.ts.map