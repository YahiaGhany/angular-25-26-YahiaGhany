import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar';
import { SidenavComponent } from './sidenav/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [
    RouterOutlet,
    ToolbarComponent,
    SidenavComponent,
    MatSidenavModule,
    MatSlideToggleModule,
    FormsModule
  ]
})
export class AppComponent {
  isAdmin = false;

  constructor(private authService: AuthService) {}

  onAdminToggle() {
    if (this.isAdmin) {
      this.authService.login();
    } else {
      this.authService.logout();
    }
  }
}