import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavHeaderAvatar } from './nav-header-avatar.component';

describe('NavHeaderAvatar Component', () => {
  let fixture: ComponentFixture<NavHeaderAvatar>;
  let component: NavHeaderAvatar;

  const createComponent = () => {
    TestBed.configureTestingModule({
      imports: [NavHeaderAvatar],
    });
    fixture = TestBed.createComponent(NavHeaderAvatar);
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

  describe('Avatar Display', () => {
    it('should display image when avatarUrl is provided', () => {
      setInput('avatarUrl', 'https://example.com/avatar.jpg');

      const image = queryElement('.avatar-image') as HTMLImageElement;

      expect(image).toBeTruthy();
      expect(image.src).toContain('avatar.jpg');
    });

    it('should display default icon when no avatarUrl and no userName', () => {
      const defaultIcon = queryElement('.avatar-default-icon');

      expect(defaultIcon).toBeTruthy();
      expect(defaultIcon?.tagName.toLowerCase()).toBe('svg');
    });

    it('should display initials when userName is provided without avatarUrl', () => {
      setInput('userName', 'John Doe');

      const initials = queryElement('.avatar-initials');

      expect(initials).toBeTruthy();
      expect(initials?.textContent?.trim()).toBe('J D');
    });

    it('should display single initial for single word name', () => {
      setInput('userName', 'John');

      expect(component.getInitials()).toBe('J');
    });

    it('should format initials with space for multi-word names', () => {
      setInput('userName', 'John Doe');

      expect(component.getInitials()).toBe('J D');
    });
  });

  describe('Size Variants', () => {
    it('should apply small size class', () => {
      setInput('size', 'small');

      const container = queryElement('.avatar-container');

      expect(container?.classList.contains('avatar-small')).toBe(true);
    });

    it('should apply medium size class by default', () => {
      const container = queryElement('.avatar-container');

      expect(container?.classList.contains('avatar-medium')).toBe(true);
    });

    it('should apply large size class', () => {
      setInput('size', 'large');

      const container = queryElement('.avatar-container');

      expect(container?.classList.contains('avatar-large')).toBe(true);
    });
  });

  describe('Online Status', () => {
    it('should show online status when enabled', () => {
      setInput('showOnlineStatus', true);
      setInput('isOnline', true);

      const status = queryElement('.online-status');

      expect(status).toBeTruthy();
      expect(status?.classList.contains('online')).toBe(true);
    });

    it('should show offline status', () => {
      setInput('showOnlineStatus', true);
      setInput('isOnline', false);

      const status = queryElement('.online-status');

      expect(status).toBeTruthy();
      expect(status?.classList.contains('offline')).toBe(true);
    });

    it('should hide status when disabled', () => {
      setInput('showOnlineStatus', false);

      const status = queryElement('.online-status');

      expect(status).toBeFalsy();
    });
  });

  describe('Click Behavior', () => {
    it('should emit event when clicked and clickable', () => {
      let eventEmitted = false;
      component.avatarClick.subscribe(() => {
        eventEmitted = true;
      });

      setInput('clickable', true);
      const button = queryElement('.avatar-container') as HTMLButtonElement;
      button.click();

      expect(eventEmitted).toBe(true);
    });

    it('should not emit event when not clickable', () => {
      let eventEmitted = false;
      component.avatarClick.subscribe(() => {
        eventEmitted = true;
      });

      setInput('clickable', false);
      component.onAvatarClick();

      expect(eventEmitted).toBe(false);
    });
  });
});
