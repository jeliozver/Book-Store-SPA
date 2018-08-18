// Decorators
import { NgModule } from '@angular/core';

// Components
import { CommentComponent } from './comment/comment.component';
import { CartComponent } from './cart/cart.component';

// Directives
import { MustMatchDirective } from './must-match.directive';
import { IsUrlDirective } from './is-url.directive';
import { IsIsbnDirective } from './is-isbn.directive';

@NgModule({
  declarations: [
    CommentComponent,
    CartComponent,
    MustMatchDirective,
    IsUrlDirective,
    IsIsbnDirective
  ],
  exports: [
    CommentComponent,
    CartComponent,
    MustMatchDirective
  ]
})
export class SharedModule { }
