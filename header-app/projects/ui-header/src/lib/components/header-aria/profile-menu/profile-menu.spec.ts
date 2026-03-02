import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ProfileMenu, UserProfile } from './profile-menu';
import { DropdownItem } from '../dropdown/dropdown';
import { provideRouter } from '@angular/router';

describe('ProfileMenu Component', () => {
  const mockUser: UserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'avatar.jpg'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileMenu],
      providers: [provideRouter([])]
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProfileMenu);
    fixture.componentRef.setInput('user', mockUser);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should require user input', () => {
    const fixture = TestBed.createComponent(ProfileMenu);
    fixture.componentRef.setInput('user', mockUser);
    const component = fixture.componentInstance;

    expect(component.user()).toEqual(mockUser);
  });

  it('should initialize with default values', () => {
    const fixture = TestBed.createComponent(ProfileMenu);
    fixture.componentRef.setInput('user', mockUser);
    const component = fixture.componentInstance;

    expect(component.menuItems()).toEqual([]);
    expect(component.showAvatar()).toBe(false);
    expect(component.showEmail()).toBe(false);
    expect(component.showIcons()).toBe(false);
  });

  it('should accept menuItems input', () => {
    const fixture = TestBed.createComponent(ProfileMenu);
    fixture.componentRef.setInput('user', mockUser);
    const component = fixture.componentInstance;
    const items: DropdownItem[] = [
      { label: 'Profile', link: '/profile', icon: 'user' },
      { label: 'Settings', link: '/settings', icon: 'gear' }
    ];

    fixture.componentRef.setInput('menuItems', items);
    expect(component.menuItems()).toEqual(items);
  });

  it('should accept showAvatar input', () => {
    const fixture = TestBed.createComponent(ProfileMenu);
    fixture.componentRef.setInput('user', mockUser);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('showAvatar', true);
    expect(component.showAvatar()).toBe(true);
  });

  it('should accept showEmail input', () => {
    const fixture = TestBed.createComponent(ProfileMenu);
    fixture.componentRef.setInput('user', mockUser);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('showEmail', true);
    expect(component.showEmail()).toBe(true);
  });

  it('should accept showIcons input', () => {
    const fixture = TestBed.createComponent(ProfileMenu);
    fixture.componentRef.setInput('user', mockUser);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('showIcons', true);
    expect(component.showIcons()).toBe(true);
  });

  it('should toggle submenu on first call', () => {
    const fixture = TestBed.createComponent(ProfileMenu);
    fixture.componentRef.setInput('user', mockUser);
    const component = fixture.componentInstance;
    const mockEvent = new Event('click');

    expect(component.openSubmenuIndex()).toBeNull();
    component.toggleSubmenu(0, mockEvent);
    expect(component.openSubmenuIndex()).toBe(0);
  });

  it('should close submenu when toggling same index', () => {
    const fixture = TestBed.createComponent(ProfileMenu);
    fixture.componentRef.setInput('user', mockUser);
    const component = fixture.componentInstance;
    const mockEvent = new Event('click');

    component.openSubmenuIndex.set(0);
    component.toggleSubmenu(0, mockEvent);
    expect(component.openSubmenuIndex()).toBeNull();
  });

  it('should switch to different submenu', () => {
    const fixture = TestBed.createComponent(ProfileMenu);
    fixture.componentRef.setInput('user', mockUser);
    const component = fixture.componentInstance;
    const mockEvent = new Event('click');

    component.openSubmenuIndex.set(0);
    component.toggleSubmenu(1, mockEvent);
    expect(component.openSubmenuIndex()).toBe(1);
  });

  it('should emit itemClick event', () => {
    const fixture = TestBed.createComponent(ProfileMenu);
    fixture.componentRef.setInput('user', mockUser);
    const component = fixture.componentInstance;
    let emitted = false;

    component.itemClick.subscribe(() => {
      emitted = true;
    });

    component.onItemClick();
    expect(emitted).toBe(true);
  });

  it('should handle user profile data', () => {
    const fixture = TestBed.createComponent(ProfileMenu);
    const customUser: UserProfile = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'jane.jpg'
    };

    fixture.componentRef.setInput('user', customUser);
    const component = fixture.componentInstance;

    expect(component.user().name).toBe('Jane Smith');
    expect(component.user().email).toBe('jane@example.com');
    expect(component.user().avatar).toBe('jane.jpg');
  });
});
