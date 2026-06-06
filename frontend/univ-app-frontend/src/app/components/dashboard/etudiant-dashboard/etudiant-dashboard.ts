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

@Component({
  selector: 'app-etudiant-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule
  ],
  templateUrl: './etudiant-dashboard.html',
  styleUrl: './etudiant-dashboard.scss'
})
export class EtudiantDashboardComponent implements OnInit {

  currentUser: any;
  circulaires: any[] = [];
  comptesRendus: any[] = [];

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
    this.apiService.get<any[]>('/api/communication/circulaires').subscribe({
      next: (data) => this.circulaires = data.slice(0, 5),
      error: () => {}
    });
    this.apiService.get<any[]>('/api/communication/comptes-rendus/publies').subscribe({
      next: (data) => this.comptesRendus = data.slice(0, 5),
      error: () => {}
    });
  }

  logout(): void {
    this.authService.logout();
  }
}