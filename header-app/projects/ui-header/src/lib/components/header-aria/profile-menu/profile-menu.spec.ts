import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProfileMenu, UserProfile } from './profile-menu';
import { DropdownItem } from '../dropdown/dropdown';
import { provideRouter } from '@angular/router';

describe('ProfileMenu Component', () => {
  let fixture: ComponentFixture<ProfileMenu>;
  let component: ProfileMenu;
  const mockUser: UserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'avatar.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileMenu],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(ProfileMenu);
    fixture.componentRef.setInput('user', mockUser);
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

    it('should require user input', () => {
      expect(component.user()).toEqual(mockUser);
    });

    it('should initialize with default values', () => {
      expect(component.menuItems()).toEqual([]);
      expect(component.showAvatar()).toBe(false);
      expect(component.showEmail()).toBe(false);
      expect(component.showIcons()).toBe(false);
      expect(component.openSubmenuIndex()).toBeNull();
    });
  });

  // ==========================================
  // SECTION 2: User Profile Data
  // ==========================================
  describe('User Profile Data', () => {
    it('should display user name', () => {
      expect(component.user().name).toBe('John Doe');
    });

    it('should display user email', () => {
      expect(component.user().email).toBe('john@example.com');
    });

    it('should display user avatar', () => {
      expect(component.user().avatar).toBe('avatar.jpg');
    });

    it('should update when user changes', () => {
      const newUser: UserProfile = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'jane.jpg',
      };
      fixture.componentRef.setInput('user', newUser);

      expect(component.user().name).toBe('Jane Smith');
      expect(component.user().email).toBe('jane@example.com');
      expect(component.user().avatar).toBe('jane.jpg');
    });

    it('should handle user with empty avatar', () => {
      const userNoAvatar: UserProfile = {
        name: 'No Avatar',
        email: 'no@avatar.com',
        avatar: '',
      };
      fixture.componentRef.setInput('user', userNoAvatar);

      expect(component.user().avatar).toBe('');
    });
  });

  // ==========================================
  // SECTION 3: Menu Items
  // ==========================================
  describe('Menu Items', () => {
    it('should accept menu items', () => {
      const items: DropdownItem[] = [
        { label: 'Profile', link: '/profile', icon: 'user' },
        { label: 'Settings', link: '/settings', icon: 'gear' },
      ];
      fixture.componentRef.setInput('menuItems', items);

      expect(component.menuItems()).toEqual(items);
      expect(component.menuItems()).toHaveLength(2);
    });

    it('should handle items with submenus', () => {
      const items: DropdownItem[] = [
        {
          label: 'Account',
          icon: 'user',
          subMenu: [
            { label: 'Profile', link: '/profile' },
            { label: 'Privacy', link: '/privacy' },
          ],
        },
      ];
      fixture.componentRef.setInput('menuItems', items);

      expect(component.menuItems()[0].subMenu).toBeDefined();
      expect(component.menuItems()[0].subMenu).toHaveLength(2);
    });

    it('should handle empty menu items', () => {
      fixture.componentRef.setInput('menuItems', []);
      expect(component.menuItems()).toEqual([]);
    });

    it('should handle items without icons', () => {
      const items: DropdownItem[] = [{ label: 'Logout', link: '/logout' }];
      fixture.componentRef.setInput('menuItems', items);

      expect(component.menuItems()[0].icon).toBeUndefined();
    });
  });

  // ==========================================
  // SECTION 4: Display Options
  // ==========================================
  describe('Display Options', () => {
    it('should show avatar when enabled', () => {
      fixture.componentRef.setInput('showAvatar', true);
      expect(component.showAvatar()).toBe(true);
    });

    it('should hide avatar by default', () => {
      expect(component.showAvatar()).toBe(false);
    });

    it('should show email when enabled', () => {
      fixture.componentRef.setInput('showEmail', true);
      expect(component.showEmail()).toBe(true);
    });

    it('should hide email by default', () => {
      expect(component.showEmail()).toBe(false);
    });

    it('should show icons when enabled', () => {
      fixture.componentRef.setInput('showIcons', true);
      expect(component.showIcons()).toBe(true);
    });

    it('should hide icons by default', () => {
      expect(component.showIcons()).toBe(false);
    });

    it('should handle all options enabled together', () => {
      fixture.componentRef.setInput('showAvatar', true);
      fixture.componentRef.setInput('showEmail', true);
      fixture.componentRef.setInput('showIcons', true);

      expect(component.showAvatar()).toBe(true);
      expect(component.showEmail()).toBe(true);
      expect(component.showIcons()).toBe(true);
    });
  });

  // ==========================================
  // SECTION 5: Submenu Toggle
  // ==========================================
  describe('Submenu Toggle', () => {
    it('should open submenu when toggled', () => {
      const event = new Event('click');

      expect(component.openSubmenuIndex()).toBeNull();
      component.toggleSubmenu(0, event);
      expect(component.openSubmenuIndex()).toBe(0);
    });

    it('should close submenu when toggling same index', () => {
      const event = new Event('click');

      component.openSubmenuIndex.set(0);
      component.toggleSubmenu(0, event);
      expect(component.openSubmenuIndex()).toBeNull();
    });

    it('should switch between submenus', () => {
      const event = new Event('click');

      component.toggleSubmenu(0, event);
      expect(component.openSubmenuIndex()).toBe(0);

      component.toggleSubmenu(1, event);
      expect(component.openSubmenuIndex()).toBe(1);
    });

    it('should prevent event propagation', () => {
      const event = new Event('click');
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

      component.toggleSubmenu(0, event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
  });

  // ==========================================
  // SECTION 6: Item Click Event
  // ==========================================
  describe('Item Click Event', () => {
    it('should emit itemClick event', () => {
      let emitted = false;
      component.itemClick.subscribe(() => {
        emitted = true;
      });

      component.onItemClick();
      expect(emitted).toBe(true);
    });

    it('should emit event multiple times', () => {
      let emitCount = 0;
      component.itemClick.subscribe(() => {
        emitCount++;
      });

      component.onItemClick();
      component.onItemClick();
      expect(emitCount).toBe(2);
    });
  });

  // ==========================================
  // SECTION 7: Complex Scenarios
  // ==========================================
  describe('Complex Scenarios', () => {
    it('should handle profile with all features enabled', () => {
      const items: DropdownItem[] = [
        { label: 'Profile', link: '/profile', icon: 'user' },
        { label: 'Settings', link: '/settings', icon: 'gear' },
        { label: 'Logout', link: '/logout', icon: 'exit' },
      ];

      fixture.componentRef.setInput('menuItems', items);
      fixture.componentRef.setInput('showAvatar', true);
      fixture.componentRef.setInput('showEmail', true);
      fixture.componentRef.setInput('showIcons', true);

      expect(component.menuItems()).toHaveLength(3);
      expect(component.showAvatar()).toBe(true);
      expect(component.showEmail()).toBe(true);
      expect(component.showIcons()).toBe(true);
    });

    it('should handle logout menu item', () => {
      const items: DropdownItem[] = [{ label: 'Logout', link: '/logout', icon: 'exit' }];
      fixture.componentRef.setInput('menuItems', items);

      const logoutItem = component.menuItems().find((item) => item.label === 'Logout');
      expect(logoutItem).toBeDefined();
      expect(logoutItem?.link).toBe('/logout');
    });
  });
});
