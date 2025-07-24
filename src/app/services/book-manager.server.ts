// src/app/services/book-manager.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id: number;
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

  constructor(private http: HttpClient) {

  }
  // الحصول على جميع الكتب 
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


  getBooksByAuthor(author: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/author/${author}`);
  }
  getBooksByPriceRange(min: number, max: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/price?min=${min}&max=${max}`);
  }
  getBooksByRating(minRating: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/rating?min=${minRating}`);
  }
  getBooksById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/get/${id}`);
  }
  getBooksByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/title/${title}`);
  }
  getBooksByCategory(category: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/category/${category}`);
  }
  getBooksByCategoryAndPrice(category: string, minPrice: number, maxPrice: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/category/${category}/price?min=${minPrice}&max=${maxPrice}`);
  }
  getBooksByCategoryAndRating(category: string, minRating: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/category/${category}/rating?min=${minRating}`);
  }
  getBooksByCategoryAndAuthor(category: string, author: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/category/${category}/author/${author}`);
  }
  getBooksByCategoryAndPriceRange(category: string, minPrice: number, maxPrice: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/category/${category}/price?min=${minPrice}&max=${maxPrice}`);
  }
  getBooksByCategoryAndRatingRange(category: string, minRating: number, maxRating: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/category/${category}/rating?min=${minRating}&max=${maxRating}`);
  }
  getBooksByCategoryAndAuthorAndPrice(category: string, author: string, minPrice: number, maxPrice: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/category/${category}/author/${author}/price?min=${minPrice}&max=${maxPrice}`);
  }
  getBooksByCategoryAndAuthorAndRating(category: string, author: string, minRating: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/category/${category}/author/${author}/rating?min=${minRating}`);
  }
  getBooksByCategoryAndPriceAndRating(category: string, minPrice: number, maxPrice: number, minRating: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/category/${category}/price?min=${minPrice}&max=${maxPrice}&rating=${minRating}`);
  } 
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/get/${id}`);
  }
  searchBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/search?q=${query}`);
  }


}
