import fs from 'fs';
import path from 'path';
import type {
  FullConfig,
  FullResult,
  Reporter,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';
import type { TestContext, XrayReporterOptions } from '../../types';

const DEFAULT_DIST_DIR = 'jira-xray-dist';

/**
 * Playwright reporter that captures per-test context (annotations,
 * steps, logs, errors, attachments) and writes a combined results
 * JSON file for subsequent Xray payload transformation.
 *
 * Follows the **Single Responsibility Principle** — this class only
 * collects and serialises test data; it does NOT build Xray payloads
 * or upload results.
 */
class XrayReporter implements Reporter {
  private tempDir: string;
  private outputFile: string;
  private testContexts: Map<string, TestContext>;

  constructor(options: XrayReporterOptions = {}) {
    this.tempDir = path.resolve(
      options.tempDir ?? path.join(process.cwd(), DEFAULT_DIST_DIR, 'temp'),
    );
    this.outputFile = path.resolve(
      options.outputFile ??
        path.join(process.cwd(), DEFAULT_DIST_DIR, 'xray-results.json'),
    );
    this.testContexts = new Map();
  }

  onBegin(_config: FullConfig) {
    console.log('Xray Reporter Started');
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
      console.log('Temp folder created');
    }
  }

  onTestBegin(test: TestCase) {
    const context: TestContext = {
      testId: test.id,
      title: test.title,
      annotations: [],
      status: 'IN_PROGRESS',
      steps: [],
      logs: [],
      errors: [],
      attachments: { screenshots: [] },
    };
    this.testContexts.set(test.id, context);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const context = this.testContexts.get(test.id);
    if (!context) return;

    context.annotations = result.annotations || [];
    context.status = result.status.toUpperCase();
    context.startTime = result.startTime.getTime();
    context.duration = result.duration;
    context.finishTime = context.startTime + context.duration;

    context.steps = result.steps
      .filter((step) => step.category === 'test.step')
      .map((step) => ({
        title: step.title,
        category: step.category,
        duration: step.duration,
        errorMessage: step.error?.message || null,
        errorStack: step.error?.stack || null,
      }));

    context.logs = result.stdout.map((log) => {
      try {
        return JSON.parse(log.toString());
      } catch {
        return { message: log.toString() };
      }
    });

    if (result.status !== 'passed') {
      context.errors.push(
        ...result.errors.map((e) => ({
          message: e.message ?? '',
          stack: e.stack,
        })),
      );
      context.errors.push(
        ...result.stderr.map((e) => ({ message: e.toString() })),
      );
    }

    result.attachments.forEach((att) => {
      if (!att.path) return;
      if (att.name.includes('screenshot'))
        context.attachments.screenshots.push(att.path);
      if (att.name.includes('video')) context.attachments.video = att.path;
      if (att.name.includes('trace')) context.attachments.trace = att.path;
    });

    const fileName = `${test.id}-${result.retry}.json`;
    const filePath = path.join(this.tempDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(context, null, 2));
    console.log(`Saved: ${fileName}`);
  }

  async onEnd(_result: FullResult) {
    console.log('Processing results for Xray...');

    const finalResults: any[] = [];
    const files = fs.readdirSync(this.tempDir);

    for (const file of files) {
      const filePath = path.join(this.tempDir, file);
      const data: TestContext = JSON.parse(
        fs.readFileSync(filePath, 'utf-8'),
      );

      const annotation = data.annotations.find((a) => a.type === 'test_key');

      if (!annotation) {
        console.warn(`Missing test_key for test: ${data.title}`);
        continue;
      }

      const testKey = annotation.description;
      if (data.status === 'PASSED') data.errors = [];

      finalResults.push({
        testKey,
        title: data.title,
        status: data.status,
        steps: data.steps,
        logs: data.logs,
        errors: data.errors,
        attachments: data.attachments,
        startTime: data.startTime,
        duration: data.duration,
        finishTime: data.finishTime,
      });
    }

    fs.writeFileSync(this.outputFile, JSON.stringify(finalResults, null, 2));
    console.log('xray-results.json generated');

    fs.rmSync(this.tempDir, { recursive: true, force: true });
    console.log('Temp folder deleted');
  }
}

export default XrayReporter;
