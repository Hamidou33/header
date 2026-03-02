import type { Meta, StoryObj } from '@storybook/angular';
import { HeaderCdk } from './header-cdk';

const meta: Meta<HeaderCdk> = {
  title: 'Header CDK/Header',
  component: HeaderCdk,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    companyName: {
      control: 'text',
      description: 'Company name displayed in the header',
    },
    logoUrl: {
      control: 'text',
      description: 'Company logo (emoji or URL)',
    },
    sticky: {
      control: 'boolean',
      description: 'Enable sticky positioning',
    },
    showBrand: {
      control: 'boolean',
      description: 'Show company brand section',
    },
    showNav: {
      control: 'boolean',
      description: 'Show navigation menu',
    },
    showProfile: {
      control: 'boolean',
      description: 'Show profile menu',
    },
    menuItems: {
      control: 'object',
      description: 'Navigation items',
    },
    userProfile: {
      control: 'object',
      description: 'Profile data',
    },
    profileMenuItems: {
      control: 'object',
      description: 'Profile menu items',
    },
    theme: {
      control: 'object',
      description: 'Theme overrides for the header',
    },
  },
};

export default meta;
type Story = StoryObj<HeaderCdk>;

export const Default: Story = {
  args: {
    companyName: 'My Company',
    logoUrl: 'logo',
    sticky: true,
    showBrand: true,
    showNav: true,
    showProfile: true,
    menuItems: [
      {
        label: 'Products',
        subMenu: [
          {
            label: 'Software',
            subMenu: [
              { label: 'Web Apps', link: '/products/software/web', icon: 'globe' },
              { label: 'Mobile Apps', link: '/products/software/mobile', icon: 'phone' },
              { label: 'Desktop Apps', link: '/products/software/desktop', icon: 'laptop' },
            ],
          },
          {
            label: 'Hardware',
            subMenu: [
              { label: 'Computers', link: '/products/hardware/computers', icon: 'pc' },
              { label: 'Accessories', link: '/products/hardware/accessories', icon: 'kbd' },
            ],
          },
        ],
      },
      {
        label: 'Services',
        subMenu: [
          {
            label: 'Consulting',
            subMenu: [
              { label: 'Strategy', link: '/services/consulting/strategy', icon: 'chart' },
              { label: 'Implementation', link: '/services/consulting/implementation', icon: 'tool' },
            ],
          },
          { label: 'Support', link: '/services/support', icon: 'lifebuoy' },
        ],
      },
      { label: 'About', link: '/about', icon: 'info' },
      { label: 'Contact', link: '/contact', icon: 'mail' },
    ],
    userProfile: {
      name: 'John Doe',
      email: 'john.doe@company.com',
      avatar: 'JD',
    },
    profileMenuItems: [
      {
        label: 'My Profile',
        icon: 'user',
        subMenu: [
          { label: 'View Profile', link: '/profile/view', icon: 'eye' },
          { label: 'Edit Profile', link: '/profile/edit', icon: 'edit' },
          { label: 'Privacy', link: '/profile/privacy', icon: 'lock' },
        ],
      },
      {
        label: 'Settings',
        icon: 'gear',
        subMenu: [
          { label: 'Account', link: '/settings/account', icon: 'key' },
          { label: 'Notifications', link: '/settings/notifications', icon: 'bell' },
          { label: 'Appearance', link: '/settings/appearance', icon: 'palette' },
        ],
      },
      {
        label: 'Help',
        icon: 'help',
        subMenu: [
          { label: 'Docs', link: '/help/docs', icon: 'book' },
          { label: 'Support', link: '/help/support', icon: 'chat' },
          { label: 'Feedback', link: '/help/feedback', icon: 'note' },
        ],
      },
      { label: 'Logout', link: '/logout', icon: 'logout' },
    ],
  },
};

export const Playground: Story = {
  ...Default,
  name: 'Playground',
};

export const WithoutProfile: Story = {
  args: {
    ...Default.args,
    showProfile: false,
  },
};

export const WithoutNavigation: Story = {
  args: {
    ...Default.args,
    showNav: false,
  },
};

export const MinimalHeader: Story = {
  args: {
    companyName: 'My Company',
    logoUrl: 'logo',
    showBrand: true,
    showNav: false,
    showProfile: false,
  },
};

export const CustomTheme: Story = {
  args: {
    ...Default.args,
    theme: {
      primaryColor: '#ff6b6b',
      hoverColor: '#00965E',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      borderRadius: '1rem',
    },
  },
};

export const NonSticky: Story = {
  args: {
    ...Default.args,
    sticky: false,
  },
};
