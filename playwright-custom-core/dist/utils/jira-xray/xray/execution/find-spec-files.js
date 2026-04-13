"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanTestKeyToFileMap = scanTestKeyToFileMap;
exports.findSpecFiles = findSpecFiles;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = require("glob");
/**
 * Scan all `.spec.ts` files under the given test directory and build
 * a map of `testKey → relative file path`.
 *
 * Matches annotations like: `type: 'test_key', description: 'ART-12'`
 */
async function scanTestKeyToFileMap(testDir = path_1.default.resolve(process.cwd(), 'tests')) {
    const keyToFile = new Map();
    const projectRoot = process.cwd();
    const specFiles = await (0, glob_1.glob)('**/*.spec.ts', {
        cwd: testDir,
        absolute: true,
    });
    for (const filePath of specFiles) {
        const content = fs_1.default.readFileSync(filePath, 'utf-8');
        const regex = /type:\s*['"]test_key['"]\s*,\s*description:\s*['"]([^'"]+)['"]/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            keyToFile.set(match[1], path_1.default.relative(projectRoot, filePath));
        }
    }
    return keyToFile;
}
/**
 * Given an array of Jira test keys, return the spec file paths that
 * contain those keys.
 */
async function findSpecFiles(testKeys, testDir) {
    const keyToFile = await scanTestKeyToFileMap(testDir);
    const matchedFiles = new Set();
    const unmatchedKeys = [];
    for (const key of testKeys) {
        const file = keyToFile.get(key);
        if (file)
            matchedFiles.add(file);
        else
            unmatchedKeys.push(key);
    }
    if (unmatchedKeys.length > 0) {
        console.warn(`No spec file found for test key(s): ${unmatchedKeys.join(', ')}`);
    }
    console.log(`Matched ${matchedFiles.size} spec file(s) for ${testKeys.length} test key(s)`);
    return [...matchedFiles];
}
//# sourceMappingURL=find-spec-files.js.map