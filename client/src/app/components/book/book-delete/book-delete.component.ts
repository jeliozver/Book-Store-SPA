// Decorators and Lifehooks
import { Component, OnInit, OnDestroy } from '@angular/core';

// Forms
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Router
import { Router, ActivatedRoute } from '@angular/router';

// RXJS
import { Subscription } from 'rxjs';

// Services
import { BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit, OnDestroy {
  deleteBookForm: FormGroup;
  deleteBookSub$: Subscription;
  bookSub$: Subscription;
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.id = this.route.snapshot.paramMap.get('bookId');

    this.bookSub$ = this.bookService
      .getSingleBook(this.id)
      .subscribe((res) => {
        this.deleteBookForm.patchValue({ ...res.data });
      });
  }

  ngOnDestroy(): void {
    this.bookSub$.unsubscribe();
    if (this.deleteBookSub$) {
      this.deleteBookSub$.unsubscribe();
    }
  }

  initForm(): void {
    this.deleteBookForm = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ]),
      'author': new FormControl('', [
        Validators.required
      ]),
      'genre': new FormControl('', [
        Validators.required
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      'price': new FormControl('', [
        Validators.required,
        Validators.min(0)
      ])
    });
  }

  onSubmit(): void {
    this.deleteBookSub$ = this.bookService
      .deleteBook(this.id)
      .subscribe();
  }

}
