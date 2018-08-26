// Decorators and Lifehooks
import { Component, OnInit, OnDestroy } from '@angular/core';

// Router
import { ActivatedRoute } from '@angular/router';

// RXJS
import { Subscription } from 'rxjs';

// Services
import { HelperService } from '../../../core/services/helper.service';
import { BookService } from '../../../core/services/book.service';

// Models
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.css']
})
export class BookStoreComponent implements OnInit, OnDestroy {
  currentQuery: string;
  pageSize = 15;
  currentPage = 1;
  total = 30;
  maxPages = 8;
  querySub$: Subscription;
  routeChangeSub$: Subscription;
  books: Book[];

  constructor(
    private route: ActivatedRoute,
    private bookSevice: BookService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.routeChangeSub$ = this.route.params.subscribe((params) => {
      this.currentQuery = params.query;
      this.initRequest(this.currentQuery);
    });

    this.querySub$ = this.helperService
      .searchQuery
      .subscribe(() => {
        this.currentPage = 1;
      });
  }

  ngOnDestroy(): void {
    this.routeChangeSub$.unsubscribe();
    this.querySub$.unsubscribe();
  }

  initRequest(query: string): void {
    query = this.generateQuery(query);
    this.bookSevice
      .search(query)
      .subscribe((res) => {
        this.total = res.itemsCount;
        this.books = res.data;
      });
  }

  generateQuery(query: string): string {
    if (query === 'default') {
      return `?sort={"creationDate":-1}`
        + `&skip=${(this.currentPage - 1) * this.pageSize}`
        + `&limit=${this.pageSize}`;
    }

    return `?query={"searchTerm":"${query}"}`
      + `&sort={"creationDate":-1}`
      + `&skip=${(this.currentPage - 1) * this.pageSize}`
      + `&limit=${this.pageSize}`;
  }

  pageChanged(newPage: number): void {
    this.currentPage = newPage;
    this.initRequest(this.currentQuery);
  }
}
