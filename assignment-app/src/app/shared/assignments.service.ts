import { Injectable } from '@angular/core';
import { Assignment } from '../assignement.model'; // Ton nom de fichier
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

  addAssignment(assignment: Assignment): Observable<string> {
    assignment.id = this.assignments[this.assignments.length - 1].id + 1;
    this.assignments.push(assignment);
    return of('Assignment ajouté avec succès !');
  }

  updateAssignment(assignment: Assignment): Observable<string> {
    const index = this.assignments.findIndex(a => a.id === assignment.id);
    if (index > -1) {
      this.assignments[index] = assignment;
    }
    return of('Assignment mis à jour !');
  }

  deleteAssignment(assignment: Assignment): Observable<string> {
    const index = this.assignments.findIndex(a => a.id === assignment.id);
    if (index > -1) {
      this.assignments.splice(index, 1);
    }
    return of('Assignment supprimé');
  }
}