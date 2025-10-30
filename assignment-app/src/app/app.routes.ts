import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment';

export const routes: Routes = [
  { path: '', redirectTo: 'assignments', pathMatch: 'full' },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'ajout-devoir', component: AddAssignmentComponent },
  { path: 'assignment/:id', component: AssignmentDetailComponent },
  
  { path: 'assignment/:id/edit', component: EditAssignmentComponent }
];