import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavHeaderNotifComponent } from './nav-header-notif.component';

interface NotifInputs {
  notificationCount: number;
  maxCount: number;
  showBadge: boolean;
  iconUrl: string;
  size: 'small' | 'medium' | 'large';
  variant: 'default' | 'primary' | 'danger';
}

describe('NavHeaderNotif Component', () => {
  let fixture: ComponentFixture<NavHeaderNotifComponent>;
  let component: NavHeaderNotifComponent;

  const createComponent = (): void => {
    TestBed.configureTestingModule({
      imports: [NavHeaderNotifComponent],
    });

    fixture = TestBed.createComponent(NavHeaderNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const setInput = <K extends keyof NotifInputs>(name: K, value: NotifInputs[K]): void => {
    fixture.componentRef.setInput(name, value);
    fixture.detectChanges();
  };

  const queryElement = (selector: string): HTMLElement | undefined => {
    return fixture.nativeElement.querySelector(selector) ?? undefined;
  };

  beforeEach(createComponent);

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeInstanceOf(NavHeaderNotifComponent);
  });

  describe('Badge behavior', () => {
    it('should show badge with the count when notifications exist', () => {
      setInput('notificationCount', 5);

      const badge = queryElement('.notif-badge');

      expect(badge?.textContent?.trim()).toBe('5');
      expect(component.displayCount()).toBe('5');
    });

    it('should show max+ format when count exceeds maxCount', () => {
      setInput('notificationCount', 150);
      setInput('maxCount', 99);

      expect(component.displayCount()).toBe('99+');
    });

    it('should hide badge when count is zero', () => {
      setInput('notificationCount', 0);

      expect(queryElement('.notif-badge')).toBeUndefined();
      expect(component.displayCount()).toBe('');
    });

    it('should hide badge when showBadge is false', () => {
      setInput('notificationCount', 10);
      setInput('showBadge', false);

      expect(queryElement('.notif-badge')).toBeUndefined();
    });
  });

  describe('Variant and size classes', () => {
    it('should apply variant class to badge', () => {
      setInput('notificationCount', 1);
      setInput('variant', 'primary');

      const badge = queryElement('.notif-badge');

      expect(badge?.classList.contains('notif-primary')).toBe(true);
      expect(component.variantClass()).toBe('notif-primary');
    });

    it('should apply size class to container', () => {
      setInput('size', 'large');

      const button = queryElement('[data-testid="notif-button"]');

      expect(button?.classList.contains('notif-large')).toBe(true);
      expect(component.sizeClass()).toBe('notif-large');
    });
  });

  describe('Icon behavior', () => {
    it('should display custom icon image when iconUrl is provided', () => {
      setInput('iconUrl', 'https://example.com/bell.svg');

      const image = queryElement('.notif-icon-image') as HTMLImageElement | undefined;

      expect(image).toBeDefined();
      expect(image?.src).toContain('bell.svg');
    });

    it('should display default svg icon when iconUrl is empty', () => {
      const icon = queryElement('.notif-icon');

      expect(icon).toBeDefined();
    });
  });

  describe('Click behavior', () => {
    it('should emit notifClick when button is clicked', () => {
      const emitSpy = vi.fn();
      component.notifClick.subscribe(emitSpy);

      const button = queryElement('[data-testid="notif-button"]') as HTMLButtonElement | undefined;
      button?.click();

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Notification state', () => {
    it('should expose hasNotifications signal state', () => {
      setInput('notificationCount', 3);

      expect(component.hasNotifications()).toBe(true);

      setInput('notificationCount', 0);

      expect(component.hasNotifications()).toBe(false);
    });
  });
});
