import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { NavbarComponent } from '../../layout/navbar/navbar';

@Component({
  selector: 'app-formation-list',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, RouterModule,
    MatCardModule, MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatToolbarModule, MatSelectModule,
    MatSnackBarModule, MatTabsModule, MatTooltipModule,
    MatSidenavModule, MatListModule, MatChipsModule, NavbarComponent
  ],
  templateUrl: './formation-list.html',
  styleUrl: './formation-list.scss'
})
export class FormationListComponent implements OnInit {

  activeTab = 0;
  showForm = false;

  menuItems = [
    { icon: 'dashboard', label: 'Tableau de bord', route: '/admin' },
    { icon: 'people', label: 'Étudiants', route: '/etudiants' },
    { icon: 'school', label: 'Formations', route: '/formations' },
    { icon: 'campaign', label: 'Communication', route: '/communication' },
    { icon: 'admin_panel_settings', label: 'Administration', route: '/administration' },
    { icon: 'work', label: 'Insertion', route: '/insertion' }
  ];

  stats = [
    { label: 'Formations actives', value: 6, icon: 'school' },
    { label: 'Formateurs', value: 18, icon: 'people' },
    { label: 'Étudiants formés', value: 320, icon: 'groups' },
    { label: 'Réunions ce mois', value: 8, icon: 'event' }
  ];

  // FORMATIONS
  formations = [
    { id: 1, nom: 'Master Ingénierie Logicielle', code: 'MIL-P8', type: 'DIPLOME', niveau: 'Master 2', debut: '2024-10-01', fin: '2026-06-30', statut: 'ACTIF', hommes: 28, femmes: 12, total: 40, financement: 'PUBLIC', montant: null, description: 'Formation d\'excellence en ingénierie logicielle, spécialité développement et architecture' },
    { id: 2, nom: 'Licence Informatique', code: 'LI-P6', type: 'DIPLOME', niveau: 'Licence 3', debut: '2024-10-01', fin: '2025-06-30', statut: 'ACTIF', hommes: 45, femmes: 20, total: 65, financement: 'PUBLIC', montant: null, description: 'Formation de base en informatique couvrant les fondamentaux du développement' },
    { id: 3, nom: 'Certification Cloud AWS', code: 'CERT-AWS', type: 'CERTIFICATION', niveau: 'Professionnel', debut: '2026-02-01', fin: '2026-05-31', statut: 'ACTIF', hommes: 15, femmes: 8, total: 23, financement: 'PRIVE', montant: 450000, description: 'Préparation à la certification AWS Solutions Architect Associate' },
    { id: 4, nom: 'Formation DevOps', code: 'DEVOPS-01', type: 'FORMATION_CONTINUE', niveau: 'Avancé', debut: '2026-03-01', fin: '2026-07-31', statut: 'ACTIF', hommes: 18, femmes: 7, total: 25, financement: 'MIXTE', montant: 250000, description: 'Pratiques DevOps, CI/CD, Docker, Kubernetes pour professionnels en activité' },
    { id: 5, nom: 'Master Data Science', code: 'MDS-P2', type: 'DIPLOME', niveau: 'Master 2', debut: '2024-10-01', fin: '2026-06-30', statut: 'ACTIF', hommes: 20, femmes: 15, total: 35, financement: 'PUBLIC', montant: null, description: 'Formation avancée en data science, machine learning et intelligence artificielle' },
    { id: 6, nom: 'Certification Cybersécurité', code: 'CERT-SEC', type: 'CERTIFICATION', niveau: 'Professionnel', debut: '2026-06-01', fin: '2026-09-30', statut: 'PLANIFIE', hommes: 12, femmes: 5, total: 17, financement: 'PRIVE', montant: 380000, description: 'Préparation à la certification CompTIA Security+ et introduction au pentest' }
  ];

  formationForm: FormGroup;
  searchFormation = '';
  filtreTypeFormation = 'TOUS';

  get formationsFiltrees(): any[] {
    let result = this.formations;
    if (this.filtreTypeFormation !== 'TOUS') {
      result = result.filter(f => f.type === this.filtreTypeFormation);
    }
    if (this.searchFormation) {
      const q = this.searchFormation.toLowerCase();
      result = result.filter(f => f.nom.toLowerCase().includes(q) || f.code.toLowerCase().includes(q));
    }
    return result;
  }

