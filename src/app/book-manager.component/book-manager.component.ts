
// src/app/book-manager/book-manager.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { BookManagerServer } from './../services/book-manager.server';
import { Book, BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, BookService],
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.css']
})
export class BookManagerComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = {
    id: 0,
    title: '',
    author: '',
    price: 0,
    imageUrl: '',
    rating: 0,
    category: '',
    summary: ''
  };
  editingBook: Book | null = null;

  constructor(private bookService: BookManagerServer) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  addBook(): void {
    if (!this.newBook.title.trim() || !this.newBook.author.trim()) return;

    this.bookService.addBook(this.newBook).subscribe(() => {
      this.newBook = { title: '', author: '' };
      this.loadBooks();
    });
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.loadBooks();
    });
  }

  startEdit(book: Book): void {
    this.editingBook = { ...book }; // نسخة مستقلة للتعديل
  }

  saveEdit(): void {
    const bookToUpdate = this.editingBook;
      if (bookToUpdate && bookToUpdate.id != null) {
        this.bookService.updateBook(bookToUpdate).subscribe(() => {
        this.editingBook = null;
        this.loadBooks();
  });
}
 


  }

  cancelEdit(): void {
    this.editingBook = null;
  }
}