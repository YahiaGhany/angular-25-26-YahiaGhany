import { Component, OnInit } from '@angular/core';
// Corrigé ici :
import { Assignment } from '../assignement.model';
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

  onAssignmentSupprime(assignment: Assignment) {
    // TODO
    const index = this.assignments.indexOf(assignment);
    if (index > -1) {
      this.assignments.splice(index, 1);
    }
    this.assignmentSelectionne = undefined;
  }
}