import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './assignment-detail.html',
  styleUrls: ['./assignment-detail.scss']
})
export class AssignmentDetailComponent {
  @Input() assignmentTransmis: any;
  @Output() assignmentSupprime = new EventEmitter<any>();

  onAssignmentSupprime() {
    this.assignmentSupprime.emit(this.assignmentTransmis);
  }
}