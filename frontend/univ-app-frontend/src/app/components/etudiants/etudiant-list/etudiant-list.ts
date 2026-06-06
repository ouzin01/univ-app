import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-etudiant-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  templateUrl: './etudiant-list.html',
  styleUrl: './etudiant-list.scss'
})
export class EtudiantListComponent implements OnInit {

  etudiants: any[] = [];
  filteredEtudiants: any[] = [];
  searchQuery = '';
  displayedColumns = ['ine', 'nom', 'prenom', 'formation', 'promotion', 'statut', 'actions'];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.apiService.get<any[]>('/api/etudiants').subscribe({
      next: (data) => {
        this.etudiants = data;
        this.filteredEtudiants = data;
      },
      error: () => this.snackBar.open('Erreur de chargement', 'Fermer', { duration: 3000 })
    });
  }

  filterEtudiants(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredEtudiants = this.etudiants.filter(e =>
      e.nom?.toLowerCase().includes(q) ||
      e.prenom?.toLowerCase().includes(q) ||
      e.ine?.toLowerCase().includes(q) ||
      e.formation?.toLowerCase().includes(q)
    );
  }

  nouveauEtudiant(): void {
    this.router.navigate(['/etudiants/nouveau']);
  }

  supprimerEtudiant(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.apiService.delete(`/api/etudiants/${id}`).subscribe({
        next: () => {
          this.snackBar.open('Etudiant supprimé', 'Fermer', { duration: 3000 });
          this.loadEtudiants();
        },
        error: () => this.snackBar.open('Erreur de suppression', 'Fermer', { duration: 3000 })
      });
    }
  }

  retour(): void {
    this.router.navigate(['/admin']);
  }
}