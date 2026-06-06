import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-comptes-rendus',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatCardModule, MatTableModule, MatButtonModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatToolbarModule, MatSelectModule,
    MatSnackBarModule, MatChipsModule, MatTabsModule, MatBadgeModule,
    MatTooltipModule, MatDialogModule, MatSidenavModule, MatListModule
  ],
  templateUrl: './comptes-rendus.html',
  styleUrl: './comptes-rendus.scss'
})
export class ComptesRendusComponent implements OnInit {

  activeTab = 0;
  showForm = false;
  searchQuery = '';
  filterType = 'TOUS';

  comptesRendus: any[] = [];
  circulaires: any[] = [];
  notifications: any[] = [];
  filteredComptesRendus: any[] = [];

  crForm: FormGroup;
  circulaireForm: FormGroup;

  typesInstance = [
    { value: 'REUNION', label: 'Réunion', icon: 'groups' },
    { value: 'RENCONTRE', label: 'Rencontre', icon: 'handshake' },
    { value: 'SEMINAIRE', label: 'Séminaire', icon: 'school' },
    { value: 'WEBINAIRE', label: 'Webinaire', icon: 'videocam' },
    { value: 'CONSEIL_UNIVERSITE', label: "Conseil d'université", icon: 'account_balance' }
  ];

  typesDestinataire = ['TOUS', 'ETUDIANTS', 'ENSEIGNANTS', 'ADMINISTRATION'];

  stats = [
    { label: 'Comptes rendus', value: 0, icon: 'description' },
    { label: 'Circulaires', value: 0, icon: 'campaign' },
    { label: 'Documents', value: 6, icon: 'folder' },
    { label: 'Non lus', value: 3, icon: 'notifications_active' }
  ];

  demoComptesRendus = [
    { id: 1, titre: 'Réunion du conseil pédagogique — Juin 2026', auteur: 'Prof. Diallo', dateCreation: '2026-06-05T09:00:00', typeInstance: 'REUNION', estPublie: true },
    { id: 2, titre: 'Webinaire — Digitalisation de l\'enseignement supérieur', auteur: 'Admin UNCHK', dateCreation: '2026-06-02T14:00:00', typeInstance: 'WEBINAIRE', estPublie: true },
    { id: 3, titre: 'Conseil d\'université — Session ordinaire Mai 2026', auteur: 'Rectorat', dateCreation: '2026-05-28T10:00:00', typeInstance: 'CONSEIL_UNIVERSITE', estPublie: false },
    { id: 4, titre: 'Séminaire — Recherche et innovation pédagogique', auteur: 'Dr. Ndiaye', dateCreation: '2026-05-20T11:00:00', typeInstance: 'SEMINAIRE', estPublie: true },
    { id: 5, titre: 'Rencontre partenaires entreprises — Insertion professionnelle', auteur: 'Service Insertion', dateCreation: '2026-05-15T09:30:00', typeInstance: 'RENCONTRE', estPublie: true },
    { id: 6, titre: 'Réunion préparation examens S2 2026', auteur: 'Prof. Sow', dateCreation: '2026-05-10T08:00:00', typeInstance: 'REUNION', estPublie: false }
  ];

  demoCirculaires = [
    { id: 1, titre: 'Calendrier académique 2026-2027', auteur: 'Rectorat', dateCreation: '2026-06-01T08:00:00', destinataire: 'TOUS', estPublie: true },
    { id: 2, titre: 'Note de service — Modalités examens finaux', auteur: 'Direction pédagogique', dateCreation: '2026-05-25T10:00:00', destinataire: 'ENSEIGNANTS', estPublie: true },
    { id: 3, titre: 'Circulaire ministérielle n°12 — Formation continue', auteur: 'Ministère', dateCreation: '2026-05-20T09:00:00', destinataire: 'ADMINISTRATION', estPublie: true },
    { id: 4, titre: 'Rappel — Dépôt des notes S1 avant le 15 Juin', auteur: 'Scolarité', dateCreation: '2026-06-04T14:00:00', destinataire: 'ENSEIGNANTS', estPublie: false }
  ];

  demoNotifications = [
    { id: 1, type: 'circulaire', titre: 'Calendrier académique 2026-2027', lu: false, time: '2026-06-06T08:00:00', destinataire: 'Tous' },
    { id: 2, type: 'compte-rendu', titre: 'Réunion conseil pédagogique', lu: false, time: '2026-06-05T09:30:00', destinataire: 'Enseignants, Admin' },
    { id: 3, type: 'document', titre: 'Rapport annuel 2025 archivé', lu: false, time: '2026-06-04T15:00:00', destinataire: 'Administration' },
    { id: 4, type: 'circulaire', titre: 'Note de service — Examens finaux', lu: true, time: '2026-05-25T10:00:00', destinataire: 'Enseignants' },
    { id: 5, type: 'compte-rendu', titre: 'Séminaire innovation pédagogique', lu: true, time: '2026-05-20T11:00:00', destinataire: 'Tous' }
  ];

