import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { Assignment } from '../../assignement.model'; 
import { AssignmentsService } from '../../shared/assignments.service';

import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterLink 
  ],
  templateUrl: './assignment-detail.html',
  styleUrls: ['./assignment-detail.scss']
})
export class AssignmentDetailComponent implements OnInit { 
  assignmentTransmis?: Assignment;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
      });
  }

  onCheckboxChange() {
    if (!this.assignmentTransmis) return;
    this.assignmentTransmis.rendu = !this.assignmentTransmis.rendu;

    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/assignments']);
      });
  }

  onAssignmentSupprime() {
    if (!this.assignmentTransmis) return;

    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/assignments']);
      });
  }
}