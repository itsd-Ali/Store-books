// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';


import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
  /* template: `
    <form (submit)="onSubmit($event)">
      <input [(ngModel)]="username" name="username" placeholder="Username">
      <input [(ngModel)]="password" name="password" placeholder="Password" type="password">
      <button type="submit">Login</button>
    </form>
    <p>{{ message }}</p>
  `, */
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';
  logo: string = 'assets/images/logo.png'; // Update the path as needed
  constructor(private authService: AuthService, private router: Router) {}

 onSubmit(event: Event) {
  event.preventDefault();

  this.authService.login(this.username, this.password).subscribe({
    next: res => {
      localStorage.setItem('token', 'logged-in'); // 👈 نحفظ حالة الدخول
      this.message = res;
      this.router.navigate(['/dashboard']);       // 👈 ننتقل إلى صفحة الكتب أو الرئيسية
    },
    error: err => {
      this.message = 'Login failed: ' + err.error;
    }
  });
}

}