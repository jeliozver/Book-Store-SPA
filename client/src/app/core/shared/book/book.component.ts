// Decorators
import { Component, Input } from '@angular/core';

// Models
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  @Input('book') book: Book;
}
