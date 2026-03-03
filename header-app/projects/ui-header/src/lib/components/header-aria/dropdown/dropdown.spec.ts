import '../../../../test-setup';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Dropdown, DropdownItem } from './dropdown.component';
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
    fixture?.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Submenu Toggle', () => {
    it('should toggle submenu open/close', () => {
      const event = new Event('click');
      Object.defineProperty(event, 'currentTarget', {
        value: document.createElement('div'),
      });

      expect(component.openSubmenuIndex()).toBeNull();

      component.toggleSubmenu(0, event);
      expect(component.openSubmenuIndex()).toBe(0);

      component.toggleSubmenu(0, event);
      expect(component.openSubmenuIndex()).toBeNull();
    });

    it('should switch between different submenus', () => {
      const event = new Event('click');
      Object.defineProperty(event, 'currentTarget', {
        value: document.createElement('div'),
      });

      component.toggleSubmenu(0, event);
      expect(component.openSubmenuIndex()).toBe(0);

      component.toggleSubmenu(1, event);
      expect(component.openSubmenuIndex()).toBe(1);
    });
  });

  describe('Item Click Event', () => {
    it('should emit itemClick event', () => {
      let emitted = false;
      component.itemClick.subscribe(() => {
        emitted = true;
      });

      component.onItemClick();
      expect(emitted).toBe(true);
    });
  });
});
