"use strict";
/**
 * Contract for any session-refresh middleware implementation.
 *
 * Interface Segregation: deliberately narrow — one method, one concern.
 * Callers depend on this abstraction so the concrete implementation
 * can be swapped (e.g. mocked in unit tests) without touching workflows.
 *
 * Single Responsibility: this interface knows only about registering a
 * per-page session-expiry handler.  It knows nothing about JWT, storage
 * state, or Playwright workflows.
 */
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=session-refresh.interface.js.map