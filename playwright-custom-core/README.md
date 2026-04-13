# Playwright Custom Core Framework

A robust, self-healing test automation framework built on top of Playwright, featuring the Page Object Model pattern and resilient locator strategies.

## Features

- 🎯 **Page Object Model**: Structured, maintainable test architecture
- 🔄 **Self-Healing Locators**: Multiple fallback strategies prevent test failures
- 🏗️ **Base Classes**: Pre-built `BasePage` and `BaseWorkflow` for consistency
- 📦 **Reusable Components**: Share framework across multiple test projects
- ♿ **Accessibility-First**: Encourages using semantic selectors

## Installation

### Option 1: Local File Dependency (Development)

In your test project's `package.json`:

```json
{
  "dependencies": {
    "playwright-custom-core": "file:../playwright-custom-core"
  }
}
```

Then run:
```bash
npm install
```

### Option 2: npm Package (Production)

```bash
npm install playwright-custom-core
```

## Quick Start

### 1. Create a Page Object

```typescript
import { Page } from '@playwright/test';
import { BasePage, ResilientLocator } from 'playwright-custom-core';

export class LoginPage extends BasePage {
  readonly pageName = 'LoginPage';
  protected readonly relativeUrl = '/login';

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl || process.env.BASE_URL || 'http://localhost:3000');
  }

  // Define elements with self-healing locators
  private get emailInput() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByLabel('Email'),              // Primary: Accessibility
      (p) => p.locator('[data-testid="email"]'), // Secondary: Test ID
      (p) => p.locator('input[type="email"]'),   // Tertiary: CSS
    ]);
  }

  private get submitButton() {
    return new ResilientLocator(this['page'], [
      (p) => p.getByRole('button', { name: 'Sign In' }),
      (p) => p.locator('[data-testid="submit-btn"]'),
      (p) => p.locator('button[type="submit"]'),
    ]);
  }

  // Define page actions
  async enterEmail(email: string) {
    const locator = this.emailInput.getLocator();
    await locator.fill(email);
  }

  async clickSubmit() {
    const locator = this.submitButton.getLocator();
    await locator.click();
  }

  async login(email: string, password: string) {
    await this.navigate();
    await this.enterEmail(email);
    // ... more actions
    await this.clickSubmit();
  }
}
```

### 2. Write Tests

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';

test.describe('Login Flow', () => {
  test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.login('user@example.com', 'password123');
    
    await expect(page).toHaveURL(/dashboard/);
  });
});
```

### 3. Create Workflows (Optional)

For complex multi-page flows:

```typescript
import { Page } from '@playwright/test';
import { BaseWorkflow } from 'playwright-custom-core';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

export class UserOnboardingWorkflow extends BaseWorkflow {
  readonly workflowName = 'UserOnboardingWorkflow';

  private loginPage: LoginPage;
  private dashboardPage: DashboardPage;

  constructor(page: Page, baseUrl?: string) {
    super(page);
    const url = baseUrl || process.env.BASE_URL || 'http://localhost:3000';
    this.loginPage = new LoginPage(page, url);
    this.dashboardPage = new DashboardPage(page, url);
  }

  async completeOnboarding(email: string, password: string): Promise<void> {
    await this.step('Login', async () => {
      await this.loginPage.login(email, password);
      this.setAuthenticated();
    });

    await this.step('Complete profile', async () => {
      await this.dashboardPage.navigateToDashboard();
      await this.dashboardPage.completeProfile();
    });
  }
}
```

## Core Components

### BasePage

Abstract base class for all Page Objects:

- **`pageName`**: Human-readable page identifier
- **`relativeUrl`**: URL path for the page
- **`pageUrl`**: Full URL (baseUrl + relativeUrl)
- **`navigate()`**: Navigate to the page
- **`step()`**: Execute named steps for better reporting

### BaseWorkflow

Abstract base class for multi-page workflows:

- **`workflowName`**: Workflow identifier
- **`step()`**: Execute workflow steps
- **`setAuthenticated()`**: Mark workflow as authenticated
- **`isAuthenticated`**: Check authentication state

### ResilientLocator

Self-healing element locator with fallback strategies:

- **`getLocator()`**: Get first working locator
- **`getVisibleLocator(timeout?)`**: Get first visible locator (waits)

## Best Practices

### 1. Always Use 3 Locator Strategies

```typescript
private get element() {
  return new ResilientLocator(this['page'], [
    (p) => p.getByRole('button', { name: 'Submit' }), // Best: Semantic
    (p) => p.locator('[data-testid="submit"]'),       // Good: Stable ID
    (p) => p.locator('button.submit-btn'),            // Fallback: CSS
  ]);
}
```

### 2. Keep Locators Private, Actions Public

```typescript
export class MyPage extends BasePage {
  // Private locators
  private get button() { /* ... */ }
  
  // Public actions
  async clickButton() { /* ... */ }
}
```

### 3. Use Descriptive Method Names

```typescript
// ✅ Good
async clickLoginButton()
async fillEmailField(email: string)
async verifyWelcomeMessage()

// ❌ Bad
async click()
async fill(text: string)
async verify()
```

### 4. One Page Object Per Page

Keep page objects focused on a single page or component.

### 5. Don't Put Assertions in Page Objects

```typescript
// ❌ Bad - assertion in page object
async verifyTitle() {
  expect(await this.title.textContent()).toBe('Welcome');
}

// ✅ Good - return data for test to assert
async getTitle(): Promise<string> {
  return await this.title.textContent() || '';
}
```

## Project Structure

```
your-test-project/
├── tests/
│   ├── pages/              # Page Objects
│   │   ├── login-page.ts
│   │   └── home-page.ts
│   ├── workflows/          # Complex workflows (optional)
│   │   └── onboarding-workflow.ts
│   └── *.spec.ts           # Test specifications
├── playwright.config.ts
└── package.json
```

## Environment Variables

```bash
# .env
BASE_URL=https://staging.example.com
```

Access in Page Objects:
```typescript
constructor(page: Page, baseUrl?: string) {
  super(page, baseUrl || process.env.BASE_URL || 'http://localhost:3000');
}
```

## Building the Framework

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run tests
npm test

# Clean build
npm run clean
```

## API Reference

### BasePage

```typescript
abstract class BasePage {
  abstract readonly pageName: string;
  protected abstract readonly relativeUrl: string;
  readonly pageUrl: string;
  
  constructor(page: Page, baseUrl: string);
  navigate(): Promise<void>;
  navigateWithTimeout(waitTime: number): Promise<void>;
  protected step(description: string, action: () => Promise<void>): Promise<void>;
}
```

### BaseWorkflow

```typescript
abstract class BaseWorkflow {
  abstract readonly workflowName: string;
  readonly isAuthenticated: boolean;
  
  constructor(page: Page);
  protected step(description: string, action: () => Promise<void>): Promise<void>;
  protected setAuthenticated(): void;
  protected clearAuthentication(): void;
}
```

### ResilientLocator

```typescript
class ResilientLocator {
  constructor(page: Page, strategies: LocatorStrategy[]);
  getLocator(): Locator;
  getVisibleLocator(timeout?: number): Promise<Locator>;
}

type LocatorStrategy = (page: Page) => Locator;
```

## Contributing

1. Make changes in `src/`
2. Build: `npm run build`
3. Test in consuming project
4. Update version in `package.json`

## License

MIT

## Support

For detailed usage instructions, see the `.github/copilot-instructions.md` file which provides comprehensive guidelines for test generation and best practices.
