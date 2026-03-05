import '@test-setup';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavCenter, NavItem } from './nav-center.component';
import { provideRouter } from '@angular/router';

describe('NavCenter Component', () => {
  let fixture: ComponentFixture<NavCenter>;
  let component: NavCenter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavCenter],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(NavCenter);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Mobile Menu', () => {
    it('should toggle mobile menu state', () => {
      expect(component.mobileMenuOpen()).toBe(false);
      component.toggleMobileMenu();
      expect(component.mobileMenuOpen()).toBe(true);
      component.toggleMobileMenu();
      expect(component.mobileMenuOpen()).toBe(false);
    });
  });

  describe('Visible Items Computation', () => {
    it('should compute visible items based on visibleCount', () => {
      const items: NavItem[] = [
        { label: 'Item 1', link: '/1' },
        { label: 'Item 2', link: '/2' },
        { label: 'Item 3', link: '/3' },
      ];
      fixture.componentRef.setInput('items', items);
      component['visibleCount'].set(2);

      expect(component.visibleItems()).toHaveLength(2);
      expect(component.visibleItems()[0].label).toBe('Item 1');
    });

    it('should handle empty items array', () => {
      fixture.componentRef.setInput('items', []);
      expect(component.visibleItems()).toEqual([]);
    });
  });

  describe('Overflow Items', () => {
    it('should compute overflow items correctly', () => {
      const items: NavItem[] = [
        { label: 'Item 1', link: '/1' },
        { label: 'Item 2', link: '/2' },
        { label: 'Item 3', link: '/3' },
        { label: 'Item 4', link: '/4' },
      ];
      fixture.componentRef.setInput('items', items);
      component['visibleCount'].set(2);

      const moreItems = component.moreItems();
      expect(moreItems).toHaveLength(2);
      expect(moreItems[0].label).toBe('Item 3');
    });

    it('should detect active item in overflow menu', () => {
      const items: NavItem[] = [
        { label: 'Item 1', link: '/1', active: false },
        { label: 'Item 2', link: '/2', active: true },
      ];
      fixture.componentRef.setInput('items', items);
      component['visibleCount'].set(1);

      expect(component.isMoreActive()).toBe(true);
    });
  });

  describe('Logo Click Event', () => {
    it('should emit clickMainLogo event', () => {
      let emitted = false;
      component.clickMainLogo.subscribe(() => {
        emitted = true;
      });

      component.onClickMainLogo();
      expect(emitted).toBe(true);
    });
  });
});
