import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { DropdownItem } from './dropdown/dropdown';
import { Nav, NavItem } from './nav/nav';
import { ProfileMenu, UserProfile } from './profile-menu/profile-menu';
import {
  getDefaultMenuItems,
  getDefaultProfileMenuItems,
  getDefaultUserProfile,
} from '../../../projects/ui-header/src/lib/components/header-aria/header/header.defaults';

@Component({
  selector: 'app-header',
  imports: [CommonModule, CdkMenuModule, Nav, ProfileMenu],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly showProfile = input(true);
  readonly showAvatar = input(false);
  readonly showEmail = input(false);
  readonly showIcons = input(false);
  readonly maxVisibleItems = input(99);
  readonly logoPath = input<string | null>('/logo-header.svg');
  readonly rounded = input(true);

  readonly isHeaderFixed = input(false);
  readonly showHeaderPreNav = input(true);
  readonly showHeaderPostNav = input(true);
  readonly showHeaderPostNavMobile = input(false);

  readonly sticky = input(false);
  readonly showNav = input(true);

  readonly companyName = input('My Company');
  readonly logoUrl = input('/');

  readonly userProfile = input<UserProfile | null>(getDefaultUserProfile());
  readonly profileMenuItems = input<DropdownItem[]>(getDefaultProfileMenuItems());
  readonly menuItems = input<NavItem[]>(getDefaultMenuItems());
}
