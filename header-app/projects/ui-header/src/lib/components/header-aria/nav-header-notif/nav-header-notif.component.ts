import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
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
  readonly notificationCount = input(0);
  readonly maxCount = input(99);
  readonly showBadge = input(true);
  readonly iconUrl = input('');
  readonly size = input<'small' | 'medium' | 'large'>('medium');
  readonly variant = input<'default' | 'primary' | 'danger'>('default');

  readonly notifClick = output<void>();

  readonly hasNotifications = computed(() => this.notificationCount() > 0);
  readonly sizeClass = computed(() => `notif-${this.size()}`);
  readonly variantClass = computed(() => `notif-${this.variant()}`);
  readonly displayCount = computed(() => {
    const count = this.notificationCount();
    const max = this.maxCount();

    if (count === 0) {
      return '';
    }

    if (count > max) {
      return `${max}+`;
    }

    return `${count}`;
  });

  onNotifClick(): void {
    this.notifClick.emit();
  }
}
