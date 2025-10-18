import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Correction des chemins d'import
import { ToolbarComponent } from './toolbar/toolbar';
import { SidenavComponent } from './sidenav/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  // Correction des chemins vers les fichiers
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [
    RouterOutlet,
    ToolbarComponent,
    SidenavComponent,
    MatSidenavModule
  ]
})
export class AppComponent {}