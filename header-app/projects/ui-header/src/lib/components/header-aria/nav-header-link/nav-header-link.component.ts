import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MenuItem } from '@angular/aria/menu';

@Component({
  selector: 'ui-nav-header-link',
  imports: [CommonModule, RouterModule, CdkMenuModule, MenuItem],
  templateUrl: './nav-header-link.component.html',
  styleUrl: './nav-header-link.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavHeaderLink {
  label = input<string>('');
  link = input<string | undefined>();
  icon = input<string | undefined>();
  active = input<boolean>(false);
  measureOnly = input<boolean>(false);
  useAriaMenu = input<boolean>(false);
  itemClick = output<void>();

  onLinkClick() {
    this.itemClick.emit();
  }
}

