import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { ApiService } from '../../../services/api';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboardComponent implements OnInit {

  currentUser: any;
  stats = {
    etudiants: 0,
    formations: 0,
    courriers: 0,
    compteRendus: 0
  };

  menuItems = [
    { icon: 'dashboard', label: 'Tableau de bord', route: '/admin' },
    { icon: 'people', label: 'Etudiants', route: '/etudiants' },
    { icon: 'school', label: 'Formations', route: '/formations' },
    { icon: 'campaign', label: 'Communication', route: '/communication' },
    { icon: 'admin_panel_settings', label: 'Administration', route: '/administration' },
  ];

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadStats();
  }

  loadStats(): void {
    this.apiService.get<any[]>('/api/etudiants').subscribe({
      next: (data) => this.stats.etudiants = data.length,
      error: () => {}
    });
    this.apiService.get<any[]>('/api/formations').subscribe({
      next: (data) => this.stats.formations = data.length,
      error: () => {}
    });
    this.apiService.get<any[]>('/api/administration/courriers').subscribe({
      next: (data) => this.stats.courriers = data.length,
      error: () => {}
    });
    this.apiService.get<any[]>('/api/communication/comptes-rendus').subscribe({
      next: (data) => this.stats.compteRendus = data.length,
      error: () => {}
    });
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
  }
}