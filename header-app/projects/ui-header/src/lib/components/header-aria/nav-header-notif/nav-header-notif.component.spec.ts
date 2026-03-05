import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavHeaderNotif } from './nav-header-notif.component';

describe('NavHeaderNotif Component', () => {
  let fixture: ComponentFixture<NavHeaderNotif>;
  let component: NavHeaderNotif;

  const createComponent = () => {
    TestBed.configureTestingModule({
      imports: [NavHeaderNotif],
    });
    fixture = TestBed.createComponent(NavHeaderNotif);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const setInput = (name: string, value: unknown) => {
    fixture.componentRef.setInput(name, value);
    fixture.detectChanges();
  };

  const queryElement = (selector: string): HTMLElement | null => {
    return fixture.nativeElement.querySelector(selector);
  };

  beforeEach(createComponent);

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Notification Badge', () => {
    it('should show badge with count when notifications exist', () => {
      setInput('notificationCount', 5);

      const badge = queryElement('.notif-badge');

      expect(badge).toBeTruthy();
      expect(badge?.textContent?.trim()).toBe('5');
    });

    it('should show 99+ when count exceeds max', () => {
      setInput('notificationCount', 150);
      setInput('maxCount', 99);

      expect(component.getDisplayCount()).toBe('99+');
    });

    it('should hide badge when count is zero', () => {
      setInput('notificationCount', 0);

      const badge = queryElement('.notif-badge');

      expect(badge).toBeFalsy();
    });

    it('should hide badge when showBadge is false', () => {
      setInput('notificationCount', 10);
      setInput('showBadge', false);

      const badge = queryElement('.notif-badge');

      expect(badge).toBeFalsy();
    });
  });

  describe('Badge Variants', () => {
    it('should apply default variant class', () => {
      setInput('notificationCount', 1);
      setInput('variant', 'default');

      const badge = queryElement('.notif-badge');

      expect(badge?.classList.contains('notif-default')).toBe(true);
    });

    it('should apply primary variant class', () => {
      setInput('notificationCount', 1);
      setInput('variant', 'primary');

      const badge = queryElement('.notif-badge');

      expect(badge?.classList.contains('notif-primary')).toBe(true);
    });

    it('should apply danger variant class', () => {
      setInput('notificationCount', 1);
      setInput('variant', 'danger');

      const badge = queryElement('.notif-badge');

      expect(badge?.classList.contains('notif-danger')).toBe(true);
    });
  });

  describe('Icon Display', () => {
    it('should display custom icon when iconUrl is provided', () => {
      setInput('iconUrl', 'https://example.com/bell.svg');

      const iconImage = queryElement('.notif-icon-image') as HTMLImageElement;

      expect(iconImage).toBeTruthy();
      expect(iconImage.src).toContain('bell.svg');
    });

    it('should display default SVG icon when no iconUrl provided', () => {
      const svgIcon = queryElement('.notif-icon');

      expect(svgIcon).toBeTruthy();
      expect(svgIcon?.tagName.toLowerCase()).toBe('svg');
    });
  });

  describe('Size Variants', () => {
    it('should apply small size class', () => {
      setInput('size', 'small');

      const container = queryElement('.notif-container');

      expect(container?.classList.contains('notif-small')).toBe(true);
    });

    it('should apply medium size class by default', () => {
      const container = queryElement('.notif-container');

      expect(container?.classList.contains('notif-medium')).toBe(true);
    });

    it('should apply large size class', () => {
      setInput('size', 'large');

      const container = queryElement('.notif-container');

      expect(container?.classList.contains('notif-large')).toBe(true);
    });
  });

  describe('Click Behavior', () => {
    it('should emit event when clicked', () => {
      let eventEmitted = false;
      component.notifClick.subscribe(() => {
        eventEmitted = true;
      });

      const button = queryElement('.notif-container') as HTMLButtonElement;
      button.click();

      expect(eventEmitted).toBe(true);
    });
  });

  describe('Notification Status', () => {
    it('should detect when notifications exist', () => {
      setInput('notificationCount', 5);

      expect(component.hasNotifications()).toBe(true);
    });

    it('should detect when no notifications exist', () => {
      setInput('notificationCount', 0);

      expect(component.hasNotifications()).toBe(false);
    });

    it('should apply has-notifications class when notifications exist', () => {
      setInput('notificationCount', 3);

      const container = queryElement('.notif-container');

      expect(container?.classList.contains('has-notifications')).toBe(true);
    });
  });
});
