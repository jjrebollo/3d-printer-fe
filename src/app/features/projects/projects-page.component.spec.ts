import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';

import { ProjectsPageComponent } from './projects-page.component';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';

const mockProjects: Project[] = [
  { id: 1, title: 'Project Alpha', description: 'Desc A', imageUrl: 'https://img.example.com/a.jpg', createdAt: '2024-01-01' },
  { id: 2, title: 'Project Beta',  description: 'Desc B', imageUrl: 'https://img.example.com/b.jpg', createdAt: '2024-01-02' },
];

describe('ProjectsPageComponent', () => {
  let component: ProjectsPageComponent;
  let fixture: ComponentFixture<ProjectsPageComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    projectServiceSpy = jasmine.createSpyObj('ProjectService', ['getAll']);
    projectServiceSpy.getAll.and.returnValue(of(mockProjects));

    await TestBed.configureTestingModule({
      imports: [ProjectsPageComponent],
      providers: [
        { provide: ProjectService, useValue: projectServiceSpy },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loading=true and empty projects before init', () => {
    expect(component.loading).toBeTrue();
    expect(component.projects).toEqual([]);
    expect(component.selectedProject).toBeNull();
  });

  it('should call getAll() on init', () => {
    fixture.detectChanges();
    expect(projectServiceSpy.getAll).toHaveBeenCalledTimes(1);
  });

  it('should populate projects and set loading=false on success', () => {
    fixture.detectChanges();

    expect(component.projects).toEqual(mockProjects);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('should set error message and loading=false when getAll fails', () => {
    projectServiceSpy.getAll.and.returnValue(throwError(() => new Error('fail')));
    fixture.detectChanges();

    expect(component.error).toBe('Could not load projects. Is the backend running?');
    expect(component.loading).toBeFalse();
    expect(component.projects).toEqual([]);
  });

  describe('openModal()', () => {
    it('should set selectedProject to the given project', () => {
      component.openModal(mockProjects[0]);
      expect(component.selectedProject).toEqual(mockProjects[0]);
    });

    it('should replace selectedProject when called again with a different project', () => {
      component.openModal(mockProjects[0]);
      component.openModal(mockProjects[1]);
      expect(component.selectedProject).toEqual(mockProjects[1]);
    });
  });

  describe('closeModal()', () => {
    it('should set selectedProject to null', () => {
      component.selectedProject = mockProjects[0];
      component.closeModal();
      expect(component.selectedProject).toBeNull();
    });

    it('should be a no-op when no project is selected', () => {
      component.closeModal();
      expect(component.selectedProject).toBeNull();
    });
  });
});
