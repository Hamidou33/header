import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header.component';

interface HeaderInputs {
  logoPath: string | null;
  companyName: string;
}

describe('Header Component', () => {
  let fixture: ComponentFixture<Header>;
  let component: Header;

  const createComponent = (): void => {
    TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const setInput = <K extends keyof HeaderInputs>(name: K, value: HeaderInputs[K]): void => {
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
    expect(component).toBeInstanceOf(Header);
  });

  it('should emit clickMainLogo when main logo link is clicked', () => {
    const emitSpy = vi.fn();
    component.clickMainLogo.subscribe(emitSpy);

    const logoLink = queryElement('[data-testid="main-logo-link"]') as HTMLAnchorElement | null;
    logoLink?.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should render fallback text when logo loading fails', () => {
    setInput('companyName', 'Arval');
    setInput('logoPath', '/missing-logo.svg');

    const image = queryElement('[data-testid="main-logo-image"]') as HTMLImageElement | null;
    image?.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    const fallback = queryElement('[data-testid="main-logo-fallback"]');

    expect(fallback?.textContent?.trim()).toBe('Arval');
  });

  it('should toggle logo hidden class when mobile menu state changes', () => {
    component.onMobileMenuOpenChange(true);
    fixture.detectChanges();

    const logoLink = queryElement('[data-testid="main-logo-link"]');
    expect(logoLink?.classList.contains('arv-header-nav-logo_hidden')).toBe(true);

    component.onMobileMenuOpenChange(false);
    fixture.detectChanges();

    expect(logoLink?.classList.contains('arv-header-nav-logo_hidden')).toBe(false);
  });
});
