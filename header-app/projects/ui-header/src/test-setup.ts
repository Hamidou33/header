import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

// Initialize the Angular testing environment
// Only initialize once to avoid NG0400 error
const INIT_KEY = Symbol.for('__ANGULAR_TEST_ENV_INITIALIZED__');

if (!(globalThis as Record<symbol, boolean>)[INIT_KEY]) {
  try {
    TestBed.resetTestEnvironment();
  } catch (e) {
    // Ignore if the environment is not initialized yet
  }

  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting(), {
    teardown: { destroyAfterEach: true },
  });

  (globalThis as Record<symbol, boolean>)[INIT_KEY] = true;
}

// Mock globalThis.matchMedia for tests
if (typeof globalThis.matchMedia === 'undefined') {
  Object.defineProperty(globalThis, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    }),
  });
}
