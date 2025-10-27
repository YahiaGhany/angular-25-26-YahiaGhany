import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment';
// 1. On importe le composant détail
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'assignments', pathMatch: 'full' },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'ajout-devoir', component: AddAssignmentComponent },
  
  // 2. On ajoute la route pour le détail
  // ex: /assignment/1, /assignment/2, etc.
  { path: 'assignment/:id', component: AssignmentDetailComponent }
];