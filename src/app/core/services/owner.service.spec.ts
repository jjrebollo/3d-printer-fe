import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { OwnerService } from './owner.service';
import { Owner } from '../models/owner.model';
import { environment } from '../../../environments/environment';

const BASE_URL = `${environment.apiBaseUrl}/api/owners`;

const makeOwner = (overrides: Partial<Owner> = {}): Owner => ({
  id: 1,
  name: 'Juan',
  city: 'Madrid',
  instagramProfileLink: 'https://instagram.com/juan',
  pictureUrl: null,
  createdAt: '2024-01-01',
  ...overrides,
});

describe('OwnerService', () => {
  let service: OwnerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnerService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(OwnerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOwner()', () => {
    it('should send a GET request to the correct URL', () => {
      service.getOwner(1).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(makeOwner());
    });

    it('should send a GET request with the given id', () => {
      service.getOwner(42).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/42`);
      expect(req.request.method).toBe('GET');
      req.flush(makeOwner({ id: 42 }));
    });

    it('should prepend apiBaseUrl to a relative pictureUrl', () => {
      const raw = makeOwner({ pictureUrl: '/uploads/juan.jpg' });

      service.getOwner(1).subscribe((owner) => {
        expect(owner.pictureUrl).toBe(`${environment.apiBaseUrl}/uploads/juan.jpg`);
      });

      httpMock.expectOne(`${BASE_URL}/1`).flush(raw);
    });

    it('should keep pictureUrl as null when the API returns null', () => {
      const raw = makeOwner({ pictureUrl: null });

      service.getOwner(1).subscribe((owner) => {
        expect(owner.pictureUrl).toBeNull();
      });

      httpMock.expectOne(`${BASE_URL}/1`).flush(raw);
    });

    it('should preserve all other owner fields unchanged', () => {
      const raw = makeOwner({ pictureUrl: null });

      service.getOwner(1).subscribe((owner) => {
        expect(owner.id).toBe(raw.id);
        expect(owner.name).toBe(raw.name);
        expect(owner.city).toBe(raw.city);
        expect(owner.instagramProfileLink).toBe(raw.instagramProfileLink);
        expect(owner.createdAt).toBe(raw.createdAt);
      });

      httpMock.expectOne(`${BASE_URL}/1`).flush(raw);
    });
  });
});
