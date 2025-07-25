import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id?: number; // Optional ID for new books
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
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
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

  searchBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?q=${query}`);
  }


  
  // الحصول على كتاب حسب المعرف
    getBookById(id: number): Observable<Book> {
      return this.http.get<Book>(`${this.apiUrl}/${id}`);
     }
     
    // الحصول على جميع الكتب 
    getBooks(): Observable<Book[]> {
      return this.http.get<Book[]>(this.apiUrl);
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