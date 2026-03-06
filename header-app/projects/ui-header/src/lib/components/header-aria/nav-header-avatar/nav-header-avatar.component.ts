import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
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
  readonly avatarUrl = input('');
  readonly userName = input('');
  readonly size = input<'small' | 'medium' | 'large'>('medium');
  readonly showOnlineStatus = input(false);
  readonly isOnline = input(false);
  readonly clickable = input(true);

  readonly avatarClick = output<void>();

  readonly initials = computed(() => {
    const name = this.userName().trim();
    if (!name) {
      return '';
    }

    const words = name.split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return `${words[0].charAt(0).toUpperCase()} ${words[words.length - 1].charAt(0).toUpperCase()}`;
  });

  readonly shouldShowInitials = computed(() => !this.avatarUrl() && this.initials().length > 0);
  readonly shouldShowDefaultIcon = computed(() => !this.avatarUrl() && this.initials().length === 0);
  readonly sizeClass = computed(() => `avatar-${this.size()}`);

  onAvatarClick(): void {
    if (this.clickable()) {
      this.avatarClick.emit();
    }
  }
}
