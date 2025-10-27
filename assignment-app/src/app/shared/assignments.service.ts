import { Injectable } from '@angular/core';
import { Assignment } from '../assignement.model'; 
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private assignments: Assignment[] = [
    { id: 1, nom: 'Devoir Angular', dateDeRendu: '2025-10-10', rendu: false },
    { id: 2, nom: 'TP TypeScript', dateDeRendu: '2025-10-12', rendu: true },
    { id: 3, nom: 'Projet M2', dateDeRendu: '2025-01-15', rendu: false }
  ];

  constructor(private loggingService: LoggingService) { }

  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    const assignment = this.assignments.find(a => a.id === id);
    return of(assignment);
  }

  addAssignment(assignment: Assignment): Observable<string> {
    assignment.id = Math.floor(Math.random() * 10000);

    this.assignments.push(assignment);
    this.loggingService.log(assignment.nom, 'ajouté');
    return of('Assignment ajouté avec succès !');
  }

  updateAssignment(assignment: Assignment): Observable<string> {
    const index = this.assignments.findIndex(a => a.id === assignment.id);
    if (index > -1) {
      this.assignments[index] = assignment;
    }
    this.loggingService.log(assignment.nom, 'mis à jour');
    return of('Assignment mis à jour !');
  }

  deleteAssignment(assignment: Assignment): Observable<string> {
    const index = this.assignments.findIndex(a => a.id === assignment.id);
    if (index > -1) {
      this.assignments.splice(index, 1);
    }
    this.loggingService.log(assignment.nom, 'supprimé');
    return of('Assignment supprimé');
  }
}