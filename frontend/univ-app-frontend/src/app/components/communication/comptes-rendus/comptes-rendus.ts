import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-comptes-rendus',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule
  ],
  templateUrl: './comptes-rendus.html',
  styleUrl: './comptes-rendus.scss'
})
export class ComptesRendusComponent implements OnInit {

  comptesRendus: any[] = [];
  showForm = false;
  crForm: FormGroup;
  displayedColumns = ['titre', 'typeInstance', 'auteur', 'dateCreation', 'statut', 'actions'];

  typesInstance = ['REUNION', 'RENCONTRE', 'SEMINAIRE', 'WEBINAIRE', 'CONSEIL_UNIVERSITE'];

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
  }

  ngOnInit(): void {
    this.loadComptesRendus();
  }

  loadComptesRendus(): void {
    this.apiService.get<any[]>('/api/communication/comptes-rendus').subscribe({
      next: (data) => this.comptesRendus = data,
      error: () => this.snackBar.open('Erreur de chargement', 'Fermer', { duration: 3000 })
    });
  }

  onSubmit(): void {
    if (this.crForm.invalid) return;
    this.apiService.post('/api/communication/comptes-rendus', this.crForm.value).subscribe({
      next: () => {
        this.snackBar.open('Compte rendu créé !', 'Fermer', { duration: 3000 });
        this.showForm = false;
        this.crForm.reset();
        this.loadComptesRendus();
      },
      error: () => this.snackBar.open('Erreur lors de la création', 'Fermer', { duration: 3000 })
    });
  }

  publier(id: number): void {
    this.apiService.put(`/api/communication/comptes-rendus/${id}/publier`, {}).subscribe({
      next: () => {
        this.snackBar.open('Compte rendu publié !', 'Fermer', { duration: 3000 });
        this.loadComptesRendus();
      },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000 })
    });
  }

  retour(): void {
    this.router.navigate(['/admin']);
  }
}