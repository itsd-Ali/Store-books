import { FilterSidebarComponent } from './../filter-sidebar.component/filter-sidebar.component';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookManagerService, Book } from '../services/book-manager.server';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, FilterSidebarComponent],
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.scss']
})
export class BookStoreComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];

  currentFilters = {
    category: 'All',
    minPrice: 0,
    maxPrice: 200,
    ratings: [] as number[],
    searchQuery: ''
  };

  constructor(private bookService: BookManagerService) {}

  ngOnInit(): void {
    this.bookService.books$.subscribe(data => {
      this.books = data;
      this.filteredBooks = this.applyAllFilters();
    });

    this.bookService.refreshBooks(); // تحميل أولي
  }

  onFiltersChanged(filters: any) {
    this.currentFilters = { ...this.currentFilters, ...filters };
    this.filteredBooks = this.applyAllFilters();
  }

  @Input() set searchQuery(value: string) {
    this.currentFilters.searchQuery = value;
    this.filteredBooks = this.applyAllFilters();
  }

  applyAllFilters(): Book[] {
    return this.books.filter(book => {
      const matchesCategory = this.currentFilters.category === 'All' || book.category === this.currentFilters.category;
      const matchesPrice = book.price >= this.currentFilters.minPrice && book.price <= this.currentFilters.maxPrice;
      const matchesRating = this.currentFilters.ratings.length === 0 ||
        this.currentFilters.ratings.some(r => Math.floor(book.rating) === r);
      const matchesSearch = !this.currentFilters.searchQuery.trim() ||
        book.title.toLowerCase().includes(this.currentFilters.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(this.currentFilters.searchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesRating && matchesSearch;
    });
  }

  addToCart(book: Book) {
    console.log('Book added to cart:', book.title);
    alert(`${book.title} has been added to your shopping cart`);
  }
}
