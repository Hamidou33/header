import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavLink } from './nav-link.component';
import { provideRouter } from '@angular/router';

describe('NavLink Component', () => {
  let fixture: ComponentFixture<NavLink>;
  let component: NavLink;

  const createComponent = () => {
    TestBed.configureTestingModule({
      imports: [NavLink],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(NavLink);
    component = fixture.componentInstance;
  };

  beforeEach(createComponent);

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when link is clicked', () => {
    let eventEmitted = false;
    component.itemClick.subscribe(() => {
      eventEmitted = true;
    });

    component.onLinkClick();

    expect(eventEmitted).toBe(true);
  });
});
