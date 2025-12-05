import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// ⚠️ IMPORT CRUCIAL : RouterLink doit être là
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
    MatIconModule, 
    MatProgressSpinnerModule, 
    RouterLink // ⚠️ IL DOIT ÊTRE ICI POUR QUE LE BOUTON MARCHE
  ],
  templateUrl: './assignment-detail.html',
  styleUrls: ['./assignment-detail.scss']
})
export class AssignmentDetailComponent implements OnInit { 
  assignmentTransmis?: Assignment;
  loading = true;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    this.loading = true;
    const id = +this.route.snapshot.params['id'];

    if (!id) {
        console.error("ID Invalide");
        this.loading = false;
        return;
    }

    this.assignmentsService.getAssignment(id)
      .subscribe({
        next: (assignment) => {
          // On force la mise à jour pour éviter les bugs d'affichage
          this.ngZone.run(() => {
             this.assignmentTransmis = assignment;
             this.loading = false;
             this.cdr.detectChanges();
          });
        },
        error: (err) => {
          console.error("Erreur :", err);
          this.loading = false;
        }
      });
  }

  get isAdmin(): boolean { return this.authService.isAdmin(); }

  onCheckboxChange() {
    if (!this.assignmentTransmis) return;
    this.assignmentTransmis.rendu = !this.assignmentTransmis.rendu;

    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(() => { this.router.navigate(['/assignments']); });
  }

  onAssignmentSupprime() {
    if (!this.assignmentTransmis) return;

    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(() => { 
        this.router.navigate(['/assignments']); 
      });
  }
}