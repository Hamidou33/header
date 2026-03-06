import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavHeaderRight, UserProfile } from './nav-header-right.component';

describe('NavHeaderRight Component', () => {
  let fixture: ComponentFixture<NavHeaderRight>;
  let component: NavHeaderRight;

  const user: UserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'JD',
  };

  const createComponent = (): void => {
    TestBed.configureTestingModule({
      imports: [NavHeaderRight],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(NavHeaderRight);
    fixture.componentRef.setInput('user', user);
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
    expect(component).toBeInstanceOf(NavHeaderRight);
  });

  it('should emit itemClick when onItemClick is called', () => {
    const emitSpy = vi.fn();
    component.itemClick.subscribe(emitSpy);

    component.onItemClick();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should toggle submenu state and stop event propagation', () => {
    const event = createMenuClickEvent();
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

    component.toggleSubmenu(0, event);
    expect(component.openSubmenuIndex()).toBe(0);

    component.toggleSubmenu(0, event);

    expect(preventDefaultSpy).toHaveBeenCalledTimes(2);
    expect(stopPropagationSpy).toHaveBeenCalledTimes(2);
    expect(component.openSubmenuIndex()).toBeNull();
  });
});
