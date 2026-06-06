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
  selector: 'app-formation-form',
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
  templateUrl: './formation-form.html',
  styleUrl: './formation-form.scss'
})
export class FormationFormComponent {
  formationForm: FormGroup;
  loading = false;

  typesFormation = ['INITIALE', 'CONTINUE', 'CERTIFICATION', 'PRIVEE'];
  typesFinancement = ['PUBLIC', 'PRIVE', 'MIXTE', 'BOURSE'];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.formationForm = this.fb.group({
      intitule: ['', Validators.required],
      description: [''],
      dateDebut: [''],
      dateFin: [''],
      typeFormation: ['INITIALE', Validators.required],
      niveauEtudes: ['', Validators.required],
      montantFinancement: [''],
      typeFinancement: ['PUBLIC'],
      nbApprenantsHommes: [0],
      nbApprenantsFemmes: [0],
      responsableFormation: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formationForm.invalid) return;
    this.loading = true;

    this.apiService.post('/api/formations', this.formationForm.value).subscribe({
      next: () => {
        this.snackBar.open('Formation créée avec succès !', 'Fermer', { duration: 3000 });
        this.router.navigate(['/formations']);
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Erreur lors de la création', 'Fermer', { duration: 3000 });
      }
    });
  }

  retour(): void {
    this.router.navigate(['/formations']);
  }
}