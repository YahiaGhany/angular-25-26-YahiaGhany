// 1. On importe OnInit, notre modèle et notre service
import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

// Imports inchangés
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
// 2. On implémente OnInit
export class AssignmentsComponent implements OnInit {
  titre = "Liste des devoirs";
  formVisible = false;

  // 3. On SUPPRIME le tableau de données d'ici.
  // On le remplace par un tableau vide qui sera rempli.
  assignments: Assignment[] = [];

  // 4. On met à jour les types pour utiliser notre modèle
  assignmentSelectionne?: Assignment;

  // 5. On injecte le service dans le constructeur
  constructor(private assignmentsService: AssignmentsService) {}

  // 6. ngOnInit est appelée une fois au chargement du composant
  ngOnInit(): void {
    // On appelle le service pour récupérer les données
    this.assignmentsService.getAssignments()
      .subscribe(data => {
        // 'data' contient le tableau renvoyé par le service
        this.assignments = data;
      });
  }

  // 7. On met à jour le type de la méthode
  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }

  // --- Les méthodes suivantes restent inchangées pour l'instant ---
  // (Elles modifient le tableau local, mais pas encore le service)

  onNouvelAssignment(event: any) {
    // TODO: On devra modifier ça pour appeler le service
    this.assignments.push(event);
    this.formVisible = false;
  }

  onAssignmentSupprime(assignment: Assignment) {
    // TODO: On devra modifier ça pour appeler le service
    const index = this.assignments.indexOf(assignment);
    if (index > -1) {
      this.assignments.splice(index, 1);
    }
    this.assignmentSelectionne = undefined; // ou null
  }
}