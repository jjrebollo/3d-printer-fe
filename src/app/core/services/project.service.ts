import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from '../models/project.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/projects`;

  constructor(private http: HttpClient) {}

  private resolveUrl(project: Project): Project {
    return {
      ...project,
      imageUrl: project.imageUrl?.startsWith('/')
        ? `${environment.apiBaseUrl}${project.imageUrl}`
        : project.imageUrl,
    };
  }

  getAll(): Observable<Project[]> {
    return this.http
      .get<Project[]>(this.baseUrl)
      .pipe(map((projects) => projects.map((p) => this.resolveUrl(p))));
  }

  getOne(id: number): Observable<Project> {
    return this.http
      .get<Project>(`${this.baseUrl}/${id}`)
      .pipe(map((p) => this.resolveUrl(p)));
  }
}
