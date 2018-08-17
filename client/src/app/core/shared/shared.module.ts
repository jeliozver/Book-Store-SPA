// Decorators
import { NgModule } from '@angular/core';

// Modules
// Modules imports here

// Components
// Components imports here

// Directives
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
