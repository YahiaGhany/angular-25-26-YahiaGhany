import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignement.model'; // Ton nom de fichier
import { AssignmentsService } from '../shared/assignments.service';

import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail';
// On SUPPRIME l'import de AddAssignmentComponent

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    AssignmentDetailComponent
    // On le SUPPRIME des imports
  ],
  templateUrl: './assignments.html',
  styleUrl: './assignments.scss'
})
export class AssignmentsComponent implements OnInit {
  titre = "Liste des devoirs";
  // On SUPPRIME formVisible
  assignments: Assignment[] = [];
  assignmentSelectionne?: Assignment;

  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentsService.getAssignments()
      .subscribe(data => {
        this.assignments = data;
      });
  }

  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }

  // On SUPPRIME toute la méthode onNouvelAssignment()

  onAssignmentSupprime(event: Assignment) {
    this.assignmentSelectionne = undefined;
    this.getAssignments();
  }
}