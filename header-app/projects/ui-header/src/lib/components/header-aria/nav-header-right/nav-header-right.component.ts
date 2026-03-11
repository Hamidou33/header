import { ChangeDetectionStrategy, Component, effect, input, output, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkMenuModule, PARENT_OR_NEW_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { NavHeaderAvatarComponent } from '../nav-header-avatar/nav-header-avatar.component';
import type { DropdownItem, UserProfile } from '../../../models';

export type { UserProfile };

@Component({
  selector: 'ui-nav-header-right',
  imports: [
    CommonModule,
    RouterModule,
    Menu,
    MenuItem,
    MenuTrigger,
    MenuContent,
    CdkMenuModule,
    OverlayModule,
    NavHeaderAvatarComponent,
  ],
  providers: [PARENT_OR_NEW_MENU_STACK_PROVIDER],
  templateUrl: './nav-header-right.component.html',
  styleUrl: './nav-header-right.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavHeaderRightComponent {
  private static readonly SCROLL_DELAY_MS = 100;

  public readonly user = input.required<UserProfile>();
  public readonly menuItems = input<DropdownItem[]>([]);
  public readonly showAvatar = input(true);
  public readonly showEmail = input(false);
  public readonly showIcons = input(false);
  public readonly avatarSize = input<'small' | 'medium' | 'large'>('medium');

  public readonly profileMenu = viewChild<Menu<string>>('profileMenu');

  public readonly openSubmenuIndex = signal<number | undefined>(undefined);
  public readonly itemClick = output<void>();

  public constructor() {
    this.setupMenuVisibilityWatcher();
  }

  public toggleSubmenu(index: number, event: Event): void {
    this.preventEventPropagation(event);

    const shouldOpen = this.shouldOpenSubmenu(index);
    this.updateSubmenuState(shouldOpen ? index : undefined);

    const target = this.getCurrentTargetElement(event);
    if (shouldOpen && target) {
      this.scrollSubmenuIntoView(target);
    }
  }

  public onItemClick(): void {
    this.itemClick.emit();
  }

  private setupMenuVisibilityWatcher(): void {
    effect(() => {
      const menuRef = this.profileMenu();
      if (menuRef && !menuRef.visible()) {
        this.closeAllSubmenus();
      }
    });
  }

  private preventEventPropagation(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private shouldOpenSubmenu(index: number): boolean {
    return this.openSubmenuIndex() !== index;
  }

  private updateSubmenuState(index: number | undefined): void {
    this.openSubmenuIndex.set(index);
  }

  private closeAllSubmenus(): void {
    this.openSubmenuIndex.set(undefined);
  }

  private getCurrentTargetElement(event: Event): HTMLElement | undefined {
    return event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;
  }

  private scrollSubmenuIntoView(element: HTMLElement): void {
    setTimeout(() => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, NavHeaderRightComponent.SCROLL_DELAY_MS);
  }
}

export { NavHeaderRightComponent as ProfileMenu };
