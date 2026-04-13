---
applyTo: "workflows/**/*.ts"
---

# Workflow Rules

## Class Structure

Every Workflow MUST:
- Extend `BaseWorkflow` from `playwright-custom-core`
- Declare `readonly workflowName: string`
- Accept `(page: Page, baseUrl?: string)` in the constructor
- Instantiate **only the page objects needed** for the specific scenario

```typescript
import { Page } from '@playwright/test';
import { BaseWorkflow } from 'playwright-custom-core';
import { OpportunityListPage } from '../../pages/opportunities/opportunity-list-page';
import { OpportunityCreationPage } from '../../pages/opportunities/opportunity-creation-page';

export class CreateOpportunityWorkflow extends BaseWorkflow {
  readonly workflowName = 'CreateOpportunityWorkflow';

  private listPage: OpportunityListPage;
  private creationPage: OpportunityCreationPage;

  constructor(page: Page, baseUrl?: string) {
    super(page);
    const url = baseUrl || process.env.BASE_URL || '';
    this.listPage = new OpportunityListPage(page, url);
    this.creationPage = new OpportunityCreationPage(page, url);
  }
}
```

## Demand-Driven Page Imports (CRITICAL)

Import and instantiate **only the page objects needed** for the workflow's scenario. Don't import all pages for an object.

```typescript
// ✅ Only uses list + creation pages
import { OpportunityListPage } from '../../pages/opportunities/opportunity-list-page';
import { OpportunityCreationPage } from '../../pages/opportunities/opportunity-creation-page';

// ❌ Imports pages not used in this workflow
import { OpportunityDetailPage } from '...';
import { OpportunityRelatedPage } from '...';
```

## SF-Basepage Usage

Every workflow that needs navigation MUST use `SalesforcePage` from `pages/SF-Basepage/sf-page.ts`:

```typescript
import { SalesforcePage } from '../../pages/SF-Basepage/sf-page';

// In constructor:
this.sfPage = new SalesforcePage(page, url);

// Standard navigation methods every workflow exposes:
async navigateToBaseUrl(): Promise<void> {
  await this.testStep('Navigate to Salesforce home', async () => {
    await this.sfPage.navigateToBaseUrl();
  });
}

async closeAllPrimaryTabs(): Promise<void> {
  await this.testStep('Close all primary tabs', async () => {
    await this.sfPage.closeAllPrimaryTabs();
  });
}

async navigateToOpportunities(): Promise<void> {
  await this.testStep('Navigate to Opportunities via App Launcher', async () => {
    await this.sfPage.navigateToAppViaAppLauncher('Opportunities');
    this.sfPage.captureScreenshot(this['page'], 'workflows/opportunities', 'navigate-to-opportunities.png'); // Capture screenshot at critical step
  });
}
```

**All navigation goes through SF-Basepage.** Do NOT duplicate app launcher/search/tab logic in workflows or object pages.

## One Workflow Per Scenario

Each unique business scenario gets its own Workflow class:

- `create-account-required-fields-workflow.ts`
- `edit-account-workflow.ts`
- `display-details-tab-workflow.ts`

Multiple workflows can use the SAME Page Object. Organized in `workflows/<object>/`.

## Every Method Uses `this.testStep()`

```typescript
async navigateToAccounts(): Promise<void> {
  await this.testStep('Navigate to Accounts list page', async () => {
    await this.sfPage.navigateToAppViaAppLauncher('Accounts');
    this.sfPage.captureScreenshot(this['page'], 'workflows/accounts', 'navigate-to-accounts.png'); // Capture screenshot at critical step
  });
}
```

## High-Level Business Methods (CRITICAL)

Workflows expose **high-level business methods** that the spec calls. Each method internally uses `this.testStep()` for granular actions. Specs MUST NOT call individual workflow steps like `clickNewButton()` or `fillField()`.

```typescript
// ✅ CORRECT — Workflow exposes high-level methods, spec calls them directly
async createEntity(data: EntityData): Promise<void> {
  await this.testStep('Navigate to Entities via App Launcher', async () => {
    await this.sfPage.navigateToAppViaAppLauncher('Entities');
  });

  await this.testStep('Click New button', async () => {
    await this.listPage.clickNewButton();
  });

  await this.testStep('Fill entity name', async () => {
    await this.creationPage.fillEntityName(data.name);
  });

  await this.testStep('Select entity type', async () => {
    await this.creationPage.selectType(data.type);
  });

  await this.testStep('Click Save', async () => {
      // MUST capture screenshot before saving with this.sfPage.captureScreenshot(page: Page, testInfo: TestInfo, name: string), if this is an important step
      await this.creationPage.clickSave();
  });
}

async verifyEntityCreated(data: EntityData): Promise<void> {
  await this.testStep('Verify entity name on detail page', async () => {
    await this.detailPage.verifyEntityName(data.name);
  });
}
```

```typescript
// ❌ WRONG — Spec should NOT call granular steps
// In spec: await workflow.clickNewButton();
// In spec: await workflow.fillEntityName(data.name);
// In spec: await workflow.clickSave();
```

**Separate Act vs Assert methods** — keep creation and verification as separate workflow methods so the spec can insert cleanup logic between them.

## Data Interfaces

Export typed data interfaces for workflow parameters:

```typescript
export interface AccountData {
  name: string;
  type?: string;
  industry?: string;
}
```

## Strict Boundaries

| ✅ Workflow CAN | ❌ Workflow MUST NOT |
|----------------|---------------------|
| Call Page Object methods (including verification methods) | Contain locators or `page.locator()` |
| Accept typed data from spec | Import `expect` from `@playwright/test` |
| Use `this.testStep()` for logging | Contain `expect()` calls directly |
| Define data interfaces | Directly access DOM elements |
| Use multiple page objects | Create toast dismissal methods |
```
