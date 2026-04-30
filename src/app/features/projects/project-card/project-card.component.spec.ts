import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardComponent } from './project-card.component';
import { Project } from '../../../core/models/project.model';

const mockProject: Project = {
  id: 1,
  title: 'Benchy',
  description: 'A classic 3D printing benchmark.',
  imageUrl: 'https://example.com/benchy.jpg',
  createdAt: '2024-01-01',
};

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept the project @Input', () => {
    expect(component.project).toEqual(mockProject);
  });

  it('should expose a "selected" EventEmitter output', () => {
    expect(component.selected).toBeTruthy();
  });

  describe('onImgError()', () => {
    it('should replace the image src with the placehold.co fallback URL', () => {
      const img = document.createElement('img');
      const event = { target: img } as unknown as Event;

      component.onImgError(event);

      expect(img.src).toContain('placehold.co');
    });

    it('should set the fallback src to the 640x360 variant', () => {
      const img = document.createElement('img');
      component.onImgError({ target: img } as unknown as Event);

      expect(img.src).toContain('640x360');
    });
  });
});
