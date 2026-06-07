import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { LoginComponent } from './components/login/login';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard';
import { EtudiantDashboardComponent } from './components/dashboard/etudiant-dashboard/etudiant-dashboard';
import { FormateurDashboardComponent } from './components/dashboard/formateur-dashboard/formateur-dashboard';
import { EtudiantListComponent } from './components/etudiants/etudiant-list/etudiant-list';
import { EtudiantFormComponent } from './components/etudiants/etudiant-form/etudiant-form';
import { FormationListComponent } from './components/formations/formation-list/formation-list';
import { FormationFormComponent } from './components/formations/formation-form/formation-form';
import { ComptesRendusComponent } from './components/communication/comptes-rendus/comptes-rendus';
import { CourriersComponent } from './components/administration/courriers/courriers';
import { InsertionComponent } from './components/insertion/insertion/insertion';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'etudiant', component: EtudiantDashboardComponent, canActivate: [authGuard] },
  { path: 'formateur', component: FormateurDashboardComponent, canActivate: [authGuard] },
  { path: 'etudiants', component: EtudiantListComponent, canActivate: [authGuard] },
  { path: 'etudiants/nouveau', component: EtudiantFormComponent, canActivate: [authGuard] },
  { path: 'formations', component: FormationListComponent, canActivate: [authGuard] },
  { path: 'formations/nouvelle', component: FormationFormComponent, canActivate: [authGuard] },
  { path: 'communication', component: ComptesRendusComponent, canActivate: [authGuard] },
  { path: 'administration', component: CourriersComponent, canActivate: [authGuard] },
  { path: 'insertion', component: InsertionComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' },
];