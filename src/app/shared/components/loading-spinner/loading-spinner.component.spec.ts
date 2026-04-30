import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the spinner-wrapper element', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.spinner-wrapper')).not.toBeNull();
  });

  it('should render the spinner element inside the wrapper', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.spinner-wrapper .spinner')).not.toBeNull();
  });
});
