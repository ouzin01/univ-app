import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatDividerModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit {

  showNotifications = false;
  showProfil = false;

  userName = '';
  userEmail = '';
  userRole = '';
  notifCount = 3;

  notifications = [
    { icon: 'campaign', message: 'Nouvelle circulaire publiée', time: 'Il y a 5 min' },
    { icon: 'description', message: 'Compte rendu disponible', time: 'Il y a 1h' },
    { icon: 'mail', message: 'Nouveau courrier arrivé', time: 'Il y a 2h' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.fullName;
      this.userEmail = user.username + '@univapp.sn';
      this.userRole = user.role;
    }
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showProfil = false;
  }

  toggleProfil(): void {
    this.showProfil = !this.showProfil;
    this.showNotifications = false;
  }

  logout(): void {
    this.authService.logout();
  }
}