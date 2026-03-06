import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PARENT_OR_NEW_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
import { provideRouter } from '@angular/router';
import { NavHeaderLink } from './nav-header-link.component';

interface NavHeaderLinkInputs {
  label: string;
  link: string | undefined;
  icon: string | undefined;
  active: boolean;
  measureOnly: boolean;
  useAriaMenu: boolean;
}

describe('NavHeaderLink Component', () => {
  let fixture: ComponentFixture<NavHeaderLink>;
  let component: NavHeaderLink;

  const createComponent = (): void => {
    TestBed.configureTestingModule({
      imports: [NavHeaderLink],
      providers: [provideRouter([]), PARENT_OR_NEW_MENU_STACK_PROVIDER],
    });

    fixture = TestBed.createComponent(NavHeaderLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const setInput = <K extends keyof NavHeaderLinkInputs>(
    name: K,
    value: NavHeaderLinkInputs[K],
  ): void => {
    fixture.componentRef.setInput(name, value);
    fixture.detectChanges();
  };

  const queryElement = (selector: string): HTMLElement | null => {
    return fixture.nativeElement.querySelector(selector);
  };

  beforeEach(createComponent);

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeInstanceOf(NavHeaderLink);
  });

  it('should emit itemClick when link is clicked', () => {
    const emitSpy = vi.fn();
    component.itemClick.subscribe(emitSpy);

    const link = queryElement('[data-testid="nav-link"]') as HTMLAnchorElement | null;
    link?.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should render measure mode as non-clickable span', () => {
    setInput('measureOnly', true);

    const measureElement = queryElement('[data-testid="nav-link-measure"]');
    const interactiveLink = queryElement('[data-testid="nav-link"]');

    expect(measureElement).not.toBeNull();
    expect(interactiveLink).toBeNull();
  });

  it('should apply active class to the rendered link', () => {
    setInput('active', true);

    const link = queryElement('[data-testid="nav-link"]');

    expect(link?.classList.contains('active')).toBe(true);
  });
});
