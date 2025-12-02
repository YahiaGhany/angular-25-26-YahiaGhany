import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // <-- NOUVEL IMPORT
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Assignment } from '../../assignement.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule, // <-- NOUVEL IMPORT
    RouterLink
  ],
  templateUrl: './assignment-detail.html',
  styleUrls: ['./assignment-detail.scss']
})
export class AssignmentDetailComponent implements OnInit { 
  assignmentTransmis?: Assignment;
  loading: boolean = true; // <-- NOUVELLE PROPRIÉTÉ

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    this.loading = true; // Début du chargement
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
        this.loading = false; // Fin du chargement
      });
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
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