import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  imports:[CommonModule,FormsModule,RouterLink],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  logo = 'assets/images/logo.png'; // Path to store logo
  cartItemsCount = 3; // Cart items count (can connect to cart service)

  searchQuery: string = '';

  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchQuery);
  }
  
   menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Books', link: '/books' },
    { name: 'Deals', link: '/deals' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' }
  ];
}