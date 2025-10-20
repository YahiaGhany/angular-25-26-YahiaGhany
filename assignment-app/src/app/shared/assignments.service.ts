import { Injectable } from '@angular/core';
import { Assignment } from '../assignment.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private assignments: Assignment[] = [
    { id: 1, nom: 'Devoir Angular', dateDeRendu: '2025-10-10', rendu: false },
    { id: 2, nom: 'TP TypeScript', dateDeRendu: '2025-10-12', rendu: true },
    { id: 3, nom: 'Projet M2', dateDeRendu: '2025-01-15', rendu: false }
  ];

  constructor() { }

  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }

  // NOUVELLE MÉTHODE AJOUTÉE
  addAssignment(assignment: Assignment): Observable<string> {
    // On génère un nouvel id (simple pour l'instant)
    assignment.id = this.assignments[this.assignments.length - 1].id + 1;
    
    // On ajoute le devoir au tableau
    this.assignments.push(assignment);

    // On retourne un Observable avec un message de succès
    return of('Assignment ajouté avec succès !');
  }
}