import { Component, OnInit } from '@angular/core';
import { BookManagerService, Book } from '../services/book-manager.server';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule,FormsModule],
  
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.scss']
})
export class BookManagerComponent implements OnInit {

  imageNumber: string = '';
  books: Book[] = [];
  newBook: Book = this.createEmptyBook();
  editingBook: Book | null = null;

  constructor(private bookService: BookManagerService) {}

  ngOnInit(): void {
    // تحميل الكتب من الـ BehaviorSubject
    this.bookService.books$.subscribe((books: Book[]) => {
      this.books = books;
    });

    // تحديث أولي للكتب
    this.bookService.refreshBooks();
  }

  createEmptyBook(): Book {
    return {
      id: undefined,
      title: '',
      author: '',
      price: 0,
      imageUrl: '',
      rating: 0,
      category: '',
      summary: '',
      isbn: ''
    };
  }

  addBook(): void {
    if (!this.newBook.title || !this.newBook.author) {
      alert('الرجاء إدخال عنوان ومؤلف الكتاب');
      return;
    }

    this.bookService.addBook(this.newBook).subscribe({
      next: (addedBook: Book) => {
        console.log('تمت إضافة الكتاب:', addedBook);
        this.newBook = this.createEmptyBook(); // تفريغ النموذج
        this.bookService.refreshBooks(); // تحديث القائمة
      },
      error: (err: any) => {
        console.error('فشل في إضافة الكتاب', err);
      }
    });
  }

  editBook(book: Book): void {
  this.editingBook = JSON.parse(JSON.stringify(book)); // نسخة عميقة
}
  cancelEdit(): void {
    this.editingBook = null;
  }

  saveEdit(): void {
  if (!this.editingBook) return;

  // تأخير بسيط يسمح لـ ngModel بإكمال التحديث
  setTimeout(() => {
    this.bookService.updateBook(this.editingBook!).subscribe({
      next: (updatedBook: Book) => {
        console.log('تم تحديث الكتاب:', updatedBook);
        this.editingBook = null;
        this.bookService.refreshBooks(); // تحديث القائمة
      },
      error: (err: any) => {
        console.error('فشل في تحديث الكتاب', err);
      }
    });
  }, 0);
}


  deleteBook(id: number | undefined): void {
    if (!id) return;

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        console.log('تم حذف الكتاب');
        this.bookService.refreshBooks(); // تحديث القائمة
      },
      error: (err: any) => {
        console.error('فشل في حذف الكتاب', err);
      }
    });
  }
  updateImageUrl(): void {
  const trimmed = this.imageNumber.trim();
  if (/^\d+$/.test(trimmed)) {
    this.newBook.imageUrl = `assets/images/${trimmed}.jpg`;
  } else {
    this.newBook.imageUrl = '';
  }
}

}
