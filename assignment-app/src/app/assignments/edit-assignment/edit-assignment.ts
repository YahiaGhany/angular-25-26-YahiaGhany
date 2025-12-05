import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../../assignement.model';
import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './edit-assignment.html',
  styleUrls: ['./edit-assignment.scss']
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        if (!assignment) return;
        this.assignment = assignment;
        this.nomAssignment = assignment.nom;
        this.dateDeRendu = new Date(assignment.dateDeRendu);
      });
  }

  onSaveAssignment() {
    if (!this.assignment) return;
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu.toISOString().split('T')[0];

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(() => {
        this.router.navigate(['/assignments']);
      });
  }
}