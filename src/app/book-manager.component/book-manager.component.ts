import { Component, OnInit } from '@angular/core';
import { BookManagerService, Book } from '../services/book-manager.server';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.scss']
})
export class BookManagerComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = this.createEmptyBook();
  editingBook: Book | null = null;
  imageNumber: string = '';
  searchQuery: string = '';
  allBooks: Book[] = []; // قائمة كاملة من الكتب (غير مصفّاة)

  loading = false;
  error: string | null = null;

  constructor(private bookService: BookManagerService
              , private toastr: ToastrService
  ) {}

 ngOnInit(): void {
    this.loadBooks();
    this.bookService.books$.subscribe(books => {
    console.log('Books from service:', books);

    this.allBooks = books;
    this.filterBooks(); // تصفية أولية عند تحميل البيانات
    });
  }
    filterBooks(): void {
    const query = this.searchQuery.toLowerCase();
    this.books = this.allBooks.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  }


  loadBooks(): void {
    this.loading = true;
    this.error = null;
    
    this.bookService.loadBooks().pipe(
      catchError(err => {
        this.error = 'فشل تحميل الكتب';
        return of([]);
      }),
      finalize(() => this.loading = false)
    ).subscribe(); // نترك الاشتراك فارغًا لأن الـ tap في الخدمة سيحدث `books$`
  }

  createEmptyBook(): Book {
    return {
      title: '',
      author: '',
      price: 0,
      imageUrl: 'assets/images/default-book.jpg',
      rating: 3,
      category: '',
      summary: '',
      isbn: ''
    };
  }

  addBook(): void {
    if (this.validateBook(this.newBook)) {
      this.toastr.warning('يرجى ملء كل الحقول');
      this.bookService.addBook(this.newBook).subscribe({
        next: () => {
          this.toastr.success('تمت إضافة الكتاب بنجاح');
          this.newBook = this.createEmptyBook();
          this.imageNumber = '';
        },
        error: () =>    this.toastr.error('حدث خطأ أثناء إضافة الكتاب')
      });
    }
  }

  editBook(book: Book): void {
    this.editingBook = { ...book };
  }

  saveEdit(): void {
  if (this.editingBook && this.validateBook(this.editingBook)) {
    this.bookService.updateBook(this.editingBook).subscribe({
      next: () => {
        this.toastr.success('تم تعديل الكتاب بنجاح');
        this.editingBook = null;
      },
      error: () => {
        this.toastr.error('حدث خطأ أثناء تعديل الكتاب');
      }
    });
  } else {
    this.toastr.warning('يرجى التأكد من إدخال جميع الحقول');
  }
}


  cancelEdit(): void {
    this.editingBook = null;
  }

  deleteBook(id?: number): void {
  if (id && confirm('هل أنت متأكد من حذف هذا الكتاب؟')) {
    this.bookService.deleteBook(id).subscribe({
      next: () => this.toastr.info('تم حذف الكتاب'),
      error: () => this.toastr.error('حدث خطأ أثناء حذف الكتاب')
    });
  }
  }

  updateImageUrl(): void {
    const num = this.imageNumber.trim();
    this.newBook.imageUrl = num
      ? this.bookService.resizeImageUrl(`assets/images/${num}.jpg`, 300, 400)
      : 'assets/images/default-book.jpg';
  }

  private validateBook(book: Book): boolean {
    return !!book.title && !!book.author && book.price >= 0 &&
           !!book.category && !!book.summary && !!book.isbn &&
           book.rating >= 1 && book.rating <= 5;
  }
}
