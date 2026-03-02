import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Header } from './header';
import { provideRouter } from '@angular/router';

describe('Header Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])]
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    expect(component.showProfile()).toBe(true);
    expect(component.showAvatar()).toBe(false);
    expect(component.showEmail()).toBe(false);
    expect(component.showIcons()).toBe(false);
    expect(component.maxVisibleItems()).toBe(99);
    expect(component.sticky()).toBe(true);
    expect(component.showNav()).toBe(true);
  });

  it('should accept showProfile input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('showProfile', false);
    expect(component.showProfile()).toBe(false);
  });

  it('should accept showAvatar input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('showAvatar', true);
    expect(component.showAvatar()).toBe(true);
  });

  it('should accept showEmail input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('showEmail', true);
    expect(component.showEmail()).toBe(true);
  });

  it('should accept showIcons input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('showIcons', true);
    expect(component.showIcons()).toBe(true);
  });

  it('should accept maxVisibleItems input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('maxVisibleItems', 5);
    expect(component.maxVisibleItems()).toBe(5);
  });

  it('should accept logoPath input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('logoPath', '/custom-logo.svg');
    expect(component.logoPath()).toBe('/custom-logo.svg');
  });

  it('should accept rounded input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('rounded', false);
    expect(component.rounded()).toBe(false);
  });

  it('should accept isHeaderFixed input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('isHeaderFixed', true);
    expect(component.isHeaderFixed()).toBe(true);
  });

  it('should accept sticky input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('sticky', false);
    expect(component.sticky()).toBe(false);
  });

  it('should accept showNav input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('showNav', false);
    expect(component.showNav()).toBe(false);
  });

  it('should accept companyName input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('companyName', 'Acme Corp');
    expect(component.companyName()).toBe('Acme Corp');
  });

  it('should accept logoUrl input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('logoUrl', '/');
    expect(component.logoUrl()).toBe('/');
  });

  it('should have default menu items', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    expect(component.menuItems().length).toBeGreaterThan(0);
    expect(component.menuItems()[0].label).toBe('Products');
  });

  it('should accept custom menu items', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;
    const customMenuItems = [
      { label: 'Custom Item', link: '/custom' }
    ];

    fixture.componentRef.setInput('menuItems', customMenuItems);
    expect(component.menuItems()).toEqual(customMenuItems);
  });

  it('should have default profile menu items', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    expect(component.profileMenuItems().length).toBeGreaterThan(0);
    expect(component.profileMenuItems()[0].label).toBe('My Profile');
  });

  it('should accept custom profile menu items', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;
    const customProfileItems = [
      { label: 'Settings', link: '/settings', icon: '⚙️' }
    ];

    fixture.componentRef.setInput('profileMenuItems', customProfileItems);
    expect(component.profileMenuItems()).toEqual(customProfileItems);
  });

  it('should have default user profile', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    expect(component.userProfile()).toBeTruthy();
    expect(component.userProfile()?.name).toBe('John Doe');
  });

  it('should accept custom user profile', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;
    const customProfile = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: '👩'
    };

    fixture.componentRef.setInput('userProfile', customProfile);
    expect(component.userProfile()).toEqual(customProfile);
  });

  it('should handle null user profile', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('userProfile', null);
    expect(component.userProfile()).toBeNull();
  });

  it('should accept showHeaderPreNav input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('showHeaderPreNav', false);
    expect(component.showHeaderPreNav()).toBe(false);
  });

  it('should accept showHeaderPostNav input', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('showHeaderPostNav', false);
    expect(component.showHeaderPostNav()).toBe(false);
  });
});
