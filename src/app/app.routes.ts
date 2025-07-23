import { Routes } from '@angular/router';
import { LoginComponent } from './login.component/login.component';
import { DashboardComponent } from './dashboard.component/dashboard.component'; // المسار حسب مكانه
import { AuthGuard } from './services/auth.guard'; // اختيارياً إذا أضفت حماية

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // حماية المسار
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
