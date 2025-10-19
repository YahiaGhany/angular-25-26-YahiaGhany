import { Injectable } from '@angular/core';
import { Assignment } from '../assignment.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  // 1. On déplace le tableau de données ici
  private assignments: Assignment[] = [
    { id: 1, nom: 'Devoir Angular', dateDeRendu: '2025-10-10', rendu: false },
    { id: 2, nom: 'TP TypeScript', dateDeRendu: '2025-10-12', rendu: true },
    { id: 3, nom: 'Projet M2', dateDeRendu: '2025-01-15', rendu: false }
  ];

  constructor() { }

  // 2. On crée la méthode pour récupérer les devoirs.
  // Elle retourne un "Observable" qui contient un tableau de devoirs.
  getAssignments(): Observable<Assignment[]> {
    // 'of()' est une fonction de RxJS qui retourne un Observable
    // qui émet une seule valeur (notre tableau) et se complète.
    return of(this.assignments);
  }
}