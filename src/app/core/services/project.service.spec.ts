import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ProjectService } from './project.service';
import { Project } from '../models/project.model';
import { environment } from '../../../environments/environment';

const BASE_URL = `${environment.apiBaseUrl}/api/projects`;

const makeProject = (overrides: Partial<Project> = {}): Project => ({
  id: 1,
  title: 'Test Project',
  description: 'A description',
  imageUrl: '/uploads/project.jpg',
  createdAt: '2024-01-01',
  ...overrides,
});

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll()', () => {
    it('should send GET to the projects base URL', () => {
      service.getAll().subscribe();

      const req = httpMock.expectOne(BASE_URL);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should prepend apiBaseUrl to relative imageUrls', () => {
      const raw = [makeProject({ imageUrl: '/uploads/a.jpg' })];

      service.getAll().subscribe((projects) => {
        expect(projects[0].imageUrl).toBe(`${environment.apiBaseUrl}/uploads/a.jpg`);
      });

      httpMock.expectOne(BASE_URL).flush(raw);
    });

    it('should leave absolute imageUrls unchanged', () => {
      const raw = [makeProject({ imageUrl: 'https://cdn.example.com/img.jpg' })];

      service.getAll().subscribe((projects) => {
        expect(projects[0].imageUrl).toBe('https://cdn.example.com/img.jpg');
      });

      httpMock.expectOne(BASE_URL).flush(raw);
    });

    it('should resolve imageUrls for each project in the list', () => {
      const raw = [
        makeProject({ id: 1, imageUrl: '/uploads/a.jpg' }),
        makeProject({ id: 2, imageUrl: '/uploads/b.jpg' }),
      ];

      service.getAll().subscribe((projects) => {
        expect(projects[0].imageUrl).toBe(`${environment.apiBaseUrl}/uploads/a.jpg`);
        expect(projects[1].imageUrl).toBe(`${environment.apiBaseUrl}/uploads/b.jpg`);
      });

      httpMock.expectOne(BASE_URL).flush(raw);
    });

    it('should return an empty array when the API returns []', () => {
      service.getAll().subscribe((projects) => {
        expect(projects).toEqual([]);
      });

      httpMock.expectOne(BASE_URL).flush([]);
    });
  });

  describe('getOne()', () => {
    it('should send GET to the correct project URL', () => {
      service.getOne(5).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/5`);
      expect(req.request.method).toBe('GET');
      req.flush(makeProject({ id: 5 }));
    });

    it('should prepend apiBaseUrl to a relative imageUrl', () => {
      const raw = makeProject({ imageUrl: '/uploads/p.jpg' });

      service.getOne(1).subscribe((project) => {
        expect(project.imageUrl).toBe(`${environment.apiBaseUrl}/uploads/p.jpg`);
      });

      httpMock.expectOne(`${BASE_URL}/1`).flush(raw);
    });

    it('should leave an absolute imageUrl unchanged', () => {
      const raw = makeProject({ imageUrl: 'https://cdn.example.com/p.jpg' });

      service.getOne(1).subscribe((project) => {
        expect(project.imageUrl).toBe('https://cdn.example.com/p.jpg');
      });

      httpMock.expectOne(`${BASE_URL}/1`).flush(raw);
    });

    it('should preserve all other project fields', () => {
      const raw = makeProject({ id: 3, title: 'My Project', description: 'Desc', imageUrl: '/u/p.jpg' });

      service.getOne(3).subscribe((project) => {
        expect(project.id).toBe(3);
        expect(project.title).toBe('My Project');
        expect(project.description).toBe('Desc');
        expect(project.createdAt).toBe(raw.createdAt);
      });

      httpMock.expectOne(`${BASE_URL}/3`).flush(raw);
    });
  });
});
