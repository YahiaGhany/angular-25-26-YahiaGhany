import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar';
import { SidenavComponent } from './sidenav/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    ToolbarComponent,
    SidenavComponent,
    MatSidenavModule,
    MatButtonModule
  ]
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/assignments']);
  }
}