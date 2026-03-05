import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavHeaderLeft } from './nav-header-left.component';
import { provideRouter } from '@angular/router';

describe('NavHeaderLeft', () => {
  let component: NavHeaderLeft;
  let fixture: ComponentFixture<NavHeaderLeft>;

  const createComponent = async () => {
    await TestBed.configureTestingModule({
      imports: [NavHeaderLeft],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavHeaderLeft);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const setInput = (name: string, value: unknown) => {
    fixture.componentRef.setInput(name, value);
    fixture.detectChanges();
  };

  const queryElement = (selector: string): HTMLElement | null => {
    return fixture.nativeElement.querySelector(selector);
  };

  beforeEach(createComponent);

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Secondary Logo', () => {
    it('should display logo when path is provided', () => {
      setInput('secondaryLogoPath', 'test-logo.png');

      const logo = queryElement('.nav-left-logo-img') as HTMLImageElement;

      expect(logo).toBeTruthy();
      expect(logo.src).toContain('test-logo.png');
    });
  });

  describe('Tag Display', () => {
    it('should display tag with provided text', () => {
      setInput('tagText', 'PRO');

      const tag = queryElement('.nav-left-tag');

      expect(tag).toBeTruthy();
      expect(tag?.textContent?.trim()).toBe('PRO');
    });

    it('should apply variant attribute to tag', () => {
      setInput('tagText', 'TEST');
      setInput('tagVariant', 'success');

      const tag = queryElement('.nav-left-tag');

      expect(tag?.getAttribute('data-variant')).toBe('success');
    });
  });

  describe('Separator Visibility', () => {
    it('should show separator when enabled', () => {
      setInput('secondaryLogoPath', 'logo.png');
      setInput('showSeparator', true);

      const separator = queryElement('.nav-left-separator');

      expect(separator).toBeTruthy();
    });

    it('should hide separator when disabled', () => {
      setInput('secondaryLogoPath', 'logo.png');
      setInput('showSeparator', false);

      const separator = queryElement('.nav-left-separator');

      expect(separator).toBeFalsy();
    });
  });
});

