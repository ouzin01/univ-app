import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { ApiService } from '../../../services/api';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-formateur-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule
  ],
  templateUrl: './formateur-dashboard.html',
  styleUrl: './formateur-dashboard.scss'
})
export class FormateurDashboardComponent implements OnInit {

  currentUser: any;
  formations: any[] = [];
  emplois: any[] = [];
  displayedColumns = ['matiere', 'dateCours', 'heureDebut', 'heureFin', 'salle'];

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadData();
  }

  loadData(): void {
    this.apiService.get<any[]>('/api/formations').subscribe({
      next: (data) => this.formations = data.slice(0, 5),
      error: () => {}
    });
    this.apiService.get<any[]>('/api/formations/emplois-du-temps').subscribe({
      next: (data) => this.emplois = data.slice(0, 5),
      error: () => {}
    });
  }

  logout(): void {
    this.authService.logout();
  }
}