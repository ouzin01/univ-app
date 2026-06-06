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
  selector: 'app-formation-list',
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
  templateUrl: './formation-list.html',
  styleUrl: './formation-list.scss'
})
export class FormationListComponent implements OnInit {

  formations: any[] = [];
  filteredFormations: any[] = [];
  searchQuery = '';
  displayedColumns = ['intitule', 'niveauEtudes', 'typeFormation', 'responsable', 'apprenants', 'actions'];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.apiService.get<any[]>('/api/formations').subscribe({
      next: (data) => {
        this.formations = data;
        this.filteredFormations = data;
      },
      error: () => this.snackBar.open('Erreur de chargement', 'Fermer', { duration: 3000 })
    });
  }

  filterFormations(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredFormations = this.formations.filter(f =>
      f.intitule?.toLowerCase().includes(q) ||
      f.niveauEtudes?.toLowerCase().includes(q) ||
      f.responsableFormation?.toLowerCase().includes(q)
    );
  }

  nouvelleFormation(): void {
    this.router.navigate(['/formations/nouvelle']);
  }

  supprimerFormation(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.apiService.delete(`/api/formations/${id}`).subscribe({
        next: () => {
          this.snackBar.open('Formation supprimée', 'Fermer', { duration: 3000 });
          this.loadFormations();
        },
        error: () => this.snackBar.open('Erreur de suppression', 'Fermer', { duration: 3000 })
      });
    }
  }

  retour(): void {
    this.router.navigate(['/admin']);
  }
}