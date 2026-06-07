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
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from '../../layout/navbar/navbar';

@Component({
  selector: 'app-etudiant-list',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, RouterModule,
    MatCardModule, MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatToolbarModule, MatSelectModule,
    MatSnackBarModule, MatTabsModule, MatTooltipModule,
    MatSidenavModule, MatListModule, MatChipsModule,
    MatDialogModule, NavbarComponent
  ],
  templateUrl: './etudiant-list.html',
  styleUrl: './etudiant-list.scss'
})
export class EtudiantListComponent implements OnInit {

  activeTab = 0;
  showForm = false;
  selectedEtudiant: any = null;
  showDetail = false;

  menuItems = [
    { icon: 'dashboard', label: 'Tableau de bord', route: '/admin' },
    { icon: 'people', label: 'Étudiants', route: '/etudiants' },
    { icon: 'school', label: 'Formations', route: '/formations' },
    { icon: 'campaign', label: 'Communication', route: '/communication' },
    { icon: 'admin_panel_settings', label: 'Administration', route: '/administration' },
    { icon: 'work', label: 'Insertion', route: '/insertion' }
  ];

  stats = [
    { label: 'Total étudiants', value: 320, icon: 'people' },
    { label: 'Actifs', value: 285, icon: 'check_circle' },
    { label: 'Diplômés', value: 28, icon: 'workspace_premium' },
    { label: 'Promotions', value: 8, icon: 'groups' }
  ];

