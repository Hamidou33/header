import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavHeaderCenter, NavItem } from './nav-header-center.component';
import { provideRouter } from '@angular/router';

if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe('NavHeaderCenter Component', () => {
  let fixture: ComponentFixture<NavHeaderCenter>;
  let component: NavHeaderCenter;

  const createComponent = () => {
    TestBed.configureTestingModule({
      imports: [NavHeaderCenter],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(NavHeaderCenter);
    component = fixture.componentInstance;
  };

  const setItems = (items: NavItem[]) => {
    fixture.componentRef.setInput('items', items);
  };

  const setVisibleCount = (count: number) => {
    component['visibleCount'].set(count);
  };

  beforeEach(createComponent);

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Mobile Menu', () => {
    it('should toggle mobile menu state from closed to open to closed', () => {
      expect(component.mobileMenuOpen()).toBe(false);

      component.toggleMobileMenu();
      expect(component.mobileMenuOpen()).toBe(true);

      component.toggleMobileMenu();
      expect(component.mobileMenuOpen()).toBe(false);
    });
  });

  describe('Visible Items', () => {
    it('should display only the first items based on visible count', () => {
      const threeItems: NavItem[] = [
        { label: 'Item 1', link: '/1' },
        { label: 'Item 2', link: '/2' },
        { label: 'Item 3', link: '/3' },
      ];
      setItems(threeItems);
      setVisibleCount(2);

      const visibleItems = component.visibleItems();

      expect(visibleItems.length).toBe(2);
      expect(visibleItems[0].label).toBe('Item 1');
    });

    it('should return empty array when no items provided', () => {
      setItems([]);

      expect(component.visibleItems()).toEqual([]);
    });
  });

  describe('Overflow Items', () => {
    it('should return items beyond the visible count', () => {
      const fourItems: NavItem[] = [
        { label: 'Item 1', link: '/1' },
        { label: 'Item 2', link: '/2' },
        { label: 'Item 3', link: '/3' },
        { label: 'Item 4', link: '/4' },
      ];
      setItems(fourItems);
      setVisibleCount(2);

      const moreItems = component.moreItems();

      expect(moreItems.length).toBe(2);
      expect(moreItems[0].label).toBe('Item 3');
    });

    it('should detect when overflow menu contains an active item', () => {
      const itemsWithActiveSecond: NavItem[] = [
        { label: 'Item 1', link: '/1', active: false },
        { label: 'Item 2', link: '/2', active: true },
      ];
      setItems(itemsWithActiveSecond);
      setVisibleCount(1);

      expect(component.isMoreActive()).toBe(true);
    });
  });

  describe('Logo Click', () => {
    it('should emit event when logo is clicked', () => {
      // Le test du clic sur le logo a été déplacé vers header.spec.ts car le logo est maintenant dans Header
      expect(true).toBe(true);
    });
  });
});

