/// <reference types="vitest" />
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  root: rootDir,
  plugins: [
    angular(),
  ],
  test: {
    globals: true,
    setupFiles: [resolve(rootDir, 'src/test-setup.ts')],
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    server: {
      deps: {
        inline: [/vendor/],
      },
    },
  },
  resolve: {
    mainFields: ['module'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