  etudiants = [
    {
      id: 1, ine: '2024001', nom: 'Kane', prenom: 'Ousmane',
      dateNaissance: '2000-03-15', formation: 'Master Ingénierie Logicielle',
      promo: 'P8', anneeDebut: 2024, anneeSortie: 2026,
      statut: 'ACTIF', initiales: 'OK', email: 'o.kane@unchk.sn',
      telephone: '+221 77 123 45 67', genre: 'M',
      diplomes: [
        { titre: 'Licence Informatique', etablissement: 'UCAD', annee: 2023, mention: 'Bien' }
      ],
      autresFormations: [
        { titre: 'Certification Python', organisme: 'Coursera', annee: 2022 }
      ]
    },
    {
      id: 2, ine: '2024002', nom: 'Ba', prenom: 'Aïssatou',
      dateNaissance: '2001-07-22', formation: 'Licence Informatique',
      promo: 'P6', anneeDebut: 2024, anneeSortie: 2025,
      statut: 'ACTIF', initiales: 'AB', email: 'a.ba@unchk.sn',
      telephone: '+221 78 234 56 78', genre: 'F',
      diplomes: [
        { titre: 'Baccalauréat S2', etablissement: 'Lycée JFK', annee: 2021, mention: 'Bien' }
      ],
      autresFormations: []
    },
    {
      id: 3, ine: '2023015', nom: 'Diop', prenom: 'Ibrahim',
      dateNaissance: '1999-11-05', formation: 'Master Ingénierie Logicielle',
      promo: 'P7', anneeDebut: 2023, anneeSortie: 2025,
      statut: 'DIPLOME', initiales: 'ID', email: 'i.diop@unchk.sn',
      telephone: '+221 76 345 67 89', genre: 'M',
      diplomes: [
        { titre: 'Master IL', etablissement: 'UNCHK', annee: 2025, mention: 'Très bien' },
        { titre: 'Licence Informatique', etablissement: 'UCAD', annee: 2022, mention: 'Assez bien' }
      ],
      autresFormations: [
        { titre: 'AWS Cloud Practitioner', organisme: 'Amazon', annee: 2024 },
        { titre: 'Scrum Master', organisme: 'Scrum.org', annee: 2023 }
      ]
    },
    {
      id: 4, ine: '2024003', nom: 'Traoré', prenom: 'Mariama',
      dateNaissance: '2001-04-18', formation: 'Master Ingénierie Logicielle',
      promo: 'P8', anneeDebut: 2024, anneeSortie: 2026,
      statut: 'ACTIF', initiales: 'MT', email: 'm.traore@unchk.sn',
      telephone: '+221 70 456 78 90', genre: 'F',
      diplomes: [
        { titre: 'Licence Informatique', etablissement: 'UNCHK', annee: 2024, mention: 'Bien' }
      ],
      autresFormations: [
        { titre: 'Formation UX/UI Design', organisme: 'Google', annee: 2023 }
      ]
    },
    {
      id: 5, ine: '2022010', nom: 'Lô', prenom: 'Cheikh',
      dateNaissance: '1998-09-12', formation: 'Master Ingénierie Logicielle',
      promo: 'P6', anneeDebut: 2022, anneeSortie: 2024,
      statut: 'ABANDONNE', initiales: 'CL', email: 'c.lo@unchk.sn',
      telephone: '+221 77 567 89 01', genre: 'M',
      diplomes: [],
      autresFormations: []
    },
    {
      id: 6, ine: '2024004', nom: 'Sall', prenom: 'Fatou',
      dateNaissance: '2000-12-30', formation: 'Master Data Science',
      promo: 'P2', anneeDebut: 2024, anneeSortie: 2026,
      statut: 'ACTIF', initiales: 'FS', email: 'f.sall@unchk.sn',
      telephone: '+221 78 678 90 12', genre: 'F',
      diplomes: [
        { titre: 'Licence Mathématiques', etablissement: 'UCAD', annee: 2023, mention: 'Très bien' }
      ],
      autresFormations: [
        { titre: 'Machine Learning Specialization', organisme: 'Coursera', annee: 2023 }
      ]
    },
    {
      id: 7, ine: '2024005', nom: 'Diallo', prenom: 'Mamadou',
      dateNaissance: '2001-02-14', formation: 'Licence Informatique',
      promo: 'P6', anneeDebut: 2024, anneeSortie: 2025,
      statut: 'ACTIF', initiales: 'MD', email: 'm.diallo@unchk.sn',
      telephone: '+221 77 789 01 23', genre: 'M',
      diplomes: [
        { titre: 'Baccalauréat S1', etablissement: 'Lycée Lamine Guèye', annee: 2022, mention: 'Passable' }
      ],
      autresFormations: []
    },
    {
      id: 8, ine: '2023020', nom: 'Mbaye', prenom: 'Rokhaya',
      dateNaissance: '2000-06-08', formation: 'Master Data Science',
      promo: 'P1', anneeDebut: 2023, anneeSortie: 2025,
      statut: 'DIPLOME', initiales: 'RM', email: 'r.mbaye@unchk.sn',
      telephone: '+221 76 890 12 34', genre: 'F',
      diplomes: [
        { titre: 'Master Data Science', etablissement: 'UNCHK', annee: 2025, mention: 'Très bien' },
        { titre: 'Licence Statistiques', etablissement: 'UCAD', annee: 2022, mention: 'Bien' }
      ],
      autresFormations: [
        { titre: 'Deep Learning Specialization', organisme: 'Coursera', annee: 2024 }
      ]
    }
  ];

  etudiantForm: FormGroup;
  searchEtudiant = '';
  filtreStatut = 'TOUS';
  filtreFormation = 'TOUTES';
  filtrePromo = 'TOUTES';

  get formations(): string[] {
    return [...new Set(this.etudiants.map(e => e.formation))];
  }

  get promotions(): string[] {
    return [...new Set(this.etudiants.map(e => e.promo))];
  }

