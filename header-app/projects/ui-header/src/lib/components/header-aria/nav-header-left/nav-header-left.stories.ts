import type { Meta, StoryObj } from '@storybook/angular';
import { provideRouter, withHashLocation } from '@angular/router';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { NavHeaderLeft } from './nav-header-left.component';

const meta: Meta<NavHeaderLeft> = {
  title: 'Header ARIA/Nav Left',
  component: NavHeaderLeft,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NavHeaderLeft],
    }),
    applicationConfig({
      providers: [provideRouter([{ path: '**', redirectTo: '' }], withHashLocation())],
    }),
  ],
  argTypes: {
    secondaryLogoPath: {
      control: 'text',
      description: 'Path to secondary logo image',
    },
    secondaryLogoAlt: {
      control: 'text',
      description: 'Alt text for secondary logo',
    },
    secondaryLogoUrl: {
      control: 'text',
      description: 'URL for secondary logo link',
    },
    tagText: {
      control: 'text',
      description: 'Text for tag/badge',
    },
    tagVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning'],
      description: 'Tag style variant',
    },
    showSeparator: {
      control: 'boolean',
      description: 'Show separator between elements',
    },
  },
};

export default meta;
type Story = StoryObj<NavHeaderLeft>;

export const Default: Story = {
  args: {
    secondaryLogoPath: 'https://via.placeholder.com/80x28/00965e/ffffff?text=Partner',
    secondaryLogoAlt: 'Partner Logo',
    tagText: 'PRO',
    tagVariant: 'primary',
    showSeparator: true,
  },
};

export const WithSecondaryLogo: Story = {
  name: 'With Secondary Logo Only',
  args: {
    secondaryLogoPath: 'https://via.placeholder.com/100x28/333/ffffff?text=Arval',
    secondaryLogoAlt: 'Arval Logo',
    showSeparator: false,
  },
};

export const WithTagOnly: Story = {
  name: 'With Tag Only',
  args: {
    tagText: 'BUSINESS',
    tagVariant: 'secondary',
    showSeparator: false,
  },
};

export const WithPrimaryTag: Story = {
  name: 'Primary Tag (Green)',
  args: {
    secondaryLogoPath: 'https://via.placeholder.com/80x28/00965e/ffffff?text=Partner',
    tagText: 'PRO',
    tagVariant: 'primary',
  },
};

export const WithSuccessTag: Story = {
  name: 'Success Tag (Gradient Green)',
  args: {
    secondaryLogoPath: 'https://via.placeholder.com/80x28/00965e/ffffff?text=Arval',
    tagText: 'PREMIUM',
    tagVariant: 'success',
  },
};

export const WithSecondaryTag: Story = {
  name: 'Secondary Tag (Gray)',
  args: {
    secondaryLogoPath: 'https://via.placeholder.com/100x28/1a1a1a/ffffff?text=Company',
    tagText: 'STANDARD',
    tagVariant: 'secondary',
  },
};

export const WithInfoTag: Story = {
  name: 'Info Tag (Blue)',
  args: {
    secondaryLogoPath: 'https://via.placeholder.com/90x28/3b82f6/ffffff?text=Brand',
    tagText: 'BETA',
    tagVariant: 'info',
  },
};

export const WithWarningTag: Story = {
  name: 'Warning Tag (Orange)',
  args: {
    secondaryLogoPath: 'https://via.placeholder.com/90x28/f59e0b/ffffff?text=Alert',
    tagText: 'NEW',
    tagVariant: 'warning',
  },
};

export const WithCustomContent: Story = {
  name: 'With Custom Content (Slot)',
  render: (args) => ({
    props: args,
    template: `
      <ui-nav-header-left
        [secondaryLogoPath]="secondaryLogoPath"
        [secondaryLogoAlt]="secondaryLogoAlt"
        [showSeparator]="showSeparator">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="background: linear-gradient(135deg, #00965e 0%, #007a4d 100%); color: white; padding: 0.25rem 0.625rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;">Premium</span>
          <span style="color: #6b7280; font-size: 0.75rem;">•</span>
          <span style="color: #1a1a1a; font-size: 0.75rem; font-weight: 500;">Fleet: 250 vehicles</span>
        </div>
      </ui-nav-header-left>
    `,
  }),
  args: {
    secondaryLogoPath: 'https://via.placeholder.com/80x28/00965e/ffffff?text=Arval',
    showSeparator: true,
  },
};

export const MultipleElements: Story = {
  name: 'Multiple Elements',
  render: (args) => ({
    props: args,
    template: `
      <ui-nav-header-left
        [secondaryLogoPath]="secondaryLogoPath"
        [secondaryLogoAlt]="secondaryLogoAlt"
        [tagText]="tagText"
        [tagVariant]="tagVariant"
        [showSeparator]="showSeparator">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="background: #3b82f6; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.65rem; font-weight: 600;">v2.0</span>
        </div>
      </ui-nav-header-left>
    `,
  }),
  args: {
    secondaryLogoPath: 'https://via.placeholder.com/80x28/1a1a1a/ffffff?text=Brand',
    tagText: 'ENTERPRISE',
    tagVariant: 'success',
    showSeparator: true,
  },
};

export const Playground: Story = {
  name: 'Playground',
  args: {
    secondaryLogoPath: 'https://via.placeholder.com/100x32/00965e/ffffff?text=Logo',
    secondaryLogoAlt: 'Logo',
    secondaryLogoUrl: '/',
    tagText: 'TAG',
    tagVariant: 'primary',
    showSeparator: true,
  },
};

