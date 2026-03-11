import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavHeaderCenterComponent } from './nav-header-center.component';
import type { DropdownItem, NavItem, UserProfile } from '../../../models';

const userProfile: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  avatar: 'JD',
};

const profileMenuItems: DropdownItem[] = [
  { label: 'My Profile', link: '/profile', icon: 'profile' },
  { label: 'Settings', link: '/settings', icon: 'settings' },
  { label: 'Logout', link: '/logout', icon: 'logout' },
];

const simpleItems: NavItem[] = [
  { label: 'Home', link: '/home' },
  { label: 'About', link: '/about' },
  { label: 'Services', link: '/services' },
  { label: 'Contact', link: '/contact' },
];

const dropdownItems: NavItem[] = [
  {
    label: 'Products',
    subMenu: [
      { label: 'Software', link: '/products/software' },
      { label: 'Hardware', link: '/products/hardware' },
    ],
  },
  {
    label: 'Solutions',
    subMenu: [
      { label: 'Enterprise', link: '/solutions/enterprise' },
      { label: 'SMB', link: '/solutions/smb' },
    ],
  },
  { label: 'Pricing', link: '/pricing' },
  { label: 'Contact', link: '/contact' },
];

const manyItems: NavItem[] = [
  { label: 'Home', link: '/' },
  { label: 'Products', link: '/products' },
  { label: 'Solutions', link: '/solutions' },
  { label: 'Resources', link: '/resources' },
  { label: 'About', link: '/about' },
  { label: 'Contact', link: '/contact' },
  { label: 'Pricing', link: '/pricing' },
  { label: 'Partners', link: '/partners' },
  { label: 'Careers', link: '/careers' },
];

const meta: Meta<NavHeaderCenterComponent> = {
  title: 'Header ARIA/Nav Center',
  component: NavHeaderCenterComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
  decorators: [
    moduleMetadata({
      imports: [NavHeaderCenterComponent],
    }),
    applicationConfig({
      providers: [
        provideRouter([{ path: '**', redirectTo: '' }], withHashLocation()),
        provideAnimationsAsync(),
      ],
    }),
  ],
  argTypes: {
    items: { control: 'object', description: 'Navigation menu items' },
    rounded: { control: 'boolean', description: 'Rounded corners' },
    showHeaderNavMobileTop: { control: 'boolean', description: 'Show mobile top slot' },
    showHeaderNavMobileBottom: {
      control: 'boolean',
      description: 'Show mobile bottom slot',
    },
    showHeaderNavRight: { control: 'boolean', description: 'Show nav-right slot' },
    burgerIcon: { control: 'boolean', description: 'Show burger icon on desktop' },
    burgerIconPos: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Burger icon position',
    },
    maxVisibleItems: {
      control: 'number',
      description: 'Maximum visible items before overflow',
    },
  },
  args: {
    rounded: true,
    showHeaderNavMobileTop: true,
    showHeaderNavMobileBottom: true,
    showHeaderNavRight: true,
    burgerIcon: false,
    burgerIconPos: 'right',
    maxVisibleItems: 99,
    showProfile: true,
    showAvatar: true,
    showEmail: true,
    showIcons: true,
    userProfile,
    profileMenuItems,
    items: simpleItems,
  },
  render: args => ({
    props: args,
    template: `
      <ui-nav-header-center
        [items]="items"
        [maxVisibleItems]="maxVisibleItems"
        [rounded]="rounded"
        [showHeaderNavMobileTop]="showHeaderNavMobileTop"
        [showHeaderNavMobileBottom]="showHeaderNavMobileBottom"
        [showHeaderNavRight]="showHeaderNavRight"
        [burgerIcon]="burgerIcon"
        [burgerIconPos]="burgerIconPos"
        [showProfile]="showProfile"
        [userProfile]="userProfile"
        [profileMenuItems]="profileMenuItems"
        [showAvatar]="showAvatar"
        [showEmail]="showEmail"
        [showIcons]="showIcons">
        <div slot="nav-right" style="font-size:12px;color:#666;">Support</div>
      </ui-nav-header-center>
    `,
  }),
};

export default meta;
type Story = StoryObj<NavHeaderCenterComponent>;

export const Default: Story = {};

export const WithDropdowns: Story = {
  args: {
    items: dropdownItems,
  },
};

export const LimitedVisible: Story = {
  args: {
    items: manyItems,
    maxVisibleItems: 4,
  },
};

export const BurgerLeft: Story = {
  args: {
    burgerIconPos: 'left',
  },
};

export const NotRounded: Story = {
  args: {
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
    items: dropdownItems,
  },
};
