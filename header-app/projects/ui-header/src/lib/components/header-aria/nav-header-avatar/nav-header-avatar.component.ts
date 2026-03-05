import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-nav-header-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-header-avatar.component.html',
  styleUrls: ['./nav-header-avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavHeaderAvatar {
  avatarUrl = input<string>('');
  userName = input<string>('');
  size = input<'small' | 'medium' | 'large'>('medium');
  showOnlineStatus = input<boolean>(false);
  isOnline = input<boolean>(false);
  clickable = input<boolean>(true);

  avatarClick = output<void>();

  onAvatarClick() {
    if (this.clickable()) {
      this.avatarClick.emit();
    }
  }

  shouldShowInitials(): boolean {
    return !this.avatarUrl() && !!this.userName();
  }

  shouldShowDefaultIcon(): boolean {
    return !this.avatarUrl() && !this.userName();
  }

  getInitials(): string {
    const name = this.userName();
    if (!name) return '';

    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (words[0].charAt(0).toUpperCase() + ' ' + words[words.length - 1].charAt(0).toUpperCase());
  }

  getSizeClass(): string {
    return `avatar-${this.size()}`;
  }
}
