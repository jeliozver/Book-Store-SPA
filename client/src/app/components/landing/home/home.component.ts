// Decorators and Lifehooks
import { Component, OnInit, OnDestroy } from '@angular/core';

// RXJS
import { Subscription } from 'rxjs';

// Services
import { BookService } from '../../../core/services/book.service';

// Models
import { Book } from '../../../core/models/book.model';

const newestBooksQuery = '?sort={"creationDate":-1}&limit=5';
const bestRatedBooksQuery = '?sort={"currentRating":-1}&limit=5';
const mostPurchasedBooksQuery = '?sort={"purchasesCount":-1}&limit=5';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  newestSub$: Subscription;
  bestRatedSub$: Subscription;
  mostPurchasedSub$: Subscription;
  newestBooks: Book[];
  bestRatedBooks: Book[];
  mostPurchasedBooks: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.newestSub$ = this.bookService
      .search(newestBooksQuery)
      .subscribe((res) => {
        this.newestBooks = res.data;
      });

    this.bestRatedSub$ = this.bookService
      .search(bestRatedBooksQuery)
      .subscribe((res) => {
        this.bestRatedBooks = res.data;
      });

    this.mostPurchasedSub$ = this.bookService
      .search(mostPurchasedBooksQuery)
      .subscribe((res) => {
        this.mostPurchasedBooks = res.data;
      });
  }

  ngOnDestroy(): void {
    this.newestSub$.unsubscribe();
    this.bestRatedSub$.unsubscribe();
    this.mostPurchasedSub$.unsubscribe();
  }

}
