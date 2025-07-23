import { Routes } from '@angular/router';
import { LoginComponent } from './login.component/login.component';
import { App } from './app'; // أو DashboardComponent
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: App, canActivate: [authGuard] }, // 👈 محمي
  { path: '**', redirectTo: 'login' },
];
