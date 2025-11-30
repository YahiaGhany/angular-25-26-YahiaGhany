import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AssignmentsService } from '../shared/assignments.service';
// 1. On importe AuthService
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatListModule,
    RouterLink
  ],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss']
})
export class SidenavComponent {
  
  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService, // 2. On l'injecte
    private router: Router
  ) {}

  // 3. On crée des getters pour le HTML
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onClickPeuplerBD() {
    this.assignmentsService.peuplerBD()
      .subscribe(() => {
        console.log("La base est peuplée !");
        this.router.navigate(['/assignments']);
        window.location.reload();
      });
  }
}