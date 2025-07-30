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
  isbn: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookManagerService {
  private apiUrl = 'http://localhost:8080/api/books';
  private booksSubject = new BehaviorSubject<Book[]>([]);
  public books$ = this.booksSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(
      tap(books => this.booksSubject.next(books))
    );
  }

  refreshBooks(): void {
    this.loadBooks().subscribe();
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/add`, book).pipe(
      tap(() => this.refreshBooks())
    );
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/update/${book.id}`, book).pipe(
      tap(() => this.refreshBooks())
    );
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`).pipe(
      tap(() => this.refreshBooks())
    );
  }

  resizeImageUrl(url: string, width: number, height: number): string {
    // هنا يمكن لاحقًا ربط خدمة تحجيم فعلي للصورة
    return url;
  }
}
