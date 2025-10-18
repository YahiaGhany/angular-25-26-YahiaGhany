import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';

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
export class SidenavComponent {}