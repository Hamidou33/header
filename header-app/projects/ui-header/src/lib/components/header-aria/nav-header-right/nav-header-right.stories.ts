import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavHeaderRight } from './nav-header-right.component';
import type { DropdownItem, UserProfile } from '../../../models';

const user: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  avatar: 'JD',
};

const menuItems: DropdownItem[] = [
  {
    label: 'My Profile',
    icon: '\u{1F464}',
    subMenu: [
      { label: 'View Profile', link: '/profile/view', icon: '\u{1F441}\u{FE0F}' },
      { label: 'Edit Profile', link: '/profile/edit', icon: '\u{270F}\u{FE0F}' },
    ],
  },
  {
    label: 'Settings',
    icon: '\u{2699}\u{FE0F}',
    subMenu: [
      { label: 'Account', link: '/settings/account', icon: '\u{1F527}' },
      { label: 'Security', link: '/settings/security', icon: '\u{1F6E1}\u{FE0F}' },
    ],
  },
  { label: 'Logout', link: '/logout', icon: '\u{1F6AA}' },
];

const meta: Meta<NavHeaderRight> = {
  title: 'Header ARIA/Nav Right',
  component: NavHeaderRight,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  decorators: [
    moduleMetadata({
      imports: [NavHeaderRight],
    }),
    applicationConfig({
      providers: [
        provideRouter([{ path: '**', redirectTo: '' }], withHashLocation()),
        provideAnimationsAsync(),
      ],
    }),
  ],
  argTypes: {
    showAvatar: { control: 'boolean', description: 'Show avatar in trigger' },
    showEmail: { control: 'boolean', description: 'Show email in menu header' },
    showIcons: { control: 'boolean', description: 'Show icons in menu items' },
    user: { control: 'object', description: 'User profile data' },
    menuItems: { control: 'object', description: 'Menu entries' },
  },
  args: {
    showAvatar: true,
    showEmail: true,
    showIcons: true,
    user,
    menuItems,
  },
  render: args => ({
    props: args,
    template: `
      <div style="display:flex;justify-content:flex-end;padding:16px;background:#f9fafb;">
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

export const Default: Story = {};

export const WithoutAvatar: Story = {
  args: {
    showAvatar: false,
  },
};

export const WithoutEmail: Story = {
  args: {
    showEmail: false,
  },
};

export const Minimal: Story = {
  args: {
    showAvatar: false,
    showEmail: false,
    showIcons: false,
    menuItems: [
      { label: 'Profile', link: '/profile' },
      { label: 'Settings', link: '/settings' },
      { label: 'Logout', link: '/logout' },
    ],
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: args => ({
    props: args,
    template: `
      <div style="background:#1a1a1a;padding:16px;min-height:100vh;">
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
