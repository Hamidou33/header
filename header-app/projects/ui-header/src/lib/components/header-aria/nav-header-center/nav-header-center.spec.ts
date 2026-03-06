import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavHeaderCenter, NavItem } from './nav-header-center.component';

interface NavHeaderCenterInputs {
  items: NavItem[];
  maxVisibleItems: number;
}

if (window.matchMedia === undefined) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string): MediaQueryList => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      } as unknown as MediaQueryList;
    },
  });
}

describe('NavHeaderCenter Component', () => {
  let fixture: ComponentFixture<NavHeaderCenter>;
  let component: NavHeaderCenter;

  const createComponent = (): void => {
    TestBed.configureTestingModule({
      imports: [NavHeaderCenter],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(NavHeaderCenter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const setInput = <K extends keyof NavHeaderCenterInputs>(
    name: K,
    value: NavHeaderCenterInputs[K],
  ): void => {
    fixture.componentRef.setInput(name, value);
    fixture.detectChanges();
  };

  beforeEach(createComponent);

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeInstanceOf(NavHeaderCenter);
  });

  describe('Mobile menu', () => {
    it('should open menu and initialize first navigation level', () => {
      const items: NavItem[] = [
        { label: 'Products', subMenu: [{ label: 'Software', link: '/software' }] },
        { label: 'Contact', link: '/contact' },
      ];

      setInput('items', items);

      component.toggleMobileMenu();

      expect(component.mobileMenuOpen()).toBe(true);
      expect(component.navigationStack().length).toBe(1);
      expect(component.navigationStack()[0][0]?.label).toBe('Products');
    });

    it('should close menu and reset state', () => {
      setInput('items', [{ label: 'Products', subMenu: [{ label: 'Software', link: '/software' }] }]);
      component.toggleMobileMenu();

      component.closeMobileMenu();

      expect(component.mobileMenuOpen()).toBe(false);
      expect(component.navigationStack()).toEqual([]);
      expect(component.currentMenuTitle()).toBe('');
    });

    it('should navigate to submenu and update menu title', () => {
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

      setInput('items', [{ label: 'Products', subMenu: [{ label: 'Software', link: '/software' }] }]);
      component.toggleMobileMenu();

      const firstItem = component.navigationStack()[0][0];
      component.navigateToSubMenu(firstItem, event);

      expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
      expect(stopPropagationSpy).toHaveBeenCalledTimes(1);
      expect(component.navigationStack().length).toBe(2);
      expect(component.currentMenuTitle()).toBe('Products');
    });

    it('should go back to root level from a submenu', () => {
      setInput('items', [{ label: 'Products', subMenu: [{ label: 'Software', link: '/software' }] }]);
      component.toggleMobileMenu();
      component.navigateToSubMenu(component.navigationStack()[0][0]);

      component.goBack();

      expect(component.mobileMenuOpen()).toBe(true);
      expect(component.navigationStack().length).toBe(1);
      expect(component.currentMenuTitle()).toBe('');
    });

    it('should close menu when going back from root level', () => {
      setInput('items', [{ label: 'Products', subMenu: [{ label: 'Software', link: '/software' }] }]);
      component.toggleMobileMenu();

      component.goBack();

      expect(component.mobileMenuOpen()).toBe(false);
      expect(component.navigationStack()).toEqual([]);
    });

    it('should emit mobileMenuOpenChange when menu toggles', () => {
      const states: boolean[] = [];
      component.mobileMenuOpenChange.subscribe(isOpen => {
        states.push(isOpen);
      });

      component.toggleMobileMenu();
      component.toggleMobileMenu();

      expect(states).toEqual([true, false]);
    });
  });

  describe('Visible and overflow items', () => {
    const menuItems: NavItem[] = [
      { label: 'Item 1', link: '/1' },
      { label: 'Item 2', link: '/2' },
      { label: 'Item 3', link: '/3' },
      { label: 'Item 4', link: '/4', active: true },
    ];

    it('should limit visible items with maxVisibleItems', () => {
      setInput('items', menuItems);
      setInput('maxVisibleItems', 2);

      const visibleItems = component.visibleItems();

      expect(visibleItems.map(item => item.label)).toEqual(['Item 1', 'Item 2']);
    });

    it('should expose overflow items in moreItems', () => {
      setInput('items', menuItems);
      setInput('maxVisibleItems', 2);

      const moreItems = component.moreItems();

      expect(moreItems.map(item => item.label)).toEqual(['Item 3', 'Item 4']);
    });

    it('should mark more menu as active when overflow contains active item', () => {
      setInput('items', menuItems);
      setInput('maxVisibleItems', 2);

      expect(component.isMoreActive()).toBe(true);
    });
  });

  describe('Template helpers', () => {
    it('should return expected transform for current mobile level', () => {
      component.navigationStack.set([[{ label: 'A' }], [{ label: 'B' }]]);

      expect(component.getMobileLevelTransform(1)).toBe('translateX(0%)');
      expect(component.getMobileLevelTransform(0)).toBe('translateX(-100%)');
    });

    it('should return animation delay only for root level items', () => {
      expect(component.getMobileItemAnimationDelay(0, 2)).toBe('0.1s');
      expect(component.getMobileItemAnimationDelay(1, 2)).toBe('0s');
    });
  });
});
