import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { OwnerPageComponent } from './features/owner/owner-page.component';
import { ProjectsPageComponent } from './features/projects/projects-page.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'owner', component: OwnerPageComponent },
  { path: 'projects', component: ProjectsPageComponent },
  { path: '**', redirectTo: '' },
];
