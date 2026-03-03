import type { Meta, StoryObj } from '@storybook/angular';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Header } from './header.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';

/**
 * Header component with Angular Aria menus.
 * Uses input() signals for boolean flags and direct properties for data.
 */

const meta: Meta<Header> = {
  title: 'Header ARIA/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  decorators: [
    moduleMetadata({
      imports: [Header, OverlayModule, Menu, MenuTrigger, MenuItem, MenuContent],
    }),
    applicationConfig({
      providers: [
        provideRouter([{ path: '**', redirectTo: '' }], withHashLocation()),
        provideAnimationsAsync(),
      ],
    }),
  ],
  argTypes: {
    sticky: {
      control: 'boolean',
      description: 'Enable sticky positioning',
    },
    showNav: {
      control: 'boolean',
      description: 'Show navigation menu',
    },
    showProfile: {
      control: 'boolean',
      description: 'Show profile menu',
    },
    showAvatar: {
      control: 'boolean',
      description: 'Show avatar in profile menu',
    },
    showEmail: {
      control: 'boolean',
      description: 'Show email in profile menu',
    },
    showIcons: {
      control: 'boolean',
      description: 'Show icons in profile menu items',
    },
    maxVisibleItems: {
      control: 'number',
      description: 'Maximum number of visible items before showing "More"',
    },
    isHeaderFixed: {
      control: 'boolean',
      description: 'Header is fixed',
    },
    showHeaderPreNav: {
      control: 'boolean',
      description: 'Show pre-nav section',
    },
    showHeaderPostNav: {
      control: 'boolean',
      description: 'Show post-nav section',
    },
    showHeaderPostNavMobile: {
      control: 'boolean',
      description: 'Show post-nav section on mobile',
    },
  },
  args: {
    sticky: true,
    showNav: true,
    showProfile: true,
    showAvatar: false,
    showEmail: false,
    showIcons: false,
    isHeaderFixed: false,
    showHeaderPreNav: true,
    showHeaderPostNav: true,
    showHeaderPostNavMobile: false,
    maxVisibleItems: 99,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-header
        [showProfile]="showProfile"
        [showAvatar]="showAvatar"
        [showEmail]="showEmail"
        [showIcons]="showIcons"
        [maxVisibleItems]="maxVisibleItems"
        [isHeaderFixed]="isHeaderFixed"
        [showHeaderPreNav]="showHeaderPreNav"
        [showHeaderPostNav]="showHeaderPostNav"
        [showHeaderPostNavMobile]="showHeaderPostNavMobile"
        [sticky]="sticky"
        [showNav]="showNav">
      </ui-header>
    `,
  }),
};

export default meta;
type Story = StoryObj<Header>;

export const Default: Story = {};

export const Playground: Story = {
  name: 'Playground',
};

export const WithoutProfile: Story = {
  args: {
    showProfile: false,
  },
};

export const WithProfileAvatar: Story = {
  args: {
    showAvatar: true,
    showEmail: true,
  },
};

export const WithProfileIcons: Story = {
  args: {
    showAvatar: true,
    showEmail: true,
    showIcons: true,
  },
};

export const WithoutNavigation: Story = {
  args: {
    showNav: false,
  },
};

export const MinimalHeader: Story = {
  args: {
    showNav: false,
    showProfile: false,
    showHeaderPreNav: false,
  },
};

export const FixedHeader: Story = {
  args: {
    isHeaderFixed: true,
    showHeaderPreNav: false,
  },
};

export const WithPreNavOnly: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-header
        [showProfile]="showProfile"
        [showAvatar]="showAvatar"
        [showEmail]="showEmail"
        [showIcons]="showIcons"
        [maxVisibleItems]="maxVisibleItems"
        [isHeaderFixed]="isHeaderFixed"
        [showHeaderPreNav]="showHeaderPreNav"
        [showHeaderPostNav]="showHeaderPostNav"
        [showHeaderPostNavMobile]="showHeaderPostNavMobile"
        [sticky]="sticky"
        [showNav]="showNav">
        <div slot="pre-header-desktop" style="background: #f3f4f6; padding: 10px; text-align: center; width: 100%;">
          Pre-header content (e.g., promotional banner, language switcher)
        </div>
      </ui-header>
    `,
  }),
  args: {
    showHeaderPostNav: false,
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
};

export const MobileWithPostNav: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    ...Default.args,
    showHeaderPostNavMobile: true,
  },
};

export const LimitedMenuItems: Story = {
  args: {
    maxVisibleItems: 5,
  },
};

export const NonSticky: Story = {
  args: {
    sticky: false,
  },
};

export const WithRealLogo: Story = {
  render: (args) => ({
    props: {
      ...args,
      logoPath: 'https://via.placeholder.com/140x32/0066cc/ffffff?text=My+Company',
      companyName: 'My Company',
    },
    template: `
      <ui-header
        [showProfile]="showProfile"
        [showAvatar]="showAvatar"
        [showEmail]="showEmail"
        [showIcons]="showIcons"
        [maxVisibleItems]="maxVisibleItems"
        [isHeaderFixed]="isHeaderFixed"
        [showHeaderPreNav]="showHeaderPreNav"
        [showHeaderPostNav]="showHeaderPostNav"
        [showHeaderPostNavMobile]="showHeaderPostNavMobile"
        [sticky]="sticky"
        [showNav]="showNav">
      </ui-header>
    `,
  }),
};
