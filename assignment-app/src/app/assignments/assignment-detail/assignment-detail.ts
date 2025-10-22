import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

// Corrigé ici :
import { Assignment } from '../../assignement.model';
import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './assignment-detail.html',
  styleUrls: ['./assignment-detail.scss']
})
export class AssignmentDetailComponent {
  @Input() assignmentTransmis?: Assignment;
  @Output() assignmentSupprime = new EventEmitter<Assignment>();

  constructor(private assignmentsService: AssignmentsService) {}

  onCheckboxChange() {
    if (!this.assignmentTransmis) return;
    this.assignmentTransmis.rendu = !this.assignmentTransmis.rendu;
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => console.log(message));
  }

  onAssignmentSupprime() {
    if (!this.assignmentTransmis) return;
    this.assignmentSupprime.emit(this.assignmentTransmis);
  }
}