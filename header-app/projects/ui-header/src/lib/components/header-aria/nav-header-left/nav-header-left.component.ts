import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-nav-header-left',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-header-left.component.html',
  styleUrls: ['./nav-header-left.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavHeaderLeftComponent {
  public readonly secondaryLogoPath = input<string | undefined>(undefined);
  public readonly secondaryLogoAlt = input('Secondary logo');
  public readonly secondaryLogoUrl = input('/');
  public readonly tagText = input<string | undefined>(undefined);
  public readonly tagVariant = input<'primary' | 'secondary' | 'success' | 'info' | 'warning'>('primary');
  public readonly showSeparator = input(true);
}
