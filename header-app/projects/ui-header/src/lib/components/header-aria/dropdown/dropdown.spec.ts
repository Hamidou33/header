import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Dropdown } from './dropdown.component';
import { provideRouter } from '@angular/router';

describe('Dropdown Component', () => {
  let fixture: ComponentFixture<Dropdown>;
  let component: Dropdown;

  const createComponent = () => {
    TestBed.configureTestingModule({
      imports: [Dropdown],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(Dropdown);
    component = fixture.componentInstance;
  };

  const createClickEvent = (): Event => {
    const event = new Event('click');
    Object.defineProperty(event, 'currentTarget', {
      value: document.createElement('div'),
    });
    return event;
  };

  beforeEach(createComponent);

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Submenu Toggle', () => {
    it('should open submenu then close on second click', () => {
      const clickEvent = createClickEvent();

      expect(component.openSubmenuIndex()).toBeNull();

      component.toggleSubmenu(0, clickEvent);
      expect(component.openSubmenuIndex()).toBe(0);

      component.toggleSubmenu(0, clickEvent);
      expect(component.openSubmenuIndex()).toBeNull();
    });

    it('should switch from one submenu to another', () => {
      const clickEvent = createClickEvent();

      component.toggleSubmenu(0, clickEvent);
      expect(component.openSubmenuIndex()).toBe(0);

      component.toggleSubmenu(1, clickEvent);
      expect(component.openSubmenuIndex()).toBe(1);
    });
  });

  describe('Item Click', () => {
    it('should emit event when item is clicked', () => {
      let eventEmitted = false;
      component.itemClick.subscribe(() => {
        eventEmitted = true;
      });

      component.onItemClick();

      expect(eventEmitted).toBe(true);
    });
  });
});
