import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar';
import { SidenavComponent } from './sidenav/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
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