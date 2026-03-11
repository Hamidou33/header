import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './header.component';
import { NavHeaderLeftComponent } from '../nav-header-left/nav-header-left.component';

const meta: Meta<HeaderComponent> = {
  title: 'Header ARIA/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
  decorators: [
    moduleMetadata({
      imports: [HeaderComponent, NavHeaderLeftComponent],
    }),
    applicationConfig({
      providers: [
        provideRouter([{ path: '**', redirectTo: '' }], withHashLocation()),
        provideAnimationsAsync(),
      ],
    }),
  ],
  argTypes: {
    sticky: { control: 'boolean', description: 'Enable sticky positioning' },
    showNav: { control: 'boolean', description: 'Show navigation menu' },
    showProfile: { control: 'boolean', description: 'Show profile menu' },
    showAvatar: { control: 'boolean', description: 'Show avatar in profile menu' },
    showEmail: { control: 'boolean', description: 'Show email in profile menu' },
    showIcons: { control: 'boolean', description: 'Show icons in profile menu items' },
    maxVisibleItems: {
      control: 'number',
      description: 'Maximum number of visible items before showing More',
    },
    isHeaderFixed: { control: 'boolean', description: 'Header is fixed' },
    showHeaderPreNav: { control: 'boolean', description: 'Show pre-nav section' },
    showHeaderPostNav: { control: 'boolean', description: 'Show post-nav section' },
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
    logoPath: '/logo-header.svg',
    companyName: 'Arval',
    logoUrl: '/',
  },
  render: args => ({
    props: args,
    template: `
      <ui-header
        [logoUrl]="logoUrl"
        [companyName]="companyName"
        [logoPath]="logoPath"
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
        <ui-nav-header-left
          slot="nav-left"
          secondaryLogoPath="/logo-header.svg"
          secondaryLogoAlt="Partner logo"
          secondaryLogoUrl="/"
          tagText="PRO"
          tagVariant="success"
          [showSeparator]="true">
        </ui-nav-header-left>
      </ui-header>
    `,
  }),
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {};

export const WithoutProfile: Story = {
  args: {
    showProfile: false,
  },
};

export const Minimal: Story = {
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

export const LimitedMenuItems: Story = {
  args: {
    maxVisibleItems: 5,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const MobileWithPostNav: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    showHeaderPostNavMobile: true,
  },
};

export const WithSlots: Story = {
  render: args => ({
    props: args,
    template: `
      <ui-header
        [logoUrl]="logoUrl"
        [companyName]="companyName"
        [logoPath]="logoPath"
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
        <div slot="pre-header-desktop" style="background:#f3f4f6;padding:8px 12px;text-align:center;">
          Pre-header content
        </div>
        <ui-nav-header-left
          slot="nav-left"
          secondaryLogoPath="/logo-header.svg"
          secondaryLogoAlt="Partner logo"
          secondaryLogoUrl="/"
          tagText="PRO"
          tagVariant="success"
          [showSeparator]="true">
        </ui-nav-header-left>
        <div slot="nav-right" style="display:flex;align-items:center;gap:8px;">
          <button type="button" style="border:0;background:transparent;cursor:pointer;">Help</button>
        </div>
      </ui-header>
    `,
  }),
};
