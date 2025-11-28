import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
// 1. On importe le service
import { AssignmentsService } from '../shared/assignments.service';

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
  
  // 2. On injecte le service et le router
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router
  ) {}

  // 3. La méthode appelée par ton (click) dans le HTML
  onClickPeuplerBD() {
    // On appelle la méthode du service
    this.assignmentsService.peuplerBD()
      .subscribe(() => {
        console.log("La base est peuplée !");
        
        // 4. On navigue vers l'accueil ET on recharge la page pour voir les données
        this.router.navigate(['/assignments']);
        window.location.reload();
      });
  }
}