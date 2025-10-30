import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatNativeDateModule
  ],
  templateUrl: './edit-assignment.html',
  styles: `
    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 400px;
      margin: 24px;
    }
  `
})
export class EditAssignmentComponent implements OnInit {
  assignment?: Assignment;
  nomDevoir: string = '';
  dateDeRendu?: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentsService: AssignmentsService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id).subscribe(a => {
      if (!a) return;
      this.assignment = a;
      this.nomDevoir = a.nom;
      this.dateDeRendu = new Date(a.dateDeRendu);
    });
  }

  onSave() {
    if (!this.assignment || !this.nomDevoir || !this.dateDeRendu) return;

    this.assignment.nom = this.nomDevoir;
    this.assignment.dateDeRendu = this.dateDeRendu.toISOString().split('T')[0];

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/assignments']);
      });
  }
}