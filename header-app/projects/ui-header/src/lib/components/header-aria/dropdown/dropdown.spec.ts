import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Dropdown, DropdownItem } from './dropdown';
import { provideRouter } from '@angular/router';

describe('Dropdown Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Dropdown],
      providers: [provideRouter([])]
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Dropdown);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    const fixture = TestBed.createComponent(Dropdown);
    const component = fixture.componentInstance;

    expect(component.label()).toBe('');
    expect(component.items()).toEqual([]);
    expect(component.active()).toBe(false);
    expect(component.measureOnly()).toBe(false);
  });

  it('should accept label input', () => {
    const fixture = TestBed.createComponent(Dropdown);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('label', 'Menu');
    expect(component.label()).toBe('Menu');
  });

  it('should accept items input', () => {
    const fixture = TestBed.createComponent(Dropdown);
    const component = fixture.componentInstance;
    const items: DropdownItem[] = [
      { label: 'Item 1', link: '/item1' },
      { label: 'Item 2', link: '/item2' }
    ];

    fixture.componentRef.setInput('items', items);
    expect(component.items()).toEqual(items);
  });

  it('should accept active input', () => {
    const fixture = TestBed.createComponent(Dropdown);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('active', true);
    expect(component.active()).toBe(true);
  });

  it('should toggle submenu on first call', () => {
    const fixture = TestBed.createComponent(Dropdown);
    const component = fixture.componentInstance;
    const mockEvent = new Event('click');

    expect(component.openSubmenuIndex()).toBeNull();
    component.toggleSubmenu(0, mockEvent);
    expect(component.openSubmenuIndex()).toBe(0);
  });

  it('should close submenu when toggling same index', () => {
    const fixture = TestBed.createComponent(Dropdown);
    const component = fixture.componentInstance;
    const mockEvent = new Event('click');

    component.openSubmenuIndex.set(0);
    component.toggleSubmenu(0, mockEvent);
    expect(component.openSubmenuIndex()).toBeNull();
  });

  it('should switch to different submenu', () => {
    const fixture = TestBed.createComponent(Dropdown);
    const component = fixture.componentInstance;
    const mockEvent = new Event('click');

    component.openSubmenuIndex.set(0);
    component.toggleSubmenu(1, mockEvent);
    expect(component.openSubmenuIndex()).toBe(1);
  });

  it('should emit itemClick event', () => {
    const fixture = TestBed.createComponent(Dropdown);
    const component = fixture.componentInstance;
    let emitted = false;

    component.itemClick.subscribe(() => {
      emitted = true;
    });

    component.onItemClick();
    expect(emitted).toBe(true);
  });

  it('should handle items with submenus', () => {
    const fixture = TestBed.createComponent(Dropdown);
    const component = fixture.componentInstance;
    const items: DropdownItem[] = [
      {
        label: 'Parent',
        subMenu: [
          { label: 'Child 1', link: '/child1' },
          { label: 'Child 2', link: '/child2' }
        ]
      }
    ];

    fixture.componentRef.setInput('items', items);
    expect(component.items()[0].subMenu).toHaveLength(2);
  });
});
