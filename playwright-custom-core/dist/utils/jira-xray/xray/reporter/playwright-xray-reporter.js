"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
class XrayReporter {
    tempDir;
    outputFile;
    testContexts;
    constructor(options = {}) {
        this.tempDir = path_1.default.resolve(options.tempDir ?? path_1.default.join(process.cwd(), DEFAULT_DIST_DIR, 'temp'));
        this.outputFile = path_1.default.resolve(options.outputFile ??
            path_1.default.join(process.cwd(), DEFAULT_DIST_DIR, 'xray-results.json'));
        this.testContexts = new Map();
    }
    onBegin(_config) {
        console.log('Xray Reporter Started');
        if (!fs_1.default.existsSync(this.tempDir)) {
            fs_1.default.mkdirSync(this.tempDir, { recursive: true });
            console.log('Temp folder created');
        }
    }
    onTestBegin(test) {
        const context = {
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
    onTestEnd(test, result) {
        const context = this.testContexts.get(test.id);
        if (!context)
            return;
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
            }
            catch {
                return { message: log.toString() };
            }
        });
        if (result.status !== 'passed') {
            context.errors.push(...result.errors.map((e) => ({
                message: e.message ?? '',
                stack: e.stack,
            })));
            context.errors.push(...result.stderr.map((e) => ({ message: e.toString() })));
        }
        result.attachments.forEach((att) => {
            if (!att.path)
                return;
            if (att.name.includes('screenshot'))
                context.attachments.screenshots.push(att.path);
            if (att.name.includes('video'))
                context.attachments.video = att.path;
            if (att.name.includes('trace'))
                context.attachments.trace = att.path;
        });
        const fileName = `${test.id}-${result.retry}.json`;
        const filePath = path_1.default.join(this.tempDir, fileName);
        fs_1.default.writeFileSync(filePath, JSON.stringify(context, null, 2));
        console.log(`Saved: ${fileName}`);
    }
    async onEnd(_result) {
        console.log('Processing results for Xray...');
        const finalResults = [];
        const files = fs_1.default.readdirSync(this.tempDir);
        for (const file of files) {
            const filePath = path_1.default.join(this.tempDir, file);
            const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
            const annotation = data.annotations.find((a) => a.type === 'test_key');
            if (!annotation) {
                console.warn(`Missing test_key for test: ${data.title}`);
                continue;
            }
            const testKey = annotation.description;
            if (data.status === 'PASSED')
                data.errors = [];
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
        fs_1.default.writeFileSync(this.outputFile, JSON.stringify(finalResults, null, 2));
        console.log('xray-results.json generated');
        fs_1.default.rmSync(this.tempDir, { recursive: true, force: true });
        console.log('Temp folder deleted');
    }
}
exports.default = XrayReporter;
//# sourceMappingURL=playwright-xray-reporter.js.map