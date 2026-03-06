import type { DropdownItem, NavItem, UserProfile } from '../../../models';

const DEFAULT_USER_PROFILE: Readonly<UserProfile> = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  avatar: 'JD',
};

const DEFAULT_PROFILE_MENU_ITEMS: ReadonlyArray<DropdownItem> = [
  {
    label: 'My Profile',
    icon: '\u{1F464}',
    subMenu: [
      { label: 'View Profile', link: '/profile/view', icon: '\u{1F441}\u{FE0F}' },
      { label: 'Edit Profile', link: '/profile/edit', icon: '\u{270F}\u{FE0F}' },
      { label: 'Privacy', link: '/profile/privacy', icon: '\u{1F512}' },
    ],
  },
  {
    label: 'Settings',
    icon: '\u{2699}\u{FE0F}',
    subMenu: [
      { label: 'Account', link: '/settings/account', icon: '\u{1F527}' },
      { label: 'Preferences', link: '/settings/preferences', icon: '\u{1F3A8}' },
      { label: 'Security', link: '/settings/security', icon: '\u{1F6E1}\u{FE0F}' },
      { label: 'Billing', link: '/settings/billing', icon: '\u{1F4B3}' },
    ],
  },
  {
    label: 'Notifications',
    link: '/notifications',
    icon: '\u{1F514}',
  },
  {
    label: 'Help',
    icon: '\u{2753}',
    subMenu: [
      { label: 'Documentation', link: '/help/docs', icon: '\u{1F4DA}' },
      { label: 'Contact Support', link: '/help/support', icon: '\u{1F4AC}' },
      { label: 'FAQ', link: '/help/faq', icon: '\u{1F4A1}' },
    ],
  },
  {
    label: 'Logout',
    link: '/logout',
    icon: '\u{1F6AA}',
  },
];

const DEFAULT_MENU_ITEMS: ReadonlyArray<DropdownItem> = [
  {
    label: 'Products',
    subMenu: [
      { label: 'Software', link: '/products/software' },
      {
        label: 'Services',
        subMenu: [
          { label: 'Consulting', link: '/products/services/consulting' },
          { label: 'Training', link: '/products/services/training' },
          { label: 'Support', link: '/products/services/support' },
        ],
      },
      { label: 'Cloud Solutions', link: '/products/cloud' },
    ],
  },
  {
    label: 'Solutions',
    subMenu: [
      { label: 'Enterprise', link: '/solutions/enterprise' },
      { label: 'Small Business', link: '/solutions/smb' },
      { label: 'Startups', link: '/solutions/startups' },
    ],
  },
  {
    label: 'Resources',
    subMenu: [
      { label: 'Documentation', link: '/resources/docs' },
      { label: 'Tutorials', link: '/resources/tutorials' },
      { label: 'Blog', link: '/resources/blog' },
      { label: 'Support', link: '/resources/support' },
    ],
  },
  { label: 'About', link: '/about' },
  { label: 'Contact', link: '/contact' },
  { label: 'Pricing', link: '/pricing' },
  { label: 'Partners', link: '/partners' },
  { label: 'Careers', link: '/careers' },
  { label: 'Blog', link: '/blog' },
  { label: 'Docs', link: '/docs' },
  { label: 'Support', link: '/support' },
  { label: 'Community', link: '/community' },
  { label: 'Events', link: '/events' },
];

function cloneDropdownItems(items: ReadonlyArray<DropdownItem>): DropdownItem[] {
  return items.map(item => ({
    label: item.label,
    link: item.link,
    icon: item.icon,
    active: item.active,
    subMenu: item.subMenu ? cloneDropdownItems(item.subMenu) : undefined,
  }));
}

export function getDefaultUserProfile(): UserProfile {
  return { ...DEFAULT_USER_PROFILE };
}

export function getDefaultProfileMenuItems(): DropdownItem[] {
  return cloneDropdownItems(DEFAULT_PROFILE_MENU_ITEMS);
}

export function getDefaultMenuItems(): NavItem[] {
  return cloneDropdownItems(DEFAULT_MENU_ITEMS);
}
