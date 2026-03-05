import { Component, input, viewChild, signal, effect, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menu, MenuItem, MenuTrigger, MenuContent } from '@angular/aria/menu';
import { CdkMenuModule, PARENT_OR_NEW_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import type { DropdownItem } from '../../../models';

export type { DropdownItem };

@Component({
  selector: 'ui-dropdown',
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
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dropdown {
  private static readonly SCROLL_DELAY_MS = 100;

  label = input<string>('');
  items = input<DropdownItem[]>([]);
  active = input<boolean>(false);
  measureOnly = input<boolean>(false);

  menu = viewChild<Menu<string>>('menu');

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
      const menuRef = this.menu();
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
    }, Dropdown.SCROLL_DELAY_MS);
  }
}
