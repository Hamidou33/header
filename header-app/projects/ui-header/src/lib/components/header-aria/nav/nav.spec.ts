import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Nav, NavItem } from './nav';
import { provideRouter } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Nav Component', () => {
  let fixture: ComponentFixture<Nav>;
  let component: Nav;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Nav],
      providers: [provideRouter([])]
    });
    fixture = TestBed.createComponent(Nav);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  // ==========================================
  // SECTION 1: Component Creation & Initialization
  // ==========================================
  describe('Component Creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.items()).toEqual([]);
      expect(component.maxVisibleItems()).toBe(99);
      expect(component.rounded()).toBe(true);
      expect(component.showProfile()).toBe(false);
      expect(component.mobileMenuOpen()).toBe(false);
    });

    it('should initialize isMobile signal based on window size', () => {
      expect(typeof component.isMobile()).toBe('boolean');
    });
  });

  // ==========================================
  // SECTION 2: Input Properties
  // ==========================================
  describe('Input Properties', () => {
    it('should accept and store nav items', () => {
      const items: NavItem[] = [
        { label: 'Home', link: '/' },
        { label: 'About', link: '/about' },
        { label: 'Contact', link: '/contact' }
      ];
      fixture.componentRef.setInput('items', items);
      expect(component.items()).toEqual(items);
    });

    it('should accept items with submenus', () => {
      const items: NavItem[] = [
        {
          label: 'Products',
          subMenu: [
            { label: 'Product A', link: '/products/a' },
            { label: 'Product B', link: '/products/b' }
          ]
        }
      ];
      fixture.componentRef.setInput('items', items);
      expect(component.items()[0].subMenu).toHaveLength(2);
    });

    it('should accept maxVisibleItems limit', () => {
      fixture.componentRef.setInput('maxVisibleItems', 5);
      expect(component.maxVisibleItems()).toBe(5);
    });

    it('should accept logo configuration', () => {
      fixture.componentRef.setInput('mainLogoUrl', '/home');
      fixture.componentRef.setInput('mainLogoTitle', 'Company Logo');
      fixture.componentRef.setInput('logoWidth', 180);
      fixture.componentRef.setInput('logoHeight', 40);

      expect(component.mainLogoUrl()).toBe('/home');
      expect(component.mainLogoTitle()).toBe('Company Logo');
      expect(component.logoWidth()).toBe(180);
      expect(component.logoHeight()).toBe(40);
    });

    it('should accept profile configuration', () => {
      fixture.componentRef.setInput('showProfile', true);
      fixture.componentRef.setInput('showAvatar', true);
      fixture.componentRef.setInput('showEmail', true);
      fixture.componentRef.setInput('showIcons', true);

      expect(component.showProfile()).toBe(true);
      expect(component.showAvatar()).toBe(true);
      expect(component.showEmail()).toBe(true);
      expect(component.showIcons()).toBe(true);
    });

    it('should accept burger icon configuration', () => {
      fixture.componentRef.setInput('burgerIcon', false);
      fixture.componentRef.setInput('burgerIconPos', 'left');

      expect(component.burgerIcon()).toBe(false);
      expect(component.burgerIconPos()).toBe('left');
    });
  });

  // ==========================================
  // SECTION 3: Mobile Menu Functionality
  // ==========================================
  describe('Mobile Menu', () => {
    it('should toggle mobile menu state', () => {
      expect(component.mobileMenuOpen()).toBe(false);

      component.toggleMobileMenu();
      expect(component.mobileMenuOpen()).toBe(true);

      component.toggleMobileMenu();
      expect(component.mobileMenuOpen()).toBe(false);
    });

    it('should close mobile menu', () => {
      component.mobileMenuOpen.set(true);
      component.closeMobileMenu();
      expect(component.mobileMenuOpen()).toBe(false);
    });

    it('should keep mobile menu closed when already closed', () => {
      component.mobileMenuOpen.set(false);
      component.closeMobileMenu();
      expect(component.mobileMenuOpen()).toBe(false);
    });
  });

  // ==========================================
  // SECTION 4: Logo Click Event
  // ==========================================
  describe('Logo Click Event', () => {
    it('should emit clickMainLogo event when logo is clicked', () => {
      let emitted = false;
      component.clickMainLogo.subscribe(() => {
        emitted = true;
      });

      component.onClickMainLogo();
      expect(emitted).toBe(true);
    });

    it('should emit clickMainLogo only once per click', () => {
      let emitCount = 0;
      component.clickMainLogo.subscribe(() => {
        emitCount++;
      });

      component.onClickMainLogo();
      expect(emitCount).toBe(1);
    });
  });

  // ==========================================
  // SECTION 5: Visible Items Computation
  // ==========================================
  describe('Visible Items Computation', () => {
    it('should show all items when visibleCount equals items length', () => {
      const items: NavItem[] = [
        { label: 'Item 1', link: '/1' },
        { label: 'Item 2', link: '/2' },
        { label: 'Item 3', link: '/3' }
      ];
      fixture.componentRef.setInput('items', items);
      component['visibleCount'].set(3);

      expect(component.visibleItems()).toHaveLength(3);
      expect(component.visibleItems()).toEqual(items);
    });

    it('should show subset of items when visibleCount is less', () => {
      const items: NavItem[] = [
        { label: 'Item 1', link: '/1' },
        { label: 'Item 2', link: '/2' },
        { label: 'Item 3', link: '/3' }
      ];
      fixture.componentRef.setInput('items', items);
      component['visibleCount'].set(2);

      expect(component.visibleItems()).toHaveLength(2);
      expect(component.visibleItems()[0].label).toBe('Item 1');
      expect(component.visibleItems()[1].label).toBe('Item 2');
    });

    it('should return empty array when no items', () => {
      fixture.componentRef.setInput('items', []);
      component['visibleCount'].set(0);

      expect(component.visibleItems()).toEqual([]);
    });

    it('should cap visible items to minimum of count and array length', () => {
      const items: NavItem[] = [
        { label: 'Item 1', link: '/1' },
        { label: 'Item 2', link: '/2' }
      ];
      fixture.componentRef.setInput('items', items);
      component['visibleCount'].set(10);

      expect(component.visibleItems()).toHaveLength(2);
    });
  });

  // ==========================================
  // SECTION 6: More Items (Overflow) Computation
  // ==========================================
  describe('More Items (Overflow)', () => {
    it('should return empty array when all items are visible', () => {
      const items: NavItem[] = [
        { label: 'Item 1', link: '/1' },
        { label: 'Item 2', link: '/2' }
      ];
      fixture.componentRef.setInput('items', items);
      component['visibleCount'].set(2);

      expect(component.moreItems()).toEqual([]);
    });

    it('should return overflow items when visibleCount is less than total', () => {
      const items: NavItem[] = [
        { label: 'Item 1', link: '/1' },
        { label: 'Item 2', link: '/2' },
        { label: 'Item 3', link: '/3' },
        { label: 'Item 4', link: '/4' }
      ];
      fixture.componentRef.setInput('items', items);
      component['visibleCount'].set(2);

      const moreItems = component.moreItems();
      expect(moreItems).toHaveLength(2);
      expect(moreItems[0].label).toBe('Item 3');
      expect(moreItems[1].label).toBe('Item 4');
    });

    it('should preserve item properties in more items', () => {
      const items: NavItem[] = [
        { label: 'Item 1', link: '/1' },
        { label: 'Item 2', link: '/2', active: true, subMenu: [{ label: 'Sub', link: '/sub' }] }
      ];
      fixture.componentRef.setInput('items', items);
      component['visibleCount'].set(1);

      const moreItems = component.moreItems();
      expect(moreItems[0].label).toBe('Item 2');
      expect(moreItems[0].active).toBe(true);
      expect(moreItems[0].subMenu).toHaveLength(1);
    });
  });

  // ==========================================
  // SECTION 7: Active State Detection
  // ==========================================
  describe('Active State Detection', () => {
    it('should detect active item in more menu', () => {
      const items: NavItem[] = [
        { label: 'Item 1', link: '/1', active: false },
        { label: 'Item 2', link: '/2', active: true },
        { label: 'Item 3', link: '/3', active: false }
      ];
      fixture.componentRef.setInput('items', items);
      component['visibleCount'].set(1);

      expect(component.isMoreActive()).toBe(true);
    });

    it('should return false when no active items in more menu', () => {
      const items: NavItem[] = [
        { label: 'Item 1', link: '/1', active: true },
        { label: 'Item 2', link: '/2', active: false },
        { label: 'Item 3', link: '/3', active: false }
      ];
      fixture.componentRef.setInput('items', items);
      component['visibleCount'].set(1);

      expect(component.isMoreActive()).toBe(false);
    });

    it('should return false when more menu is empty', () => {
      const items: NavItem[] = [
        { label: 'Item 1', link: '/1' }
      ];
      fixture.componentRef.setInput('items', items);
      component['visibleCount'].set(1);

      expect(component.isMoreActive()).toBe(false);
    });
  });

  // ==========================================
  // SECTION 8: Max Visible Items Limit
  // ==========================================
  describe('Max Visible Items Limit', () => {
    it('should respect maxVisibleItems limit', () => {
      const items: NavItem[] = [
        { label: 'Item 1', link: '/1' },
        { label: 'Item 2', link: '/2' },
        { label: 'Item 3', link: '/3' },
        { label: 'Item 4', link: '/4' }
      ];
      fixture.componentRef.setInput('items', items);
      fixture.componentRef.setInput('maxVisibleItems', 2);
      component['visibleCount'].set(10);

      // Trigger recalculation
      fixture.detectChanges();

      expect(component.visibleItems().length).toBeLessThanOrEqual(2);
    });
  });

  // ==========================================
  // SECTION 9: User Profile Integration
  // ==========================================
  describe('User Profile Integration', () => {
    it('should accept user profile data', () => {
      const userProfile = {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'avatar.jpg'
      };
      fixture.componentRef.setInput('userProfile', userProfile);

      expect(component.userProfile()).toEqual(userProfile);
    });

    it('should accept profile menu items', () => {
      const profileMenuItems = [
        { label: 'Profile', link: '/profile', icon: 'user' },
        { label: 'Settings', link: '/settings', icon: 'gear' }
      ];
      fixture.componentRef.setInput('profileMenuItems', profileMenuItems);

      expect(component.profileMenuItems()).toEqual(profileMenuItems);
    });
  });

  // ==========================================
  // SECTION 10: Responsive Behavior
  // ==========================================
  describe('Responsive Behavior', () => {
    it('should have isMobile signal', () => {
      expect(component.isMobile).toBeDefined();
      expect(typeof component.isMobile()).toBe('boolean');
    });

    it('should show/hide elements based on configuration', () => {
      fixture.componentRef.setInput('showHeaderNavMobileTop', false);
      fixture.componentRef.setInput('showHeaderNavMobileBottom', false);
      fixture.componentRef.setInput('showHeaderNavRight', false);

      expect(component.showHeaderNavMobileTop()).toBe(false);
      expect(component.showHeaderNavMobileBottom()).toBe(false);
      expect(component.showHeaderNavRight()).toBe(false);
    });
  });
});
