import type { Meta, StoryObj } from '@storybook/angular';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { NavHeaderRight } from './nav-header-right.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';

/**
 * NavHeaderRight component with user avatar and dropdown menu.
 * All inputs are input() signals (except user which is input.required).
 */

const meta: Meta<NavHeaderRight> = {
  title: 'Header ARIA/NavHeaderRight',
  component: NavHeaderRight,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  decorators: [
    moduleMetadata({
      imports: [NavHeaderRight, OverlayModule, Menu, MenuTrigger, MenuItem, MenuContent],
    }),
    applicationConfig({
      providers: [
        provideRouter([{ path: '**', redirectTo: '' }], withHashLocation()),
        provideAnimationsAsync(),
      ],
    }),
  ],
  argTypes: {
    showAvatar: {
      control: 'boolean',
      description: 'Show user avatar in the menu trigger',
    },
    showEmail: {
      control: 'boolean',
      description: 'Show user email in the menu',
    },
    showIcons: {
      control: 'boolean',
      description: 'Show icons in menu items',
    },
    user: {
      control: 'object',
      description: 'User profile data (name, email, avatar)',
    },
    menuItems: {
      control: 'object',
      description: 'Profile menu items with optional sub-menus',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: flex-end; padding: 16px; background: #f9fafb;">
        <ui-nav-header-right
          [user]="user"
          [menuItems]="menuItems"
          [showAvatar]="showAvatar"
          [showEmail]="showEmail"
          [showIcons]="showIcons">
        </ui-nav-header-right>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<NavHeaderRight>;

export const Default: Story = {
  args: {
    showAvatar: true,
    showEmail: true,
    showIcons: true,
    user: {
      name: 'John Doe',
      email: 'john.doe@company.com',
      avatar: '👤',
    },
    menuItems: [
      {
        label: 'My Profile',
        icon: '👤',
        subMenu: [
          { label: 'View Profile', link: '/profile/view', icon: '👁️' },
          { label: 'Edit Profile', link: '/profile/edit', icon: '✏️' },
          { label: 'Privacy', link: '/profile/privacy', icon: '🔒' },
        ],
      },
      {
        label: 'Settings',
        icon: '⚙️',
        subMenu: [
          { label: 'Account', link: '/settings/account', icon: '🔧' },
          { label: 'Preferences', link: '/settings/preferences', icon: '🎨' },
          { label: 'Security', link: '/settings/security', icon: '🛡️' },
          { label: 'Billing', link: '/settings/billing', icon: '💳' },
        ],
      },
      {
        label: 'Notifications',
        link: '/notifications',
        icon: '🔔',
      },
      {
        label: 'Help',
        icon: '❓',
        subMenu: [
          { label: 'Documentation', link: '/help/docs', icon: '📚' },
          { label: 'Contact Support', link: '/help/support', icon: '💬' },
          { label: 'FAQ', link: '/help/faq', icon: '💡' },
        ],
      },
      {
        label: 'Logout',
        link: '/logout',
        icon: '🚪',
      },
    ],
  },
};

export const WithoutAvatar: Story = {
  args: {
    ...Default.args,
    showAvatar: false,
  },
};

export const WithoutEmail: Story = {
  args: {
    ...Default.args,
    showEmail: false,
  },
};

export const WithoutIcons: Story = {
  args: {
    ...Default.args,
    showIcons: false,
  },
};

export const Minimal: Story = {
  args: {
    showAvatar: false,
    showEmail: false,
    showIcons: false,
    user: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'JS',
    },
    menuItems: [
      { label: 'Profile', link: '/profile' },
      { label: 'Settings', link: '/settings' },
      { label: 'Logout', link: '/logout' },
    ],
  },
};

export const SimpleMenu: Story = {
  args: {
    showAvatar: true,
    showEmail: false,
    showIcons: true,
    user: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: '🙋‍♀️',
    },
    menuItems: [
      { label: 'Dashboard', link: '/dashboard', icon: '📊' },
      { label: 'Messages', link: '/messages', icon: '✉️' },
      { label: 'Settings', link: '/settings', icon: '⚙️' },
      { label: 'Logout', link: '/logout', icon: '🚪' },
    ],
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
    showAvatar: true,
    showEmail: true,
    showIcons: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="mobile-profile-item" style="background: #1a1a1a; padding: 16px; min-height: 100vh;">
        <ui-nav-header-right
          [user]="user"
          [menuItems]="menuItems"
          [showAvatar]="showAvatar"
          [showEmail]="showEmail"
          [showIcons]="showIcons">
        </ui-nav-header-right>
      </div>
    `,
  }),
};

