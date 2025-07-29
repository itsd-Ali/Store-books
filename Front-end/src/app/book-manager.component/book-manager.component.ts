import { Component, OnInit } from '@angular/core';
import { BookManagerService, Book } from '../services/book-manager.server';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';


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

  constructor(private bookService: BookManagerService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  this.bookService.books$.subscribe(books => {
    console.log('Books updated:', books);
    this.books = books;
     this.cdr.detectChanges();
  });

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
    }
  }

  addBook(): void {
  if (!this.newBook.title || !this.newBook.author || this.newBook.price <= 0 || !this.newBook.category  || !this.newBook.summary || !this.newBook.isbn ) {
    alert('الرجاء إدخال كافة الحقول المطلوبة');
    return;
  }

  this.bookService.addBook(this.newBook).subscribe({
    next: (addedBook: Book) => {
      this.books.push(addedBook); // ← تحديث القائمة يدويًا
      this.newBook = this.createEmptyBook(); // تفريغ النموذج
    },
    error: (err: any) => {
      console.error('فشل في إضافة الكتاب', err);
    }
  });
}

  editBook(book: Book): void {
    if (this.editingBook?.id === book.id) {
      this.editingBook = null;
      return;
    }
    
    // إنشاء نسخة عميقة جديدة
    this.editingBook = {
      ...book,
      imageUrl: book.imageUrl // تأكد من نسخ جميع الحقول
    };
  }

  cancelEdit(): void {
    this.editingBook = null;
   
  }




saveEdit(): void {
  if (!this.editingBook) return;

  this.bookService.updateBook(this.editingBook).subscribe({
    next: (updatedBook) => {
      // تحديث القائمة مباشرة دون الحاجة ل refreshBooks
      const index = this.books.findIndex(b => b.id === updatedBook.id);
      if (index !== -1) {
        this.books[index] = updatedBook;
      }
      this.editingBook = null;
      this.cdr.detectChanges(); // إجبار التحديث
    },
    error: (err) => {
      console.error('Failed to update book', err);
    }
  });
}










  deleteBook(id: number | undefined): void {
  if (!id) return;

  // إذا كان الكتاب الجاري تعديله هو نفسه الذي نحذف
  if (this.editingBook?.id === id) {
    this.editingBook = null;
  }

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
