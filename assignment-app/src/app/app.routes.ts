import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments';
// On importe le composant d'ajout
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment';

export const routes: Routes = [
  { path: '', redirectTo: 'assignments', pathMatch: 'full' },
  { path: 'assignments', component: AssignmentsComponent },
  
  // On ajoute la nouvelle route
  { path: 'ajout-devoir', component: AddAssignmentComponent }
];