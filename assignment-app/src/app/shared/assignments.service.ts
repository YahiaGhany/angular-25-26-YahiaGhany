import { Injectable } from '@angular/core';
import { Assignment } from '../assignement.model';
import { Observable, of, forkJoin } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  // Assurez-vous que l'URL est correcte (localhost pour le développement)
  private uri = 'http://localhost:8010/api/assignments';

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) { }

  // CORRECTION : La méthode accepte maintenant 4 arguments
  getAssignments(page: number, limit: number, rendu?: boolean, search?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    // Ajout du filtre "rendu" s'il est défini
    if (rendu !== undefined) {
      params = params.set('rendu', rendu);
    }

    // Ajout du filtre "recherche" s'il est défini
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any>(this.uri, { params });
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.uri + '/' + id)
      .pipe(catchError(this.handleError<any>('getAssignment id=' + id)));
  }

  addAssignment(assignment: Assignment): Observable<any> {
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

  peuplerBD(): Observable<any> {
    let appelsVersAddAssignment: Observable<any>[] = [];
    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = { ...a };
      nouvelAssignment.id = Math.floor(Math.random() * 10000000);
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}