  // EMPLOI DU TEMPS
  joursEmploi = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  heures = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  emploiDuTemps = [
    { id: 1, matiere: 'Architecture logicielle', formateur: 'Prof. Diallo', salle: 'Amphi A', jour: 'Lundi', debut: '08:00', fin: '10:00', formation: 'MIL-P8', couleur: '#006064' },
    { id: 2, matiere: 'Base de données avancée', formateur: 'Dr. Ndiaye', salle: 'Salle 12', jour: 'Lundi', debut: '10:00', fin: '12:00', formation: 'MIL-P8', couleur: '#1565C0' },
    { id: 3, matiere: 'Machine Learning', formateur: 'Prof. Ba', salle: 'Labo Info', jour: 'Mardi', debut: '08:00', fin: '11:00', formation: 'MDS-P2', couleur: '#6A1B9A' },
    { id: 4, matiere: 'Développement Mobile', formateur: 'Dr. Sow', salle: 'Labo Info', jour: 'Mardi', debut: '14:00', fin: '16:00', formation: 'MIL-P8', couleur: '#006064' },
    { id: 5, matiere: 'Cloud Computing', formateur: 'M. Fall', salle: 'Salle 8', jour: 'Mercredi', debut: '09:00', fin: '11:00', formation: 'CERT-AWS', couleur: '#e65100' },
    { id: 6, matiere: 'Sécurité informatique', formateur: 'Dr. Kane', salle: 'Salle 15', jour: 'Mercredi', debut: '14:00', fin: '16:00', formation: 'MIL-P8', couleur: '#2E7D32' },
    { id: 7, matiere: 'Génie logiciel', formateur: 'Prof. Diallo', salle: 'Amphi B', jour: 'Jeudi', debut: '08:00', fin: '10:00', formation: 'LI-P6', couleur: '#854F0B' },
    { id: 8, matiere: 'Data Visualization', formateur: 'Prof. Ba', salle: 'Labo Info', jour: 'Jeudi', debut: '14:00', fin: '17:00', formation: 'MDS-P2', couleur: '#6A1B9A' },
    { id: 9, matiere: 'DevOps & CI/CD', formateur: 'M. Mbaye', salle: 'Labo Info', jour: 'Vendredi', debut: '09:00', fin: '12:00', formation: 'DEVOPS-01', couleur: '#1565C0' }
  ];

  jourFiltreEmploi = 'TOUS';

  get emploiFiltre(): any[] {
    if (this.jourFiltreEmploi === 'TOUS') return this.emploiDuTemps;
    return this.emploiDuTemps.filter(e => e.jour === this.jourFiltreEmploi);
  }

  getCoursParJour(jour: string): any[] {
    return this.emploiDuTemps.filter(e => e.jour === jour);
  }

  // FORMATEURS
  formateurs = [
    { id: 1, nom: 'Prof. Amadou Diallo', type: 'ENSEIGNANT', specialite: 'Architecture logicielle, Génie logiciel', formations: ['MIL-P8', 'LI-P6'], email: 'a.diallo@unchk.sn', telephone: '+221 77 111 11 11', statut: 'ACTIF', initiales: 'AD' },
    { id: 2, nom: 'Dr. Fatou Ndiaye', type: 'ENSEIGNANT', specialite: 'Base de données, Big Data', formations: ['MIL-P8', 'MDS-P2'], email: 'f.ndiaye@unchk.sn', telephone: '+221 77 222 22 22', statut: 'ACTIF', initiales: 'FN' },
    { id: 3, nom: 'Prof. Ibrahima Ba', type: 'ENSEIGNANT', specialite: 'Machine Learning, Data Science', formations: ['MDS-P2'], email: 'i.ba@unchk.sn', telephone: '+221 77 333 33 33', statut: 'ACTIF', initiales: 'IB' },
    { id: 4, nom: 'Dr. Moussa Sow', type: 'ENSEIGNANT_ASSOCIE', specialite: 'Développement Mobile, iOS/Android', formations: ['MIL-P8'], email: 'm.sow@unchk.sn', telephone: '+221 77 444 44 44', statut: 'ACTIF', initiales: 'MS' },
    { id: 5, nom: 'M. Oumar Fall', type: 'ENSEIGNANT_ASSOCIE', specialite: 'Cloud AWS, DevOps', formations: ['CERT-AWS', 'DEVOPS-01'], email: 'o.fall@unchk.sn', telephone: '+221 77 555 55 55', statut: 'ACTIF', initiales: 'OF' },
    { id: 6, nom: 'Dr. Aïcha Kane', type: 'ENSEIGNANT', specialite: 'Cybersécurité, Réseaux', formations: ['MIL-P8', 'CERT-SEC'], email: 'a.kane@unchk.sn', telephone: '+221 77 666 66 66', statut: 'ACTIF', initiales: 'AK' },
    { id: 7, nom: 'M. Ibou Mbaye', type: 'ENSEIGNANT_ASSOCIE', specialite: 'DevOps, Infrastructure', formations: ['DEVOPS-01'], email: 'i.mbaye@unchk.sn', telephone: '+221 77 777 77 77', statut: 'ACTIF', initiales: 'IM' },
    { id: 8, nom: 'Mme Astou Diop', type: 'TUTEUR', specialite: 'Tutorat Master IL', formations: ['MIL-P8'], email: 'a.diop@unchk.sn', telephone: '+221 77 888 88 88', statut: 'ACTIF', initiales: 'AD' },
    { id: 9, nom: 'M. Cheikh Sarr', type: 'TUTEUR', specialite: 'Tutorat Data Science', formations: ['MDS-P2'], email: 'c.sarr@unchk.sn', telephone: '+221 77 999 99 99', statut: 'ACTIF', initiales: 'CS' }
  ];

