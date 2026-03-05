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
});
