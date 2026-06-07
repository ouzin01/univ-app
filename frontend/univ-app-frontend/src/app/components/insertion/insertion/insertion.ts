import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
import { NavbarComponent } from '../../../components/layout/navbar/navbar';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-insertion',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, RouterModule,
    MatCardModule, MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatToolbarModule, MatSelectModule,
    MatSnackBarModule, MatTabsModule, MatTooltipModule,
    MatSidenavModule, MatListModule, NavbarComponent
  ],
  templateUrl: './insertion.html',
  styleUrl: './insertion.scss'
})
export class InsertionComponent implements OnInit, AfterViewInit {

  @ViewChild('insertionChart') insertionChartRef!: ElementRef;
  @ViewChild('evolutionChart') evolutionChartRef!: ElementRef;

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
    { label: 'Étudiants suivis', value: 142, icon: 'people' },
    { label: 'Stages effectués', value: 89, icon: 'work_history' },
    { label: 'Taux insertion', value: 78, icon: 'trending_up', suffix: '%' },
    { label: 'Partenaires', value: 34, icon: 'handshake' }
  ];

  // SUIVI ETUDIANTS
  contacts = [
    { id: 1, nom: 'Ousmane Kane', formation: 'Master IL P8', promotion: '2024', telephone: '+221 77 123 45 67', email: 'o.kane@email.com', statut: 'EN_STAGE', entreprise: 'Orange Sénégal', initiales: 'OK' },
    { id: 2, nom: 'Aïssatou Ba', formation: 'Master IL P8', promotion: '2024', telephone: '+221 78 234 56 78', email: 'a.ba@email.com', statut: 'EN_RECHERCHE', entreprise: '', initiales: 'AB' },
    { id: 3, nom: 'Ibrahim Diop', formation: 'Master IL P7', promotion: '2023', telephone: '+221 76 345 67 89', email: 'i.diop@email.com', statut: 'EMPLOYE', entreprise: 'Sonatel', initiales: 'ID' },
    { id: 4, nom: 'Mariama Traoré', formation: 'Master IL P8', promotion: '2024', telephone: '+221 70 456 78 90', email: 'm.traore@email.com', statut: 'AUTO_EMPLOI', entreprise: 'MT Consulting', initiales: 'MT' },
    { id: 5, nom: 'Cheikh Lô', formation: 'Master IL P7', promotion: '2023', telephone: '+221 77 567 89 01', email: 'c.lo@email.com', statut: 'EN_STAGE', entreprise: 'GIZ Sénégal', initiales: 'CL' },
    { id: 6, nom: 'Fatou Sall', formation: 'Master IL P6', promotion: '2022', telephone: '+221 78 678 90 12', email: 'f.sall@email.com', statut: 'EMPLOYE', entreprise: 'Expresso', initiales: 'FS' }
  ];

  stages = [
    { id: 1, etudiant: 'Ousmane Kane', formation: 'Master IL P8', entreprise: 'Orange Sénégal', sujet: 'Développement application mobile', duree: '6 mois', debut: 'Jan 2026', fin: 'Jun 2026', statut: 'EN_COURS', note: null },
    { id: 2, etudiant: 'Cheikh Lô', formation: 'Master IL P7', entreprise: 'GIZ Sénégal', sujet: 'Système d\'information RH', duree: '4 mois', debut: 'Mar 2026', fin: 'Jun 2026', statut: 'EN_COURS', note: null },
    { id: 3, etudiant: 'Ibrahim Diop', formation: 'Master IL P7', entreprise: 'Sonatel', sujet: 'API REST microservices', duree: '6 mois', debut: 'Jul 2023', fin: 'Dec 2023', statut: 'VALIDE', note: 17 },
    { id: 4, etudiant: 'Fatou Sall', formation: 'Master IL P6', entreprise: 'Expresso', sujet: 'Migration cloud AWS', duree: '5 mois', debut: 'Feb 2023', fin: 'Jun 2023', statut: 'VALIDE', note: 16 },
    { id: 5, etudiant: 'Aïssatou Ba', formation: 'Master IL P8', entreprise: 'À définir', sujet: 'À définir', duree: '6 mois', debut: '', fin: '', statut: 'EN_ATTENTE', note: null }
  ];

  contactForm: FormGroup;
  stageForm: FormGroup;
  searchContact = '';
  filtreStatutContact = 'TOUS';

  get contactsFiltres(): any[] {
    let result = this.contacts;
    if (this.filtreStatutContact !== 'TOUS') {
      result = result.filter(c => c.statut === this.filtreStatutContact);
    }
    if (this.searchContact) {
      const q = this.searchContact.toLowerCase();
      result = result.filter(c => c.nom.toLowerCase().includes(q) || c.formation.toLowerCase().includes(q));
    }
    return result;
  }

  // INSERTION PRO
  statsInsertion = {
    autoEmploi: 22,
      emploiSalarie: 48,
    enRecherche: 18,
    enStage: 12
  };

  sortants = [
    { promotion: 'P7 (2023)', total: 35, autoEmploi: 8, emploiSalarie: 18, enRecherche: 6, stage: 3 },
    { promotion: 'P6 (2022)', total: 32, autoEmploi: 6, emploiSalarie: 20, enRecherche: 4, stage: 2 },
    { promotion: 'P5 (2021)', total: 28, autoEmploi: 5, emploiSalarie: 16, enRecherche: 5, stage: 2 },
    { promotion: 'P4 (2020)', total: 25, autoEmploi: 4, emploiSalarie: 15, enRecherche: 4, stage: 2 }
  ];

  // PARTENAIRES
  partenaires = [
    { id: 1, nom: 'Orange Sénégal', secteur: 'Télécommunications', type: 'ENTREPRISE', contact: 'Amadou Fall', email: 'a.fall@orange.sn', telephone: '+221 33 869 00 00', conventions: 3, stagiaires: 8, statut: 'ACTIF' },
    { id: 2, nom: 'Sonatel', secteur: 'Télécommunications', type: 'ENTREPRISE', contact: 'Marie Diallo', email: 'm.diallo@sonatel.sn', telephone: '+221 33 839 00 00', conventions: 2, stagiaires: 5, statut: 'ACTIF' },
    { id: 3, nom: 'GIZ Sénégal', secteur: 'Coopération internationale', type: 'ONG', contact: 'Klaus Müller', email: 'k.muller@giz.de', telephone: '+221 33 889 00 00', conventions: 1, stagiaires: 3, statut: 'ACTIF' },
    { id: 4, nom: 'Expresso Sénégal', secteur: 'Télécommunications', type: 'ENTREPRISE', contact: 'Ibou Ndiaye', email: 'i.ndiaye@expresso.sn', telephone: '+221 33 333 00 00', conventions: 2, stagiaires: 4, statut: 'ACTIF' },
    { id: 5, nom: 'Ministère du Numérique', secteur: 'Administration publique', type: 'INSTITUTION', contact: 'Dr. Sow', email: 'd.sow@numerique.gouv.sn', telephone: '+221 33 849 00 00', conventions: 1, stagiaires: 2, statut: 'ACTIF' },
    { id: 6, nom: 'Wave Mobile Money', secteur: 'Fintech', type: 'ENTREPRISE', contact: 'Astou Mbaye', email: 'a.mbaye@wave.com', telephone: '+221 33 800 00 00', conventions: 1, stagiaires: 2, statut: 'PROSPECT' }
  ];

  partenaireForm: FormGroup;
  searchPartenaire = '';
  filtreTypePartenaire = 'TOUS';

  get partenairesFiltres(): any[] {
    let result = this.partenaires;
    if (this.filtreTypePartenaire !== 'TOUS') {
      result = result.filter(p => p.type === this.filtreTypePartenaire);
    }
    if (this.searchPartenaire) {
      const q = this.searchPartenaire.toLowerCase();
      result = result.filter(p => p.nom.toLowerCase().includes(q) || p.secteur.toLowerCase().includes(q));
    }
    return result;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      nom: ['', Validators.required],
      formation: ['', Validators.required],
      promotion: ['', Validators.required],
      telephone: [''],
      email: ['', Validators.email],
      statut: ['EN_RECHERCHE', Validators.required],
      entreprise: ['']
    });

    this.stageForm = this.fb.group({
      etudiant: ['', Validators.required],
      entreprise: ['', Validators.required],
      sujet: ['', Validators.required],
      duree: ['', Validators.required],
      debut: [''],
      fin: ['']
    });

    this.partenaireForm = this.fb.group({
      nom: ['', Validators.required],
      secteur: ['', Validators.required],
      type: ['ENTREPRISE', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['']
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initInsertionChart();
      this.initEvolutionChart();
    }, 800);
  }

  initInsertionChart(): void {
    if (!this.insertionChartRef) return;
    new Chart(this.insertionChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Auto-emploi', 'Emploi salarié', 'En recherche', 'En stage'],
        datasets: [{
          data: [this.statsInsertion.autoEmploi, this.statsInsertion.emploiSalarie, this.statsInsertion.enRecherche, this.statsInsertion.enStage],
          backgroundColor: ['#006064', '#1565C0', '#e65100', '#6A1B9A'],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        },
        cutout: '65%'
      }
    });
  }

  initEvolutionChart(): void {
    if (!this.evolutionChartRef) return;
    new Chart(this.evolutionChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.sortants.map(s => s.promotion),
        datasets: [
          {
            label: 'Auto-emploi',
            data: this.sortants.map(s => s.autoEmploi),
            backgroundColor: '#006064'
          },
          {
            label: 'Emploi salarié',
            data: this.sortants.map(s => s.emploiSalarie),
            backgroundColor: '#1565C0'
          },
          {
            label: 'En recherche',
            data: this.sortants.map(s => s.enRecherche),
            backgroundColor: '#e65100'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true }
        }
      }
    });
  }

  getStatutColor(statut: string): string {
    const colors: any = {
      'EN_STAGE': 'info', 'EN_RECHERCHE': 'warning',
      'EMPLOYE': 'success', 'AUTO_EMPLOI': 'purple',
      'EN_COURS': 'info', 'VALIDE': 'success', 'EN_ATTENTE': 'warning',
      'ACTIF': 'success', 'PROSPECT': 'warning'
    };
    return colors[statut] || 'default';
  }

  getStatutLabel(statut: string): string {
    const labels: any = {
      'EN_STAGE': 'En stage', 'EN_RECHERCHE': 'En recherche',
      'EMPLOYE': 'Employé', 'AUTO_EMPLOI': 'Auto-emploi',
      'EN_COURS': 'En cours', 'VALIDE': 'Validé', 'EN_ATTENTE': 'En attente',
      'ACTIF': 'Actif', 'PROSPECT': 'Prospect'
    };
    return labels[statut] || statut;
  }

  getTypePartenaire(type: string): string {
    const colors: any = { 'ENTREPRISE': '#006064', 'ONG': '#6A1B9A', 'INSTITUTION': '#1565C0' };
    return colors[type] || '#006064';
  }

  getTypePartenaireBg(type: string): string {
    const colors: any = { 'ENTREPRISE': '#e0f7fa', 'ONG': '#ede7f6', 'INSTITUTION': '#e3f2fd' };
    return colors[type] || '#e0f7fa';
  }

  submitContact(): void {
    if (this.contactForm.invalid) return;
    const initiales = this.contactForm.value.nom.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
    this.contacts.unshift({ ...this.contactForm.value, id: Date.now(), initiales });
    this.snackBar.open('Contact ajouté !', 'Fermer', { duration: 2000 });
    this.showForm = false;
    this.contactForm.reset({ statut: 'EN_RECHERCHE' });
  }

  submitStage(): void {
    if (this.stageForm.invalid) return;
    this.stages.unshift({ ...this.stageForm.value, id: Date.now(), statut: 'EN_COURS', note: null });
    this.snackBar.open('Stage enregistré !', 'Fermer', { duration: 2000 });
    this.showForm = false;
    this.stageForm.reset();
  }

  submitPartenaire(): void {
    if (this.partenaireForm.invalid) return;
    this.partenaires.unshift({ ...this.partenaireForm.value, id: Date.now(), conventions: 0, stagiaires: 0, statut: 'PROSPECT' });
    this.snackBar.open('Partenaire ajouté !', 'Fermer', { duration: 2000 });
    this.showForm = false;
    this.partenaireForm.reset({ type: 'ENTREPRISE' });
  }
}