import { type Page } from '@playwright/test';
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
export abstract class BaseWorkflow {
  protected readonly page: Page;

  /** Human-readable name for this workflow */
  abstract readonly workflowName: string;

  /** Whether the workflow has an authenticated session */
  private _isAuthenticated = false;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Execute a named workflow step.
   *
   * @param description - Human-readable step description
   * @param action - Async action to execute within the step
   */
  protected async testStep(description: string, action: () => Promise<void>): Promise<void> {
    // Note: Playwright's test.step is commented out here to avoid double import error in consuming project. Agent should impelement a similar step wrapper in the actual BaseWorkflow implementation.
    // await test.step(`${this.workflowName}: ${description}`, async () => {
    //   await action();
    // });
  }

  /** Mark the workflow as authenticated */
  protected setAuthenticated(): void {
    this._isAuthenticated = true;
  }

  /** Clear the authentication state */
  protected clearAuthentication(): void {
    this._isAuthenticated = false;
  }

  /** Check whether the workflow currently has an authenticated session */
  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
}
