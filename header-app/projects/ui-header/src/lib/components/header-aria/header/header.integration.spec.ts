import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

interface MatchMediaMock extends MediaQueryList {
  __triggerChange: (matches: boolean) => void;
}

type MediaQueryChangeListener = (event: MediaQueryListEvent) => void;

function isMediaQueryChangeListener(listener: unknown): listener is MediaQueryChangeListener {
  return typeof listener === 'function';
}

function createMatchMediaMock(initialMatches = true): MatchMediaMock {
  let matches = initialMatches;
  const listeners = new Set<MediaQueryChangeListener>();

  const mediaQueryList: Partial<MatchMediaMock> = {
    media: '(max-width: 768px)',
    onchange: undefined,
    addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
      if (type !== 'change') {
        return;
      }

      if (isMediaQueryChangeListener(listener)) {
        listeners.add(listener);
      }
    },
    removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
      if (type !== 'change') {
        return;
      }

      if (isMediaQueryChangeListener(listener)) {
        listeners.delete(listener);
      }
    },
    dispatchEvent: () => true,
    get matches() {
      return matches;
    },
    __triggerChange: (nextMatches: boolean) => {
      matches = nextMatches;

      const event = {
        matches: nextMatches,
        media: '(max-width: 768px)',
      } as MediaQueryListEvent;

      listeners.forEach(listener => {
        listener(event);
      });
    },
  };

  return mediaQueryList as MatchMediaMock;
}

describe('Header Integration', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let originalMatchMedia: ((query: string) => MediaQueryList) | undefined;

  const createComponent = (): void => {
    const mobileMatchMedia = createMatchMediaMock(true);

    originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(() => mobileMatchMedia),
    });

    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  };

  const getLogoLink = (): HTMLElement | undefined => {
    return fixture.nativeElement.querySelector('[data-testid="main-logo-link"]') ?? undefined;
  };

  const getBurgerButton = (): HTMLElement | undefined => {
    return fixture.nativeElement.querySelector('[data-testid="mobile-burger"]') ?? undefined;
  };

  const getCenterNavMenu = (): HTMLElement | undefined => {
    return fixture.nativeElement.querySelector('[data-testid="center-nav-menu"]') ?? undefined;
  };

  const getMobileProfileTrigger = (): HTMLElement | undefined => {
    return fixture.nativeElement.querySelector('[data-testid="mobile-profile-trigger"]') ?? undefined;
  };

  beforeEach(createComponent);

  afterEach(() => {
    fixture.destroy();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: originalMatchMedia,
    });
  });

  it('should keep logo visible by default on component initialization', () => {
    const burger = getBurgerButton();
    const navMenu = getCenterNavMenu();
    const logoLink = getLogoLink();

    expect(burger?.classList.contains('open')).toBe(false);
    expect(navMenu?.classList.contains('show')).toBe(false);
    expect(logoLink?.classList.contains('arv-header-nav-logo_hidden')).toBe(false);
  });

  it('should ignore non-function listeners in the matchMedia mock', () => {
    const matchMediaMock = createMatchMediaMock(true);
    const listenerObject = {
      handleEvent: vi.fn(),
    };

    matchMediaMock.addEventListener('change', listenerObject);
    matchMediaMock.__triggerChange(false);

    expect(listenerObject.handleEvent).not.toHaveBeenCalled();
  });

  it('should hide logo when mobile menu opens from burger and restore it when closed', () => {
    const burger = getBurgerButton();
    const navMenu = getCenterNavMenu();
    const logoLink = getLogoLink();

    expect(burger).toBeDefined();

    burger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(burger?.classList.contains('open')).toBe(true);
    expect(navMenu?.classList.contains('show')).toBe(true);
    expect(logoLink?.classList.contains('arv-header-nav-logo_hidden')).toBe(true);

    burger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(burger?.classList.contains('open')).toBe(false);
    expect(navMenu?.classList.contains('show')).toBe(false);
    expect(logoLink?.classList.contains('arv-header-nav-logo_hidden')).toBe(false);
  });

  it('should open profile menu from mobile header trigger using right-side submenu navigation', () => {
    const burger = getBurgerButton();
    const navMenu = getCenterNavMenu();
    const profileTrigger = getMobileProfileTrigger();

    expect(profileTrigger).toBeDefined();

    profileTrigger?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    const menuTitle = fixture.nativeElement.querySelector('.arv-header-nav-menu-title') as
      | HTMLElement
      | undefined;
    const menuLevels = fixture.nativeElement.querySelectorAll('.arv-header-nav-menu-level');
    const mobileProfileInBurger = fixture.nativeElement.querySelector('.mobile-profile-item');

    expect(burger?.classList.contains('open')).toBe(true);
    expect(navMenu?.classList.contains('show')).toBe(true);
    expect(menuTitle?.textContent?.trim()).toBe('John Doe');
    expect(menuLevels.length).toBe(2);
    expect(mobileProfileInBurger).toBeNull();
  });

  it('should reset menu state after a fresh component creation', () => {
    const burger = getBurgerButton();

    burger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(burger?.classList.contains('open')).toBe(true);

    fixture.destroy();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    const recreatedBurger = getBurgerButton();
    const recreatedNavMenu = getCenterNavMenu();
    const logoLink = getLogoLink();

    expect(recreatedBurger?.classList.contains('open')).toBe(false);
    expect(recreatedNavMenu?.classList.contains('show')).toBe(false);
    expect(logoLink?.classList.contains('arv-header-nav-logo_hidden')).toBe(false);
  });
});
