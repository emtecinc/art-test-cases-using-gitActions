import * as dotenv from "dotenv";
dotenv.config();

import { execSync } from "child_process";

import {
  findSpecFiles,
  findIssues,
  buildXrayPayload,
  importResults,
  getLinkedTestKeys,
  getFilteredLinkedTestKeys,
  parseJiraFieldNames,
  parseIssueFieldFilter,
  hasFilterCriteria,
  parseCommaSeparated,
} from "playwright-custom-core";


// Inputs from Env or CI/CD
const PROJECT_KEY = process.env.TEST_EXEC_PROJECT_KEY?.trim();
const ISSUE_TYPE = process.env.TEST_EXEC_ISSUE_TYPE?.trim();
const EXECUTION_KEY = process.env.TEST_EXEC_EXECUTION_KEY?.trim() || "";
const INPUT_TYPE = process.env.TEST_EXEC_INPUT_TYPE?.trim().toLowerCase();
const FIELD_FILTER = parseIssueFieldFilter(process.env);

// Common file execution functionality
async function runTestsWithResultsUpload(testKeys: string[]) {
  const files = await findSpecFiles(testKeys);

  if (files.length > 0) {
    console.log("Running Playwright tests...");
    try {
      execSync(`npx playwright test ${files.join(" ")}`, {
        stdio: "inherit",
        cwd: process.cwd(),
      });
    } catch {
      console.warn("  Playwright exited with failures — continuing.\n");
    }
  } else {
    console.warn("No spec files matched — skipping Playwright, payload build, and upload.\n");
    return;
  }

  // EXECUTION_KEY → upload to existing execution; left empty → create new
}

// Run a Single Test

async function runTestCaseWithMultipleKey() {
  const keys = parseCommaSeparated(process.env.TEST_EXEC_INPUT_VALUE?.trim());
  if (!keys || keys.length === 0) {
    console.warn("TEST_EXEC_KEY_INPUT_VALUE is empty — nothing to fetch.");
    return;
  }

  await runTestsWithResultsUpload(keys);
}


switch (INPUT_TYPE) {
  case "key":
    runTestCaseWithMultipleKey();
    break;
  default:
    console.error(
      `Unknown TEST_EXEC_INPUT_TYPE: "${process.env.TEST_EXEC_INPUT_TYPE ?? "(not set)"}"\n` +
        `Set it to "Label" or "Key" in your .env or CI/CD variables.`,
    );
    process.exit(1);
}