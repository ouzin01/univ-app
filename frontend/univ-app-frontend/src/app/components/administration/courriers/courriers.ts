import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { NavbarComponent } from '../../layout/navbar/navbar';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-courriers',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, RouterModule,
    MatCardModule, MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatToolbarModule, MatSelectModule,
    MatSnackBarModule, MatTabsModule, MatTableModule, MatTooltipModule,
    MatSidenavModule, MatListModule, MatBadgeModule, NavbarComponent
  ],
  templateUrl: './courriers.html',
  styleUrl: './courriers.scss'
})
export class CourriersComponent implements OnInit, AfterViewInit {

  @ViewChild('budgetChart') budgetChartRef!: ElementRef;

  activeTab = 0;
  showForm = false;

  menuItems = [
    { icon: 'dashboard', label: 'Tableau de bord', route: '/admin' },
    { icon: 'people', label: 'Étudiants', route: '/etudiants' },
    { icon: 'school', label: 'Formations', route: '/formations' },
    { icon: 'campaign', label: 'Communication', route: '/communication' },
    { icon: 'admin_panel_settings', label: 'Administration', route: '/administration' }
  ];

  stats = [
    { label: 'Courriers arrivés', value: 24, icon: 'mail' },
    { label: 'Courriers départs', value: 12, icon: 'send' },
    { label: 'Notes de service', value: 8, icon: 'description' },
    { label: 'En attente', value: 5, icon: 'pending' }
  ];

  // COURRIERS
  courriersArrive = [
    { id: 1, objet: 'Demande de convention de stage', expediteur: 'Étudiant Diallo', date: '05 Jun 2026', statut: 'EN_COURS', priorite: 'normale' },
    { id: 2, objet: 'Circulaire ministérielle n°15', expediteur: 'Ministère ESRS', date: '03 Jun 2026', statut: 'TRAITE', priorite: 'haute' },
    { id: 3, objet: 'Demande de relevé de notes', expediteur: 'Étudiant Kane', date: '01 Jun 2026', statut: 'EN_ATTENTE', priorite: 'urgente' },
    { id: 4, objet: 'Partenariat formation continue', expediteur: 'Entreprise TechSen', date: '30 Mai 2026', statut: 'EN_COURS', priorite: 'normale' },
    { id: 5, objet: 'Demande attestation d\'inscription', expediteur: 'Étudiant Ba', date: '28 Mai 2026', statut: 'TRAITE', priorite: 'normale' }
  ];

  courriersDepart = [
    { id: 1, objet: 'Réponse demande partenariat', destinataire: 'Entreprise ABC', date: '04 Jun 2026', statut: 'ENVOYE', priorite: 'normale' },
    { id: 2, objet: 'Note d\'orientation budgétaire', destinataire: 'Ministère', date: '02 Jun 2026', statut: 'ENVOYE', priorite: 'haute' },
    { id: 3, objet: 'Convocation conseil université', destinataire: 'Membres conseil', date: '01 Jun 2026', statut: 'EN_ATTENTE', priorite: 'haute' },
    { id: 4, objet: 'Rapport activités S1 2026', destinataire: 'Rectorat national', date: '30 Mai 2026', statut: 'ENVOYE', priorite: 'normale' }
  ];

  courrierForm: FormGroup;
  typesCourrier = ['ARRIVE', 'DEPART'];
  searchCourrier = '';

  get courriersArriveFiltres(): any[] {
    if (!this.searchCourrier) return this.courriersArrive;
    const q = this.searchCourrier.toLowerCase();
    return this.courriersArrive.filter(c =>
      c.objet.toLowerCase().includes(q) || c.expediteur.toLowerCase().includes(q)
    );
  }

  get courriersNonTraites(): any[] {
    return this.courriersArrive.filter(c => c.statut !== 'TRAITE');
  }

