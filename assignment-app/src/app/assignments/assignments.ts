import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
import { Assignment } from '../assignement.model';
import { AssignmentsService } from '../shared/assignments.service';

// Imports Material & Formulaires
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

// Imports pour la recherche fluide
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
    MatProgressSpinnerModule,
    FormsModule
  ],
  templateUrl: './assignments.html',
  styleUrls: ['./assignments.scss']
})
export class AssignmentsComponent implements OnInit {
  titre = "Liste des devoirs";
  assignments: Assignment[] = [];
  
  // ✅ C'est cette variable qui manquait et causait l'erreur !
  isLoading = true;

  // Pagination
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;

  // Filtres
  searchTerm: string = '';
  filterRendu: string = 'tous'; 
  searchSubject = new Subject<string>();

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // On écoute les changements d'URL pour charger les données
    this.route.queryParams.subscribe(queryParams => {
      this.page = +queryParams['page'] || 1;
      this.limit = +queryParams['limit'] || 10;
      
      // Récupération de la recherche si présente dans l'URL
      if (queryParams['search']) {
        this.searchTerm = queryParams['search'];
      }
      
      this.getAssignments();
    });

    // Configuration de la recherche fluide
    this.searchSubject.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(value => {
        this.router.navigate(['/assignments'], { 
          queryParams: { page: 1, limit: this.limit, search: value },
          queryParamsHandling: 'merge'
        });
      });
  }

  onSearchType(value: string) {
    this.searchSubject.next(value);
  }

  getAssignments() {
    this.isLoading = true; // On active le chargement
    
    let renduBool: boolean | undefined = undefined;
    if (this.filterRendu === 'rendu') renduBool = true;
    if (this.filterRendu === 'non-rendu') renduBool = false;

    this.assignmentsService.getAssignments(this.page, this.limit, renduBool, this.searchTerm)
      .subscribe({
        next: (data) => {
          this.ngZone.run(() => {
            this.assignments = data.docs;
            this.page = data.page;
            this.limit = data.limit;
            this.totalDocs = data.totalDocs;
            this.totalPages = data.totalPages;
            this.hasPrevPage = data.hasPrevPage;
            this.prevPage = data.prevPage;
            this.hasNextPage = data.hasNextPage;
            this.nextPage = data.nextPage;
            
            this.isLoading = false; // On désactive le chargement
            this.cdr.detectChanges();
          });
        },
        error: (err) => {
          this.isLoading = false;
          console.error("Erreur:", err);
        }
      });
  }

  onFilterChange() {
    this.router.navigate(['/assignments'], { 
      queryParams: { page: 1, limit: this.limit, t: new Date().getTime() },
      queryParamsHandling: 'merge'
    });
  }

  pagePrecedente() { this.router.navigate(['/assignments'], { queryParams: { page: this.prevPage, limit: this.limit }, queryParamsHandling: 'merge' }); }
  pageSuivante() { this.router.navigate(['/assignments'], { queryParams: { page: this.nextPage, limit: this.limit }, queryParamsHandling: 'merge' }); }
  dernierePage() { this.router.navigate(['/assignments'], { queryParams: { page: this.totalPages, limit: this.limit }, queryParamsHandling: 'merge' }); }
  premierePage() { this.router.navigate(['/assignments'], { queryParams: { page: 1, limit: this.limit }, queryParamsHandling: 'merge' }); }
}