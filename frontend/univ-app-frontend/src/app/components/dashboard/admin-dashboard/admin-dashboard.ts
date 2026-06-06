import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { ApiService } from '../../../services/api';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Chart, registerables } from 'chart.js';
import { NavbarComponent } from '../../layout/navbar/navbar';

Chart.register(...registerables);

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
    NavbarComponent
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('barChart') barChartRef!: ElementRef;
  @ViewChild('pieChart') pieChartRef!: ElementRef;

  currentUser: any;

  stats = [
    { label: 'Étudiants', value: 0, icon: 'people', color: 'blue' },
    { label: 'Formations', value: 0, icon: 'school', color: 'green' },
    { label: 'Courriers', value: 0, icon: 'mail', color: 'orange' },
    { label: 'Comptes Rendus', value: 0, icon: 'campaign', color: 'purple' }
  ];

  menuItems = [
    { icon: 'dashboard', label: 'Tableau de bord', route: '/admin' },
    { icon: 'people', label: 'Étudiants', route: '/etudiants' },
    { icon: 'school', label: 'Formations', route: '/formations' },
    { icon: 'campaign', label: 'Communication', route: '/communication' },
    { icon: 'admin_panel_settings', label: 'Administration', route: '/administration' }
  ];

  quickAccess = [
    { icon: 'person_add', label: 'Nouvel étudiant', route: '/etudiants/nouveau' },
    { icon: 'add_circle', label: 'Nouvelle formation', route: '/formations/nouvelle' },
    { icon: 'mail', label: 'Courriers', route: '/administration' },
    { icon: 'campaign', label: 'Communication', route: '/communication' }
  ];

  activites = [
    { icon: 'person_add', message: 'Nouvel étudiant inscrit', time: 'Il y a 5 min', type: 'success' },
    { icon: 'school', message: 'Formation mise à jour', time: 'Il y a 30 min', type: 'info' },
    { icon: 'mail', message: 'Nouveau courrier arrivé', time: 'Il y a 1h', type: 'warning' },
    { icon: 'campaign', message: 'Circulaire publiée', time: 'Il y a 2h', type: 'success' }
  ];

  alertes = [
    { icon: 'warning', message: 'Documents en attente de validation', date: 'Aujourd\'hui', niveau: 'warning' },
    { icon: 'info', message: 'Réunion pédagogique prévue demain', date: 'Demain', niveau: 'info' },
    { icon: 'error', message: 'Échéance budget fin du mois', date: '30 Juin', niveau: 'danger' }
  ];

  // Calendrier
  joursHeader = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  jours: any[] = [];
  moisAffiche = '';
  jourSelectionne: any = null;
  currentDate = new Date();

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadStats();
    this.genererCalendrier();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initCharts();
    }, 500);
  }

  loadStats(): void {
    this.apiService.get<any[]>('/api/etudiants').subscribe({
      next: (data) => this.stats[0].value = data.length,
      error: () => {}
    });
    this.apiService.get<any[]>('/api/formations').subscribe({
      next: (data) => this.stats[1].value = data.length,
      error: () => {}
    });
    this.apiService.get<any[]>('/api/administration/courriers').subscribe({
      next: (data) => this.stats[2].value = data.length,
      error: () => {}
    });
    this.apiService.get<any[]>('/api/communication/comptes-rendus').subscribe({
      next: (data) => this.stats[3].value = data.length,
      error: () => {}
    });
  }

  initCharts(): void {
    if (this.barChartRef) {
      new Chart(this.barChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Informatique', 'Gestion', 'Droit', 'Sciences', 'Lettres'],
          datasets: [{
            label: 'Étudiants',
            data: [65, 45, 30, 25, 20],
            backgroundColor: ['#006064', '#00838f', '#e65100', '#1a237e', '#2e7d32']
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } }
        }
      });
    }

    if (this.pieChartRef) {
      new Chart(this.pieChartRef.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['Auto-emploi', 'Emploi salarié', 'En cours'],
          datasets: [{
            data: [35, 50, 15],
            backgroundColor: ['#006064', '#e65100', '#00838f']
          }]
        },
        options: { responsive: true }
      });
    }
  }

  genererCalendrier(): void {
    const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    this.moisAffiche = mois[this.currentDate.getMonth()] + ' ' + this.currentDate.getFullYear();

    const today = new Date();
    const premier = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const dernier = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    let jourSemaine = premier.getDay();
    jourSemaine = jourSemaine === 0 ? 6 : jourSemaine - 1;

    this.jours = [];
    for (let i = 0; i < jourSemaine; i++) {
      this.jours.push({ actif: false, evenements: [] });
    }

    for (let d = 1; d <= dernier.getDate(); d++) {
      const estAujourdhui = d === today.getDate() &&
        this.currentDate.getMonth() === today.getMonth() &&
        this.currentDate.getFullYear() === today.getFullYear();

      const evenements = this.getEvenementsDuJour(d);
      this.jours.push({ actif: true, num: d, estAujourdhui, selectionne: false, evenements });
    }
  }

  getEvenementsDuJour(jour: number): any[] {
    const evts: any[] = [];
    if (jour === 10) evts.push({ titre: 'Réunion pédagogique', heure: '09:00', lieu: 'Salle A', type: 'reunion' });
    if (jour === 15) evts.push({ titre: 'Conseil université', heure: '14:00', lieu: 'Amphithéâtre', type: 'conseil' });
    if (jour === 20) evts.push({ titre: 'Soutenance Master', heure: '10:00', lieu: 'Salle B', type: 'soutenance' });
    return evts;
  }

  selectionnerJour(jour: any): void {
    if (!jour.actif) return;
    this.jours.forEach(j => j.selectionne = false);
    jour.selectionne = true;
    this.jourSelectionne = jour;
  }

  moisPrecedent(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.genererCalendrier();
    this.jourSelectionne = null;
  }

  moisSuivant(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.genererCalendrier();
    this.jourSelectionne = null;
  }

  ajouterEvenement(): void {
    alert('Fonctionnalité à venir');
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
  }
}