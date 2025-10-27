import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignement.model'; 
import { AssignmentsService } from '../shared/assignments.service';

import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    RouterLink 
  ],
  templateUrl: './assignments.html',
  styleUrl: './assignments.scss'
})
export class AssignmentsComponent implements OnInit {
  titre = "Liste des devoirs";
  assignments: Assignment[] = [];

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

  
}