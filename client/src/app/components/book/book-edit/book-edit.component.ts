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

// Custom Validators
import { isUrlValidator } from '../../../core/shared/is-url.directive';
import { isIsbnValidator } from '../../../core/shared/is-isbn.directive';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit, OnDestroy {
  editBookForm: FormGroup;
  editBookSub$: Subscription;
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
        this.editBookForm.patchValue({ ...res.data });
      });
  }

  initForm(): void {
    this.editBookForm = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ]),
      'author': new FormControl('', [
        Validators.required
      ]),
      'genre': new FormControl('', [
        Validators.required
      ]),
      'year': new FormControl('', [
        Validators.required
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      'cover': new FormControl('', [
        Validators.required,
        isUrlValidator
      ]),
      'isbn': new FormControl('', [
        Validators.required,
        isIsbnValidator
      ]),
      'pagesCount': new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      'price': new FormControl('', [
        Validators.required,
        Validators.min(0)
      ])
    });
  }

  ngOnDestroy(): void {
    this.bookSub$.unsubscribe();
    if (this.editBookSub$) {
      this.editBookSub$.unsubscribe();
    }
  }

  onSubmit(): void {
    console.log(this.editBookForm);
    this.editBookSub$ = this.bookService
      .editBook(this.id, this.editBookForm.value)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

  get title(): AbstractControl {
    return this.editBookForm.get('title');
  }

  get author(): AbstractControl {
    return this.editBookForm.get('author');
  }

  get genre(): AbstractControl {
    return this.editBookForm.get('genre');
  }

  get year(): AbstractControl {
    return this.editBookForm.get('year');
  }

  get description(): AbstractControl {
    return this.editBookForm.get('description');
  }

  get cover(): AbstractControl {
    return this.editBookForm.get('cover');
  }

  get isbn(): AbstractControl {
    return this.editBookForm.get('isbn');
  }

  get pagesCount(): AbstractControl {
    return this.editBookForm.get('pagesCount');
  }

  get price(): AbstractControl {
    return this.editBookForm.get('price');
  }

}
