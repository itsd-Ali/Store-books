import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../services/book-manager.server';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-book.html',
  styleUrls: ['./edit-book.scss']
})
export class EditBookComponent {
  @Input() book: Book | null = null;
  @Output() save = new EventEmitter<Book>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    if (this.book) {
      this.save.emit(this.book);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
