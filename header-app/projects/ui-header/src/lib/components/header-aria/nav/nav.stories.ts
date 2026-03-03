import type { Meta, StoryObj } from '@storybook/angular';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Nav } from './nav.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';

/**
 * Nav component with Angular Aria dropdown menus.
 * All inputs are input() signals.
 */

const meta: Meta<Nav> = {
  title: 'Header ARIA/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  decorators: [
    moduleMetadata({
      imports: [Nav, OverlayModule, Menu, MenuTrigger, MenuItem, MenuContent],
    }),
    applicationConfig({
      providers: [
        provideRouter([{ path: '**', redirectTo: '' }], withHashLocation()),
        provideAnimationsAsync(),
      ],
    }),
  ],
  argTypes: {
    items: {
      control: 'object',
      description: 'Navigation menu items',
    },
    mainLogoTitle: {
      control: 'text',
      description: 'Main logo title',
    },
    mainLogoUrl: {
      control: 'text',
      description: 'Main logo URL',
    },
    mainLogoPath: {
      control: 'text',
      description: 'Path to logo image',
    },
    rounded: {
      control: 'boolean',
      description: 'Rounded corners',
    },
    showHeaderSecondLogo: {
      control: 'boolean',
      description: 'Show second logo slot',
    },
    showHeaderNavMobileTop: {
      control: 'boolean',
      description: 'Show mobile top slot',
    },
    showHeaderNavMobileBottom: {
      control: 'boolean',
      description: 'Show mobile bottom slot',
    },
    showHeaderNavRight: {
      control: 'boolean',
      description: 'Show nav right slot',
    },
    burgerIcon: {
      control: 'boolean',
      description: 'Show burger icon',
    },
    burgerIconPos: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Burger icon position',
    },
    maxVisibleItems: {
      control: 'number',
      description: 'Maximum visible items before showing "More"',
    },
  },
};

export default meta;
type Story = StoryObj<Nav>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-nav
        [items]="items"
        [maxVisibleItems]="maxVisibleItems"
        [mainLogoTitle]="mainLogoTitle"
        [mainLogoUrl]="mainLogoUrl"
        [mainLogoPath]="mainLogoPath"
        [rounded]="rounded"
        [showHeaderSecondLogo]="showHeaderSecondLogo"
        [showHeaderNavMobileTop]="showHeaderNavMobileTop"
        [showHeaderNavMobileBottom]="showHeaderNavMobileBottom"
        [showHeaderNavRight]="showHeaderNavRight"
        [burgerIcon]="burgerIcon"
        [burgerIconPos]="burgerIconPos">
        <div slot="nav-left" style="font-size: 0.875rem; color: #666;">🏢 Partner</div>
        <div slot="nav-right" style="padding: 0 10px;">
          <button style="padding: 6px 12px; border-radius: 6px; border: 1px solid #d1d5db; background: #fff; cursor: pointer;">
            👤 Login
          </button>
        </div>
      </ui-nav>
    `,
  }),
  args: {
    mainLogoTitle: 'My Company',
    mainLogoUrl: '/',
    mainLogoPath: '/logo-header.svg',
    rounded: true,
    showHeaderSecondLogo: true,
    showHeaderNavMobileTop: true,
    showHeaderNavMobileBottom: true,
    showHeaderNavRight: true,
    burgerIcon: true,
    burgerIconPos: 'right',
    maxVisibleItems: 99,
    items: [
      { label: 'Home', link: '/home' },
      { label: 'About', link: '/about' },
      { label: 'Services', link: '/services' },
      { label: 'Contact', link: '/contact' },
    ],
  },
};

export const SimpleLinks: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-nav
        [items]="items"
        [maxVisibleItems]="maxVisibleItems"
        [mainLogoTitle]="mainLogoTitle"
        [mainLogoUrl]="mainLogoUrl"
        [mainLogoPath]="mainLogoPath"
        [rounded]="rounded"
        [burgerIcon]="burgerIcon"
        [burgerIconPos]="burgerIconPos">
      </ui-nav>
    `,
  }),
  args: {
    mainLogoTitle: 'My Company',
    mainLogoUrl: '/',
    mainLogoPath: '/logo-header.svg',
    rounded: true,
    burgerIcon: true,
    burgerIconPos: 'right',
    maxVisibleItems: 99,
    items: [
      { label: 'Home', link: '/home' },
      { label: 'About', link: '/about' },
      { label: 'Products', link: '/products' },
      { label: 'Blog', link: '/blog' },
      { label: 'Contact', link: '/contact' },
    ],
  },
};

