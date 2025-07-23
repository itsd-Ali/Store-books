import { FilterSidebarComponent } from './../filter-sidebar.component/filter-sidebar.component';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book, BookService } from '../services/book.service';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule,FilterSidebarComponent
  ],
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

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.books = data;
      this.filteredBooks = this.applyAllFilters();
    });
  }

  onFiltersChanged(filters: any) {
    this.currentFilters.category = filters.category;
    this.currentFilters.minPrice = filters.minPrice;
    this.currentFilters.maxPrice = filters.maxPrice;
    this.currentFilters.ratings = filters.ratings;
    this.filteredBooks = this.applyAllFilters();
  }

  @Input() set searchQuery(value: string) {
    this.currentFilters.searchQuery = value;
    this.filteredBooks = this.applyAllFilters();
  }

  applyAllFilters(): Book[] {
    return this.books.filter(book => {
      // Filter by category
      const matchesCategory = this.currentFilters.category === 'All' || 
                             book.category === this.currentFilters.category;
      
      // Filter by price range
      const matchesPrice = book.price >= this.currentFilters.minPrice && 
                          book.price <= this.currentFilters.maxPrice;
      
      // Filter by ratings
      const matchesRating = this.currentFilters.ratings.length === 0 || 
                           this.currentFilters.ratings.some(r => Math.floor(book.rating) === r);
      
      // Filter by search query
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