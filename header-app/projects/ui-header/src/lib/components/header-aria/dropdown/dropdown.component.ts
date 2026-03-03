import { Component, input, viewChild, signal, effect, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menu, MenuItem, MenuTrigger, MenuContent } from '@angular/aria/menu';
import { CdkMenuModule, PARENT_OR_NEW_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import type { DropdownItem } from '../../../models';

// Re-export for backward compatibility
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
  label = input<string>('');
  items = input<DropdownItem[]>([]);
  active = input<boolean>(false);
  measureOnly = input<boolean>(false);

  menu = viewChild<Menu<string>>('menu');

  openSubmenuIndex = signal<number | null>(null);
  itemClick = output<void>();

  constructor() {
    effect(() => {
      const menuRef = this.menu();
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
        if (element && element.scrollIntoView) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  onItemClick() {
    this.itemClick.emit();
  }
}
