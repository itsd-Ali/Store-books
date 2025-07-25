import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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
  

  // BehaviorSubject to hold the list of books

  private booksSubject = new BehaviorSubject<Book[]>([]);
  public books$ = this.booksSubject.asObservable();

  // تحميل جميع الكتب وتحديث BehaviorSubject
  getAllBooks(): Observable<Book[]> {
  return this.http.get<Book[]>(`${this.apiUrl}`).pipe(
    tap(books => this.booksSubject.next(books))
  );
}


updateBook(book: Book): Observable<Book> {
  return this.http.put<Book>(`${this.apiUrl}/update/${book.id}`, book, {
    responseType: 'json'
  });
}
  refreshBooks() {
    this.getAllBooks().subscribe();
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(book: Book): Observable<any> {
  return this.http.post(`${this.apiUrl}/add`, book, { responseType: 'text' }).pipe(
    tap(() => this.refreshBooks())
  );
}


  /* updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/update/${book.id}`, book).pipe(
      tap(() => this.refreshBooks())
    );
  } */

  deleteBook(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' }).pipe(
    tap(() => this.refreshBooks())
  );
}


  searchBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?q=${query}`);
  }

  getBooksByCategory(category: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?category=${category}`);
  }

  getBooksByPriceRange(min: number, max: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?price_gte=${min}&price_lte=${max}`);
  }

  getBooksByRating(minRating: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?rating_gte=${minRating}`);
  }
}
