// Decorators
import { NgModule } from '@angular/core';

// Components
import { CommentComponent } from './comment/comment.component';
import { CartComponent } from './cart/cart.component';

// Directives
import { MustMatchDirective } from './must-match.directive';

@NgModule({
  declarations: [
    CommentComponent,
    CartComponent,
    MustMatchDirective,
  ],
  exports: [
    CommentComponent,
    CartComponent,
    MustMatchDirective
  ]
})
export class SharedModule { }
