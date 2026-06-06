import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { NavbarComponent } from '../../layout/navbar/navbar';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-comptes-rendus',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    RouterModule,
    MatCardModule, MatTableModule, MatButtonModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatToolbarModule, MatSelectModule,
    MatSnackBarModule, MatChipsModule, MatTabsModule, MatBadgeModule,
    MatTooltipModule, MatDialogModule, MatSidenavModule, MatListModule,
    NavbarComponent
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

  get notifsNonLues(): any[] {
  return this.notifications.filter(n => !n.lu);
}

get notifsLues(): any[] {
  return this.notifications.filter(n => n.lu);
}

getNotifIcon(type: string): string {
  const icons: any = {
    'compte-rendu': 'description',
    'circulaire': 'campaign',
    'document': 'folder'
  };
  return icons[type] || 'notifications';
}

getNotifColor(type: string): string {
  const colors: any = {
    'compte-rendu': 'notif-cr',
    'circulaire': 'notif-circ',
    'document': 'notif-doc'
  };
  return colors[type] || '';
}

getNotifLabel(type: string): string {
  const labels: any = {
    'compte-rendu': 'Compte rendu',
    'circulaire': 'Circulaire',
    'document': 'Document'
  };
  return labels[type] || type;
}

  get reunionsPassees(): any[] {
  const now = new Date();
  return this.filteredComptesRendus.filter(cr => 
    cr.typeInstance === 'REUNION' && new Date(cr.dateCreation) < now
  );
}

get reunionsAVenir(): any[] {
  const now = new Date();
  return this.filteredComptesRendus.filter(cr => 
    cr.typeInstance === 'REUNION' && new Date(cr.dateCreation) >= now
  );
}

