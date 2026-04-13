/**
 * Session Manager — manages the single storage-state file path.
 *
 * The storage-state file lives at:  auth-states/sf-auth.json
 *
 * Single Responsibility: filesystem path resolution + freshness checks.
 * Does NOT perform JWT exchanges, browser logins, or cookie manipulation.
 */

import fs from 'fs';
import path from 'path';

const AUTH_DIR = path.resolve(process.cwd(), '.auth');
const AUTH_FILE = 'salesforce.json';

export class SessionManager {

  /** Returns the absolute path to the auth-states directory. */
  static getAuthDir(): string {
    return AUTH_DIR;
  }

  /** Returns the absolute path to the storage-state JSON file. */
  static getStorageStatePath(): string {
    return path.join(AUTH_DIR, AUTH_FILE);
  }

  /** Returns the lock-file path used by the session-refresh middleware. */
  static getLockPath(): string {
    return `${SessionManager.getStorageStatePath()}.lock`;
  }

  /** Ensures the auth-states directory exists (idempotent). */
  static ensureDir(): void {
    if (!fs.existsSync(AUTH_DIR)) {
      fs.mkdirSync(AUTH_DIR, { recursive: true });
      console.log(`[SessionManager] Created auth-states directory: ${AUTH_DIR}`);
    }
  }

  /** Returns true if the storage-state file exists. */
  static exists(): boolean {
    return fs.existsSync(SessionManager.getStorageStatePath());
  }

  /**
   * Returns the mtime (last modification timestamp) of the storage-state file.
   * Used by session-refresh middleware to detect if another worker already refreshed.
   * Returns 0 if the file does not exist.
   */
  static getMtime(): number {
    try {
      return fs.statSync(SessionManager.getStorageStatePath()).mtimeMs;
    } catch {
      return 0;
    }
  }

  /**
   * Returns true if the storage-state file was modified after the given timestamp.
   */
  static isFresherThan(timestampMs: number): boolean {
    return SessionManager.getMtime() > timestampMs;
  }

  /** Removes the storage-state file and lock file. */
  static clean(): void {
    const dir = AUTH_DIR;
    if (!fs.existsSync(dir)) return;

    for (const file of fs.readdirSync(dir)) {
      if (file.startsWith('salesforce') && (file.endsWith('.json') || file.endsWith('.lock'))) {
        fs.unlinkSync(path.join(dir, file));
      }
    }
    console.log('[SessionManager] Cleaned auth-state and lock files.');
  }
}
