// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { Router } from '@angular/router';

@Component({
    standalone: true,
    imports: [BrowserModule, FormsModule],
  selector: 'app-login',
  template: `
    <form (submit)="onSubmit($event)">
      <input [(ngModel)]="username" name="username" placeholder="Username">
      <input [(ngModel)]="password" name="password" placeholder="Password" type="password">
      <button type="submit">Login</button>
    </form>
    <p>{{ message }}</p>
  `,
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault(); // منع التحديث التلقائي للصفحة
    this.authService.login(this.username, this.password).subscribe({
      next: res => {
        this.message = res;
        this.router.navigate(['/dashboard']); // انتقل إلى الصفحة المحددة
      },
      error: err => this.message = 'Login failed: ' + err.error
    });
  }
}
