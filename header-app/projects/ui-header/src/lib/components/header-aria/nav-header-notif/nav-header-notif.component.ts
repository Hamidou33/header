import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-nav-header-notif',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-header-notif.component.html',
  styleUrls: ['./nav-header-notif.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavHeaderNotif {
  notificationCount = input<number>(0);
  maxCount = input<number>(99);
  showBadge = input<boolean>(true);
  iconUrl = input<string>('');
  size = input<'small' | 'medium' | 'large'>('medium');
  variant = input<'default' | 'primary' | 'danger'>('default');

  notifClick = output<void>();

  onNotifClick() {
    this.notifClick.emit();
  }

  getDisplayCount(): string {
    const count = this.notificationCount();
    const max = this.maxCount();

    if (count === 0) return '';
    if (count > max) return `${max}+`;
    return count.toString();
  }

  hasNotifications(): boolean {
    return this.notificationCount() > 0;
  }

  getSizeClass(): string {
    return `notif-${this.size()}`;
  }

  getVariantClass(): string {
    return `notif-${this.variant()}`;
  }
}
