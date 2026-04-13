"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildXrayPayload = buildXrayPayload;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DEFAULT_DIST_DIR = 'jira-xray-dist';
const DEFAULT_INPUT_FILE = path_1.default.join(DEFAULT_DIST_DIR, 'xray-results.json');
const DEFAULT_OUTPUT_FILE = path_1.default.join(DEFAULT_DIST_DIR, 'xray-payload.json');
/**
 * Normalise any Playwright / reporter status to a valid Xray Cloud status.
 *
 * Xray Cloud accepts: PASSED, FAILED, TODO, EXECUTING, ABORTED.
 * Rule: anything other than PASSED → FAILED.
 */
function normalizeStatusToXray(raw) {
    const upper = raw.toUpperCase().trim();
    return upper === 'PASS' || upper === 'PASSED' ? 'PASSED' : 'FAILED';
}
/**
 * Build an Xray import payload from Playwright results JSON.
 *
 * Reads the input file, transforms each test result into the Xray
 * format (including evidence, steps, comments), and writes the
 * output payload file.
 *
 * Follows the **Single Responsibility Principle** — this function only
 * transforms data; it does NOT upload to Xray.
 */
function buildXrayPayload(options = {}) {
    const inputFile = path_1.default.resolve(options.inputFile ?? DEFAULT_INPUT_FILE);
    const outputFile = path_1.default.resolve(options.outputFile ?? DEFAULT_OUTPUT_FILE);
    const testExecKey = options.testExecutionKey ?? process.env.EXECUTION_KEY;
    const projectKey = options.projectKey ?? process.env.PROJECT_KEY;
    const rawData = fs_1.default.readFileSync(inputFile, 'utf-8');
    const testResults = JSON.parse(rawData);
    const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
    const payload = {
        ...(testExecKey ? { testExecutionKey: testExecKey } : {}),
        info: {
            project: projectKey,
            // Only set summary when creating a new execution.
            ...(!testExecKey ? { summary: `Execution - ${timestamp}` } : {}),
        },
        tests: [],
    };
    for (const test of testResults) {
        // ── Comment ──
        const logsText = test.logs.map((l) => l.message).join('\n');
        const errorsText = test.errors
            .map((e) => e.message + (e.stack ? `\n${e.stack}` : ''))
            .join('\n');
        const comment = `\
[LOGS]
${logsText || '(no logs)'}

[DURATION]
${test.duration != null ? `${(test.duration / 1000).toFixed(2)} sec` : 'N/A'}

[ERRORS]
${errorsText || '(no errors)'}`.trim();
        // ── Evidence ──
        const evidence = [];
        if (test.attachments.video && fs_1.default.existsSync(test.attachments.video)) {
            try {
                const base64 = fs_1.default
                    .readFileSync(test.attachments.video)
                    .toString('base64');
                evidence.push({
                    data: base64,
                    filename: `${test.testKey}-video.webm`,
                    contentType: 'video/webm',
                });
                console.log(`Video encoded for ${test.testKey}`);
            }
            catch (err) {
                console.warn(`Failed to encode video for ${test.testKey}: ${err}`);
            }
        }
        if (test.attachments.screenshots?.length > 0) {
            test.attachments.screenshots.forEach((screenshotPath, index) => {
                if (fs_1.default.existsSync(screenshotPath)) {
                    try {
                        const base64 = fs_1.default
                            .readFileSync(screenshotPath)
                            .toString('base64');
                        evidence.push({
                            data: base64,
                            filename: `${test.testKey}-screenshot-${index + 1}.png`,
                            contentType: 'image/png',
                        });
                        console.log(`Screenshot ${index + 1} encoded for ${test.testKey}`);
                    }
                    catch (err) {
                        console.warn(`Failed to encode screenshot ${screenshotPath}: ${err}`);
                    }
                }
                else {
                    console.warn(`Screenshot not found: ${screenshotPath}`);
                }
            });
        }
        // ── Steps ──
        const xraySteps = [];
        if (test.steps) {
            xraySteps.push(...test.steps.map((pwStep) => {
                const isFailed = !!pwStep.errorMessage;
                let actualResult = pwStep.title;
                let stepComment = null;
                if (isFailed) {
                    actualResult =
                        pwStep.errorMessage || 'Step failed (no specific message)';
                    stepComment =
                        pwStep.errorStack || pwStep.errorMessage || 'Unknown failure';
                    if (pwStep.duration != null) {
                        stepComment += `\nLasted for: ${(pwStep.duration / 1000).toFixed(2)} sec`;
                    }
                }
                else {
                    stepComment =
                        pwStep.duration != null
                            ? `Completed in ${(pwStep.duration / 1000).toFixed(2)} sec`
                            : null;
                }
                return {
                    status: isFailed ? 'FAILED' : 'PASSED',
                    actualResult,
                    comment: stepComment,
                };
            }));
        }
        let start;
        let finish;
        if (test.startTime != null)
            start = new Date(test.startTime).toISOString();
        if (test.finishTime != null)
            finish = new Date(test.finishTime).toISOString();
        payload.tests.push({
            testKey: test.testKey,
            status: normalizeStatusToXray(test.status),
            comment,
            evidence,
            start,
            finish,
            steps: xraySteps,
        });
    }
    // Ensure output directory exists
    const outputDir = path_1.default.dirname(outputFile);
    if (!fs_1.default.existsSync(outputDir))
        fs_1.default.mkdirSync(outputDir, { recursive: true });
    fs_1.default.writeFileSync(outputFile, JSON.stringify(payload, null, 2));
    console.log(`${outputFile} generated with ${payload.tests.length} tests`);
}
//# sourceMappingURL=build-payload.js.map