import { Component, OnInit } from '@angular/core';
import { BookManagerService, Book } from '../../services/book-manager.server';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EditBookComponent } from '../edit-book/edit-book';
import { AddBookComponent } from '../add-book/add-book';

@Component({
  standalone: true,
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.scss'],
  imports: [CommonModule, FormsModule, EditBookComponent, AddBookComponent],
})
export class BookManagerComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = this.createEmptyBook();
  editingBook: Book | null = null;
 
  searchQuery: string = '';
  allBooks: Book[] = [];

  showAddModal = false;
  imageNumber = '';

  loading = false;
  error: string | null = null;

  constructor(
    private bookService: BookManagerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.bookService.books$.subscribe((books) => {
      this.allBooks = books;
      this.filterBooks();
    });
  }



// وأضف هذه الدوال
openAddModal(): void {
  this.newBook = this.createEmptyBook();
  this.imageNumber = '';
  this.showAddModal = true;
}

closeAddModal(): void {
  this.showAddModal = false;
}

updateImageUrl(num: string): void {
  this.imageNumber = num;
  this.newBook.imageUrl = num
    ? this.bookService.resizeImageUrl(`assets/images/${num}.jpg`, 300, 400)
    : 'assets/images/default-book.jpg';
}




  filterBooks(): void {
    const query = this.searchQuery.toLowerCase();
    this.books = this.allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
  }

  loadBooks(): void {
    this.loading = true;
    this.error = null;

    this.bookService
      .loadBooks()
      .pipe(
        catchError((err) => {
          this.error = 'فشل تحميل الكتب';
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe(); // `tap` في الخدمة يحدّث `books$`
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
    if (!this.validateBook(this.newBook)) {
      this.toastr.warning('يرجى ملء كل الحقول');
      return;
    }

    this.bookService.addBook(this.newBook).subscribe({
      next: () => {
        this.toastr.success('تمت إضافة الكتاب بنجاح');
        this.newBook = this.createEmptyBook();
        this.imageNumber = '';
      },
      error: () => this.toastr.error('حدث خطأ أثناء إضافة الكتاب'),
    });
  }

  editBook(book: Book): void {
    this.editingBook = { ...book };
  }

  saveEdit(): void {
    if (this.editingBook && this.validateBook(this.editingBook)) {
      this.bookService.updateBook(this.editingBook).subscribe({
        next: () => {
          this.editingBook = null;
          this.toastr.success('تم تعديل الكتاب بنجاح');
        },
        error: () => this.toastr.error('حدث خطأ أثناء تعديل الكتاب'),
      });
    } else {
      this.toastr.warning('يرجى التحقق من الحقول قبل الحفظ');
    }
  }

  cancelEdit(): void {
    this.editingBook = null;
  }

  deleteBook(id?: number): void {
    if (id && confirm('هل أنت متأكد من حذف هذا الكتاب؟')) {
      this.bookService.deleteBook(id).subscribe({
        error: () => this.toastr.error('خطأ أثناء حذف الكتاب'),
      });
    }
  }

 /*  updateImageUrl(): void {
    const num = this.imageNumber.trim();
    this.newBook.imageUrl = num
      ? this.bookService.resizeImageUrl(`assets/images/${num}.jpg`, 300, 400)
      : 'assets/images/default-book.jpg';
  } */

  private validateBook(book: Book): boolean {
    return (
      !!book.title &&
      !!book.author &&
      book.price >= 0 &&
      !!book.category &&
      !!book.summary &&
      !!book.isbn &&
      book.rating >= 1 &&
      book.rating <= 5
    );
  }
}