import '@test-setup';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavRight, UserProfile } from './nav-right.component';
import { provideRouter } from '@angular/router';

describe('NavRight Component', () => {
  let fixture: ComponentFixture<NavRight>;
  let component: NavRight;
  const mockUser: UserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'avatar.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavRight],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(NavRight);
    fixture.componentRef.setInput('user', mockUser);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit itemClick event', () => {
    let emitted = false;
    component.itemClick.subscribe(() => {
      emitted = true;
    });

    component.onItemClick();
    expect(emitted).toBe(true);
  });
});
