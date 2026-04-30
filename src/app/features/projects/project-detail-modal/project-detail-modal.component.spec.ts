import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailModalComponent } from './project-detail-modal.component';
import { Project } from '../../../core/models/project.model';

const mockProject: Project = {
  id: 1,
  title: 'Cable Organiser',
  description: 'Keeps cables tidy.',
  imageUrl: 'https://example.com/cable.jpg',
  createdAt: '2024-01-01',
};

describe('ProjectDetailModalComponent', () => {
  let component: ProjectDetailModalComponent;
  let fixture: ComponentFixture<ProjectDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailModalComponent);
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

  describe('onBackdropClick()', () => {
    it('should emit "closed" when the clicked element has the "backdrop" class', () => {
      const emitSpy = spyOn(component.closed, 'emit');
      const backdropEl = document.createElement('div');
      backdropEl.classList.add('backdrop');

      component.onBackdropClick({ target: backdropEl } as unknown as MouseEvent);

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should NOT emit "closed" when a non-backdrop child element is clicked', () => {
      const emitSpy = spyOn(component.closed, 'emit');
      const innerEl = document.createElement('div');

      component.onBackdropClick({ target: innerEl } as unknown as MouseEvent);

      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should NOT emit "closed" when an element with an unrelated class is clicked', () => {
      const emitSpy = spyOn(component.closed, 'emit');
      const el = document.createElement('div');
      el.classList.add('modal-content');

      component.onBackdropClick({ target: el } as unknown as MouseEvent);

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  describe('onImgError()', () => {
    it('should replace the image src with the placehold.co fallback URL', () => {
      const img = document.createElement('img');
      component.onImgError({ target: img } as unknown as Event);

      expect(img.src).toContain('placehold.co');
    });

    it('should set the fallback src to the 800x450 variant', () => {
      const img = document.createElement('img');
      component.onImgError({ target: img } as unknown as Event);

      expect(img.src).toContain('800x450');
    });
  });
});
