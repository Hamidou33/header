import '@test-setup';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavLink } from './nav-link.component';
import { provideRouter } from '@angular/router';

describe('NavLink Component', () => {
  let fixture: ComponentFixture<NavLink>;
  let component: NavLink;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavLink],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(NavLink);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit itemClick event when link is clicked', () => {
    let emitted = false;
    component.itemClick.subscribe(() => {
      emitted = true;
    });

    component.onLinkClick();
    expect(emitted).toBe(true);
  });
});
