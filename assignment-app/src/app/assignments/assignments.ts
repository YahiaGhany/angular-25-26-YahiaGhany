import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignement.model'; // Ton nom de fichier
import { AssignmentsService } from '../shared/assignments.service';

import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
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
export class AssignmentsComponent implements OnInit {
  titre = "Liste des devoirs";
  formVisible = false;
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

  onNouvelAssignment(event: Assignment) {
    this.assignmentsService.addAssignment(event)
      .subscribe(message => {
        console.log(message);
        this.formVisible = false;
        this.getAssignments();
      });
  }

  onAssignmentSupprime(event: Assignment) {
    // Le service a déjà supprimé le devoir.
    // On met juste l'affichage à jour.

    // 1. On cache la carte de détail (pour corriger le bug)
    this.assignmentSelectionne = undefined;

    // 2. On rafraîchit la liste
    this.getAssignments();
  }
}