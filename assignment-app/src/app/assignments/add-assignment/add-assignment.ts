import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Assignment } from '../../assignement.model'; 
import { AssignmentsService } from '../../shared/assignments.service'; 
import { Router } from '@angular/router'; 

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
  
  nomDevoir: string = '';
  dateDeRendu!: Date;

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

    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(message => {
        console.log(message);
        
        this.router.navigate(['/assignments']);
      });
  }
}