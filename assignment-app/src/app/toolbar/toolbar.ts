import { Component, Output, EventEmitter } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.scss'],
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink]
})
export class ToolbarComponent {
  @Output() menuToggle = new EventEmitter<void>();

  onMenuClick() {
    this.menuToggle.emit();
  }
}