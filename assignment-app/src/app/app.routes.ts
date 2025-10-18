import { Routes } from '@angular/router';
// Correction du chemin d'import
import { AssignmentsComponent } from './assignments/assignments';

export const routes: Routes = [
  { path: '', redirectTo: 'assignments', pathMatch: 'full' },
  { path: 'assignments', component: AssignmentsComponent }
];