// frontend: Angular example
// auth.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post('http://localhost:8080/api/books/login', {
      username,
      password,
    }, { responseType: 'text' });
  }
}
