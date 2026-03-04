import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  root: rootDir,
  plugins: [angular()],
  test: {
    globals: true,
    setupFiles: [path.resolve(rootDir, 'src/test-setup.ts')],
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
    alias: {
      '@test-setup': path.resolve(rootDir, 'src/test-setup.ts'),
    },
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
