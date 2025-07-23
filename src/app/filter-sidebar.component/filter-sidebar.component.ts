import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent {
  categories = ['All', 'Programming', 'Web', 'Design', 'AI'];
  selectedCategory = 'All';
  
  priceRange = [0, 200];
  selectedRatings: {[key: number]: boolean} = {5: false, 4: false, 3: false, 2: false, 1: false};

  @Output() filtersChanged = new EventEmitter<any>();

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters() {
    const activeRatings = Object.keys(this.selectedRatings)
      .filter(key => this.selectedRatings[+key])
      .map(key => +key);
    
    this.filtersChanged.emit({
      category: this.selectedCategory,
      minPrice: this.priceRange[0],
      maxPrice: this.priceRange[1],
      ratings: activeRatings
    });
  }

  resetFilters() {
    this.selectedCategory = 'All';
    this.priceRange = [0, 200];
    this.selectedRatings = {5: false, 4: false, 3: false, 2: false, 1: false};
    this.applyFilters();
  }
}