  documents = [
    { nom: 'Rapport annuel 2025', type: 'PDF', taille: '2.4 MB', date: '01 Jan 2026', acces: 'Administration', icon: 'picture_as_pdf', color: '#185FA5' },
    { nom: 'Programme pédagogique Master IL', type: 'PDF', taille: '1.1 MB', date: '15 Sept 2025', acces: 'Tous', icon: 'picture_as_pdf', color: '#0F6E56' },
    { nom: 'Procès-verbal conseil mai 2026', type: 'DOCX', taille: '0.8 MB', date: '28 Mai 2026', acces: 'Administration', icon: 'article', color: '#854F0B' },
    { nom: 'Guide tutorat 2025-2026', type: 'PDF', taille: '0.5 MB', date: '10 Oct 2025', acces: 'Enseignants', icon: 'picture_as_pdf', color: '#534AB7' },
    { nom: 'Résultats examens S1 2025', type: 'XLSX', taille: '1.2 MB', date: '20 Fév 2026', acces: 'Étudiants', icon: 'table_chart', color: '#993C1D' },
    { nom: 'Circulaires ministérielles 2026', type: 'PDF', taille: '0.3 MB', date: '05 Jan 2026', acces: 'Administration', icon: 'picture_as_pdf', color: '#3B6D11' }
  ];

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.crForm = this.fb.group({
      titre: ['', Validators.required],
      contenu: ['', Validators.required],
      typeInstance: ['REUNION', Validators.required],
      auteur: ['', Validators.required]
    });

    this.circulaireForm = this.fb.group({
      titre: ['', Validators.required],
      contenu: ['', Validators.required],
      auteur: ['', Validators.required],
      destinataire: ['TOUS', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.notifications = [...this.demoNotifications];
    this.stats[3].value = this.notifications.filter(n => !n.lu).length;
  }

  loadAll(): void {
    this.apiService.get<any[]>('/api/communication/comptes-rendus').subscribe({
      next: (data) => {
        this.comptesRendus = data.length > 0 ? data : this.demoComptesRendus;
        this.filteredComptesRendus = this.comptesRendus;
        this.stats[0].value = this.comptesRendus.length;
      },
      error: () => {
        this.comptesRendus = this.demoComptesRendus;
        this.filteredComptesRendus = this.demoComptesRendus;
        this.stats[0].value = this.demoComptesRendus.length;
      }
    });

    this.apiService.get<any[]>('/api/communication/circulaires').subscribe({
      next: (data) => {
        this.circulaires = data.length > 0 ? data : this.demoCirculaires;
        this.stats[1].value = this.circulaires.length;
      },
      error: () => {
        this.circulaires = this.demoCirculaires;
        this.stats[1].value = this.demoCirculaires.length;
      }
    });
  }

  filterByType(type: string): void {
    this.filterType = type;
    if (type === 'TOUS') {
      this.filteredComptesRendus = this.comptesRendus;
    } else {
      this.filteredComptesRendus = this.comptesRendus.filter(cr => cr.typeInstance === type);
    }
  }

  search(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredComptesRendus = this.comptesRendus.filter(cr =>
      cr.titre?.toLowerCase().includes(q) ||
      cr.auteur?.toLowerCase().includes(q)
    ).filter(cr => this.filterType === 'TOUS' || cr.typeInstance === this.filterType);
  }

  submitCR(): void {
    if (this.crForm.invalid) return;
    this.apiService.post('/api/communication/comptes-rendus', this.crForm.value).subscribe({
      next: (data: any) => {
        this.snackBar.open('Compte rendu créé !', 'Fermer', { duration: 3000 });
        this.showForm = false;
        this.crForm.reset({ typeInstance: 'REUNION' });
        this.loadAll();
      },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000 })
    });
  }

  submitCirculaire(): void {
    if (this.circulaireForm.invalid) return;
    this.apiService.post('/api/communication/circulaires', this.circulaireForm.value).subscribe({
      next: () => {
        this.snackBar.open('Circulaire créée !', 'Fermer', { duration: 3000 });
        this.showForm = false;
        this.circulaireForm.reset({ destinataire: 'TOUS' });
        this.loadAll();
      },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000 })
    });
  }

  publierCR(id: number): void {
    const cr = this.comptesRendus.find(c => c.id === id);
    if (cr) {
      cr.estPublie = true;
      this.snackBar.open('Publié avec succès !', 'Fermer', { duration: 3000 });
    }
    this.apiService.put(`/api/communication/comptes-rendus/${id}/publier`, {}).subscribe({
      next: () => this.loadAll(),
      error: () => {}
    });
  }

  publierCirculaire(id: number): void {
    const c = this.circulaires.find(x => x.id === id);
    if (c) {
      c.estPublie = true;
      this.snackBar.open('Circulaire publiée !', 'Fermer', { duration: 3000 });
    }
    this.apiService.put(`/api/communication/circulaires/${id}/publier`, {}).subscribe({
      next: () => this.loadAll(),
      error: () => {}
    });
  }

  marquerLu(notif: any): void {
    notif.lu = true;
    this.stats[3].value = this.notifications.filter(n => !n.lu).length;
  }

  marquerTousLus(): void {
    this.notifications.forEach(n => n.lu = true);
    this.stats[3].value = 0;
    this.snackBar.open('Toutes les notifications sont lues', 'Fermer', { duration: 2000 });
  }

  getTypeIcon(type: string): string {
    const icons: any = {
      'REUNION': 'groups', 'RENCONTRE': 'handshake',
      'SEMINAIRE': 'school', 'WEBINAIRE': 'videocam',
      'CONSEIL_UNIVERSITE': 'account_balance'
    };
    return icons[type] || 'description';
  }

  getTypeColor(type: string): string {
    const colors: any = {
      'REUNION': 'reunion', 'RENCONTRE': 'rencontre',
      'SEMINAIRE': 'seminaire', 'WEBINAIRE': 'webinaire',
      'CONSEIL_UNIVERSITE': 'conseil'
    };
    return colors[type] || 'default';
  }

  getAccesColor(acces: string): string {
    const colors: any = {
      'Tous': 'success', 'Administration': 'warning',
      'Enseignants': 'info', 'Étudiants': 'primary'
    };
    return colors[acces] || 'default';
  }

  retour(): void {
    this.router.navigate(['/admin']);
  }
}