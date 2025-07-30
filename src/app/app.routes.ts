import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component/login.component';
import { DashboardComponent } from './components/dashboard.component/dashboard.component'; // المسار حسب مكانه
import { AuthGuard } from './components/auth.guard'; // اختيارياً إذا أضفت حماية
import { BookManagerComponent } from './components/book-manager.component/book-manager.component';

export const routes: Routes = [
   { path: 'books', component: BookManagerComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // حماية المسار
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
