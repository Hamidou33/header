import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { UserProfile, DropdownItem } from '../../../models';

@Component({
  selector: 'ui-profile-menu-cdk',
  imports: [CommonModule, CdkMenuModule],
  templateUrl: './profile-menu-cdk.html',
  styleUrl: '../../header-aria/profile-menu/profile-menu.css',
})
export class ProfileMenuCdk {
  user = input.required<UserProfile>();
  menuItems = input<DropdownItem[]>([]);
}
