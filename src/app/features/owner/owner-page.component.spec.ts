import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';

import { OwnerPageComponent } from './owner-page.component';
import { OwnerService } from '../../core/services/owner.service';
import { Owner } from '../../core/models/owner.model';

const mockOwner: Owner = {
  id: 1,
  name: 'Juan',
  city: 'Madrid',
  instagramProfileLink: 'https://instagram.com/juan',
  pictureUrl: null,
  createdAt: '2024-01-01',
};

describe('OwnerPageComponent', () => {
  let component: OwnerPageComponent;
  let fixture: ComponentFixture<OwnerPageComponent>;
  let ownerServiceSpy: jasmine.SpyObj<OwnerService>;

  beforeEach(async () => {
    ownerServiceSpy = jasmine.createSpyObj('OwnerService', ['getOwner']);
    ownerServiceSpy.getOwner.and.returnValue(of(mockOwner));

    await TestBed.configureTestingModule({
      imports: [OwnerPageComponent],
      providers: [
        { provide: OwnerService, useValue: ownerServiceSpy },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loading=true and owner=null before init', () => {
    expect(component.loading).toBeTrue();
    expect(component.owner).toBeNull();
    expect(component.error).toBeNull();
  });

  it('should call getOwner(1) on init', () => {
    fixture.detectChanges();
    expect(ownerServiceSpy.getOwner).toHaveBeenCalledOnceWith(1);
  });

  it('should populate owner and set loading=false on success', () => {
    fixture.detectChanges();

    expect(component.owner).toEqual(mockOwner);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('should set error message and loading=false when getOwner fails', () => {
    ownerServiceSpy.getOwner.and.returnValue(throwError(() => new Error('Network error')));
    fixture.detectChanges();

    expect(component.error).toBe('Could not load owner information. Is the backend running?');
    expect(component.loading).toBeFalse();
    expect(component.owner).toBeNull();
  });

  it('should not set owner when request fails', () => {
    ownerServiceSpy.getOwner.and.returnValue(throwError(() => new Error('fail')));
    fixture.detectChanges();

    expect(component.owner).toBeNull();
  });
});
