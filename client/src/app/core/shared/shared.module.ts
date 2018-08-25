// Decorators
import { NgModule } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { CommentComponent } from './comment/comment.component';
import { CartComponent } from './cart/cart.component';
import { BookComponent } from './book/book.component';

// Directives
import { MustMatchDirective } from '../directives/must-match.directive';
import { IsUrlDirective } from '../directives/is-url.directive';
import { IsIsbnDirective } from '../directives/is-isbn.directive';

// Pipes
import { CommentTimePipe } from '../pipes/comment-time.pipe';
import { ShortenStringPipe } from '../pipes/shorten-string.pipe';

@NgModule({
  declarations: [
    CommentComponent,
    CartComponent,
    BookComponent,
    MustMatchDirective,
    IsUrlDirective,
    IsIsbnDirective,
    CommentTimePipe,
    ShortenStringPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CommentComponent,
    CartComponent,
    BookComponent,
    MustMatchDirective,
    IsUrlDirective,
    IsIsbnDirective,
    CommentTimePipe,
    ShortenStringPipe
  ]
})
export class SharedModule { }
