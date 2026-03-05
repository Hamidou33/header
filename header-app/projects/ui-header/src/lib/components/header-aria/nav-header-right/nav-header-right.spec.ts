import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavHeaderRight, UserProfile } from './nav-header-right.component';
import { provideRouter } from '@angular/router';

describe('NavHeaderRight Component', () => {
  let fixture: ComponentFixture<NavHeaderRight>;
  let component: NavHeaderRight;

  const mockUser: UserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'avatar.jpg',
  };

  const createComponent = () => {
    TestBed.configureTestingModule({
      imports: [NavHeaderRight],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(NavHeaderRight);
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

