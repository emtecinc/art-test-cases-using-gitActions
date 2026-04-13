import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

/**
 * Scan all `.spec.ts` files under the given test directory and build
 * a map of `testKey → relative file path`.
 *
 * Matches annotations like: `type: 'test_key', description: 'ART-12'`
 */
export async function scanTestKeyToFileMap(
  testDir: string = path.resolve(process.cwd(), 'tests'),
): Promise<Map<string, string>> {
  const keyToFile = new Map<string, string>();
  const projectRoot = process.cwd();

  const specFiles = await glob('**/*.spec.ts', {
    cwd: testDir,
    absolute: true,
  });

  for (const filePath of specFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');

    const regex =
      /type:\s*['"]test_key['"]\s*,\s*description:\s*['"]([^'"]+)['"]/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      keyToFile.set(match[1], path.relative(projectRoot, filePath));
    }
  }

  return keyToFile;
}

/**
 * Given an array of Jira test keys, return the spec file paths that
 * contain those keys.
 */
export async function findSpecFiles(
  testKeys: string[],
  testDir?: string,
): Promise<string[]> {
  const keyToFile = await scanTestKeyToFileMap(testDir);

  const matchedFiles = new Set<string>();
  const unmatchedKeys: string[] = [];

  for (const key of testKeys) {
    const file = keyToFile.get(key);
    if (file) matchedFiles.add(file);
    else unmatchedKeys.push(key);
  }

  if (unmatchedKeys.length > 0) {
    console.warn(
      `No spec file found for test key(s): ${unmatchedKeys.join(', ')}`,
    );
  }

  console.log(
    `Matched ${matchedFiles.size} spec file(s) for ${testKeys.length} test key(s)`,
  );

  return [...matchedFiles];
}