  get etudiantsFiltres(): any[] {
    let result = this.etudiants;
    if (this.filtreStatut !== 'TOUS') result = result.filter(e => e.statut === this.filtreStatut);
    if (this.filtreFormation !== 'TOUTES') result = result.filter(e => e.formation === this.filtreFormation);
    if (this.filtrePromo !== 'TOUTES') result = result.filter(e => e.promo === this.filtrePromo);
    if (this.searchEtudiant) {
      const q = this.searchEtudiant.toLowerCase();
      result = result.filter(e =>
        e.nom.toLowerCase().includes(q) ||
        e.prenom.toLowerCase().includes(q) ||
        e.ine.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q)
      );
    }
    return result;
  }

  get statsParStatut() {
    return {
      actifs: this.etudiants.filter(e => e.statut === 'ACTIF').length,
      diplomes: this.etudiants.filter(e => e.statut === 'DIPLOME').length,
      abandonnes: this.etudiants.filter(e => e.statut === 'ABANDONNE').length,
      suspendus: this.etudiants.filter(e => e.statut === 'SUSPENDU').length
    };
  }

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.etudiantForm = this.fb.group({
      ine: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      genre: ['M', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      formation: ['', Validators.required],
      promo: ['', Validators.required],
      anneeDebut: ['', Validators.required],
      anneeSortie: ['', Validators.required],
      statut: ['ACTIF', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFromAPI();
  }

  loadFromAPI(): void {
    this.apiService.get<any[]>('/api/etudiants').subscribe({
      next: (data) => { if (data.length > 0) this.etudiants = data; },
      error: () => {}
    });
  }

  voirDetail(etudiant: any): void {
    this.selectedEtudiant = etudiant;
    this.showDetail = true;
  }

  fermerDetail(): void {
    this.showDetail = false;
    this.selectedEtudiant = null;
  }

  submitEtudiant(): void {
    if (this.etudiantForm.invalid) return;
    const initiales = (this.etudiantForm.value.prenom[0] + this.etudiantForm.value.nom[0]).toUpperCase();
    this.etudiants.unshift({
      ...this.etudiantForm.value, id: Date.now(),
      initiales, diplomes: [], autresFormations: []
    });
    this.stats[0].value = this.etudiants.length;
    this.snackBar.open('Étudiant ajouté !', 'Fermer', { duration: 2000 });
    this.showForm = false;
    this.etudiantForm.reset({ genre: 'M', statut: 'ACTIF' });
  }

  telechargerFiche(etudiant: any): void {
    const contenu = `
UNIVERSITÉ NUMÉRIQUE CHEIKH HAMIDOU KANE
==========================================
FICHE ÉTUDIANT

INE         : ${etudiant.ine}
Nom         : ${etudiant.nom} ${etudiant.prenom}
Naissance   : ${new Date(etudiant.dateNaissance).toLocaleDateString('fr-FR')}
Formation   : ${etudiant.formation}
Promotion   : ${etudiant.promo}
Année début : ${etudiant.anneeDebut}
Année sortie: ${etudiant.anneeSortie}
Statut      : ${etudiant.statut}
==========================================
DIPLÔMES :
${etudiant.diplomes.map((d: any) => `- ${d.titre} (${d.etablissement}, ${d.annee}) — ${d.mention}`).join('\n') || 'Aucun'}

AUTRES FORMATIONS :
${etudiant.autresFormations.map((f: any) => `- ${f.titre} (${f.organisme}, ${f.annee})`).join('\n') || 'Aucune'}
    `;
    const blob = new Blob([contenu], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Fiche_${etudiant.nom}_${etudiant.prenom}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.snackBar.open('Fiche téléchargée !', 'Fermer', { duration: 2000 });
  }

  getStatutColor(statut: string): string {
    const c: any = { 'ACTIF': 'success', 'DIPLOME': 'info', 'ABANDONNE': 'danger', 'SUSPENDU': 'warning' };
    return c[statut] || 'default';
  }

  getStatutLabel(statut: string): string {
    const l: any = { 'ACTIF': 'Actif', 'DIPLOME': 'Diplômé', 'ABANDONNE': 'Abandonné', 'SUSPENDU': 'Suspendu' };
    return l[statut] || statut;
  }

  getAvatarBg(statut: string): string {
    const c: any = { 'ACTIF': '#e0f7fa', 'DIPLOME': '#e3f2fd', 'ABANDONNE': '#ffebee', 'SUSPENDU': '#fff3e0' };
    return c[statut] || '#e0f7fa';
  }

  getAvatarColor(statut: string): string {
    const c: any = { 'ACTIF': '#006064', 'DIPLOME': '#1565C0', 'ABANDONNE': '#c62828', 'SUSPENDU': '#e65100' };
    return c[statut] || '#006064';
  }
}