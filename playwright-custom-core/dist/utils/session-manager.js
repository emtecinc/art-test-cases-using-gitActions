"use strict";
/**
 * Session Manager — manages the single storage-state file path.
 *
 * The storage-state file lives at:  auth-states/sf-auth.json
 *
 * Single Responsibility: filesystem path resolution + freshness checks.
 * Does NOT perform JWT exchanges, browser logins, or cookie manipulation.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const AUTH_DIR = path_1.default.resolve(process.cwd(), '.auth');
const AUTH_FILE = 'salesforce.json';
class SessionManager {
    /** Returns the absolute path to the auth-states directory. */
    static getAuthDir() {
        return AUTH_DIR;
    }
    /** Returns the absolute path to the storage-state JSON file. */
    static getStorageStatePath() {
        return path_1.default.join(AUTH_DIR, AUTH_FILE);
    }
    /** Returns the lock-file path used by the session-refresh middleware. */
    static getLockPath() {
        return `${SessionManager.getStorageStatePath()}.lock`;
    }
    /** Ensures the auth-states directory exists (idempotent). */
    static ensureDir() {
        if (!fs_1.default.existsSync(AUTH_DIR)) {
            fs_1.default.mkdirSync(AUTH_DIR, { recursive: true });
            console.log(`[SessionManager] Created auth-states directory: ${AUTH_DIR}`);
        }
    }
    /** Returns true if the storage-state file exists. */
    static exists() {
        return fs_1.default.existsSync(SessionManager.getStorageStatePath());
    }
    /**
     * Returns the mtime (last modification timestamp) of the storage-state file.
     * Used by session-refresh middleware to detect if another worker already refreshed.
     * Returns 0 if the file does not exist.
     */
    static getMtime() {
        try {
            return fs_1.default.statSync(SessionManager.getStorageStatePath()).mtimeMs;
        }
        catch {
            return 0;
        }
    }
    /**
     * Returns true if the storage-state file was modified after the given timestamp.
     */
    static isFresherThan(timestampMs) {
        return SessionManager.getMtime() > timestampMs;
    }
    /** Removes the storage-state file and lock file. */
    static clean() {
        const dir = AUTH_DIR;
        if (!fs_1.default.existsSync(dir))
            return;
        for (const file of fs_1.default.readdirSync(dir)) {
            if (file.startsWith('salesforce') && (file.endsWith('.json') || file.endsWith('.lock'))) {
                fs_1.default.unlinkSync(path_1.default.join(dir, file));
            }
        }
        console.log('[SessionManager] Cleaned auth-state and lock files.');
    }
}
exports.SessionManager = SessionManager;
//# sourceMappingURL=session-manager.js.map