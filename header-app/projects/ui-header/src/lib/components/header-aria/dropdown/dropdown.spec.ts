import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DropdownComponent } from './dropdown.component';

describe('Dropdown Component', () => {
  let fixture: ComponentFixture<DropdownComponent>;
  let component: DropdownComponent;

  const createComponent = (): void => {
    TestBed.configureTestingModule({
      imports: [DropdownComponent],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const createMenuClickEvent = (): MouseEvent => {
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'currentTarget', {
      value: document.createElement('button'),
      configurable: true,
    });
    return event;
  };

  beforeEach(createComponent);

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeInstanceOf(DropdownComponent);
  });

  describe('Submenu toggle', () => {
    it('should open and close submenu for the same item', () => {
      const event = createMenuClickEvent();
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

      component.toggleSubmenu(0, event);
      component.toggleSubmenu(0, event);

      expect(preventDefaultSpy).toHaveBeenCalledTimes(2);
      expect(stopPropagationSpy).toHaveBeenCalledTimes(2);
      expect(component.openSubmenuIndex()).toBeUndefined();
    });

    it('should switch from one submenu index to another', () => {
      const event = createMenuClickEvent();

      component.toggleSubmenu(0, event);
      expect(component.openSubmenuIndex()).toBe(0);

      component.toggleSubmenu(1, event);
      expect(component.openSubmenuIndex()).toBe(1);
    });
  });

  describe('Item click output', () => {
    it('should emit itemClick when onItemClick is called', () => {
      const emitSpy = vi.fn();
      component.itemClick.subscribe(emitSpy);

      component.onItemClick();

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
