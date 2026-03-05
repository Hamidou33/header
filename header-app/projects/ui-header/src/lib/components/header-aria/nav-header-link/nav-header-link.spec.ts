import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavHeaderLink } from './nav-header-link.component';
import { provideRouter } from '@angular/router';

describe('NavHeaderLink Component', () => {
  let fixture: ComponentFixture<NavHeaderLink>;
  let component: NavHeaderLink;

  const createComponent = () => {
    TestBed.configureTestingModule({
      imports: [NavHeaderLink],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(NavHeaderLink);
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

