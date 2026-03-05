import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Header } from './header.component';
import { provideRouter } from '@angular/router';

describe('Header Component', () => {
  let fixture: ComponentFixture<Header>;
  let component: Header;

  const createComponent = () => {
    TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
  };

  beforeEach(createComponent);

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Logo Click', () => {
    it('should emit event when logo is clicked', () => {
      let eventEmitted = false;
      component.clickMainLogo.subscribe(() => {
        eventEmitted = true;
      });

      component.onClickMainLogo();

      expect(eventEmitted).toBe(true);
    });
  });
});
