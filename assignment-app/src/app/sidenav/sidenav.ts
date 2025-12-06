import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // 1. Import SnackBar
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, RouterLink, MatSnackBarModule], // 2. Ajout du module ici
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss']
})
export class SidenavComponent {
  
  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // 3. Injection
  ) {}

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // --- NOUVELLES MÉTHODES POUR LES MESSAGES ---

  onClickEdit() {
    // 1. On va sur la liste
    this.router.navigate(['/assignments']);
    // 2. On affiche le message
    this.snackBar.open("Cliquez sur un devoir de la liste pour le modifier", "COMPRIS", {
      duration: 5000, // Reste affiché 5 secondes
      panelClass: ['snackbar-info'] // (Optionnel pour le style)
    });
  }

  onClickDelete() {
    this.router.navigate(['/assignments']);
    this.snackBar.open("Cliquez sur un devoir de la liste pour le supprimer", "COMPRIS", {
      duration: 5000
    });
  }

  onClickPeuplerBD() {
    this.assignmentsService.peuplerBD()
      .subscribe(
        () => {
          console.log("Peuplement terminé.");
          window.location.assign('/assignments');
        },
        (error) => {
          console.error("Erreur lors du peuplement:", error);
        }
      );
  }

  onLogout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}