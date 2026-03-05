import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Nav-Left component for the header's left zone
 * Can contain secondary logo, tags, badges, or any custom content
 */
@Component({
  selector: 'ui-nav-left',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLeft {
  /**
   * Secondary logo image path
   */
  secondaryLogoPath = input<string>();

  /**
   * Secondary logo alt text
   */
  secondaryLogoAlt = input<string>('Secondary logo');

  /**
   * Secondary logo click URL
   */
  secondaryLogoUrl = input<string>('/');

  /**
   * Tag/badge text to display
   */
  tagText = input<string>();

  /**
   * Tag/badge variant style
   */
  tagVariant = input<'primary' | 'secondary' | 'success' | 'info' | 'warning'>('primary');

  /**
   * Show separator between logo and content
   */
  showSeparator = input<boolean>(true);
}
