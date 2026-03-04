import '@test-setup';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProfileMenu, UserProfile } from './profile-menu.component';
import { provideRouter } from '@angular/router';

describe('ProfileMenu Component', () => {
  let fixture: ComponentFixture<ProfileMenu>;
  let component: ProfileMenu;
  const mockUser: UserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'avatar.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileMenu],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(ProfileMenu);
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
