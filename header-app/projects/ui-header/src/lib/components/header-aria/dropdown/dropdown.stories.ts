import type { Meta, StoryObj } from '@storybook/angular';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { MenuBar } from '@angular/aria/menu';
import { Dropdown } from './dropdown';
import { OverlayModule } from '@angular/cdk/overlay';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';

/**
 * Dropdown component with Angular Aria nested menus.
 * All inputs are input() signals.
 */

const meta: Meta<Dropdown> = {
  title: 'Header ARIA/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  decorators: [
    moduleMetadata({
      imports: [Dropdown, MenuBar, OverlayModule, Menu, MenuTrigger, MenuItem, MenuContent],
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
      description: 'Dropdown button label',
    },
    items: {
      control: 'object',
      description: 'Dropdown items (supports nested sub-menus)',
    },
    active: {
      control: 'boolean',
      description: 'Set the trigger to active state',
    },
    measureOnly: {
      control: 'boolean',
      description: 'Render only the trigger label for measurements',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div
        ngMenuBar
        style="display: inline-flex; align-items: center; gap: 12px; padding: 16px; background: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <ui-dropdown
          [label]="label"
          [items]="items"
          [active]="active"
          [measureOnly]="measureOnly"></ui-dropdown>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Dropdown>;

export const Default: Story = {
  args: {
    label: 'Products',
    items: [
      { label: 'Item 1', link: '/item1', icon: '📦' },
      { label: 'Item 2', link: '/item2', icon: '📋' },
      { label: 'Item 3', link: '/item3', icon: '📌' },
    ],
    active: false,
    measureOnly: false,
  },
};

export const Simple: Story = {
  args: {
    label: 'Menu',
    items: [
      { label: 'Home', link: '/' },
      { label: 'About', link: '/about' },
      { label: 'Contact', link: '/contact' },
    ],
    active: false,
    measureOnly: false,
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Actions',
    items: [
      { label: 'Edit', link: '/edit', icon: '✏️' },
      { label: 'Delete', link: '/delete', icon: '🗑️' },
      { label: 'Share', link: '/share', icon: '🔗' },
      { label: 'Download', link: '/download', icon: '⬇️' },
    ],
    active: false,
    measureOnly: false,
  },
};

export const WithSubMenus: Story = {
  args: {
    label: 'Services',
    items: [
      {
        label: 'Consulting',
        icon: '💼',
        subMenu: [
          { label: 'Strategy', link: '/consulting/strategy', icon: '📊' },
          { label: 'Implementation', link: '/consulting/implementation', icon: '🔧' },
          { label: 'Training', link: '/consulting/training', icon: '🎓' },
        ],
      },
      {
        label: 'Support',
        icon: '🆘',
        subMenu: [
          { label: 'Technical', link: '/support/technical', icon: '💻' },
          { label: 'Billing', link: '/support/billing', icon: '💳' },
          { label: 'General', link: '/support/general', icon: '❓' },
        ],
      },
      { label: 'Contact', link: '/contact', icon: '📧' },
    ],
    active: false,
    measureOnly: false,
  },
};

export const NestedMenus: Story = {
  args: {
    label: 'Products',
    items: [
      {
        label: 'Software',
        icon: '💻',
        subMenu: [
          { label: 'Web Apps', link: '/products/software/web', icon: '🌐' },
          { label: 'Mobile Apps', link: '/products/software/mobile', icon: '📱' },
          { label: 'Desktop Apps', link: '/products/software/desktop', icon: '🖥️' },
        ],
      },
      {
        label: 'Hardware',
        icon: '⌨️',
        subMenu: [
          { label: 'Computers', link: '/products/hardware/computers', icon: '🖥️' },
          { label: 'Accessories', link: '/products/hardware/accessories', icon: '🖱️' },
          { label: 'Monitors', link: '/products/hardware/monitors', icon: '📺' },
        ],
      },
      {
        label: 'Services',
        icon: '🛠️',
        subMenu: [
          { label: 'Installation', link: '/products/services/installation', icon: '🔧' },
          { label: 'Maintenance', link: '/products/services/maintenance', icon: '🔩' },
          { label: 'Support', link: '/products/services/support', icon: '💬' },
        ],
      },
    ],
    active: false,
    measureOnly: false,
  },
};

export const ActiveState: Story = {
  args: {
    ...Default.args,
    active: true,
  },
};

export const WithoutIcons: Story = {
  args: {
    label: 'Links',
    items: [
      { label: 'Documentation', link: '/docs' },
      { label: 'API Reference', link: '/api' },
      { label: 'Tutorials', link: '/tutorials' },
      { label: 'Blog', link: '/blog' },
    ],
    active: false,
    measureOnly: false,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    ...WithSubMenus.args,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="mobile-nav" style="background: #1a1a1a; padding: 16px; min-height: 100vh;">
        <ui-dropdown
          [label]="label"
          [items]="items"
          [active]="active"
          [measureOnly]="measureOnly"></ui-dropdown>
      </div>
    `,
  }),
};
