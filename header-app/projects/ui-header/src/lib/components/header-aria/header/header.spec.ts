import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Header } from './header';
import { provideRouter } from '@angular/router';

describe('Header Component', () => {
  let fixture: ComponentFixture<Header>;
  let component: Header;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
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
      expect(component.showProfile()).toBe(true);
      expect(component.showAvatar()).toBe(false);
      expect(component.showEmail()).toBe(false);
      expect(component.showIcons()).toBe(false);
      expect(component.maxVisibleItems()).toBe(99);
      expect(component.sticky()).toBe(true);
      expect(component.showNav()).toBe(true);
      expect(component.rounded()).toBe(true);
    });
  });

  // ==========================================
  // SECTION 2: Profile Configuration
  // ==========================================
  describe('Profile Configuration', () => {
    it('should toggle profile visibility', () => {
      fixture.componentRef.setInput('showProfile', false);
      expect(component.showProfile()).toBe(false);

      fixture.componentRef.setInput('showProfile', true);
      expect(component.showProfile()).toBe(true);
    });

    it('should toggle avatar display', () => {
      fixture.componentRef.setInput('showAvatar', true);
      expect(component.showAvatar()).toBe(true);
    });

    it('should toggle email display', () => {
      fixture.componentRef.setInput('showEmail', true);
      expect(component.showEmail()).toBe(true);
    });

    it('should toggle icons display', () => {
      fixture.componentRef.setInput('showIcons', true);
      expect(component.showIcons()).toBe(true);
    });

    it('should have default user profile', () => {
      const profile = component.userProfile();
      expect(profile).toBeTruthy();
      expect(profile?.name).toBe('John Doe');
      expect(profile?.email).toBe('john.doe@company.com');
    });

    it('should accept custom user profile', () => {
      const customProfile = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: '👩',
      };
      fixture.componentRef.setInput('userProfile', customProfile);
      expect(component.userProfile()).toEqual(customProfile);
    });

    it('should handle null user profile', () => {
      fixture.componentRef.setInput('userProfile', null);
      expect(component.userProfile()).toBeNull();
    });
  });

  // ==========================================
  // SECTION 3: Navigation Configuration
  // ==========================================
  describe('Navigation Configuration', () => {
    it('should toggle navigation visibility', () => {
      fixture.componentRef.setInput('showNav', false);
      expect(component.showNav()).toBe(false);
    });

    it('should set max visible items', () => {
      fixture.componentRef.setInput('maxVisibleItems', 5);
      expect(component.maxVisibleItems()).toBe(5);
    });

    it('should have default menu items', () => {
      expect(component.menuItems()).toBeTruthy();
      expect(component.menuItems().length).toBeGreaterThan(0);
    });

    it('should accept custom menu items', () => {
      const customItems = [
        { label: 'Home', link: '/' },
        { label: 'About', link: '/about' },
      ];
      fixture.componentRef.setInput('menuItems', customItems);
      expect(component.menuItems()).toEqual(customItems);
    });
  });

  // ==========================================
  // SECTION 4: Logo Configuration
  // ==========================================
  describe('Logo Configuration', () => {
    it('should accept logo path', () => {
      fixture.componentRef.setInput('logoPath', '/custom-logo.svg');
      expect(component.logoPath()).toBe('/custom-logo.svg');
    });

    it('should accept null logo path', () => {
      fixture.componentRef.setInput('logoPath', null);
      expect(component.logoPath()).toBeNull();
    });

    it('should have default logo path', () => {
      expect(component.logoPath()).toBe('/logo-header.svg');
    });

    it('should accept company name', () => {
      fixture.componentRef.setInput('companyName', 'Acme Corp');
      expect(component.companyName()).toBe('Acme Corp');
    });

    it('should accept logo URL', () => {
      fixture.componentRef.setInput('logoUrl', '/home');
      expect(component.logoUrl()).toBe('/home');
    });

    it('should toggle rounded logo', () => {
      fixture.componentRef.setInput('rounded', false);
      expect(component.rounded()).toBe(false);
    });
  });

  // ==========================================
  // SECTION 5: Header Layout Options
  // ==========================================
  describe('Header Layout Options', () => {
    it('should toggle sticky behavior', () => {
      fixture.componentRef.setInput('sticky', false);
      expect(component.sticky()).toBe(false);
    });

    it('should toggle fixed header', () => {
      fixture.componentRef.setInput('isHeaderFixed', true);
      expect(component.isHeaderFixed()).toBe(true);
    });

    it('should show/hide pre-nav section', () => {
      fixture.componentRef.setInput('showHeaderPreNav', false);
      expect(component.showHeaderPreNav()).toBe(false);
    });

    it('should show/hide post-nav section', () => {
      fixture.componentRef.setInput('showHeaderPostNav', false);
      expect(component.showHeaderPostNav()).toBe(false);
    });

    it('should configure post-nav mobile visibility', () => {
      fixture.componentRef.setInput('showHeaderPostNavMobile', true);
      expect(component.showHeaderPostNavMobile()).toBe(true);
    });
  });

  // ==========================================
  // SECTION 6: Profile Menu Items
  // ==========================================
  describe('Profile Menu Items', () => {
    it('should have default profile menu items', () => {
      const items = component.profileMenuItems();
      expect(items).toBeTruthy();
      expect(items.length).toBeGreaterThan(0);
    });

    it('should include My Profile in default items', () => {
      const items = component.profileMenuItems();
      const profileItem = items.find((item) => item.label === 'My Profile');
      expect(profileItem).toBeDefined();
    });

    it('should include Settings in default items', () => {
      const items = component.profileMenuItems();
      const settingsItem = items.find((item) => item.label === 'Settings');
      expect(settingsItem).toBeDefined();
    });

    it('should include Logout in default items', () => {
      const items = component.profileMenuItems();
      const logoutItem = items.find((item) => item.label === 'Logout');
      expect(logoutItem).toBeDefined();
      expect(logoutItem?.link).toBe('/logout');
    });

    it('should accept custom profile menu items', () => {
      const customItems = [
        { label: 'Account', link: '/account', icon: '⚙️' },
        { label: 'Sign Out', link: '/signout', icon: '🚪' },
      ];
      fixture.componentRef.setInput('profileMenuItems', customItems);
      expect(component.profileMenuItems()).toEqual(customItems);
    });

    it('should handle profile items with submenus', () => {
      const items = component.profileMenuItems();
      const itemWithSubmenu = items.find((item) => item.subMenu && item.subMenu.length > 0);
      expect(itemWithSubmenu).toBeDefined();
    });
  });

  // ==========================================
  // SECTION 7: Menu Items Structure
  // ==========================================
  describe('Menu Items Structure', () => {
    it('should have Products in default menu', () => {
      const items = component.menuItems();
      const productsItem = items.find((item) => item.label === 'Products');
      expect(productsItem).toBeDefined();
      expect(productsItem?.subMenu).toBeDefined();
    });

    it('should have Solutions in default menu', () => {
      const items = component.menuItems();
      const solutionsItem = items.find((item) => item.label === 'Solutions');
      expect(solutionsItem).toBeDefined();
    });

    it('should handle items with nested submenus', () => {
      const items = component.menuItems();
      const productsItem = items.find((item) => item.label === 'Products');
      const servicesSubmenu = productsItem?.subMenu?.find((sub) => sub.label === 'Services');
      expect(servicesSubmenu?.subMenu).toBeDefined();
      expect(servicesSubmenu?.subMenu).toHaveLength(3);
    });

    it('should handle simple menu items without submenus', () => {
      const items = component.menuItems();
      const aboutItem = items.find((item) => item.label === 'About');
      expect(aboutItem).toBeDefined();
      expect(aboutItem?.link).toBe('/about');
      expect(aboutItem?.subMenu).toBeUndefined();
    });
  });

  // ==========================================
  // SECTION 8: Complex Configuration
  // ==========================================
  describe('Complex Configuration', () => {
    it('should handle all options enabled', () => {
      fixture.componentRef.setInput('showProfile', true);
      fixture.componentRef.setInput('showAvatar', true);
      fixture.componentRef.setInput('showEmail', true);
      fixture.componentRef.setInput('showIcons', true);
      fixture.componentRef.setInput('showNav', true);
      fixture.componentRef.setInput('sticky', true);

      expect(component.showProfile()).toBe(true);
      expect(component.showAvatar()).toBe(true);
      expect(component.showEmail()).toBe(true);
      expect(component.showIcons()).toBe(true);
      expect(component.showNav()).toBe(true);
      expect(component.sticky()).toBe(true);
    });

    it('should handle minimal configuration', () => {
      fixture.componentRef.setInput('showProfile', false);
      fixture.componentRef.setInput('showNav', false);

      expect(component.showProfile()).toBe(false);
      expect(component.showNav()).toBe(false);
    });
  });
});
