import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  usernameControl = new FormControl('');
  passwordControl = new FormControl('');
  isLoading = false;
  error = '';
  hidePassword = true;
  rememberMe = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    const username = this.usernameControl.value || '';
    const password = this.passwordControl.value || '';

    if (!username || !password) {
      this.error = 'Veuillez remplir tous les champs.';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.authService.login(username, password).subscribe({
      next: (response) => {
        if (this.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        setTimeout(() => {
          this.isLoading = false;
          switch (response.role) {
            case 'ADMIN': this.router.navigate(['/admin']); break;
            case 'ETUDIANT': this.router.navigate(['/etudiant']); break;
            case 'ENSEIGNANT':
            case 'ENSEIGNANT_ASSOCIE':
            case 'TUTEUR':
            case 'RESPONSABLE_FORMATION': this.router.navigate(['/formateur']); break;
            default: this.router.navigate(['/admin']);
          }
        }, 2000);
      },
      error: () => {
        this.isLoading = false;
        this.error = 'Identifiants incorrects. Veuillez réessayer.';
      }
    });
  }

  onForgotPassword(): void {
    alert('Veuillez contacter l\'administration : admin@unchk.edu.sn');
  }
}