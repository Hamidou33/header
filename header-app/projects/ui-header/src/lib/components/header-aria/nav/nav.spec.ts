import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Nav, NavItem } from './nav';
import { provideRouter } from '@angular/router';

describe('Nav Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Nav],
      providers: [provideRouter([])]
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Nav);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize with empty items', () => {
    const fixture = TestBed.createComponent(Nav);
    const component = fixture.componentInstance;
    expect(component.items()).toEqual([]);
  });

  it('should accept items input', () => {
    const fixture = TestBed.createComponent(Nav);
    const component = fixture.componentInstance;
    const items: NavItem[] = [
      { label: 'Home', link: '/' },
      { label: 'About', link: '/about' }
    ];
    fixture.componentRef.setInput('items', items);
    expect(component.items()).toEqual(items);
  });

  it('should toggle mobile menu', () => {
    const fixture = TestBed.createComponent(Nav);
    const component = fixture.componentInstance;

    expect(component.mobileMenuOpen()).toBe(false);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBe(true);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should close mobile menu', () => {
    const fixture = TestBed.createComponent(Nav);
    const component = fixture.componentInstance;

    component.mobileMenuOpen.set(true);
    component.closeMobileMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should emit clickMainLogo event', () => {
    const fixture = TestBed.createComponent(Nav);
    const component = fixture.componentInstance;
    let emitted = false;

    component.clickMainLogo.subscribe(() => {
      emitted = true;
    });

    component.onClickMainLogo();
    expect(emitted).toBe(true);
  });

  it('should compute visible items correctly', () => {
    const fixture = TestBed.createComponent(Nav);
    const component = fixture.componentInstance;
    const items: NavItem[] = [
      { label: 'Item 1', link: '/1' },
      { label: 'Item 2', link: '/2' },
      { label: 'Item 3', link: '/3' }
    ];

    fixture.componentRef.setInput('items', items);
    component['visibleCount'].set(2);

    expect(component.visibleItems()).toEqual([
      { label: 'Item 1', link: '/1' },
      { label: 'Item 2', link: '/2' }
    ]);
  });

  it('should compute more items correctly', () => {
    const fixture = TestBed.createComponent(Nav);
    const component = fixture.componentInstance;
    const items: NavItem[] = [
      { label: 'Item 1', link: '/1' },
      { label: 'Item 2', link: '/2' },
      { label: 'Item 3', link: '/3' }
    ];

    fixture.componentRef.setInput('items', items);
    component['visibleCount'].set(1);

    const moreItems = component.moreItems();
    expect(moreItems.length).toBe(2);
    expect(moreItems[0].label).toBe('Item 2');
    expect(moreItems[1].label).toBe('Item 3');
  });

  it('should detect active item in more menu', () => {
    const fixture = TestBed.createComponent(Nav);
    const component = fixture.componentInstance;
    const items: NavItem[] = [
      { label: 'Item 1', link: '/1', active: false },
      { label: 'Item 2', link: '/2', active: true }
    ];

    fixture.componentRef.setInput('items', items);
    component['visibleCount'].set(1);

    expect(component.isMoreActive()).toBe(true);
  });

  it('should handle profile inputs', () => {
    const fixture = TestBed.createComponent(Nav);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('showProfile', true);
    fixture.componentRef.setInput('showAvatar', true);
    fixture.componentRef.setInput('showEmail', true);

    expect(component.showProfile()).toBe(true);
    expect(component.showAvatar()).toBe(true);
    expect(component.showEmail()).toBe(true);
  });

  it('should handle logo inputs', () => {
    const fixture = TestBed.createComponent(Nav);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('mainLogoUrl', '/home');
    fixture.componentRef.setInput('mainLogoTitle', 'My Logo');
    fixture.componentRef.setInput('logoWidth', 200);
    fixture.componentRef.setInput('logoHeight', 50);

    expect(component.mainLogoUrl()).toBe('/home');
    expect(component.mainLogoTitle()).toBe('My Logo');
    expect(component.logoWidth()).toBe(200);
    expect(component.logoHeight()).toBe(50);
  });
});
