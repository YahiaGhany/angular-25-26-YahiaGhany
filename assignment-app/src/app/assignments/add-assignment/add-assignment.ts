import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Corrigé ici :
import { Assignment } from '../../assignement.model';

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
  @Output() nouvelAssignment = new EventEmitter<Assignment>();

  nomDevoir: string = '';
  dateDeRendu!: Date;

  constructor() {}

  onSubmit() {
    if (!this.nomDevoir || !this.dateDeRendu) return;

    const newAssignment: Assignment = {
      id: 0,
      nom: this.nomDevoir,
      dateDeRendu: this.dateDeRendu.toISOString().split('T')[0],
      rendu: false
    };

    this.nouvelAssignment.emit(newAssignment);
    this.nomDevoir = '';
  }
}