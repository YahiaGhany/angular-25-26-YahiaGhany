import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
// 1. Import du SnackBar
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Assignment } from '../../assignement.model';
import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    RouterLink,
    MatSnackBarModule // 2. Ajout ici
  ],
  templateUrl: './add-assignment.html',
  styleUrls: ['./add-assignment.scss']
})
export class AddAssignmentComponent {
  nomDevoir: string = '';
  dateDeRendu!: Date;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private snackBar: MatSnackBar // 3. Injection
  ) {}

  onSubmit() {
    if (!this.nomDevoir || !this.dateDeRendu) return;

    // --- LOGIQUE DE VÉRIFICATION DE DATE ---
    const today = new Date();
    // On met les heures à 00:00:00 pour comparer uniquement les jours
    today.setHours(0, 0, 0, 0);

    // Si la date choisie est AVANT aujourd'hui
    if (this.dateDeRendu < today) {
      this.snackBar.open("Impossible : La date de rendu ne peut pas être dans le passé !", "OK", {
        duration: 3000,
        panelClass: ['snackbar-error'] // Tu peux styliser ça en rouge si tu veux
      });
      return; // ON ARRÊTE TOUT, on n'envoie pas au serveur
    }
    // ---------------------------------------

    const newAssignment: Assignment = {
      id: 0, 
      nom: this.nomDevoir,
      dateDeRendu: this.dateDeRendu.toISOString().split('T')[0],
      rendu: false
    };

    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/assignments']);
      });
  }
}