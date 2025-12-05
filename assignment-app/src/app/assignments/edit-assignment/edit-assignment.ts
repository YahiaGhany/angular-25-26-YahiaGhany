import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core'; // 1. Nouveaux imports
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    RouterLink
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
    private ngZone: NgZone,        // 2. Injection de NgZone
    private cdr: ChangeDetectorRef // 3. Injection du détecteur
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id)
      .subscribe((assignment) => {
        // 4. LE FIX EST ICI : On force l'exécution dans la zone Angular
        this.ngZone.run(() => {
          if (!assignment) return;
          
          this.assignment = assignment;
          this.nomAssignment = assignment.nom;
          this.dateDeRendu = new Date(assignment.dateDeRendu);
          
          // 5. On ordonne à Angular de mettre à jour l'écran MAINTENANT
          this.cdr.detectChanges(); 
        });
      });
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu.toISOString().split('T')[0];;

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        // Même chose pour la redirection : on s'assure que c'est fluide
        this.ngZone.run(() => {
            this.router.navigate(['/assignments']);
        });
      });
  }
}