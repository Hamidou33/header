export interface NavItem {
  label: string;
  link?: string;
  icon?: string;
  active?: boolean;
  subMenu?: DropdownItem[];
}

export interface DropdownItem {
  label: string;
  link?: string;
  icon?: string;
  active?: boolean;
  subMenu?: DropdownItem[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

export interface HeaderConfig {
  companyName?: string;
  logoUrl?: string;
  menuItems?: NavItem[];
  userProfile?: UserProfile;
  profileMenuItems?: DropdownItem[];
  theme?: HeaderTheme;
}

export interface HeaderTheme {
  primaryColor?: string;
  hoverColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
}

export type MenuPosition = Array<{
  originX: 'start' | 'center' | 'end';
  originY: 'top' | 'center' | 'bottom';
  overlayX: 'start' | 'center' | 'end';
  overlayY: 'top' | 'center' | 'bottom';
}>;
