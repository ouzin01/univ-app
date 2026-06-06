import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-etudiant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  templateUrl: './etudiant-form.html',
  styleUrl: './etudiant-form.scss'
})
export class EtudiantFormComponent {
  etudiantForm: FormGroup;
  loading = false;

  statuts = ['ACTIF', 'DIPLOME', 'ABANDONNE', 'SUSPENDU'];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.etudiantForm = this.fb.group({
      ine: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: [''],
      email: ['', Validators.email],
      telephone: [''],
      formation: ['', Validators.required],
      promotion: ['', Validators.required],
      anneeDebut: [''],
      anneeSortie: [''],
      diplomesObtenus: [''],
      autresFormations: [''],
      statut: ['ACTIF', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.etudiantForm.invalid) return;
    this.loading = true;

    this.apiService.post('/api/etudiants', this.etudiantForm.value).subscribe({
      next: () => {
        this.snackBar.open('Étudiant créé avec succès !', 'Fermer', { duration: 3000 });
        this.router.navigate(['/etudiants']);
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Erreur lors de la création', 'Fermer', { duration: 3000 });
      }
    });
  }

  retour(): void {
    this.router.navigate(['/etudiants']);
  }
}