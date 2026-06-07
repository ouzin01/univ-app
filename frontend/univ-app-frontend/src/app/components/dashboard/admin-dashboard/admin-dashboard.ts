import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavbarComponent } from '../../layout/navbar/navbar';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatIconModule, MatToolbarModule,
    MatSidenavModule, MatListModule, MatButtonModule, MatTooltipModule,
    NavbarComponent
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('formChart') formChartRef!: ElementRef;

  menuItems = [
    { icon: 'dashboard', label: 'Tableau de bord', route: '/admin' },
    { icon: 'people', label: 'Étudiants', route: '/etudiants' },
    { icon: 'school', label: 'Formations', route: '/formations' },
    { icon: 'campaign', label: 'Communication', route: '/communication' },
    { icon: 'admin_panel_settings', label: 'Administration', route: '/administration' },
    { icon: 'work', label: 'Insertion', route: '/insertion' }
  ];

  kpis = [
    { label: 'Étudiants actifs', value: 320, icon: 'people', trend: '+12%', up: true },
    { label: 'Formations actives', value: 6, icon: 'school', trend: '+2', up: true },
    { label: "Taux d'insertion", value: '78%', icon: 'trending_up', trend: '+5%', up: true },
    { label: 'Partenaires', value: 34, icon: 'handshake', trend: '+4', up: true }
  ];

  activites = [
    { texte: 'Nouvel étudiant Ousmane Kane inscrit en Master IL', temps: 'Il y a 2h', couleur: '#006064' },
    { texte: 'Circulaire Calendrier S2 publiée', temps: 'Il y a 4h', couleur: '#e65100' },
    { texte: 'Courrier arrivé — Ministère ESRS', temps: 'Hier', couleur: '#1565C0' },
    { texte: 'Réunion tutorat MIL-P8 planifiée', temps: 'Hier', couleur: '#6A1B9A' },
    { texte: 'Partenaire Orange Sénégal — convention renouvelée', temps: 'Il y a 2j', couleur: '#2E7D32' }
  ];

  alertes = [
    { titre: 'Dépôt notes S1 — 15 Juin', desc: '8 jours restants · Enseignants concernés', type: 'warning', badge: 'Urgent', icon: 'schedule' },
    { titre: '5 courriers non traités', desc: 'En attente depuis plus de 48h', type: 'danger', badge: '!', icon: 'warning' },
    { titre: 'Conseil université — 10 Juin', desc: 'Session ordinaire · 50 participants', type: 'info', badge: '3j', icon: 'event' },
    { titre: 'Budget T2 — Rapport à soumettre', desc: 'Échéance : 30 Juin 2026', type: 'success', badge: 'OK', icon: 'task_alt' }
  ];

  statsInsertion = [
    { label: 'Emploi salarié', value: 48, pct: 68, couleur: '#006064' },
    { label: 'Auto-emploi', value: 22, pct: 31, couleur: '#1565C0' },
    { label: 'En stage', value: 12, pct: 17, couleur: '#6A1B9A' },
    { label: 'En recherche', value: 18, pct: 25, couleur: '#e65100' }
  ];

  jourSelectionne: any = null;

  calendrier = {
    mois: 'Juin 2026',
    joursPrecedents: [26, 27, 28, 29, 30, 31],
    jours: [
      { num: 1, isToday: false, hasEvent: false, event: null, type: null },
      { num: 2, isToday: false, hasEvent: false, event: null, type: null },
      { num: 3, isToday: false, hasEvent: false, event: null, type: null },
      { num: 4, isToday: false, hasEvent: false, event: null, type: null },
      { num: 5, isToday: false, hasEvent: false, event: null, type: null },
      { num: 6, isToday: false, hasEvent: false, event: null, type: null },
      { num: 7, isToday: true, hasEvent: false, event: null, type: null },
      { num: 8, isToday: false, hasEvent: true, event: 'Réunion suivi tutorat MDS', type: 'reunion' },
      { num: 9, isToday: false, hasEvent: false, event: null, type: null },
      { num: 10, isToday: false, hasEvent: true, event: 'Conseil université — Session ordinaire', type: 'conseil' },
      { num: 11, isToday: false, hasEvent: false, event: null, type: null },
      { num: 12, isToday: false, hasEvent: true, event: 'Préparation cours Architecture S2', type: 'pedago' },
      { num: 13, isToday: false, hasEvent: false, event: null, type: null },
      { num: 14, isToday: false, hasEvent: true, event: 'Révision programme ML — S2', type: 'pedago' },
      { num: 15, isToday: false, hasEvent: true, event: 'Dépôt notes S1 — Date limite', type: 'urgent' },
      { num: 16, isToday: false, hasEvent: false, event: null, type: null },
      { num: 17, isToday: false, hasEvent: false, event: null, type: null },
      { num: 18, isToday: false, hasEvent: false, event: null, type: null },
      { num: 19, isToday: false, hasEvent: false, event: null, type: null },
      { num: 20, isToday: false, hasEvent: true, event: 'Commission examens — Toutes formations', type: 'examen' },
      { num: 21, isToday: false, hasEvent: false, event: null, type: null },
      { num: 22, isToday: false, hasEvent: false, event: null, type: null },
      { num: 23, isToday: false, hasEvent: false, event: null, type: null },
      { num: 24, isToday: false, hasEvent: false, event: null, type: null },
      { num: 25, isToday: false, hasEvent: true, event: 'Séminaire Innovation pédagogique', type: 'seminaire' },
      { num: 26, isToday: false, hasEvent: false, event: null, type: null },
      { num: 27, isToday: false, hasEvent: false, event: null, type: null },
      { num: 28, isToday: false, hasEvent: false, event: null, type: null },
      { num: 29, isToday: false, hasEvent: false, event: null, type: null },
      { num: 30, isToday: false, hasEvent: true, event: 'Rapport budget T2 — Date limite', type: 'urgent' }
    ]
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.initFormChart(), 500);
  }

  initFormChart(): void {
    if (!this.formChartRef) return;
    new Chart(this.formChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Master IL', 'Licence Info', 'Cert. AWS', 'DevOps', 'Master DS', 'Cert. Sécu'],
        datasets: [
          { label: 'Hommes', data: [28, 45, 15, 18, 20, 12], backgroundColor: '#006064', borderRadius: 4 },
          { label: 'Femmes', data: [12, 20, 8, 7, 15, 5], backgroundColor: '#e65100', borderRadius: 4 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 10 } } }
        }
      }
    });
  }

  selectionnerJour(jour: any): void {
    if (jour.hasEvent) {
      this.jourSelectionne = jour;
    } else {
      this.jourSelectionne = null;
    }
  }

  getAlerteBg(type: string): string {
    const c: any = { 'warning': '#fff3e0', 'danger': '#ffebee', 'info': '#e3f2fd', 'success': '#e8f5e9' };
    return c[type] || '#f5f5f5';
  }

  getAlerteColor(type: string): string {
    const c: any = { 'warning': '#e65100', 'danger': '#c62828', 'info': '#1565C0', 'success': '#2e7d32' };
    return c[type] || '#666';
  }

  getAlerteBadgeClass(type: string): string {
    const c: any = { 'warning': 'badge-warning', 'danger': 'badge-danger', 'info': 'badge-info', 'success': 'badge-success' };
    return c[type] || '';
  }
}