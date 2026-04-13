/**
 * Session Manager — manages the single storage-state file path.
 *
 * The storage-state file lives at:  auth-states/sf-auth.json
 *
 * Single Responsibility: filesystem path resolution + freshness checks.
 * Does NOT perform JWT exchanges, browser logins, or cookie manipulation.
 */
export declare class SessionManager {
    /** Returns the absolute path to the auth-states directory. */
    static getAuthDir(): string;
    /** Returns the absolute path to the storage-state JSON file. */
    static getStorageStatePath(): string;
    /** Returns the lock-file path used by the session-refresh middleware. */
    static getLockPath(): string;
    /** Ensures the auth-states directory exists (idempotent). */
    static ensureDir(): void;
    /** Returns true if the storage-state file exists. */
    static exists(): boolean;
    /**
     * Returns the mtime (last modification timestamp) of the storage-state file.
     * Used by session-refresh middleware to detect if another worker already refreshed.
     * Returns 0 if the file does not exist.
     */
    static getMtime(): number;
    /**
     * Returns true if the storage-state file was modified after the given timestamp.
     */
    static isFresherThan(timestampMs: number): boolean;
    /** Removes the storage-state file and lock file. */
    static clean(): void;
}
//# sourceMappingURL=session-manager.d.ts.map