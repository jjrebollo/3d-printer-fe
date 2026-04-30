import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerProfileComponent } from './owner-profile.component';
import { Owner } from '../../../core/models/owner.model';

const mockOwner: Owner = {
  id: 1,
  name: 'Juan Rebollo',
  city: 'Madrid',
  instagramProfileLink: 'https://instagram.com/juan',
  pictureUrl: null,
  createdAt: '2024-01-01',
};

describe('OwnerProfileComponent', () => {
  let component: OwnerProfileComponent;
  let fixture: ComponentFixture<OwnerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerProfileComponent);
    component = fixture.componentInstance;
    component.owner = mockOwner;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept the owner @Input', () => {
    expect(component.owner).toEqual(mockOwner);
  });

  it('should display the owner name', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Juan Rebollo');
  });

  it('should display the owner city', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Madrid');
  });
});
