import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'; // ✅ Ajout pour l'icône utilisateur
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common'; // ✅ Ajout de CommonModule (pour le pipe TitleCase si besoin)

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, RouterLink, MatSnackBarModule, MatIconModule, CommonModule],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss']
})
export class SidenavComponent {
  
  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // ✅ NOUVEAU GETTER
  get currentUser() {
    return this.authService.getUser();
  }

  onClickEdit() {
    this.router.navigate(['/assignments']);
    this.snackBar.open("Cliquez sur un devoir de la liste pour le modifier", "COMPRIS", {
      duration: 5000,
      panelClass: ['snackbar-info']
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