  // NOTES ET CIRCULAIRES
  notes = [
    { id: 1, titre: 'Note de service — Procédure inscription S2', auteur: 'Scolarité', date: '04 Jun 2026', type: 'INTERNE', destinataire: 'Personnel admin', statut: true },
    { id: 2, titre: 'Note administrative — Horaires ramadan', auteur: 'Direction', date: '01 Jun 2026', type: 'INTERNE', destinataire: 'Tout le personnel', statut: true },
    { id: 3, titre: 'Note de service externe — Rapport ANAQ', auteur: 'Direction Qualité', date: '30 Mai 2026', type: 'EXTERNE', destinataire: 'ANAQ-Sup', statut: false },
    { id: 4, titre: 'Circulaire centrale — Réforme LMD', auteur: 'Ministère ESRS', date: '25 Mai 2026', type: 'CIRCULAIRE', destinataire: 'Direction', statut: true },
    { id: 5, titre: 'Note administrative — Gestion absences', auteur: 'RH', date: '20 Mai 2026', type: 'INTERNE', destinataire: 'Enseignants', statut: true },
    { id: 6, titre: 'Circulaire centrale — Accréditation 2026', auteur: 'Ministère ESRS', date: '15 Mai 2026', type: 'CIRCULAIRE', destinataire: 'Direction', statut: true }
  ];

  noteForm: FormGroup;
  typesNotes = ['INTERNE', 'EXTERNE', 'CIRCULAIRE'];

  // BUDGET
  budgetPrevisionnel = [
    { poste: 'Fonctionnement', previsionnel: 45, realise: 32, couleur: '#006064' },
    { poste: 'Investissement', previsionnel: 20, realise: 8, couleur: '#e65100' },
    { poste: 'Personnel', previsionnel: 80, realise: 60, couleur: '#1565C0' },
    { poste: 'Recherche', previsionnel: 15, realise: 9, couleur: '#6A1B9A' },
    { poste: 'Communication', previsionnel: 5, realise: 3, couleur: '#2E7D32' }
  ];

  get totalPrevisionnel(): number {
    return this.budgetPrevisionnel.reduce((s, b) => s + b.previsionnel, 0);
  }

  get totalRealise(): number {
    return this.budgetPrevisionnel.reduce((s, b) => s + b.realise, 0);
  }

  get tauxExecution(): number {
    return Math.round((this.totalRealise / this.totalPrevisionnel) * 100);
  }

  budgetForm: FormGroup;

  // RH
  personnel = [
    { id: 1, nom: 'Amadou Diallo', poste: 'Directeur Pédagogique', type: 'ENSEIGNANT', statut: 'Permanent', initiales: 'AD', email: 'a.diallo@unchk.sn' },
    { id: 2, nom: 'Fatou Ndiaye', poste: 'Secrétaire Générale', type: 'ADMIN', statut: 'Permanent', initiales: 'FN', email: 'f.ndiaye@unchk.sn' },
    { id: 3, nom: 'Moussa Sow', poste: 'Tuteur Master IL', type: 'TUTEUR', statut: 'Vacataire', initiales: 'MS', email: 'm.sow@unchk.sn' },
    { id: 4, nom: 'Aïcha Mbaye', poste: 'Enseignante Informatique', type: 'ENSEIGNANT', statut: 'Permanent', initiales: 'AM', email: 'a.mbaye@unchk.sn' },
    { id: 5, nom: 'Omar Fall', poste: 'Agent Comptable', type: 'ADMIN', statut: 'Permanent', initiales: 'OF', email: 'o.fall@unchk.sn' },
    { id: 6, nom: 'Ibrahima Sarr', poste: 'Enseignant Associé', type: 'ENSEIGNANT_ASSOCIE', statut: 'Vacataire', initiales: 'IS', email: 'i.sarr@unchk.sn' }
  ];

