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
export class NavHeaderLeft {
  readonly secondaryLogoPath = input<string | null>(null);
  readonly secondaryLogoAlt = input('Secondary logo');
  readonly secondaryLogoUrl = input('/');
  readonly tagText = input<string | null>(null);
  readonly tagVariant = input<'primary' | 'secondary' | 'success' | 'info' | 'warning'>('primary');
  readonly showSeparator = input(true);
}
