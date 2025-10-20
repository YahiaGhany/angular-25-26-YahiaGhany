import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
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
    // On charge les données au démarrage
    this.getAssignments();
  }

  // On crée une méthode séparée pour rafraîchir la liste
  getAssignments() {
    this.assignmentsService.getAssignments()
      .subscribe(data => {
        this.assignments = data;
      });
  }

  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }

  // MÉTHODE MISE À JOUR
  onNouvelAssignment(event: Assignment) {
    // On appelle le service pour ajouter le devoir
    this.assignmentsService.addAssignment(event)
      .subscribe(message => {
        console.log(message); // Affiche le message de succès
        this.formVisible = false; // Cache le formulaire
        
        // IMPORTANT : On rafraîchit la liste locale
        // en redemandant les données au service
        this.getAssignments();
      });
  }

  onAssignmentSupprime(assignment: Assignment) {
    // TODO: On devra modifier ça pour appeler le service
    const index = this.assignments.indexOf(assignment);
    if (index > -1) {
      this.assignments.splice(index, 1);
    }
    this.assignmentSelectionne = undefined;
  }
}