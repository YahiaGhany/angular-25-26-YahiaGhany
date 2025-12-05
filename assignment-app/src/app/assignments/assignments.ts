import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Ajout de ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
import { Assignment } from '../assignement.model';
import { AssignmentsService } from '../shared/assignments.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './assignments.html',
  styleUrls: ['./assignments.scss']
})
export class AssignmentsComponent implements OnInit {
  titre = "Liste des devoirs";
  assignments: Assignment[] = [];
  
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;

  searchTerm: string = '';
  filterRendu: string = 'tous'; 

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef // 2. Injection du détecteur de changement
  ) {}

  ngOnInit(): void {
    // 3. On charge les données IMMÉDIATEMENT sans attendre l'URL
    this.getAssignments();

    // 4. On écoute aussi les changements d'URL pour la suite
    this.route.queryParams.subscribe(queryParams => {
      this.page = +queryParams['page'] || 1;
      this.limit = +queryParams['limit'] || 10;
      this.getAssignments();
    });
  }

  getAssignments() {
    let renduBool: boolean | undefined = undefined;
    if (this.filterRendu === 'rendu') renduBool = true;
    if (this.filterRendu === 'non-rendu') renduBool = false;

    this.assignmentsService.getAssignments(this.page, this.limit, renduBool, this.searchTerm)
      .subscribe({
        next: (data) => {
          // On remplit les données
          this.assignments = data.docs;
          this.page = data.page;
          this.limit = data.limit;
          this.totalDocs = data.totalDocs;
          this.totalPages = data.totalPages;
          this.hasPrevPage = data.hasPrevPage;
          this.prevPage = data.prevPage;
          this.hasNextPage = data.hasNextPage;
          this.nextPage = data.nextPage;

          // 5. COMMANDE MAGIQUE : On force Angular à mettre à jour la vue MAINTENANT
          this.cdr.detectChanges(); 
          
          console.log("Données chargées et vue mise à jour :", this.assignments.length);
        },
        error: (err) => {
          console.error("Erreur lors du chargement des devoirs :", err);
        }
      });
  }

  onFilterChange() {
    this.page = 1; 
    this.getAssignments();
  }

  pagePrecedente() {
    this.router.navigate(['/assignments'], { queryParams: { page: this.prevPage, limit: this.limit } });
  }

  pageSuivante() {
    this.router.navigate(['/assignments'], { queryParams: { page: this.nextPage, limit: this.limit } });
  }
  
  dernierePage() {
    this.router.navigate(['/assignments'], { queryParams: { page: this.totalPages, limit: this.limit } });
  }

  premierePage() {
    this.router.navigate(['/assignments'], { queryParams: { page: 1, limit: this.limit } });
  }
}