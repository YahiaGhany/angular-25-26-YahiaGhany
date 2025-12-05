import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core'; // 🛑 Ajout de NgZone et ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Assignment } from '../../assignement.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule,
    MatIconModule, MatProgressSpinnerModule, RouterLink
  ],
  templateUrl: './assignment-detail.html',
  styleUrls: ['./assignment-detail.scss']
})
export class AssignmentDetailComponent implements OnInit { 
  assignmentTransmis?: Assignment;
  loading: boolean = true;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone, // 🛑 Injection de NgZone
    private cdr: ChangeDetectorRef // 🛑 Injection de ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    this.loading = true;
    const id = +this.route.snapshot.params['id'];

    if (isNaN(id) || !id) {
        console.error("ID Invalide");
        this.loading = false;
        return;
    }

    this.assignmentsService.getAssignment(id)
      .subscribe({
        next: (assignment) => {
          // FIX DÉFINITIF : Forcer la mise à jour dans la Zone Angular
          this.ngZone.run(() => {
             this.assignmentTransmis = assignment;
             this.loading = false;
             this.cdr.detectChanges(); // 🛑 Forcer le rafraîchissement
          });
        },
        error: (err) => {
          console.error("Erreur API :", err);
          this.ngZone.run(() => {
             this.loading = false;
             this.cdr.detectChanges(); // Arrêter la roue
          });
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