get autresDocuments(): any[] {
  return this.filteredComptesRendus.filter(cr => cr.typeInstance !== 'REUNION');
}

  crForm: FormGroup;
  circulaireForm: FormGroup;

  menuItems = [
    { icon: 'dashboard', label: 'Tableau de bord', route: '/admin' },
    { icon: 'people', label: 'Étudiants', route: '/etudiants' },
    { icon: 'school', label: 'Formations', route: '/formations' },
    { icon: 'campaign', label: 'Communication', route: '/communication' },
    { icon: 'admin_panel_settings', label: 'Administration', route: '/administration' }
  ];

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
    { id: 6, titre: 'Réunion préparation examens S2 2026', auteur: 'Prof. Sow', dateCreation: '2026-05-10T08:00:00', typeInstance: 'REUNION', estPublie: false },
    { id: 7, titre: 'Réunion de rentrée académique 2026-2027', auteur: 'Rectorat', dateCreation: '2026-09-01T09:00:00', typeInstance: 'REUNION', estPublie: true },
    { id: 8, titre: 'Réunion préparation soutenances Master', auteur: 'Prof. Diallo', dateCreation: '2026-07-15T14:00:00', typeInstance: 'REUNION', estPublie: true },
    { id: 9, titre: 'Réunion commission pédagogique S1', auteur: 'Direction', dateCreation: '2026-08-20T10:00:00', typeInstance: 'REUNION', estPublie: false },
    { id: 10, titre: 'Rencontre employeurs — Forum emploi 2026', auteur: 'Service Insertion', dateCreation: '2026-07-10T09:00:00', typeInstance: 'RENCONTRE', estPublie: true },
    { id: 11, titre: 'Rencontre partenaires universités africaines', auteur: 'Rectorat', dateCreation: '2026-08-05T14:00:00', typeInstance: 'RENCONTRE', estPublie: true },
    { id: 14, titre: 'Webinaire — Formation à distance et outils numériques', auteur: 'Dr. Seck', dateCreation: '2026-07-25T10:00:00', typeInstance: 'WEBINAIRE', estPublie: true },
    { id: 15, titre: 'Webinaire — Entrepreneuriat et innovation', auteur: 'Prof. Kane', dateCreation: '2026-08-15T14:00:00', typeInstance: 'WEBINAIRE', estPublie: false },
    { id: 16, titre: 'Conseil d\'université — Session extraordinaire Budget 2026', auteur: 'Rectorat', dateCreation: '2026-05-10T09:00:00', typeInstance: 'CONSEIL_UNIVERSITE', estPublie: true, ordre_jour: 'Budget, RH, Infrastructure', participants: 45, statut: 'Clôturé' },
    { id: 17, titre: 'Conseil d\'université — Réforme des programmes L3-M2', auteur: 'Vice-Rectorat', dateCreation: '2026-04-15T14:00:00', typeInstance: 'CONSEIL_UNIVERSITE', estPublie: true, ordre_jour: 'Réforme LMD, Nouveaux modules', participants: 38, statut: 'Clôturé' },
    { id: 18, titre: 'Conseil d\'université — Session ordinaire Juillet 2026', auteur: 'Rectorat', dateCreation: '2026-07-10T09:00:00', typeInstance: 'CONSEIL_UNIVERSITE', estPublie: false, ordre_jour: 'Bilan S1, Préparation rentrée', participants: 50, statut: 'Planifié' },
    { id: 19, titre: 'Conseil d\'université — Partenariats internationaux', auteur: 'Direction Relations Ext.', dateCreation: '2026-09-05T10:00:00', typeInstance: 'CONSEIL_UNIVERSITE', estPublie: false, ordre_jour: 'Accords bilatéraux, Mobilité étudiante', participants: 42, statut: 'Planifié' }
  ];

  demoCirculaires = [
  { id: 1, titre: 'Calendrier académique 2026-2027', auteur: 'Rectorat', dateCreation: '2026-06-01T08:00:00', destinataire: 'TOUS', estPublie: true, priorite: 'haute', resume: 'Dates officielles de la rentrée, des examens et des congés académiques 2026-2027' },
  { id: 2, titre: 'Note de service — Modalités examens finaux', auteur: 'Direction pédagogique', dateCreation: '2026-05-25T10:00:00', destinataire: 'ENSEIGNANTS', estPublie: true, priorite: 'haute', resume: 'Instructions pour la préparation et la correction des examens de fin de semestre' },
  { id: 3, titre: 'Circulaire ministérielle n°12 — Formation continue', auteur: 'Ministère', dateCreation: '2026-05-20T09:00:00', destinataire: 'ADMINISTRATION', estPublie: true, priorite: 'normale', resume: 'Nouvelles directives concernant les programmes de formation continue' },
  { id: 4, titre: 'Rappel — Dépôt des notes S1 avant le 15 Juin', auteur: 'Scolarité', dateCreation: '2026-06-04T14:00:00', destinataire: 'ENSEIGNANTS', estPublie: false, priorite: 'urgente', resume: 'Toutes les notes doivent être saisies avant la date limite' },
  { id: 5, titre: 'Nouvelle politique de bourses 2026-2027', auteur: 'Direction Affaires Étudiantes', dateCreation: '2026-06-03T09:00:00', destinataire: 'ETUDIANTS', estPublie: true, priorite: 'normale', resume: 'Critères et procédures pour les demandes de bourses et aides financières' },
  { id: 6, titre: 'Mise à jour règlement intérieur UNCHK', auteur: 'Secrétariat Général', dateCreation: '2026-05-15T11:00:00', destinataire: 'TOUS', estPublie: true, priorite: 'normale', resume: 'Révision des règles de conduite et procédures disciplinaires' },
  { id: 7, titre: 'Convocation — Réunion administrative urgente', auteur: 'Rectorat', dateCreation: '2026-06-08T09:00:00', destinataire: 'ADMINISTRATION', estPublie: false, priorite: 'urgente', resume: 'Réunion obligatoire pour tout le personnel administratif' },
  { id: 8, titre: 'Suspension des cours — Journée nationale', auteur: 'Direction Générale', dateCreation: '2026-06-10T08:00:00', destinataire: 'TOUS', estPublie: false, priorite: 'haute', resume: 'Les cours sont suspendus le 10 Juin pour la journée nationale' },
  { id: 9, titre: 'Résultats — Délibérations S1 2025-2026', auteur: 'Jury central', dateCreation: '2026-03-20T10:00:00', destinataire: 'ETUDIANTS', estPublie: true, priorite: 'haute', resume: 'Les résultats officiels du semestre 1 sont disponibles sur la plateforme' },
  { id: 10, titre: 'Appel à candidatures — Tutorat 2026', auteur: 'Service Pédagogique', dateCreation: '2026-05-05T09:00:00', destinataire: 'ETUDIANTS', estPublie: true, priorite: 'normale', resume: 'Les étudiants de Master peuvent postuler comme tuteurs pour les L1 et L2' },
  { id: 11, titre: 'Note budgétaire — Dotations T3 2026', auteur: 'Direction Financière', dateCreation: '2026-05-30T11:00:00', destinataire: 'ADMINISTRATION', estPublie: true, priorite: 'normale', resume: 'Répartition des dotations budgétaires pour le troisième trimestre 2026' },
  { id: 12, titre: 'Charte numérique UNCHK — Mise à jour', auteur: 'DSI', dateCreation: '2026-04-10T09:00:00', destinataire: 'TOUS', estPublie: true, priorite: 'normale', resume: 'Nouvelles règles d\'utilisation des outils numériques et plateformes de l\'université' }
 ];

  demoNotifications = [
  { id: 1, type: 'circulaire', titre: 'Calendrier académique 2026-2027', lu: false, time: '2026-06-06T08:00:00', destinataire: 'Tous', auteur: 'Rectorat', priorite: 'haute' },
  { id: 2, type: 'compte-rendu', titre: 'Réunion conseil pédagogique Juin 2026', lu: false, time: '2026-06-05T09:30:00', destinataire: 'Enseignants, Admin', auteur: 'Prof. Diallo', priorite: 'normale' },
  { id: 3, type: 'document', titre: 'Rapport annuel 2025 archivé', lu: false, time: '2026-06-04T15:00:00', destinataire: 'Administration', auteur: 'Secrétariat', priorite: 'normale' },
  { id: 4, type: 'circulaire', titre: 'Rappel — Dépôt des notes avant le 15 Juin', lu: false, time: '2026-06-04T14:00:00', destinataire: 'Enseignants', auteur: 'Scolarité', priorite: 'urgente' },
  { id: 5, type: 'compte-rendu', titre: 'Webinaire — Digitalisation enseignement', lu: true, time: '2026-06-02T14:00:00', destinataire: 'Tous', auteur: 'Admin UNCHK', priorite: 'normale' },
  { id: 6, type: 'circulaire', titre: 'Note de service — Modalités examens finaux', lu: true, time: '2026-05-25T10:00:00', destinataire: 'Enseignants', auteur: 'Direction pédagogique', priorite: 'haute' },
  { id: 7, type: 'compte-rendu', titre: 'Séminaire — Innovation pédagogique', lu: true, time: '2026-05-20T11:00:00', destinataire: 'Tous', auteur: 'Dr. Ndiaye', priorite: 'normale' },
  { id: 8, type: 'document', titre: 'Guide tutorat 2025-2026 mis à jour', lu: true, time: '2026-05-10T09:00:00', destinataire: 'Enseignants', auteur: 'Service Pédagogique', priorite: 'normale' }
];

  documents = [
  // ADMINISTRATIF
  { id: 1, nom: 'Rapport annuel UNCHK 2025', categorie: 'Administratif', type: 'PDF', taille: '2.4 MB', date: '01 Jan 2026', acces: 'Administration', icon: 'picture_as_pdf', color: '#185FA5', description: 'Bilan complet des activités académiques et administratives de l\'année 2025' },
  { id: 2, nom: 'Procès-verbal conseil mai 2026', categorie: 'Administratif', type: 'DOCX', taille: '0.8 MB', date: '28 Mai 2026', acces: 'Administration', icon: 'article', color: '#854F0B', description: 'PV officiel de la session ordinaire du conseil d\'université' },
  { id: 3, nom: 'Organigramme UNCHK 2026', categorie: 'Administratif', type: 'PDF', taille: '0.5 MB', date: '15 Jan 2026', acces: 'Tous', icon: 'picture_as_pdf', color: '#185FA5', description: 'Structure organisationnelle complète de l\'université' },

  // PEDAGOGIQUE
  { id: 4, nom: 'Programme pédagogique Master IL', categorie: 'Pédagogique', type: 'PDF', taille: '1.1 MB', date: '15 Sept 2025', acces: 'Tous', icon: 'picture_as_pdf', color: '#0F6E56', description: 'Programme officiel du Master Ingénierie Logicielle P8' },
  { id: 5, nom: 'Guide tutorat 2025-2026', categorie: 'Pédagogique', type: 'PDF', taille: '0.5 MB', date: '10 Oct 2025', acces: 'Enseignants', icon: 'picture_as_pdf', color: '#534AB7', description: 'Méthodologie et outils pour les tuteurs et enseignants associés' },
  { id: 6, nom: 'Référentiel de compétences L3-M2', categorie: 'Pédagogique', type: 'PDF', taille: '1.3 MB', date: '05 Oct 2025', acces: 'Enseignants', icon: 'picture_as_pdf', color: '#0F6E56', description: 'Compétences attendues par niveau et par filière' },

  // RESULTATS
  { id: 7, nom: 'Résultats examens S1 2025-2026', categorie: 'Résultats', type: 'XLSX', taille: '1.2 MB', date: '20 Fév 2026', acces: 'Étudiants', icon: 'table_chart', color: '#993C1D', description: 'Notes et délibérations officielles du premier semestre' },
  { id: 8, nom: 'Statistiques insertion promo P7', categorie: 'Résultats', type: 'PDF', taille: '0.9 MB', date: '01 Mar 2026', acces: 'Tous', icon: 'bar_chart', color: '#185FA5', description: 'Taux d\'insertion professionnelle de la promotion sortante P7' },
  { id: 9, nom: 'Tableau de bord pédagogique S1', categorie: 'Résultats', type: 'PDF', taille: '0.7 MB', date: '15 Fév 2026', acces: 'Administration', icon: 'dashboard', color: '#854F0B', description: 'Indicateurs de performance pédagogique du semestre 1' },

  // REGLEMENTAIRE
  { id: 10, nom: 'Règlement intérieur UNCHK 2026', categorie: 'Réglementaire', type: 'PDF', taille: '0.4 MB', date: '10 Jan 2026', acces: 'Tous', icon: 'gavel', color: '#3B6D11', description: 'Règles de conduite et procédures disciplinaires en vigueur' },
  { id: 11, nom: 'Charte numérique UNCHK', categorie: 'Réglementaire', type: 'PDF', taille: '0.3 MB', date: '05 Jan 2026', acces: 'Tous', icon: 'security', color: '#3B6D11', description: 'Règles d\'utilisation des outils et plateformes numériques' },
  { id: 12, nom: 'Circulaires ministérielles 2026', categorie: 'Réglementaire', type: 'PDF', taille: '0.6 MB', date: '05 Jan 2026', acces: 'Administration', icon: 'picture_as_pdf', color: '#534AB7', description: 'Ensemble des circulaires officielles du ministère 2026' },

  // FINANCIER
  { id: 13, nom: 'Budget prévisionnel 2026', categorie: 'Financier', type: 'XLSX', taille: '1.5 MB', date: '15 Dec 2025', acces: 'Administration', icon: 'account_balance_wallet', color: '#854F0B', description: 'Budget prévisionnel détaillé par direction et par poste' },
  { id: 14, nom: 'Rapport financier T1 2026', categorie: 'Financier', type: 'PDF', taille: '0.9 MB', date: '15 Avr 2026', acces: 'Administration', icon: 'analytics', color: '#185FA5', description: 'Exécution budgétaire et analyse financière du premier trimestre' },
  { id: 15, nom: 'Note dotations T2 2026', categorie: 'Financier', type: 'PDF', taille: '0.3 MB', date: '01 Avr 2026', acces: 'Administration', icon: 'receipt', color: '#993C1D', description: 'Répartition des dotations budgétaires pour le deuxième trimestre' }
];

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    
     // Ouvrir directement l'onglet notifications si paramètre présent
  this.route.queryParams.subscribe(params => {
    if (params['tab']) {
      this.activeTab = +params['tab'];
    }
  });
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
      next: () => {
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
      this.snackBar.open('Publié !', 'Fermer', { duration: 3000 });
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
telechargerPDF(cr: any): void {
  const contenu = `
UNIVERSITÉ NUMÉRIQUE CHEIKH HAMIDOU KANE
==========================================
COMPTE RENDU

Titre     : ${cr.titre}
Type      : ${cr.typeInstance}
Auteur    : ${cr.auteur}
Date      : ${new Date(cr.dateCreation).toLocaleDateString('fr-FR')}
==========================================
${cr.contenu || 'Aucun contenu disponible'}
  `;

  const blob = new Blob([contenu], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CR_${cr.titre.replace(/\s+/g, '_')}.txt`;
  a.click();
  window.URL.revokeObjectURL(url);
  this.snackBar.open('Téléchargement lancé !', 'Fermer', { duration: 2000 });
}
rappelsActives: Set<number> = new Set();

toggleRappel(id: number): void {
  if (this.rappelsActives.has(id)) {
    this.rappelsActives.delete(id);
    this.snackBar.open('Rappel désactivé', 'Fermer', { duration: 2000 });
  } else {
    this.rappelsActives.add(id);
    this.snackBar.open('Rappel activé !', 'Fermer', { duration: 2000 });
  }
}

get rencontresPassees(): any[] {
  const now = new Date();
  return this.filteredComptesRendus.filter(cr =>
    cr.typeInstance === 'RENCONTRE' && new Date(cr.dateCreation) < now
  );
}

get rencontresAVenir(): any[] {
  const now = new Date();
  return this.filteredComptesRendus.filter(cr =>
    cr.typeInstance === 'RENCONTRE' && new Date(cr.dateCreation) >= now
  );
}

participations: Set<number> = new Set();

toggleParticipation(id: number): void {
  if (this.participations.has(id)) {
    this.participations.delete(id);
    this.snackBar.open('Participation annulée', 'Fermer', { duration: 2000 });
  } else {
    this.participations.add(id);
    this.snackBar.open('Participation confirmée !', 'Fermer', { duration: 2000 });
  }
}

get seminairesPassees(): any[] {
  const now = new Date();
  return this.filteredComptesRendus.filter(cr =>
    cr.typeInstance === 'SEMINAIRE' && new Date(cr.dateCreation) < now
  );
}

get seminairesAVenir(): any[] {
  const now = new Date();
  return this.filteredComptesRendus.filter(cr =>
    cr.typeInstance === 'SEMINAIRE' && new Date(cr.dateCreation) >= now
  );
}

get webinairesPassees(): any[] {
  const now = new Date();
  return this.filteredComptesRendus.filter(cr =>
    cr.typeInstance === 'WEBINAIRE' && new Date(cr.dateCreation) < now
  );
}

get webinairesAVenir(): any[] {
  const now = new Date();
  return this.filteredComptesRendus.filter(cr =>
    cr.typeInstance === 'WEBINAIRE' && new Date(cr.dateCreation) >= now
  );
}

get conseilsPassees(): any[] {
  const now = new Date();
  return this.filteredComptesRendus.filter(cr =>
    cr.typeInstance === 'CONSEIL_UNIVERSITE' && new Date(cr.dateCreation) < now
  );
}

get conseilsAVenir(): any[] {
  const now = new Date();
  return this.filteredComptesRendus.filter(cr =>
    cr.typeInstance === 'CONSEIL_UNIVERSITE' && new Date(cr.dateCreation) >= now
  );
}

filtreDestinataire = 'TOUS';
searchCirculaire = '';

get circulairesFiltrees(): any[] {
  let result = this.circulaires;
  if (this.filtreDestinataire !== 'TOUS') {
    result = result.filter(c => c.destinataire === this.filtreDestinataire || c.destinataire === 'TOUS');
  }
  if (this.searchCirculaire) {
    const q = this.searchCirculaire.toLowerCase();
    result = result.filter(c =>
      c.titre?.toLowerCase().includes(q) ||
      c.auteur?.toLowerCase().includes(q) ||
      c.resume?.toLowerCase().includes(q)
    );
  }
  return result;
}

get circulairesLues(): any[] {
  return this.circulairesFiltrees.filter(c => c.estPublie);
}

get circulairesNonLues(): any[] {
  return this.circulairesFiltrees.filter(c => !c.estPublie);
}

telechargerCirculairePDF(c: any): void {
  const contenu = `
UNIVERSITÉ NUMÉRIQUE CHEIKH HAMIDOU KANE
==========================================
CIRCULAIRE OFFICIELLE

Titre       : ${c.titre}
Auteur      : ${c.auteur}
Destinataire: ${c.destinataire}
Date        : ${new Date(c.dateCreation).toLocaleDateString('fr-FR')}
Priorité    : ${c.priorite || 'Normale'}
==========================================
${c.resume || ''}
  `;
  const blob = new Blob([contenu], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Circulaire_${c.titre.replace(/\s+/g, '_')}.txt`;
  a.click();
  window.URL.revokeObjectURL(url);
  this.snackBar.open('Téléchargement lancé !', 'Fermer', { duration: 2000 });
}

marquerCirculaireLue(id: number): void {
  const c = this.circulaires.find(x => x.id === id);
  if (c) {
    c.estPublie = true;
    this.snackBar.open('Circulaire marquée comme lue !', 'Fermer', { duration: 2000 });
  }
}

filtreArchiveAcces = 'Tous';
filtreArchiveCategorie = 'Toutes';
searchArchive = '';

categoriesArchive = ['Toutes', 'Administratif', 'Pédagogique', 'Résultats', 'Réglementaire', 'Financier'];
accesArchive = ['Tous', 'Administration', 'Enseignants', 'Étudiants'];

get documentsFiltres(): any[] {
  return this.documents.filter(d => {
    const matchAcces = this.filtreArchiveAcces === 'Tous' || d.acces === this.filtreArchiveAcces || d.acces === 'Tous';
    const matchCategorie = this.filtreArchiveCategorie === 'Toutes' || d.categorie === this.filtreArchiveCategorie;
    const matchSearch = !this.searchArchive || d.nom.toLowerCase().includes(this.searchArchive.toLowerCase()) || d.description.toLowerCase().includes(this.searchArchive.toLowerCase());
    return matchAcces && matchCategorie && matchSearch;
  });
}

get statsArchive() {
  return {
    total: this.documents.length,
    administratif: this.documents.filter(d => d.categorie === 'Administratif').length,
    pedagogique: this.documents.filter(d => d.categorie === 'Pédagogique').length,
    resultats: this.documents.filter(d => d.categorie === 'Résultats').length,
    reglementaire: this.documents.filter(d => d.categorie === 'Réglementaire').length,
    financier: this.documents.filter(d => d.categorie === 'Financier').length
  };
}

telechargerDocument(doc: any): void {
  this.snackBar.open(`Téléchargement de "${doc.nom}"...`, 'Fermer', { duration: 2000 });
}

}
