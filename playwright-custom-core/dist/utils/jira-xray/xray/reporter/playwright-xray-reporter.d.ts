import type { FullConfig, FullResult, Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import type { XrayReporterOptions } from '../../types';
/**
 * Playwright reporter that captures per-test context (annotations,
 * steps, logs, errors, attachments) and writes a combined results
 * JSON file for subsequent Xray payload transformation.
 *
 * Follows the **Single Responsibility Principle** — this class only
 * collects and serialises test data; it does NOT build Xray payloads
 * or upload results.
 */
declare class XrayReporter implements Reporter {
    private tempDir;
    private outputFile;
    private testContexts;
    constructor(options?: XrayReporterOptions);
    onBegin(_config: FullConfig): void;
    onTestBegin(test: TestCase): void;
    onTestEnd(test: TestCase, result: TestResult): void;
    onEnd(_result: FullResult): Promise<void>;
}
export default XrayReporter;
//# sourceMappingURL=playwright-xray-reporter.d.ts.map