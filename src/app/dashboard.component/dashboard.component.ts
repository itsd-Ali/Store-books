import { Component } from '@angular/core';
import { HeaderComponent } from '../header.component/header.component';
import { BookStoreComponent } from '../book-store.component/book-store.component';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [ BookStoreComponent, FormsModule, HeaderComponent],
  template: `
    <div class="main-container">
      <app-header (search)="onSearchQueryChanged($event)"></app-header>
      <div class="container">
        <app-book-store class="carts" [searchQuery]="searchQueryFromHeader"></app-book-store> 
      </div>
    </div>
  `
})
export class DashboardComponent {
  searchQueryFromHeader = '';

  onSearchQueryChanged(query: string) {
    this.searchQueryFromHeader = query;
  }
}
