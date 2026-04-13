import dotenv from "dotenv";
dotenv.config();

import { execSync } from "child_process";
import type {
    JiraClientConfig,
    XrayClientConfig,
    JiraFieldName
} from "./index";

import {
  parseCommaSeparated,
  parseJiraFieldNames,
  parseIssueFieldFilter,
  hasFilterCriteria,
  findSpecFiles,
  getFilteredLinkedTestKeys,
  getLinkedTestKeys,
  buildXrayPayload,
  importResults,
  findIssues
} from "./index";

const JIRA: JiraClientConfig = {
  baseUrl: process.env.JIRA_URL,
  email: process.env.JIRA_EMAIL,
  apiToken: process.env.JIRA_TOKEN,
};

const XRAY: XrayClientConfig = {
  auth: {
    clientId: process.env.XRAY_CLIENT_ID,
    clientSecret: process.env.XRAY_CLIENT_SECRET,
  },
  baseUrl: process.env.XRAY_BASE_URL,
};


// Inputs from Env or CI/CD
const PROJECT_KEY = process.env.TEST_EXEC_PROJECT_KEY?.trim();
const ISSUE_TYPE = process.env.TEST_EXEC_ISSUE_TYPE?.trim();
const EXECUTION_KEY = process.env.TEST_EXEC_EXECUTION_KEY?.trim() || "";
const INPUT_TYPE = process.env.TEST_EXEC_INPUT_TYPE?.trim().toLowerCase();
const FIELD_FILTER = parseIssueFieldFilter(process.env);

// Fields to retrieve when searching issues  (env: TEST_EXEC_JIRA_FIELDS)
const JIRA_FIELDS: JiraFieldName[] = (() => {
  const parsed = parseJiraFieldNames(process.env.TEST_EXEC_JIRA_FIELDS);
  return parsed.length > 0 ? parsed : ["summary", "status", "issuetype"];
})();

// Common file execution functionality
export async function runTestsWithResultsUpload(testKeys: string[]) {
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
  buildXrayPayload({
    testExecutionKey: EXECUTION_KEY,
    projectKey: PROJECT_KEY,
  });

  const execKey = await importResults({ xray: XRAY });
  if (execKey) {
    console.log(`\nResults imported → Execution key: ${execKey}`);
  } else {
    console.error("\nImport failed — no execution key returned.");
  }
}


// Fetching tests by label(s)
export async function fetchIssuesByLabel() {
  const labels = parseCommaSeparated(process.env.TEST_EXEC_INPUT_VALUE);

  if (!labels) {
    console.warn("TEST_EXEC_INPUT_VALUE is empty — nothing to fetch.");
    return;
  }

  const { issues, total } = await findIssues(
    {
      project: PROJECT_KEY,
      issuetype: ISSUE_TYPE,
      labels,
    },
    JIRA_FIELDS,
    { jira: JIRA },
  );

  console.log(`Found ${total} issue(s) matching labels.`);
  const keys = issues.map((i) => i.key);
  await runTestsWithResultsUpload(keys);
}


// Fetching tests by Execution/Set key
export async function fetchByKey() {
  const key = process.env.TEST_EXEC_INPUT_VALUE?.trim();
  if (!key) {
    console.warn("TEST_EXEC_KEY_INPUT_VALUE is empty — nothing to fetch.");
    return;
  }

  let testKeys: string[];

  if (hasFilterCriteria(FIELD_FILTER)) {
    console.log(`Fetching linked tests from ${key} with field filter...`);
    testKeys = await getFilteredLinkedTestKeys(key, FIELD_FILTER, { jira: JIRA });
  } else {
    testKeys = await getLinkedTestKeys(key, { jira: JIRA });
  }

  await runTestsWithResultsUpload(testKeys);
}

// Run a Single Test

export async function runSingleTest() {
  const key = process.env.TEST_EXEC_INPUT_VALUE?.trim();
  if (!key) {
    console.warn("TEST_EXEC_KEY_INPUT_VALUE is empty — nothing to fetch.");
    return;
  }

  await runTestsWithResultsUpload([key]);
}

// for standalone execution, not as utility function
export function handleTestExecInput() {
  switch (INPUT_TYPE) {
    case "label":
      fetchIssuesByLabel();
      break;
    case "key":
      fetchByKey();
      break;
    default:
      throw new Error(
        `Unknown TEST_EXEC_INPUT_TYPE: "${process.env.TEST_EXEC_INPUT_TYPE ?? "(not set)"}"\n` +
          `Set it to "Label" or "Key" in your .env or CI/CD variables.`,
      );
  }
}