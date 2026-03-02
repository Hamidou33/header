import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { NavLink } from '../../header-aria/nav-link/nav-link';
import { DropdownCdk } from '../dropdown/dropdown-cdk';
import { NavItem } from '../../../models';

@Component({
  selector: 'ui-nav-cdk',
  imports: [CommonModule, CdkMenuModule, NavLink, DropdownCdk],
  templateUrl: './nav-cdk.html',
  styleUrl: '../../header-aria/nav/nav.css',
})
export class NavCdk {
  items = input<NavItem[]>([]);
}
