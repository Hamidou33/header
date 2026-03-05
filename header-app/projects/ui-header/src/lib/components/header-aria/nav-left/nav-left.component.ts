import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-nav-left',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLeft {
  secondaryLogoPath = input<string>();
  secondaryLogoAlt = input<string>('Secondary logo');
  secondaryLogoUrl = input<string>('/');
  tagText = input<string>();
  tagVariant = input<'primary' | 'secondary' | 'success' | 'info' | 'warning'>('primary');
  showSeparator = input<boolean>(true);
}
