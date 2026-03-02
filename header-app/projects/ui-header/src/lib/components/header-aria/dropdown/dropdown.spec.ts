import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Dropdown, DropdownItem } from './dropdown';
import { provideRouter } from '@angular/router';

describe('Dropdown Component', () => {
  let fixture: ComponentFixture<Dropdown>;
  let component: Dropdown;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Dropdown],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(Dropdown);
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
      expect(component.label()).toBe('');
      expect(component.items()).toEqual([]);
      expect(component.active()).toBe(false);
      expect(component.measureOnly()).toBe(false);
      expect(component.openSubmenuIndex()).toBeNull();
    });
  });

  // ==========================================
  // SECTION 2: Input Properties
  // ==========================================
  describe('Input Properties', () => {
    it('should accept label input', () => {
      fixture.componentRef.setInput('label', 'Products');
      expect(component.label()).toBe('Products');
    });

    it('should accept empty label', () => {
      fixture.componentRef.setInput('label', '');
      expect(component.label()).toBe('');
    });

    it('should accept items array', () => {
      const items: DropdownItem[] = [
        { label: 'Item 1', link: '/item1' },
        { label: 'Item 2', link: '/item2' },
        { label: 'Item 3', link: '/item3' },
      ];
      fixture.componentRef.setInput('items', items);
      expect(component.items()).toEqual(items);
      expect(component.items()).toHaveLength(3);
    });

    it('should accept items with icons', () => {
      const items: DropdownItem[] = [
        { label: 'Profile', link: '/profile', icon: 'user' },
        { label: 'Settings', link: '/settings', icon: 'gear' },
      ];
      fixture.componentRef.setInput('items', items);

      expect(component.items()[0].icon).toBe('user');
      expect(component.items()[1].icon).toBe('gear');
    });

    it('should accept items with submenus', () => {
      const items: DropdownItem[] = [
        {
          label: 'Products',
          subMenu: [
            { label: 'Product A', link: '/products/a' },
            { label: 'Product B', link: '/products/b' },
          ],
        },
      ];
      fixture.componentRef.setInput('items', items);

      expect(component.items()[0].subMenu).toBeDefined();
      expect(component.items()[0].subMenu).toHaveLength(2);
    });

    it('should accept active state', () => {
      fixture.componentRef.setInput('active', true);
      expect(component.active()).toBe(true);

      fixture.componentRef.setInput('active', false);
      expect(component.active()).toBe(false);
    });

    it('should accept measureOnly flag', () => {
      fixture.componentRef.setInput('measureOnly', true);
      expect(component.measureOnly()).toBe(true);
    });
  });

  // ==========================================
  // SECTION 3: Submenu Toggle Functionality
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

    it('should switch to different submenu', () => {
      const event = new Event('click');

      component.openSubmenuIndex.set(0);
      component.toggleSubmenu(1, event);
      expect(component.openSubmenuIndex()).toBe(1);
    });

    it('should toggle between multiple submenus', () => {
      const event = new Event('click');

      component.toggleSubmenu(0, event);
      expect(component.openSubmenuIndex()).toBe(0);

      component.toggleSubmenu(1, event);
      expect(component.openSubmenuIndex()).toBe(1);

      component.toggleSubmenu(2, event);
      expect(component.openSubmenuIndex()).toBe(2);
    });

    it('should prevent event default and propagation', () => {
      const event = new Event('click');
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

      component.toggleSubmenu(0, event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
  });

  // ==========================================
  // SECTION 4: Item Click Event
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

    it('should emit itemClick only once per call', () => {
      let emitCount = 0;
      component.itemClick.subscribe(() => {
        emitCount++;
      });

      component.onItemClick();
      expect(emitCount).toBe(1);
    });

    it('should emit itemClick multiple times when called multiple times', () => {
      let emitCount = 0;
      component.itemClick.subscribe(() => {
        emitCount++;
      });

      component.onItemClick();
      component.onItemClick();
      component.onItemClick();
      expect(emitCount).toBe(3);
    });
  });

  // ==========================================
  // SECTION 5: Complex Item Structures
  // ==========================================
  describe('Complex Item Structures', () => {
    it('should handle items with all properties', () => {
      const items: DropdownItem[] = [
        {
          label: 'Complete Item',
          link: '/complete',
          icon: 'star',
          active: true,
          subMenu: [{ label: 'Sub 1', link: '/sub1' }],
        },
      ];
      fixture.componentRef.setInput('items', items);

      const item = component.items()[0];
      expect(item.label).toBe('Complete Item');
      expect(item.link).toBe('/complete');
      expect(item.icon).toBe('star');
      expect(item.active).toBe(true);
      expect(item.subMenu).toHaveLength(1);
    });

    it('should handle deeply nested submenus', () => {
      const items: DropdownItem[] = [
        {
          label: 'Level 1',
          subMenu: [
            {
              label: 'Level 2',
              subMenu: [
                {
                  label: 'Level 3',
                  link: '/level3',
                },
              ],
            },
          ],
        },
      ];
      fixture.componentRef.setInput('items', items);

      const level1 = component.items()[0];
      const level2 = level1.subMenu![0];
      const level3 = level2.subMenu![0];

      expect(level1.label).toBe('Level 1');
      expect(level2.label).toBe('Level 2');
      expect(level3.label).toBe('Level 3');
      expect(level3.link).toBe('/level3');
    });

    it('should handle mix of items with and without submenus', () => {
      const items: DropdownItem[] = [
        { label: 'Simple Item', link: '/simple' },
        {
          label: 'Parent Item',
          subMenu: [
            { label: 'Child 1', link: '/child1' },
            { label: 'Child 2', link: '/child2' },
          ],
        },
        { label: 'Another Simple', link: '/another' },
      ];
      fixture.componentRef.setInput('items', items);

      expect(component.items()).toHaveLength(3);
      expect(component.items()[0].subMenu).toBeUndefined();
      expect(component.items()[1].subMenu).toHaveLength(2);
      expect(component.items()[2].subMenu).toBeUndefined();
    });
  });

  // ==========================================
  // SECTION 6: Active State Handling
  // ==========================================
  describe('Active State', () => {
    it('should mark dropdown as active', () => {
      fixture.componentRef.setInput('active', true);
      expect(component.active()).toBe(true);
    });

    it('should handle active items in the list', () => {
      const items: DropdownItem[] = [
        { label: 'Item 1', link: '/1', active: false },
        { label: 'Item 2', link: '/2', active: true },
        { label: 'Item 3', link: '/3', active: false },
      ];
      fixture.componentRef.setInput('items', items);

      const activeItem = component.items().find((item) => item.active);
      expect(activeItem).toBeDefined();
      expect(activeItem?.label).toBe('Item 2');
    });

    it('should handle multiple active items', () => {
      const items: DropdownItem[] = [
        { label: 'Item 1', link: '/1', active: true },
        { label: 'Item 2', link: '/2', active: true },
        { label: 'Item 3', link: '/3', active: false },
      ];
      fixture.componentRef.setInput('items', items);

      const activeItems = component.items().filter((item) => item.active);
      expect(activeItems).toHaveLength(2);
    });
  });

  // ==========================================
  // SECTION 7: Measure Only Mode
  // ==========================================
  describe('Measure Only Mode', () => {
    it('should enable measure only mode', () => {
      fixture.componentRef.setInput('measureOnly', true);
      expect(component.measureOnly()).toBe(true);
    });

    it('should disable measure only mode by default', () => {
      expect(component.measureOnly()).toBe(false);
    });
  });

  // ==========================================
  // SECTION 8: Empty States
  // ==========================================
  describe('Empty States', () => {
    it('should handle empty items array', () => {
      fixture.componentRef.setInput('items', []);
      expect(component.items()).toEqual([]);
      expect(component.items()).toHaveLength(0);
    });

    it('should handle items without links', () => {
      const items: DropdownItem[] = [{ label: 'No Link Item' }];
      fixture.componentRef.setInput('items', items);

      expect(component.items()[0].link).toBeUndefined();
    });

    it('should handle items without icons', () => {
      const items: DropdownItem[] = [{ label: 'No Icon', link: '/no-icon' }];
      fixture.componentRef.setInput('items', items);

      expect(component.items()[0].icon).toBeUndefined();
    });
  });
});
