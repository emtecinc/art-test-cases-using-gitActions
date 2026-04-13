"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWorkflow = void 0;
// import { test } from '@playwright/test';
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
class BaseWorkflow {
    page;
    /** Whether the workflow has an authenticated session */
    _isAuthenticated = false;
    constructor(page) {
        this.page = page;
    }
    /**
     * Execute a named workflow step.
     *
     * @param description - Human-readable step description
     * @param action - Async action to execute within the step
     */
    async testStep(description, action) {
        // Note: Playwright's test.step is commented out here to avoid double import error in consuming project. Agent should impelement a similar step wrapper in the actual BaseWorkflow implementation.
        // await test.step(`${this.workflowName}: ${description}`, async () => {
        //   await action();
        // });
    }
    /** Mark the workflow as authenticated */
    setAuthenticated() {
        this._isAuthenticated = true;
    }
    /** Clear the authentication state */
    clearAuthentication() {
        this._isAuthenticated = false;
    }
    /** Check whether the workflow currently has an authenticated session */
    get isAuthenticated() {
        return this._isAuthenticated;
    }
}
exports.BaseWorkflow = BaseWorkflow;
//# sourceMappingURL=base-workflow.js.map