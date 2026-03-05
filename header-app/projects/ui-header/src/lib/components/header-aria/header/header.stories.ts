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
    showAvatar: true,
    showEmail: true,
    showIcons: true,
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
        <div slot="nav-left" style="display: flex; align-items: center; gap: 0.5rem;">
          <img src="https://via.placeholder.com/80x28/00965e/ffffff?text=Partner" alt="Partner logo" style="max-height: 28px;">
          <span style="background: #f59e0b; color: white; padding: 0.25rem 0.625rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">DEV</span>
        </div>
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

export const WithGreenAvatar: Story = {
  name: 'With Green Avatar (Arval style)',
  args: {
    showAvatar: true,
    showEmail: true,
    showIcons: true,
  },
};

export const ThreeZoneLayout: Story = {
  name: '3-Zone Layout Demo',
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
        <div slot="nav-left" style="display: flex; align-items: center; gap: 0.5rem;">
          <img src="https://via.placeholder.com/80x32/00965e/ffffff?text=Partner" alt="Partner logo" style="max-height: 32px;">
          <span style="background: #00965e; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">PRO</span>
        </div>
      </ui-header>
    `,
  }),
  args: {
    showAvatar: true,
    showEmail: true,
    maxVisibleItems: 5,
  },
};

export const WithSecondaryLogoAndTag: Story = {
  name: 'With Secondary Logo + Tag',
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
        <div slot="nav-left" style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="https://via.placeholder.com/100x28/333/ffffff?text=Partner+Logo" alt="Partner" style="max-height: 28px;">
          <span style="background: #f3f4f6; color: #1a1a1a; padding: 0.375rem 0.75rem; border-radius: 6px; font-size: 0.8rem; font-weight: 500; border: 1px solid #d1d5db;">Business</span>
        </div>
      </ui-header>
    `,
  }),
  args: {
    showAvatar: true,
    showEmail: false,
    showIcons: false,
  },
};

export const FullFeatured: Story = {
  name: 'Full Featured (All zones + Avatar)',
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
        <div slot="pre-header-desktop" style="background: #1a1a1a; color: white; padding: 0.5rem 1rem; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.75rem;">🎉 Special offer: Get 20% off on all services!</span>
          <button style="background: #00965e; color: white; border: none; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Learn More</button>
        </div>
        <div slot="nav-left" style="display: flex; align-items: center; gap: 0.5rem;">
          <img src="https://via.placeholder.com/80x28/00965e/ffffff?text=Arval" alt="Arval" style="max-height: 28px;">
          <span style="background: linear-gradient(135deg, #00965e 0%, #007a4d 100%); color: white; padding: 0.25rem 0.625rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 2px 4px rgba(0,150,94,0.2);">Premium</span>
        </div>
        <div slot="nav-right" style="display: flex; align-items: center; gap: 0.75rem;">
          <button style="background: none; border: none; cursor: pointer; padding: 0.5rem; border-radius: 50%; transition: background 0.2s;" title="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
        </div>
      </ui-header>
    `,
  }),
  args: {
    showAvatar: true,
    showEmail: true,
    showIcons: true,
    maxVisibleItems: 6,
    showHeaderPreNav: true,
  },
};
