import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(assignmentNom: string, action: string) {
    console.log(`Log: L'assignment '${assignmentNom}' a été ${action}`);
  }
}