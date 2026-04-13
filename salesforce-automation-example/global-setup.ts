/**
 * Playwright Global Setup — Single User.
 *
 * Runs ONCE before the entire test suite starts.
 *
 * Responsibilities:
 *  1. Check if a valid session exists in auth-states/sf-auth.json.
 *  2. If valid, skip authentication (saves time).
 *  3. If invalid or missing, authenticate via JWT Bearer Flow + frontdoor.jsp.
 *  4. Persist the authenticated browser context.
 *
 * All tests inherit the session via `storageState` in playwright.config.ts.
 */

import { chromium, FullConfig, BrowserContext } from '@playwright/test';
import { SalesforceConnection, SalesforceLoginService, SessionManager } from 'playwright-custom-core';

/**
 * Validates an existing session by loading the storage state and checking
 * if we can access a Salesforce page without being redirected to login.
 */
async function isSessionValid(): Promise<boolean> {
  if (!SessionManager.exists()) {
    console.log('[GlobalSetup] No existing session file found.');
    return false;
  }

  console.log('[GlobalSetup] Found existing session file. Validating...');

  const browser = await chromium.launch();
  let context: BrowserContext | undefined;

  try {
    const storagePath = SessionManager.getStorageStatePath();
    context = await browser.newContext({ storageState: storagePath });
    const page = await context.newPage();

    const orgUrl = (process.env.BASE_URL || '').replace(/\/+$/, '');
    if (!orgUrl) {
      console.log('[GlobalSetup] BASE_URL not set. Cannot validate session.');
      return false;
    }

    // Navigate to Salesforce homepage and check if we're logged in
    await page.goto(`${orgUrl}/lightning/page/home`, { timeout: 30_000 });
    
    // Wait a bit for any redirects to complete
    await page.waitForLoadState('load', { timeout: 15_000 });

    const currentUrl = page.url();

    // If we're redirected to login page, session is invalid
    if (currentUrl.includes('/login') || currentUrl.includes('/secur/login')) {
      console.log('[GlobalSetup] Session expired (redirected to login).');
      return false;
    }

    // Check for Salesforce Lightning UI indicators
    const isLightning = await page.locator('div.slds-context-bar').isVisible({ timeout: 5_000 })
      .catch(() => false);

    if (isLightning) {
      console.log('[GlobalSetup] Existing session is valid. Reusing...');
      return true;
    }

    console.log('[GlobalSetup] Could not verify Salesforce UI. Session may be invalid.');
    return false;

  } catch (error) {
    console.log(`[GlobalSetup] Session validation failed: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  } finally {
    if (context) await context.close();
    await browser.close();
  }
}

async function globalSetup(_config: FullConfig): Promise<void> {
  console.log('[GlobalSetup] Starting Salesforce authentication…');

  // Ensure the auth-states directory exists
  SessionManager.ensureDir();

  // Check if we have a valid existing session
  const hasValidSession = await isSessionValid();

  if (hasValidSession) {
    console.log('[GlobalSetup] Using existing valid session. Skipping login.');
    return;
  }

  // No valid session — perform fresh login
  console.log('[GlobalSetup] Performing fresh login...');

  const sfConnection = SalesforceConnection.getInstance();
  const loginService = new SalesforceLoginService(sfConnection);

  const browser = await chromium.launch();

  try {
    const context = await loginService.login(browser);

    try {
      const storagePath = SessionManager.getStorageStatePath();
      await context.storageState({ path: storagePath });
      console.log(`[GlobalSetup] New session saved to ${storagePath}`);
    } finally {
      await context.close();
    }
  } finally {
    await browser.close();
  }

  console.log('[GlobalSetup] Authentication complete.');
}

export default globalSetup;
