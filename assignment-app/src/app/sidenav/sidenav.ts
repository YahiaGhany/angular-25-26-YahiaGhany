import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, RouterLink],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss']
})
export class SidenavComponent {
  
  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private router: Router
  ) {}

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onClickPeuplerBD() {
    this.assignmentsService.peuplerBD()
      .subscribe(
        () => {
          console.log("Peuplement terminé.");
          // CORRECTION RADICALE : On force le navigateur à aller sur /assignments
          // Cela recharge toute l'application proprement, sans "flicker" bizarre.
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