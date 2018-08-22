// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Router
import { ActivatedRoute } from '@angular/router';

// Services
import { BookService } from '../../../core/services/book.service';
import { CartService } from '../../../core/services/cart.service';
import { HelperService } from '../../../core/services/helper.service';

// Models
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  bookId: string;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('bookId');

    this.bookService
      .getSingleBook(this.bookId)
      .subscribe((res) => {
        this.book = res.data;
      });
  }

  buyBook(): void {
    this.cartService
      .addToCart(this.bookId)
      .subscribe(() => {
        this.helperService.cartStatus.next('add');
      });
  }

}
