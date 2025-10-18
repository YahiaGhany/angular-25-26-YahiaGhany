import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
// Correction des chemins d'import
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail';
import { AddAssignmentComponent } from './add-assignment/add-assignment';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    AssignmentDetailComponent,
    AddAssignmentComponent
  ],
  templateUrl: './assignments.html',
  styleUrl: './assignments.scss'
})
export class AssignmentsComponent {
  titre = "Liste des devoirs";
  formVisible = false;

  assignments = [
    { nom: 'Devoir Angular', dateDeRendu: '2025-10-10', rendu: false },
    { nom: 'TP TypeScript', dateDeRendu: '2025-10-12', rendu: true },
    { nom: 'Projet M2', dateDeRendu: '2025-01-15', rendu: false }
  ];

  assignmentSelectionne: any;

  assignmentClique(assignment: any) {
    this.assignmentSelectionne = assignment;
  }

  onNouvelAssignment(event: any) {
    this.assignments.push(event);
    this.formVisible = false;
  }

  onAssignmentSupprime(assignment: any) {
    const index = this.assignments.indexOf(assignment);
    if (index > -1) {
      this.assignments.splice(index, 1);
    }
    this.assignmentSelectionne = null;
  }
}