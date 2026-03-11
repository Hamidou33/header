import { ChangeDetectionStrategy, Component, effect, input, output, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkMenuModule, PARENT_OR_NEW_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';
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
export class DropdownComponent {
  private static readonly SCROLL_DELAY_MS = 100;

  public readonly label = input('');
  public readonly items = input<DropdownItem[]>([]);
  public readonly active = input(false);
  public readonly measureOnly = input(false);

  public readonly menu = viewChild<Menu<string>>('menu');

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
      const menuRef = this.menu();
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
    }, DropdownComponent.SCROLL_DELAY_MS);
  }
}
