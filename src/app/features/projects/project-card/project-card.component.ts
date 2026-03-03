import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Output() selected = new EventEmitter<Project>();

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src =
      'https://placehold.co/640x360/1a2035/00d4ff?text=No+Image';
  }
}
