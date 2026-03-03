import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavCdk } from '../nav/nav-cdk';
import { ProfileMenuCdk } from '../profile-menu/profile-menu-cdk';
import { NavItem, UserProfile, DropdownItem, HeaderTheme } from '../../../models';

@Component({
  selector: 'ui-header-cdk',
  imports: [CommonModule, NavCdk, ProfileMenuCdk],
  templateUrl: './header-cdk.html',
  styleUrl: '../../header-aria/header/header.component.css',
})
export class HeaderCdk {
  companyName = input<string>('My Company');
  logoUrl = input<string>('🏢');
  menuItems = input<NavItem[]>([]);
  userProfile = input<UserProfile | undefined>(undefined);
  profileMenuItems = input<DropdownItem[]>([]);
  theme = input<HeaderTheme | undefined>(undefined);
  sticky = input<boolean>(true);
  showBrand = input<boolean>(true);
  showNav = input<boolean>(true);
  showProfile = input<boolean>(true);
}
