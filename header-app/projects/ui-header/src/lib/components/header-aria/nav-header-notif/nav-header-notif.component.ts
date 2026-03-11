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
export class NavHeaderNotifComponent {
  public readonly notificationCount = input(0);
  public readonly maxCount = input(99);
  public readonly showBadge = input(true);
  public readonly iconUrl = input('');
  public readonly size = input<'small' | 'medium' | 'large'>('medium');
  public readonly variant = input<'default' | 'primary' | 'danger'>('default');

  public readonly notifClick = output<void>();

  public readonly hasNotifications = computed(() => this.computeHasNotifications());
  public readonly sizeClass = computed(() => this.computeSizeClass());
  public readonly variantClass = computed(() => this.computeVariantClass());
  public readonly displayCount = computed(() => this.computeDisplayCount());

  public onNotifClick(): void {
    this.notifClick.emit();
  }

  private computeHasNotifications(): boolean {
    return this.notificationCount() > 0;
  }

  private computeSizeClass(): string {
    return `notif-${this.size()}`;
  }

  private computeVariantClass(): string {
    return `notif-${this.variant()}`;
  }

  private computeDisplayCount(): string {
    const count = this.notificationCount();
    const max = this.maxCount();

    if (count === 0) {
      return '';
    }

    if (count > max) {
      return `${max}+`;
    }

    return `${count}`;
  }
}
