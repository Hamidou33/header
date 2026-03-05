import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../projects/ui-header/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../src/styles', '../public'],
  addons: [],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  typescript: {
    check: false,
  },
};

export default config;
