import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { getTestBed } from '@angular/core/testing';

// Initialize the Angular testing environment
// Note: BrowserDynamicTestingModule and platformBrowserDynamicTesting are deprecated
// but still necessary until Angular provides stable replacements

// Only initialize once to avoid NG0400 error
const testBed = getTestBed();
if (!(testBed as any).platform) {
  try {
    TestBed.resetTestEnvironment();
  } catch (e) {
    // Ignore if environment is not initialized yet
  }

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: true },
  });
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
