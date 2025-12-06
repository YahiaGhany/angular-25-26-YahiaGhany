import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// 1. Import du SnackBar pour les messages d'erreur
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 

import { Assignment } from '../../assignement.model';
import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    MatSnackBarModule // 2. Ajout du module ici
  ],
  templateUrl: './edit-assignment.html',
  styleUrls: ['./edit-assignment.scss']
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar // 3. Injection du service SnackBar
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id)
      .subscribe((assignment) => {
        this.ngZone.run(() => {
          if (!assignment) return;
          
          this.assignment = assignment;
          this.nomAssignment = assignment.nom;
          this.dateDeRendu = new Date(assignment.dateDeRendu);
          
          this.cdr.detectChanges(); 
        });
      });
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    // --- 4. VÉRIFICATION DE LA DATE ---
    const today = new Date();
    today.setHours(0, 0, 0, 0); // On ignore l'heure pour comparer les jours

    if (this.dateDeRendu < today) {
      this.snackBar.open("Impossible : La nouvelle date ne peut pas être dans le passé !", "OK", {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return; // On arrête tout, on n'envoie pas la modif
    }
    // ----------------------------------

    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu.toISOString().split('T')[0];;

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        
        this.ngZone.run(() => {
            this.router.navigate(['/assignments']);
        });
      });
  }
}