// src/app/services/book-manager.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id?: number;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  rating: number;
  category: string;
  summary: string;  
}

@Injectable({
  providedIn: 'root'
})
export class BookManagerService {
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/all`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/add`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // التعديل: حاليًا يمكنك الحذف ثم الإضافة مجددًا بنفس البيانات لتحديث الكتاب
  updateBook(book: Book): Observable<Book> {
    // ملاحظة: تحتاج في الـ Backend لتوفير endpoint خاص بالتعديل
    return this.http.put<Book>(`${this.apiUrl}/update/${book.id}`, book);
  }
}
