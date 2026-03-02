import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../../test-setup';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavLink } from './nav-link';
import { provideRouter } from '@angular/router';

describe('NavLink Component', () => {
  let fixture: ComponentFixture<NavLink>;
  let component: NavLink;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavLink],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(NavLink);
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
      expect(component.link()).toBeUndefined();
      expect(component.icon()).toBeUndefined();
      expect(component.active()).toBe(false);
      expect(component.measureOnly()).toBe(false);
      expect(component.useAriaMenu()).toBe(false);
    });
  });

  // ==========================================
  // SECTION 2: Label Property
  // ==========================================
  describe('Label Property', () => {
    it('should accept label input', () => {
      fixture.componentRef.setInput('label', 'Home');
      expect(component.label()).toBe('Home');
    });

    it('should accept empty label', () => {
      fixture.componentRef.setInput('label', '');
      expect(component.label()).toBe('');
    });

    it('should accept long label', () => {
      const longLabel = 'This is a very long navigation label';
      fixture.componentRef.setInput('label', longLabel);
      expect(component.label()).toBe(longLabel);
    });

    it('should accept label with special characters', () => {
      fixture.componentRef.setInput('label', 'Products & Services');
      expect(component.label()).toBe('Products & Services');
    });
  });

  // ==========================================
  // SECTION 3: Link Property
  // ==========================================
  describe('Link Property', () => {
    it('should accept link input', () => {
      fixture.componentRef.setInput('link', '/home');
      expect(component.link()).toBe('/home');
    });

    it('should handle undefined link', () => {
      expect(component.link()).toBeUndefined();
    });

    it('should accept absolute link', () => {
      fixture.componentRef.setInput('link', '/products/category/item');
      expect(component.link()).toBe('/products/category/item');
    });

    it('should accept relative link', () => {
      fixture.componentRef.setInput('link', 'about');
      expect(component.link()).toBe('about');
    });

    it('should accept link with query params', () => {
      fixture.componentRef.setInput('link', '/search?q=test');
      expect(component.link()).toBe('/search?q=test');
    });

    it('should accept link with hash', () => {
      fixture.componentRef.setInput('link', '/page#section');
      expect(component.link()).toBe('/page#section');
    });
  });

  // ==========================================
  // SECTION 4: Icon Property
  // ==========================================
  describe('Icon Property', () => {
    it('should accept icon input', () => {
      fixture.componentRef.setInput('icon', '🏠');
      expect(component.icon()).toBe('🏠');
    });

    it('should handle undefined icon', () => {
      expect(component.icon()).toBeUndefined();
    });

    it('should accept icon class name', () => {
      fixture.componentRef.setInput('icon', 'fa-home');
      expect(component.icon()).toBe('fa-home');
    });

    it('should accept emoji icon', () => {
      fixture.componentRef.setInput('icon', '📊');
      expect(component.icon()).toBe('📊');
    });
  });

  // ==========================================
  // SECTION 5: Active State
  // ==========================================
  describe('Active State', () => {
    it('should accept active input', () => {
      fixture.componentRef.setInput('active', true);
      expect(component.active()).toBe(true);
    });

    it('should default to inactive', () => {
      expect(component.active()).toBe(false);
    });

    it('should toggle active state', () => {
      fixture.componentRef.setInput('active', true);
      expect(component.active()).toBe(true);

      fixture.componentRef.setInput('active', false);
      expect(component.active()).toBe(false);
    });
  });

  // ==========================================
  // SECTION 6: Measure Only Mode
  // ==========================================
  describe('Measure Only Mode', () => {
    it('should accept measureOnly input', () => {
      fixture.componentRef.setInput('measureOnly', true);
      expect(component.measureOnly()).toBe(true);
    });

    it('should default to false', () => {
      expect(component.measureOnly()).toBe(false);
    });

    it('should toggle measureOnly', () => {
      fixture.componentRef.setInput('measureOnly', true);
      expect(component.measureOnly()).toBe(true);

      fixture.componentRef.setInput('measureOnly', false);
      expect(component.measureOnly()).toBe(false);
    });
  });

  // ==========================================
  // SECTION 7: Aria Menu Mode
  // ==========================================
  describe('Aria Menu Mode', () => {
    it('should accept useAriaMenu input', () => {
      fixture.componentRef.setInput('useAriaMenu', true);
      expect(component.useAriaMenu()).toBe(true);
    });

    it('should default to false', () => {
      expect(component.useAriaMenu()).toBe(false);
    });

    it('should toggle useAriaMenu', () => {
      fixture.componentRef.setInput('useAriaMenu', true);
      expect(component.useAriaMenu()).toBe(true);

      fixture.componentRef.setInput('useAriaMenu', false);
      expect(component.useAriaMenu()).toBe(false);
    });
  });

  // ==========================================
  // SECTION 8: Click Event
  // ==========================================
  describe('Click Event', () => {
    it('should emit itemClick event on click', () => {
      let emitted = false;
      component.itemClick.subscribe(() => {
        emitted = true;
      });

      component.onLinkClick();
      expect(emitted).toBe(true);
    });

    it('should emit event only once per click', () => {
      let emitCount = 0;
      component.itemClick.subscribe(() => {
        emitCount++;
      });

      component.onLinkClick();
      expect(emitCount).toBe(1);
    });

    it('should emit event multiple times when clicked multiple times', () => {
      let emitCount = 0;
      component.itemClick.subscribe(() => {
        emitCount++;
      });

      component.onLinkClick();
      component.onLinkClick();
      component.onLinkClick();
      expect(emitCount).toBe(3);
    });
  });

  // ==========================================
  // SECTION 9: Complete Configuration
  // ==========================================
  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      fixture.componentRef.setInput('label', 'Dashboard');
      fixture.componentRef.setInput('link', '/dashboard');
      fixture.componentRef.setInput('icon', '📊');
      fixture.componentRef.setInput('active', true);
      fixture.componentRef.setInput('measureOnly', false);
      fixture.componentRef.setInput('useAriaMenu', true);

      expect(component.label()).toBe('Dashboard');
      expect(component.link()).toBe('/dashboard');
      expect(component.icon()).toBe('📊');
      expect(component.active()).toBe(true);
      expect(component.measureOnly()).toBe(false);
      expect(component.useAriaMenu()).toBe(true);
    });

    it('should handle minimal configuration', () => {
      fixture.componentRef.setInput('label', 'Home');

      expect(component.label()).toBe('Home');
      expect(component.link()).toBeUndefined();
      expect(component.icon()).toBeUndefined();
      expect(component.active()).toBe(false);
    });

    it('should handle link without label', () => {
      fixture.componentRef.setInput('link', '/products');

      expect(component.label()).toBe('');
      expect(component.link()).toBe('/products');
    });

    it('should handle active link with icon', () => {
      fixture.componentRef.setInput('label', 'Settings');
      fixture.componentRef.setInput('link', '/settings');
      fixture.componentRef.setInput('icon', '⚙️');
      fixture.componentRef.setInput('active', true);

      expect(component.label()).toBe('Settings');
      expect(component.link()).toBe('/settings');
      expect(component.icon()).toBe('⚙️');
      expect(component.active()).toBe(true);
    });
  });

  // ==========================================
  // SECTION 10: Edge Cases
  // ==========================================
  describe('Edge Cases', () => {
    it('should handle null-like values gracefully', () => {
      fixture.componentRef.setInput('label', '');
      expect(component.label()).toBe('');
    });

    it('should handle link changes', () => {
      fixture.componentRef.setInput('link', '/old');
      expect(component.link()).toBe('/old');

      fixture.componentRef.setInput('link', '/new');
      expect(component.link()).toBe('/new');
    });

    it('should handle label changes', () => {
      fixture.componentRef.setInput('label', 'Old Label');
      expect(component.label()).toBe('Old Label');

      fixture.componentRef.setInput('label', 'New Label');
      expect(component.label()).toBe('New Label');
    });
  });
});
