import { Injectable } from '@angular/core';
import { Assignment } from '../assignement.model';
import { Observable, of, forkJoin } from 'rxjs'; // 1. Ajout de forkJoin
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { bdInitialAssignments } from './data'; // 2. Import des données

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private uri = 'http://localhost:8010/api/assignments';

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) { }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.uri + '/' + id)
      .pipe(catchError(this.handleError<any>('getAssignment id=' + id)));
  }

  addAssignment(assignment: Assignment): Observable<any> {
    // Si l'id n'est pas défini, on en génère un
    if (!assignment.id) {
        assignment.id = Math.floor(Math.random() * 10000000);
    }
    this.loggingService.log(assignment.nom, 'ajouté');
    return this.http.post<Assignment>(this.uri, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.nom, 'modifié');
    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.nom, 'supprimé');
    return this.http.delete(this.uri + '/' + assignment.id);
  }

  // --- NOUVELLE MÉTHODE ---
  peuplerBD(): Observable<any> {
    let appelsVersAddAssignment: Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = { ...a }; // On copie l'objet
      nouvelAssignment.id = Math.floor(Math.random() * 10000000); // Nouvel ID unique
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });

    return forkJoin(appelsVersAddAssignment); // On attend que tout soit fini
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(operation + ' a échoué ' + error.message);
      return of(result as T);
    }
  }
}