import { Component, input, viewChild, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menu, MenuItem, MenuTrigger, MenuContent } from '@angular/aria/menu';
import { CdkMenuModule, PARENT_OR_NEW_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { DropdownItem } from '../dropdown/dropdown';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-profile-menu',
  imports: [CommonModule, RouterModule, Menu, MenuItem, MenuTrigger, MenuContent, CdkMenuModule, OverlayModule],
  providers: [PARENT_OR_NEW_MENU_STACK_PROVIDER],
  templateUrl: './profile-menu.html',
  styleUrl: './profile-menu.css',
})
export class ProfileMenu {
  user = input.required<UserProfile>();
  menuItems = input<DropdownItem[]>([]);
  showAvatar = input<boolean>(false);
  showEmail = input<boolean>(false);
  showIcons = input<boolean>(false);

  profileMenu = viewChild<Menu<string>>('profileMenu');

  openSubmenuIndex = signal<number | null>(null);

  constructor() {
    effect(() => {
      const menuRef = this.profileMenu();
      if (menuRef && !menuRef.visible()) {
        this.openSubmenuIndex.set(null);
      }
    });
  }

  toggleSubmenu(index: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const isOpening = this.openSubmenuIndex() !== index;
    this.openSubmenuIndex.set(isOpening ? index : null);

    if (isOpening) {
      const element = event.currentTarget as HTMLElement;
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
}