  formateurForm: FormGroup;
  filtreTypeFormateur = 'TOUS';
  searchFormateur = '';

  get formateursFiltres(): any[] {
    let result = this.formateurs;
    if (this.filtreTypeFormateur !== 'TOUS') {
      result = result.filter(f => f.type === this.filtreTypeFormateur);
    }
    if (this.searchFormateur) {
      const q = this.searchFormateur.toLowerCase();
      result = result.filter(f => f.nom.toLowerCase().includes(q) || f.specialite.toLowerCase().includes(q));
    }
    return result;
  }

  // REUNIONS TUTORAT
  reunionsTutorat = [
    { id: 1, titre: 'Suivi tutorat MIL-P8 — Semaine 20', tuteur: 'Mme Astou Diop', formation: 'Master IL P8', date: '2026-06-10T10:00:00', statut: 'PLANIFIE', participants: 12, ordre_jour: 'Bilan mi-semestre, difficultés détectées, plan de rattrapage', type: 'TUTORAT' },
    { id: 2, titre: 'Réunion suivi individuel — Étudiants en difficulté', tuteur: 'M. Cheikh Sarr', formation: 'Master Data Science', date: '2026-06-08T14:00:00', statut: 'PLANIFIE', participants: 5, ordre_jour: 'Suivi personnalisé, objectifs S2, ressources complémentaires', type: 'TUTORAT' },
    { id: 3, titre: 'Bilan tutorat S1 — MIL-P8', tuteur: 'Mme Astou Diop', formation: 'Master IL P8', date: '2026-02-15T10:00:00', statut: 'TERMINE', participants: 40, ordre_jour: 'Résultats S1, analyse des échecs, recommandations', type: 'TUTORAT' },
    { id: 4, titre: 'Réunion tuteurs — Coordination pédagogique', tuteur: 'Direction pédagogique', formation: 'Toutes formations', date: '2026-05-20T09:00:00', statut: 'TERMINE', participants: 4, ordre_jour: 'Bilan activités, nouvelles directives, outils tutorat', type: 'TUTORAT' }
  ];

  // REUNIONS PEDAGOGIQUES
  reunionsPedago = [
    { id: 1, titre: 'Préparation cours S2 — Architecture logicielle', formateur: 'Prof. Diallo', formation: 'MIL-P8', date: '2026-06-12T09:00:00', statut: 'PLANIFIE', type: 'PREPARATION_COURS', participants: 3, ordre_jour: 'Nouveaux chapitres, ressources pédagogiques, planning' },
    { id: 2, titre: 'Préparation examen final — BDD avancée', formateur: 'Dr. Ndiaye', formation: 'MIL-P8', date: '2026-06-15T14:00:00', statut: 'PLANIFIE', type: 'PREPARATION_EVAL', participants: 4, ordre_jour: 'Sujets d\'examen, barème, modalités de correction' },
    { id: 3, titre: 'Révision programme ML — S2', formateur: 'Prof. Ba', formation: 'MDS-P2', date: '2026-06-14T10:00:00', statut: 'PLANIFIE', type: 'PREPARATION_COURS', participants: 2, ordre_jour: 'Nouveaux algorithmes, TPs pratiques, bibliographie' },
    { id: 4, titre: 'Commission examens — Toutes formations', formateur: 'Direction pédagogique', formation: 'Toutes', date: '2026-06-20T09:00:00', statut: 'PLANIFIE', type: 'PREPARATION_EVAL', participants: 12, ordre_jour: 'Calendrier examens, salles, surveillants, PV' },
    { id: 5, titre: 'Bilan pédagogique S1', formateur: 'Direction pédagogique', formation: 'Toutes', date: '2026-02-10T09:00:00', statut: 'TERMINE', type: 'PREPARATION_COURS', participants: 15, ordre_jour: 'Résultats S1, ajustements programme S2' },
    { id: 6, titre: 'Correction examens S1 — MIL', formateur: 'Prof. Diallo, Dr. Ndiaye', formation: 'MIL-P8', date: '2026-02-20T14:00:00', statut: 'TERMINE', type: 'PREPARATION_EVAL', participants: 8, ordre_jour: 'Harmonisation notation, délibérations' }
  ];

  get reunionsCours(): any[] {
    return this.reunionsPedago.filter(r => r.type === 'PREPARATION_COURS');
  }

