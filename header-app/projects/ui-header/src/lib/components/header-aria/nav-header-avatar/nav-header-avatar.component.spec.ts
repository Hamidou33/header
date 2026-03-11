import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavHeaderAvatarComponent } from './nav-header-avatar.component';

interface AvatarInputs {
  avatarUrl: string;
  userName: string;
  size: 'small' | 'medium' | 'large';
  showOnlineStatus: boolean;
  isOnline: boolean;
  clickable: boolean;
}

describe('NavHeaderAvatar Component', () => {
  let fixture: ComponentFixture<NavHeaderAvatarComponent>;
  let component: NavHeaderAvatarComponent;

  const createComponent = (): void => {
    TestBed.configureTestingModule({
      imports: [NavHeaderAvatarComponent],
    });

    fixture = TestBed.createComponent(NavHeaderAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const setInput = <K extends keyof AvatarInputs>(name: K, value: AvatarInputs[K]): void => {
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
    expect(component).toBeInstanceOf(NavHeaderAvatarComponent);
  });

  describe('Avatar display', () => {
    it('should render image when avatarUrl is provided', () => {
      setInput('avatarUrl', 'https://example.com/avatar.jpg');

      const image = queryElement('.avatar-image') as HTMLImageElement | undefined;

      expect(image).toBeDefined();
      expect(image?.src).toContain('avatar.jpg');
    });

    it('should render initials when userName is provided without avatarUrl', () => {
      setInput('userName', 'John Doe');

      const initials = queryElement('.avatar-initials');

      expect(initials?.textContent?.trim()).toBe('J D');
    });

    it('should render default icon when no image and no user name', () => {
      const defaultIcon = queryElement('.avatar-default-icon');

      expect(defaultIcon).toBeDefined();
    });
  });

  describe('Computed values', () => {
    it('should compute single-word initials correctly', () => {
      setInput('userName', 'John');

      expect(component.initials()).toBe('J');
    });

    it('should compute multi-word initials correctly', () => {
      setInput('userName', 'John Doe');

      expect(component.initials()).toBe('J D');
    });

    it('should expose computed size class', () => {
      setInput('size', 'large');

      expect(component.sizeClass()).toBe('avatar-large');
    });
  });

  describe('Size variants', () => {
    it('should apply small size class', () => {
      setInput('size', 'small');

      const container = queryElement('.avatar-container');

      expect(container?.classList.contains('avatar-small')).toBe(true);
    });

    it('should apply medium size class by default', () => {
      const container = queryElement('.avatar-container');

      expect(container?.classList.contains('avatar-medium')).toBe(true);
    });
  });

  describe('Online status', () => {
    it('should render online indicator when enabled', () => {
      setInput('showOnlineStatus', true);
      setInput('isOnline', true);

      const status = queryElement('.online-status');

      expect(status?.classList.contains('online')).toBe(true);
    });

    it('should render offline indicator when enabled', () => {
      setInput('showOnlineStatus', true);
      setInput('isOnline', false);

      const status = queryElement('.online-status');

      expect(status?.classList.contains('offline')).toBe(true);
    });
  });

  describe('Click behavior', () => {
    it('should emit avatarClick when clickable avatar is clicked', () => {
      const emitSpy = vi.fn();
      component.avatarClick.subscribe(emitSpy);

      const button = queryElement('[data-testid="avatar-button"]') as HTMLButtonElement | undefined;
      button?.click();

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit avatarClick when component is not clickable', () => {
      const emitSpy = vi.fn();
      component.avatarClick.subscribe(emitSpy);
      setInput('clickable', false);

      component.onAvatarClick();

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });
});
