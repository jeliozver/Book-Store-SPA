// Decorators and Lifehooks
import { Component, OnInit, OnDestroy } from '@angular/core';

// Router
import { ActivatedRoute } from '@angular/router';

// RXJS
import { Subscription } from 'rxjs';

// Services
import { BookService } from '../../../core/services/book.service';
import { CommentService } from '../../../core/services/comment.service';
import { CartService } from '../../../core/services/cart.service';
import { HelperService } from '../../../core/services/helper.service';

// Models
import { Book } from '../../../core/models/book.model';
import { Comment } from '../../../core/models/comment.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  bookSub$: Subscription;
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private commentService: CommentService,
    private cartService: CartService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
