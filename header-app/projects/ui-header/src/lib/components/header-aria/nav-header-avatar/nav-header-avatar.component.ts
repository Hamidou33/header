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
export class NavHeaderAvatarComponent {
  public readonly avatarUrl = input('');
  public readonly userName = input('');
  public readonly size = input<'small' | 'medium' | 'large'>('medium');
  public readonly showOnlineStatus = input(false);
  public readonly isOnline = input(false);
  public readonly clickable = input(true);

  public readonly avatarClick = output<void>();

  public readonly initials = computed(() => this.computeInitials());
  public readonly shouldShowInitials = computed(() => this.computeShouldShowInitials());
  public readonly shouldShowDefaultIcon = computed(() => this.computeShouldShowDefaultIcon());
  public readonly sizeClass = computed(() => this.computeSizeClass());

  public onAvatarClick(): void {
    if (this.clickable()) {
      this.avatarClick.emit();
    }
  }

  private computeInitials(): string {
    const name = this.userName().trim();
    if (!name) {
      return '';
    }

    const words = name.split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return `${words[0].charAt(0).toUpperCase()} ${words[words.length - 1].charAt(0).toUpperCase()}`;
  }

  private computeShouldShowInitials(): boolean {
    return !this.avatarUrl() && this.initials().length > 0;
  }

  private computeShouldShowDefaultIcon(): boolean {
    return !this.avatarUrl() && this.initials().length === 0;
  }

  private computeSizeClass(): string {
    return `avatar-${this.size()}`;
  }
}