  get reunionsEval(): any[] {
    return this.reunionsPedago.filter(r => r.type === 'PREPARATION_EVAL');
  }

  reunionForm: FormGroup;
  rappelsActives: Set<number> = new Set();

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.formationForm = this.fb.group({
      nom: ['', Validators.required],
      code: ['', Validators.required],
      type: ['DIPLOME', Validators.required],
      niveau: ['', Validators.required],
      debut: ['', Validators.required],
      fin: ['', Validators.required],
      financement: ['PUBLIC', Validators.required],
      montant: [''],
      description: ['']
    });

    this.formateurForm = this.fb.group({
      nom: ['', Validators.required],
      type: ['ENSEIGNANT', Validators.required],
      specialite: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['']
    });

    this.reunionForm = this.fb.group({
      titre: ['', Validators.required],
      type: ['TUTORAT', Validators.required],
      formateur: ['', Validators.required],
      formation: ['', Validators.required],
      date: ['', Validators.required],
      ordre_jour: ['']
    });
  }

  ngOnInit(): void {}

  toggleRappel(id: number): void {
    if (this.rappelsActives.has(id)) {
      this.rappelsActives.delete(id);
      this.snackBar.open('Rappel désactivé', 'Fermer', { duration: 2000 });
    } else {
      this.rappelsActives.add(id);
      this.snackBar.open('Rappel activé !', 'Fermer', { duration: 2000 });
    }
  }

  submitFormation(): void {
    if (this.formationForm.invalid) return;
    this.formations.unshift({ ...this.formationForm.value, id: Date.now(), statut: 'PLANIFIE', hommes: 0, femmes: 0, total: 0 });
    this.snackBar.open('Formation créée !', 'Fermer', { duration: 2000 });
    this.showForm = false;
    this.formationForm.reset({ type: 'DIPLOME', financement: 'PUBLIC' });
  }

  submitFormateur(): void {
    if (this.formateurForm.invalid) return;
    const initiales = this.formateurForm.value.nom.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
    this.formateurs.unshift({ ...this.formateurForm.value, id: Date.now(), statut: 'ACTIF', formations: [], initiales });
    this.snackBar.open('Formateur ajouté !', 'Fermer', { duration: 2000 });
    this.showForm = false;
    this.formateurForm.reset({ type: 'ENSEIGNANT' });
  }

  submitReunion(): void {
    if (this.reunionForm.invalid) return;
    const r = { ...this.reunionForm.value, id: Date.now(), statut: 'PLANIFIE', participants: 0 };
    if (r.type === 'TUTORAT') this.reunionsTutorat.unshift(r);
    else this.reunionsPedago.unshift(r);
    this.snackBar.open('Réunion planifiée !', 'Fermer', { duration: 2000 });
    this.showForm = false;
    this.reunionForm.reset({ type: 'TUTORAT' });
  }

  getTypeFormationColor(type: string): string {
    const c: any = { 'DIPLOME': 'success', 'CERTIFICATION': 'info', 'FORMATION_CONTINUE': 'warning' };
    return c[type] || 'default';
  }

  getTypeFormationLabel(type: string): string {
    const l: any = { 'DIPLOME': 'Diplôme', 'CERTIFICATION': 'Certification', 'FORMATION_CONTINUE': 'Formation continue' };
    return l[type] || type;
  }

  getStatutColor(statut: string): string {
    const c: any = { 'ACTIF': 'success', 'PLANIFIE': 'info', 'TERMINE': 'warning', 'SUSPENDU': 'danger' };
    return c[statut] || 'default';
  }

  getStatutLabel(statut: string): string {
    const l: any = { 'ACTIF': 'Actif', 'PLANIFIE': 'Planifié', 'TERMINE': 'Terminé', 'SUSPENDU': 'Suspendu' };
    return l[statut] || statut;
  }

  getTypeFormateurColor(type: string): string {
    const c: any = { 'ENSEIGNANT': '#006064', 'ENSEIGNANT_ASSOCIE': '#1565C0', 'TUTEUR': '#e65100' };
    return c[type] || '#006064';
  }

  getTypeFormateurBg(type: string): string {
    const c: any = { 'ENSEIGNANT': '#e0f7fa', 'ENSEIGNANT_ASSOCIE': '#e3f2fd', 'TUTEUR': '#fff3e0' };
    return c[type] || '#e0f7fa';
  }

  getFinancementColor(f: string): string {
    const c: any = { 'PUBLIC': 'success', 'PRIVE': 'warning', 'MIXTE': 'info' };
    return c[f] || 'default';
  }

  getReunionTypeIcon(type: string): string {
    const i: any = { 'TUTORAT': 'supervisor_account', 'PREPARATION_COURS': 'menu_book', 'PREPARATION_EVAL': 'assignment' };
    return i[type] || 'event';
  }
}