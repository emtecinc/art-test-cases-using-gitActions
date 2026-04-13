import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ALLURE_RESULTS_DIR = path.resolve(__dirname, 'allure-results');
const ALLURE_REPORT_DIR = path.resolve(__dirname, 'allure-report');
const WAIT_MS = 3_000;

async function globalTeardown(): Promise<void> {
  console.log(`\n[GlobalTeardown] Waiting ${WAIT_MS / 1000}s for result files to be written...`);
  await new Promise((resolve) => setTimeout(resolve, WAIT_MS));

  // ── 1. Check allure-results directory ──────────────────────────────────────
  if (!fs.existsSync(ALLURE_RESULTS_DIR)) {
    console.warn(
      `[GlobalTeardown] Allure results directory not found: ${ALLURE_RESULTS_DIR}\n` +
        '  Skipping report generation.',
    );
    return;
  }

  const resultFiles = fs
    .readdirSync(ALLURE_RESULTS_DIR)
    .filter((f) => f.endsWith('.json') || f.endsWith('.xml') || f.endsWith('.txt'));

  if (resultFiles.length === 0) {
    console.warn(
      `[GlobalTeardown] No allure result files found in: ${ALLURE_RESULTS_DIR}\n` +
        '  Skipping report generation.',
    );
    return;
  }

  console.log(
    `[GlobalTeardown] Found ${resultFiles.length} result file(s) in ${ALLURE_RESULTS_DIR}.`,
  );

  // ── 2. Generate the allure HTML report ─────────────────────────────────────
  console.log(`[GlobalTeardown] Generating allure report → ${ALLURE_REPORT_DIR}`);

  try {
    execSync(
      `npx allure generate "${ALLURE_RESULTS_DIR}" --clean --output "${ALLURE_REPORT_DIR}"`,
      { stdio: 'inherit' },
    );
    console.log('[GlobalTeardown] Allure report generated successfully.');
    console.log(`[GlobalTeardown] Open report: npx allure open "${ALLURE_REPORT_DIR}"`);
  } catch (error) {
    console.error('[GlobalTeardown] Failed to generate allure report:', error);
  }
}

export default globalTeardown;
