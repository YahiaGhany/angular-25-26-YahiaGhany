import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment';
import { LoginComponent } from './login/login';
import { authGuard } from './shared/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'assignments', pathMatch: 'full' },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'ajout-devoir', component: AddAssignmentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'assignment/:id', component: AssignmentDetailComponent },
  
  // C'EST CETTE ROUTE QUI DOIT ÊTRE EXACTE
  { 
    path: 'assignment/:id/edit', 
    component: EditAssignmentComponent,
    canActivate: [authGuard] 
  }
];