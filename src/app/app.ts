import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookStoreComponent } from './book-store.component/book-store.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "./header.component/header.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookStoreComponent, FormsModule, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
searchQueryFromHeader: string = '';

onSearchChanged($event: string) {

throw new Error('Method not implemented.');
}
  protected title = 'first';
   

onSearchQueryChanged(query: string) {
  this.searchQueryFromHeader = query;
}

}
