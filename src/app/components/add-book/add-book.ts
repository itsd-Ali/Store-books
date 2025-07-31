import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../services/book-manager.server';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule,FormsModule],
  standalone: true,
  selector: 'app-add-book',
  templateUrl: './add-book.html',
  styleUrls: ['./add-book.scss']
})
export class AddBookComponent {
  @Input() book!: Book;
  @Input() imageNumber!: string;
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() updateImage = new EventEmitter<string>();

  onSave() {
    this.save.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  onImageChange() {
    this.updateImage.emit(this.imageNumber);
  }
}