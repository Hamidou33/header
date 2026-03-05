import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavLeft } from './nav-left.component';
import { provideRouter } from '@angular/router';
import '@test-setup';

describe('NavLeft', () => {
  let component: NavLeft;
  let fixture: ComponentFixture<NavLeft>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavLeft],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavLeft);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display secondary logo when provided', () => {
    fixture.componentRef.setInput('secondaryLogoPath', 'test-logo.png');
    fixture.detectChanges();

    const logo = fixture.nativeElement.querySelector('.nav-left-logo-img');
    expect(logo).toBeTruthy();
    expect(logo.src).toContain('test-logo.png');
  });

  it('should display tag when tagText is provided', () => {
    fixture.componentRef.setInput('tagText', 'PRO');
    fixture.detectChanges();

    const tag = fixture.nativeElement.querySelector('.nav-left-tag');
    expect(tag).toBeTruthy();
    expect(tag.textContent?.trim()).toBe('PRO');
  });

  it('should apply correct tag variant class', () => {
    fixture.componentRef.setInput('tagText', 'TEST');
    fixture.componentRef.setInput('tagVariant', 'success');
    fixture.detectChanges();

    const tag = fixture.nativeElement.querySelector('.nav-left-tag');
    expect(tag.getAttribute('data-variant')).toBe('success');
  });

  it('should show separator when showSeparator is true', () => {
    fixture.componentRef.setInput('secondaryLogoPath', 'logo.png');
    fixture.componentRef.setInput('showSeparator', true);
    fixture.detectChanges();

    const separator = fixture.nativeElement.querySelector('.nav-left-separator');
    expect(separator).toBeTruthy();
  });

  it('should not show separator when showSeparator is false', () => {
    fixture.componentRef.setInput('secondaryLogoPath', 'logo.png');
    fixture.componentRef.setInput('showSeparator', false);
    fixture.detectChanges();

    const separator = fixture.nativeElement.querySelector('.nav-left-separator');
    expect(separator).toBeFalsy();
  });
});
