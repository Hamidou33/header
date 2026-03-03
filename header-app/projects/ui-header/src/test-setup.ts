import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

// Initialize the Angular testing environment
// Only initialize once to avoid NG0400 error
declare global {
  // eslint-disable-next-line no-var
  var __ANGULAR_TEST_ENV_INITIALIZED__: boolean | undefined;
}

if (!globalThis.__ANGULAR_TEST_ENV_INITIALIZED__) {
  try {
    TestBed.resetTestEnvironment();
  } catch (e) {
    // Ignore if environment is not initialized yet
  }

  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting(), {
    teardown: { destroyAfterEach: true },
  });

  globalThis.__ANGULAR_TEST_ENV_INITIALIZED__ = true;
}

// Mock window.matchMedia for tests
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
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
