// Decorators
import { NgModule } from '@angular/core';

// Modules
import { MustMatchDirective } from './must-match.directive';

@NgModule({
  declarations: [
    MustMatchDirective
  ],
  imports: [],
  exports: [
    MustMatchDirective
  ]
})
export class SharedModule { }
