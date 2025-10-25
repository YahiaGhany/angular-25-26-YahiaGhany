import { Component } from '@angular/core'; // On enlève EventEmitter et Output
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Assignment } from '../../assignement.model'; // Ton nom de fichier
import { AssignmentsService } from '../../shared/assignments.service'; // 1. On importe le service
import { Router } from '@angular/router'; // 2. On importe le routeur

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
    MatNativeDateModule
  ],
  templateUrl: './add-assignment.html',
  styleUrls: ['./add-assignment.scss']
})
export class AddAssignmentComponent {
  // 3. On SUPPRIME le @Output()
  // @Output() nouvelAssignment = new EventEmitter<Assignment>();

  nomDevoir: string = '';
  dateDeRendu!: Date;

  // 4. On injecte le service et le routeur
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.nomDevoir || !this.dateDeRendu) return;

    const newAssignment: Assignment = {
      id: 0, 
      nom: this.nomDevoir,
      dateDeRendu: this.dateDeRendu.toISOString().split('T')[0],
      rendu: false
    };

    // 5. On appelle le service directement
    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(message => {
        console.log(message);
        
        // 6. On navigue vers la page d'accueil
        this.router.navigate(['/assignments']);
      });
  }
}