import { Component, input, viewChild, signal, effect, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menu, MenuItem, MenuTrigger, MenuContent } from '@angular/aria/menu';
import { CdkMenuModule, PARENT_OR_NEW_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import type { DropdownItem, UserProfile } from '../../../models';

// Re-export for backward compatibility
export type { UserProfile };

@Component({
  selector: 'ui-nav-right',
  imports: [
    CommonModule,
    RouterModule,
    Menu,
    MenuItem,
    MenuTrigger,
    MenuContent,
    CdkMenuModule,
    OverlayModule,
  ],
  providers: [PARENT_OR_NEW_MENU_STACK_PROVIDER],
  templateUrl: './nav-right.component.html',
  styleUrl: './nav-right.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavRight {
  user = input.required<UserProfile>();
  menuItems = input<DropdownItem[]>([]);
  showAvatar = input<boolean>(false);
  showEmail = input<boolean>(false);
  showIcons = input<boolean>(false);

  profileMenu = viewChild<Menu<string>>('profileMenu');

  openSubmenuIndex = signal<number | null>(null);
  itemClick = output<void>();

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

  onItemClick() {
    this.itemClick.emit();
  }
}

// Backward compatibility alias
export { NavRight as ProfileMenu };