export const WithDropdowns: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-nav
        [items]="items"
        [maxVisibleItems]="maxVisibleItems"
        [mainLogoTitle]="mainLogoTitle"
        [mainLogoUrl]="mainLogoUrl"
        [mainLogoPath]="mainLogoPath"
        [rounded]="rounded"
        [showHeaderNavMobileTop]="showHeaderNavMobileTop"
        [showHeaderNavMobileBottom]="showHeaderNavMobileBottom"
        [showHeaderNavRight]="showHeaderNavRight">
        <div slot="nav-right" style="padding: 0 10px;">
          <button style="padding: 6px 12px; border-radius: 6px; border: 1px solid #0066cc; background: #0066cc; color: white; cursor: pointer;">
            Sign Up
          </button>
        </div>
        <div slot="pre-nav-mobile" style="background: #f9fafb; padding: 15px; margin-bottom: 10px; border-radius: 6px;">
          📱 Mobile Header Content
        </div>
        <div slot="post-nav-mobile" style="background: #f3f4f6; padding: 15px; margin-top: 10px; border-radius: 6px;">
          📞 Support: 1-800-123-4567
        </div>
      </ui-nav>
    `,
  }),
  args: {
    mainLogoTitle: 'My Company',
    mainLogoUrl: '/',
    mainLogoPath: '/logo-header.svg',
    rounded: true,
    showHeaderNavMobileTop: true,
    showHeaderNavMobileBottom: true,
    showHeaderNavRight: true,
    maxVisibleItems: 99,
    items: [
      {
        label: 'Products',
        subMenu: [
          {
            label: 'Software',
            subMenu: [
              { label: 'Web Apps', link: '/products/software/web', icon: '🌐' },
              { label: 'Mobile Apps', link: '/products/software/mobile', icon: '📱' },
              { label: 'Desktop Apps', link: '/products/software/desktop', icon: '💻' },
            ],
          },
          {
            label: 'Hardware',
            subMenu: [
              { label: 'Computers', link: '/products/hardware/computers', icon: '🖥️' },
              { label: 'Accessories', link: '/products/hardware/accessories', icon: '⌨️' },
            ],
          },
        ],
      },
      {
        label: 'Services',
        subMenu: [
          { label: 'Consulting', link: '/services/consulting', icon: '💼' },
          { label: 'Training', link: '/services/training', icon: '📚' },
          { label: 'Support', link: '/services/support', icon: '🆘' },
        ],
      },
      { label: 'About', link: '/about' },
      { label: 'Contact', link: '/contact' },
    ],
  },
};

export const ManyItems: Story = {
  args: {
    mainLogoTitle: 'My Company',
    mainLogoUrl: '/',
    mainLogoPath: '/logo-header.svg',
    rounded: true,
    burgerIcon: true,
    burgerIconPos: 'right',
    maxVisibleItems: 99,
    items: [
      { label: 'Home', link: '/' },
      { label: 'Products', link: '/products' },
      { label: 'Solutions', link: '/solutions' },
      { label: 'Resources', link: '/resources' },
      { label: 'About', link: '/about' },
      { label: 'Contact', link: '/contact' },
      { label: 'Pricing', link: '/pricing' },
      { label: 'Partners', link: '/partners' },
      { label: 'Careers', link: '/careers' },
      { label: 'Blog', link: '/blog' },
      { label: 'Docs', link: '/docs' },
      { label: 'Community', link: '/community' },
      { label: 'Events', link: '/events' },
    ],
  },
};

export const LimitedVisible: Story = {
  args: {
    ...ManyItems.args,
    maxVisibleItems: 5,
  },
};

export const BurgerLeft: Story = {
  args: {
    ...Default.args,
    burgerIconPos: 'left',
  },
};

export const WithoutBurger: Story = {
  args: {
    ...Default.args,
    burgerIcon: false,
  },
};

export const NotRounded: Story = {
  args: {
    ...Default.args,
    rounded: false,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    ...WithDropdowns.args,
    maxVisibleItems: 99,
    showProfile: true,
    showAvatar: true,
    showEmail: true,
    showIcons: true,
    userProfile: {
      name: 'Jane Doe',
      email: 'jane.doe@company.com',
      avatar: 'JD',
    },
    profileMenuItems: [
      {
        label: 'My Profile',
        link: '/profile',
        icon: 'user',
      },
      {
        label: 'Settings',
        link: '/settings',
        icon: 'gear',
      },
      {
        label: 'Logout',
        link: '/logout',
        icon: 'logout',
      },
    ],
  },
};
