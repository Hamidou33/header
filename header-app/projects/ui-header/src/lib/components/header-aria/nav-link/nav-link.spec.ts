import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { NavLink } from './nav-link';
import { provideRouter } from '@angular/router';

describe('NavLink Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavLink],
      providers: [provideRouter([])]
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavLink);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    const fixture = TestBed.createComponent(NavLink);
    const component = fixture.componentInstance;

    expect(component.label()).toBe('');
    expect(component.link()).toBeUndefined();
    expect(component.icon()).toBeUndefined();
    expect(component.active()).toBe(false);
    expect(component.measureOnly()).toBe(false);
    expect(component.useAriaMenu()).toBe(false);
  });

  it('should accept label input', () => {
    const fixture = TestBed.createComponent(NavLink);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('label', 'Home');
    expect(component.label()).toBe('Home');
  });

  it('should accept link input', () => {
    const fixture = TestBed.createComponent(NavLink);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('link', '/home');
    expect(component.link()).toBe('/home');
  });

  it('should accept icon input', () => {
    const fixture = TestBed.createComponent(NavLink);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('icon', '🏠');
    expect(component.icon()).toBe('🏠');
  });

  it('should accept active input', () => {
    const fixture = TestBed.createComponent(NavLink);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('active', true);
    expect(component.active()).toBe(true);
  });

  it('should accept measureOnly input', () => {
    const fixture = TestBed.createComponent(NavLink);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('measureOnly', true);
    expect(component.measureOnly()).toBe(true);
  });

  it('should accept useAriaMenu input', () => {
    const fixture = TestBed.createComponent(NavLink);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('useAriaMenu', true);
    expect(component.useAriaMenu()).toBe(true);
  });

  it('should emit itemClick event on click', () => {
    const fixture = TestBed.createComponent(NavLink);
    const component = fixture.componentInstance;
    let emitted = false;

    component.itemClick.subscribe(() => {
      emitted = true;
    });

    component.onLinkClick();
    expect(emitted).toBe(true);
  });

  it('should handle multiple inputs together', () => {
    const fixture = TestBed.createComponent(NavLink);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('label', 'Dashboard');
    fixture.componentRef.setInput('link', '/dashboard');
    fixture.componentRef.setInput('icon', '📊');
    fixture.componentRef.setInput('active', true);

    expect(component.label()).toBe('Dashboard');
    expect(component.link()).toBe('/dashboard');
    expect(component.icon()).toBe('📊');
    expect(component.active()).toBe(true);
  });
});
