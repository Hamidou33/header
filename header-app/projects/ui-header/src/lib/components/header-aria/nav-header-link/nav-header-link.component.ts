import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MenuItem } from '@angular/aria/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-nav-header-link',
  imports: [CommonModule, RouterModule, CdkMenuModule, MenuItem],
  templateUrl: './nav-header-link.component.html',
  styleUrl: './nav-header-link.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavHeaderLink {
  readonly label = input('');
  readonly link = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
  readonly active = input(false);
  readonly measureOnly = input(false);
  readonly useAriaMenu = input(false);
  readonly itemClick = output<void>();

  onLinkClick(): void {
    this.itemClick.emit();
  }
}
