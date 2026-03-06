import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavHeaderNotif } from './nav-header-notif.component';

interface NotifInputs {
  notificationCount: number;
  maxCount: number;
  showBadge: boolean;
  iconUrl: string;
  size: 'small' | 'medium' | 'large';
  variant: 'default' | 'primary' | 'danger';
}

describe('NavHeaderNotif Component', () => {
  let fixture: ComponentFixture<NavHeaderNotif>;
  let component: NavHeaderNotif;

  const createComponent = (): void => {
    TestBed.configureTestingModule({
      imports: [NavHeaderNotif],
    });

    fixture = TestBed.createComponent(NavHeaderNotif);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const setInput = <K extends keyof NotifInputs>(name: K, value: NotifInputs[K]): void => {
    fixture.componentRef.setInput(name, value);
    fixture.detectChanges();
  };

  const queryElement = (selector: string): HTMLElement | null => {
    return fixture.nativeElement.querySelector(selector);
  };

  beforeEach(createComponent);

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeInstanceOf(NavHeaderNotif);
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

      expect(queryElement('.notif-badge')).toBeNull();
      expect(component.displayCount()).toBe('');
    });

    it('should hide badge when showBadge is false', () => {
      setInput('notificationCount', 10);
      setInput('showBadge', false);

      expect(queryElement('.notif-badge')).toBeNull();
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

      const image = queryElement('.notif-icon-image') as HTMLImageElement | null;

      expect(image).not.toBeNull();
      expect(image?.src).toContain('bell.svg');
    });

    it('should display default svg icon when iconUrl is empty', () => {
      const icon = queryElement('.notif-icon');

      expect(icon).not.toBeNull();
    });
  });

  describe('Click behavior', () => {
    it('should emit notifClick when button is clicked', () => {
      const emitSpy = vi.fn();
      component.notifClick.subscribe(emitSpy);

      const button = queryElement('[data-testid="notif-button"]') as HTMLButtonElement | null;
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
