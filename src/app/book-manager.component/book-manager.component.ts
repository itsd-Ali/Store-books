
import { Component, OnInit } from '@angular/core';
import { BookManagerService } from './../services/book-manager.server';
import {Book} from '../services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.scss']
})
export class BookManagerComponent implements OnInit {
  // تعريف متغيرات لتخزين الكتب
  books: Book[] = [];
  // متغيرات لإضافة وتحرير الكتب
  newBook: Book = this.createEmptyBook();
  editingBook: Book | null = null;

  constructor(private bookService: BookManagerService) {}

  ngOnInit() {
    this.loadBooks();
  }

  createEmptyBook(): Book {
    return {
      id: 0,
      title: '',
      author: '',
      price: 0,
      imageUrl: '',
      rating: 0,
      category: '',
      summary: ''
    };
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: books => this.books = books,
      error: err => console.error('Failed to load books', err)
    });
  }

  addBook() {
    if (!this.newBook.title || !this.newBook.author) {
      alert('يرجى إدخال العنوان والمؤلف');
      return;
    }
    this.bookService.addBook(this.newBook).subscribe({
      next: addedBook => {
        this.books.push(addedBook);
        this.newBook = this.createEmptyBook();
      },
      error: err => console.error('Failed to add book', err)
    });
  }

  editBook(book: Book) {
    this.editingBook = { ...book }; // clone to edit
  }

  cancelEdit() {
    this.editingBook = null;
  }
  
  saveEdit() {
    if (!this.editingBook) return;
    if (!this.editingBook.title || !this.editingBook.author) {
      alert('يرجى إدخال العنوان والمؤلف');
      return;
    }
    this.bookService.updateBook(this.editingBook).subscribe({
      next: updatedBook => {
        const idx = this.books.findIndex(b => b.id === updatedBook.id);
        if (idx !== -1) this.books[idx] = updatedBook;
        this.editingBook = null;
      },
      error: err => console.error('Failed to update book', err)
    });
  }
  




  deleteBook(id?: number) {
    if (!id) return;
    if (!confirm('هل أنت متأكد من حذف هذا الكتاب؟')) return;
    this.bookService.deleteBook(id).subscribe({
      next: () => this.books = this.books.filter(b => b.id !== id),
      error: err => console.error('Failed to delete book', err)
    });
  }
}
