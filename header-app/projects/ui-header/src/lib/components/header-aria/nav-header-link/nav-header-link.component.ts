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
export class NavHeaderLinkComponent {
  public readonly label = input('');
  public readonly link = input<string | undefined>(undefined);
  public readonly icon = input<string | undefined>(undefined);
  public readonly active = input(false);
  public readonly measureOnly = input(false);
  public readonly useAriaMenu = input(false);
  public readonly itemClick = output<void>();

  public onLinkClick(): void {
    this.itemClick.emit();
  }
}
