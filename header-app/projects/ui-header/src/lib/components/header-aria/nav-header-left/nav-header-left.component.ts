import { Component, ChangeDetectionStrategy, input } from '@angular/core';
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
  secondaryLogoPath = input<string>();
  secondaryLogoAlt = input<string>('Secondary logo');
  secondaryLogoUrl = input<string>('/');
  tagText = input<string>();
  tagVariant = input<'primary' | 'secondary' | 'success' | 'info' | 'warning'>('primary');
  showSeparator = input<boolean>(true);
}

