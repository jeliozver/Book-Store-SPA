// Decorators and Lifehooks
import { Component, OnInit, OnDestroy } from '@angular/core';

// Router
import { ActivatedRoute } from '@angular/router';

// RXJS
import { Subscription } from 'rxjs';

// Services
import { HelperService } from '../../../core/services/helper.service';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.css']
})
export class BookStoreComponent implements OnInit, OnDestroy {
  query: string;
  querySub$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get('query');

    this.querySub$ = this.helperService.searchQuery
      .subscribe();
  }

  ngOnDestroy(): void {
    this.querySub$.unsubscribe();
  }

}
