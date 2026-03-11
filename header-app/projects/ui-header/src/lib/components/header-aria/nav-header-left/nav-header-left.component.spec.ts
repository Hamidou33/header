import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavHeaderLeftComponent } from './nav-header-left.component';

interface NavHeaderLeftInputs {
  secondaryLogoPath: string | undefined;
  secondaryLogoAlt: string;
  secondaryLogoUrl: string;
  tagText: string | undefined;
  tagVariant: 'primary' | 'secondary' | 'success' | 'info' | 'warning';
  showSeparator: boolean;
}

describe('NavHeaderLeftComponent', () => {
  let component: NavHeaderLeftComponent;
  let fixture: ComponentFixture<NavHeaderLeftComponent>;

  const createComponent = async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [NavHeaderLeftComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavHeaderLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const setInput = <K extends keyof NavHeaderLeftInputs>(
    name: K,
    value: NavHeaderLeftInputs[K],
  ): void => {
    fixture.componentRef.setInput(name, value);
    fixture.detectChanges();
  };

  const queryElement = (selector: string): HTMLElement | undefined => {
    return fixture.nativeElement.querySelector(selector) ?? undefined;
  };

  beforeEach(createComponent);

  it('should create the component', () => {
    expect(component).toBeInstanceOf(NavHeaderLeftComponent);
  });

  describe('Secondary logo', () => {
    it('should display logo when path is provided', () => {
      setInput('secondaryLogoPath', 'test-logo.png');

      const logo = queryElement('.nav-left-logo-img') as HTMLImageElement | undefined;

      expect(logo).toBeDefined();
      expect(logo?.src).toContain('test-logo.png');
    });
  });

  describe('Tag display', () => {
    it('should display tag with provided text', () => {
      setInput('tagText', 'PRO');

      const tag = queryElement('.nav-left-tag');

      expect(tag?.textContent?.trim()).toBe('PRO');
    });

    it('should apply variant attribute to tag', () => {
      setInput('tagText', 'TEST');
      setInput('tagVariant', 'success');

      const tag = queryElement('.nav-left-tag');

      expect(tag?.getAttribute('data-variant')).toBe('success');
    });
  });

  describe('Separator visibility', () => {
    it('should show separator when enabled', () => {
      setInput('secondaryLogoPath', 'logo.png');
      setInput('showSeparator', true);

      const separator = queryElement('.nav-left-separator');

      expect(separator).toBeDefined();
    });

    it('should hide separator when disabled', () => {
      setInput('secondaryLogoPath', 'logo.png');
      setInput('showSeparator', false);

      const separator = queryElement('.nav-left-separator');

      expect(separator).toBeUndefined();
  });
});
});
