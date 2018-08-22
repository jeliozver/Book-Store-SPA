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
  stars = ['', '', '', '', ''];
  isRated: boolean;
  isAdded: boolean;
  isBought: boolean;

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
        this.calcRating(this.book.currentRating);
      });
  }

  buyBook(): void {
    if (!this.isBought) {
      this.isBought = true;
      this.cartService
        .addToCart(this.bookId)
        .subscribe(() => {
          this.helperService.cartStatus.next('add');
        });
    }
  }

  addToFavorites(): void {
    if (!this.isRated) {
      this.isRated = true;
      this.bookService
        .addToFavourites(this.bookId)
        .subscribe();
    }
  }

  rateBook(rating: number): void {
    if (!this.isRated) {
      this.isRated = true;
      this.bookService
        .rateBook(this.bookId, { rating: rating })
        .subscribe((res) => {
          this.book.currentRating = res.data.currentRating;
          this.book.ratedCount++;
          this.calcRating(this.book.currentRating);
        });
    }
  }

  calcRating(rating: number): void {
    this.stars = ['', '', '', '', ''];
    rating = Math.round(rating);
    for (let i = 0; i < rating; i++) {
      this.stars[i] = 'checked';
    }
  }

  resetRating(): void {
    this.calcRating(this.book.currentRating);
  }

}
