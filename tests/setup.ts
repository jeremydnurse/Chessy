import '@testing-library/jest-dom/vitest';

// Node 25 ships a native (stub) localStorage that lacks the full Web Storage API
// (.clear, .setItem, etc.).  Vitest's jsdom environment populates dom.window but
// skips overriding globals already present in the Node process (including localStorage).
// In this setup, window === globalThis, so window.localStorage is also the Node stub.
// The real jsdom Storage lives on (globalThis as any).jsdom.window.localStorage.
// We redirect globalThis.localStorage here so tests see a fully-featured implementation.
const jsdomWindow = (globalThis as Record<string, unknown>).jsdom as { window: Window } | undefined;
if (jsdomWindow?.window) {
  Object.defineProperty(globalThis, 'localStorage', {
    value: jsdomWindow.window.localStorage,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(globalThis, 'sessionStorage', {
    value: jsdomWindow.window.sessionStorage,
    configurable: true,
    writable: true,
  });
}
