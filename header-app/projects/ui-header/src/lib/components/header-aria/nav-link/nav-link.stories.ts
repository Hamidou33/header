import type { Meta, StoryObj } from '@storybook/angular';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { MenuBar } from '@angular/aria/menu';
import { NavLink } from './nav-link';
import { OverlayModule } from '@angular/cdk/overlay';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';

/**
 * NavLink component - a simple navigation link.
 * All inputs are input() signals.
 */

const meta: Meta<NavLink> = {
  title: 'Header ARIA/NavLink',
  component: NavLink,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NavLink, MenuBar, OverlayModule, Menu, MenuTrigger, MenuItem, MenuContent],
    }),
    applicationConfig({
      providers: [
        provideRouter([{ path: '**', redirectTo: '' }], withHashLocation()),
        provideAnimationsAsync(),
      ],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Link label text',
    },
    link: {
      control: 'text',
      description: 'URL or route path',
    },
    icon: {
      control: 'text',
      description: 'Icon (emoji or text)',
    },
    active: {
      control: 'boolean',
      description: 'Active state',
    },
    measureOnly: {
      control: 'boolean',
      description: 'Render for measurement only',
    },
    useAriaMenu: {
      control: 'boolean',
      description: 'Use Angular Aria menu item',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div
        ngMenuBar
        style="display: inline-flex; align-items: center; gap: 12px; padding: 16px; background: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <ui-nav-link
          [label]="label"
          [link]="link"
          [icon]="icon"
          [active]="active"
          [measureOnly]="measureOnly"
          [useAriaMenu]="useAriaMenu"></ui-nav-link>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<NavLink>;

export const Default: Story = {
  args: {
    label: 'Home',
    link: '/home',
    active: false,
    measureOnly: false,
    useAriaMenu: true,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Products',
    link: '/products',
    icon: '🛍️',
    active: false,
    measureOnly: false,
    useAriaMenu: true,
  },
};

export const Active: Story = {
  args: {
    label: 'Current Page',
    link: '/current',
    icon: '📍',
    active: true,
    measureOnly: false,
    useAriaMenu: true,
  },
};

export const WithoutLink: Story = {
  args: {
    label: 'Placeholder',
    active: false,
    measureOnly: false,
    useAriaMenu: true,
  },
};

export const LongLabel: Story = {
  args: {
    label: 'Very Long Navigation Link Label',
    link: '/long-path',
    icon: '📄',
    active: false,
    measureOnly: false,
    useAriaMenu: true,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    ...Default.args,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="mobile-nav" style="background: #1a1a1a; padding: 16px; min-height: 100vh;">
        <ui-nav-link
          [label]="label"
          [link]="link"
          [icon]="icon"
          [active]="active"
          [measureOnly]="measureOnly"
          [useAriaMenu]="useAriaMenu"></ui-nav-link>
      </div>
    `,
  }),
};
