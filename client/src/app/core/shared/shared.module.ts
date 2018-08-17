// Decorators
import { NgModule } from '@angular/core';

// Components
import { CommentComponent } from './comment/comment.component';

// Directives
import { MustMatchDirective } from './must-match.directive';


@NgModule({
  declarations: [
    CommentComponent,
    MustMatchDirective
  ],
  exports: [
    MustMatchDirective
  ]
})
export class SharedModule { }
