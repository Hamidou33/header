import { Component, input, viewChild, signal, effect, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menu, MenuItem, MenuTrigger, MenuContent } from '@angular/aria/menu';
import { CdkMenuModule, PARENT_OR_NEW_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { NavHeaderAvatar } from '../nav-header-avatar/nav-header-avatar.component';
import type { DropdownItem, UserProfile } from '../../../models';

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
    NavHeaderAvatar,
  ],
  providers: [PARENT_OR_NEW_MENU_STACK_PROVIDER],
  templateUrl: './nav-right.component.html',
  styleUrl: './nav-right.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavRight {
  private static readonly SCROLL_DELAY_MS = 100;

  user = input.required<UserProfile>();
  menuItems = input<DropdownItem[]>([]);
  showAvatar = input<boolean>(true);
  showEmail = input<boolean>(false);
  showIcons = input<boolean>(false);
  avatarSize = input<'small' | 'medium' | 'large'>('medium');

  profileMenu = viewChild<Menu<string>>('profileMenu');

  openSubmenuIndex = signal<number | null>(null);
  itemClick = output<void>();

  constructor() {
    this.setupMenuVisibilityWatcher();
  }

  toggleSubmenu(index: number, event: Event) {
    this.preventEventPropagation(event);

    const shouldOpen = this.shouldOpenSubmenu(index);
    this.updateSubmenuState(shouldOpen ? index : null);

    if (shouldOpen) {
      this.scrollSubmenuIntoView(event.currentTarget as HTMLElement);
    }
  }

  onItemClick() {
    this.itemClick.emit();
  }

  private setupMenuVisibilityWatcher() {
    effect(() => {
      const menuRef = this.profileMenu();
      if (menuRef && !menuRef.visible()) {
        this.closeAllSubmenus();
      }
    });
  }

  private preventEventPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private shouldOpenSubmenu(index: number): boolean {
    return this.openSubmenuIndex() !== index;
  }

  private updateSubmenuState(index: number | null) {
    this.openSubmenuIndex.set(index);
  }

  private closeAllSubmenus() {
    this.openSubmenuIndex.set(null);
  }

  private scrollSubmenuIntoView(element: HTMLElement) {
    setTimeout(() => {
      if (element?.scrollIntoView) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, NavRight.SCROLL_DELAY_MS);
  }
}

export { NavRight as ProfileMenu };