  etudiants = [
    { id: 1, ine: '2024001', nom: 'Ousmane Kane', formation: 'Master IL P8', annee: '2024', statut: 'ACTIF', initiales: 'OK' },
    { id: 2, ine: '2024002', nom: 'Aïssatou Ba', formation: 'Licence Info P6', annee: '2024', statut: 'ACTIF', initiales: 'AB' },
    { id: 3, ine: '2023015', nom: 'Ibrahim Diop', formation: 'Master IL P7', annee: '2023', statut: 'DIPLOME', initiales: 'ID' },
    { id: 4, ine: '2024003', nom: 'Mariama Traoré', formation: 'Master IL P8', annee: '2024', statut: 'ACTIF', initiales: 'MT' },
    { id: 5, ine: '2022010', nom: 'Cheikh Lô', formation: 'Master IL P6', annee: '2022', statut: 'ABANDONNE', initiales: 'CL' }
  ];

  filtrePersonnel = 'TOUS';
  searchPersonnel = '';
  searchEtudiant = '';
  personnelForm: FormGroup;

  get personnelFiltres(): any[] {
    let result = this.personnel;
    if (this.filtrePersonnel !== 'TOUS') {
      result = result.filter(p => p.type === this.filtrePersonnel);
    }
    if (this.searchPersonnel) {
      const q = this.searchPersonnel.toLowerCase();
      result = result.filter(p => p.nom.toLowerCase().includes(q) || p.poste.toLowerCase().includes(q));
    }
    return result;
  }

  get etudiantsFiltres(): any[] {
    if (!this.searchEtudiant) return this.etudiants;
    const q = this.searchEtudiant.toLowerCase();
    return this.etudiants.filter(e =>
      e.nom.toLowerCase().includes(q) || e.ine.toLowerCase().includes(q) || e.formation.toLowerCase().includes(q)
    );
  }

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.courrierForm = this.fb.group({
      objet: ['', Validators.required],
      contenu: [''],
      expediteur: ['', Validators.required],
      destinataire: ['', Validators.required],
      type: ['ARRIVE', Validators.required],
      priorite: ['normale']
    });

    this.noteForm = this.fb.group({
      titre: ['', Validators.required],
      contenu: ['', Validators.required],
      auteur: ['', Validators.required],
      type: ['INTERNE', Validators.required],
      destinataire: ['', Validators.required]
    });

    this.budgetForm = this.fb.group({
      poste: ['', Validators.required],
      montantPrevisionnel: ['', Validators.required],
      montantRealise: [''],
      annee: ['2026']
    });

