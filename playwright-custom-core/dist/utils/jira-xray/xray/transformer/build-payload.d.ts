import type { BuildPayloadOptions } from '../../types';
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
export declare function buildXrayPayload(options?: BuildPayloadOptions): void;
//# sourceMappingURL=build-payload.d.ts.map