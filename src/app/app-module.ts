import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStoreComponent } from './book-store.component/book-store.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,BookStoreComponent,FormsModule,HeaderComponent,RouterModule
  ,HttpClientModule]
})
export class AppModule { }
