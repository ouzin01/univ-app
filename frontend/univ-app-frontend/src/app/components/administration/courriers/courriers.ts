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
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-courriers',
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
    MatChipsModule
  ],
  templateUrl: './courriers.html',
  styleUrl: './courriers.scss'
})
export class CourriersComponent implements OnInit {

  courriers: any[] = [];
  showForm = false;
  courrierForm: FormGroup;
  displayedColumns = ['objet', 'expediteur', 'destinataire', 'type', 'date', 'statut', 'actions'];
  typesCourrier = ['ARRIVE', 'DEPART'];

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
      type: ['ARRIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCourriers();
  }

  loadCourriers(): void {
    this.apiService.get<any[]>('/api/administration/courriers').subscribe({
      next: (data) => this.courriers = data,
      error: () => this.snackBar.open('Erreur de chargement', 'Fermer', { duration: 3000 })
    });
  }

  onSubmit(): void {
    if (this.courrierForm.invalid) return;
    this.apiService.post('/api/administration/courriers', this.courrierForm.value).subscribe({
      next: () => {
        this.snackBar.open('Courrier enregistré !', 'Fermer', { duration: 3000 });
        this.showForm = false;
        this.courrierForm.reset({ type: 'ARRIVE' });
        this.loadCourriers();
      },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000 })
    });
  }

  traiter(id: number): void {
    this.apiService.put(`/api/administration/courriers/${id}/traiter`, {}).subscribe({
      next: () => {
        this.snackBar.open('Courrier traité !', 'Fermer', { duration: 3000 });
        this.loadCourriers();
      },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000 })
    });
  }

  retour(): void {
    this.router.navigate(['/admin']);
  }
}