    this.personnelForm = this.fb.group({
      nom: ['', Validators.required],
      poste: ['', Validators.required],
      type: ['ENSEIGNANT', Validators.required],
      statut: ['Permanent', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadFromAPI();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initBudgetChart(), 800);
  }

  loadFromAPI(): void {
    this.apiService.get<any[]>('/api/administration/courriers').subscribe({
      next: (data) => { if (data.length > 0) this.courriersArrive = data.filter((c: any) => c.type === 'ARRIVE'); },
      error: () => {}
    });
  }

  initBudgetChart(): void {
    if (!this.budgetChartRef) return;
    new Chart(this.budgetChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        datasets: [
          {
            label: 'Prévisionnel (M FCFA)',
            data: [12, 22, 35, 48, 62, 75, 88, 102, 118, 132, 148, 165],
            borderColor: '#006064',
            backgroundColor: 'rgba(0,96,100,0.08)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#006064',
            pointRadius: 4
          },
          {
            label: 'Réalisé (M FCFA)',
            data: [10, 18, 28, 38, 50, 63, null, null, null, null, null, null],
            borderColor: '#e65100',
            backgroundColor: 'rgba(230,81,0,0.08)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#e65100',
            pointRadius: 4,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.05)' }
          }
        }
      }
    });
  }

  traiterCourrier(id: number): void {
    const c = this.courriersArrive.find(x => x.id === id);
    if (c) { c.statut = 'TRAITE'; this.snackBar.open('Courrier traité !', 'Fermer', { duration: 2000 }); }
  }

  submitCourrier(): void {
    if (this.courrierForm.invalid) return;
    this.apiService.post('/api/administration/courriers', this.courrierForm.value).subscribe({
      next: () => {
        this.snackBar.open('Courrier enregistré !', 'Fermer', { duration: 2000 });
        this.showForm = false;
        this.courrierForm.reset({ type: 'ARRIVE', priorite: 'normale' });
      },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000 })
    });
  }

  submitNote(): void {
    if (this.noteForm.invalid) return;
    const note = { ...this.noteForm.value, statut: false };
    this.notes.unshift({ ...note, id: Date.now(), date: new Date().toLocaleDateString('fr-FR') });
    this.snackBar.open('Note créée !', 'Fermer', { duration: 2000 });
    this.showForm = false;
    this.noteForm.reset({ type: 'INTERNE' });
  }

  submitBudget(): void {
    if (this.budgetForm.invalid) return;
    this.budgetPrevisionnel.push({
      poste: this.budgetForm.value.poste,
      previsionnel: +this.budgetForm.value.montantPrevisionnel,
      realise: +this.budgetForm.value.montantRealise || 0,
      couleur: '#006064'
    });
    this.snackBar.open('Budget enregistré !', 'Fermer', { duration: 2000 });
    this.showForm = false;
    this.budgetForm.reset({ annee: '2026' });
  }

  submitPersonnel(): void {
    if (this.personnelForm.invalid) return;
    const initiales = this.personnelForm.value.nom.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
    this.personnel.unshift({ ...this.personnelForm.value, id: Date.now(), initiales, email: this.personnelForm.value.email });
    this.snackBar.open('Personnel ajouté !', 'Fermer', { duration: 2000 });
    this.showForm = false;
    this.personnelForm.reset({ type: 'ENSEIGNANT', statut: 'Permanent' });
  }

  getStatutColor(statut: string): string {
    const colors: any = {
      'TRAITE': 'success', 'ENVOYE': 'success',
      'EN_COURS': 'warning', 'EN_ATTENTE': 'danger',
      'ACTIF': 'success', 'DIPLOME': 'info',
      'ABANDONNE': 'danger', 'SUSPENDU': 'warning'
    };
    return colors[statut] || 'default';
  }

  getStatutLabel(statut: string): string {
    const labels: any = {
      'TRAITE': 'Traité', 'ENVOYE': 'Envoyé',
      'EN_COURS': 'En cours', 'EN_ATTENTE': 'En attente',
      'ACTIF': 'Actif', 'DIPLOME': 'Diplômé',
      'ABANDONNE': 'Abandonné', 'SUSPENDU': 'Suspendu'
    };
    return labels[statut] || statut;
  }

  getPersonnelColor(type: string): string {
    const colors: any = {
      'ENSEIGNANT': '#006064', 'ADMIN': '#1565C0',
      'TUTEUR': '#e65100', 'ENSEIGNANT_ASSOCIE': '#6A1B9A'
    };
    return colors[type] || '#006064';
  }

  getPersonnelBg(type: string): string {
    const colors: any = {
      'ENSEIGNANT': '#e0f7fa', 'ADMIN': '#e3f2fd',
      'TUTEUR': '#fff3e0', 'ENSEIGNANT_ASSOCIE': '#ede7f6'
    };
    return colors[type] || '#e0f7fa';
  }

  getPrioriteColor(priorite: string): string {
    const colors: any = { 'urgente': 'danger', 'haute': 'warning', 'normale': 'success' };
    return colors[priorite] || 'info';
  }

  getNoteTypeColor(type: string): string {
    const colors: any = { 'INTERNE': '#006064', 'EXTERNE': '#1565C0', 'CIRCULAIRE': '#e65100' };
    return colors[type] || '#006064';
  }

  getNoteTypeBg(type: string): string {
    const colors: any = { 'INTERNE': '#e0f7fa', 'EXTERNE': '#e3f2fd', 'CIRCULAIRE': '#fff3e0' };
    return colors[type] || '#e0f7fa';
  }

  telechargerPDF(item: any): void {
    this.snackBar.open(`Téléchargement de "${item.titre || item.objet}"...`, 'Fermer', { duration: 2000 });
  }

  retour(): void {
    this.router.navigate(['/admin']);
  }
}