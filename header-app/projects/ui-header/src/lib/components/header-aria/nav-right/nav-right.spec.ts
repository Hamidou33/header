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

  const createComponent = () => {
    TestBed.configureTestingModule({
      imports: [NavRight],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(NavRight);
    fixture.componentRef.setInput('user', mockUser);
    component = fixture.componentInstance;
  };

  beforeEach(createComponent);

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when item is clicked', () => {
    let eventEmitted = false;
    component.itemClick.subscribe(() => {
      eventEmitted = true;
    });

    component.onItemClick();

    expect(eventEmitted).toBe(true);
  });
});
