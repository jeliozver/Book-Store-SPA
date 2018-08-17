// Decorators
import { NgModule } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BookRoutingModule } from './book-routing.module';

// Components
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookStoreComponent } from './book-store/book-store.component';

@NgModule({
  declarations: [
    BookCreateComponent,
    BookEditComponent,
    BookDeleteComponent,
    BookDetailsComponent,
    BookStoreComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BookRoutingModule
  ],
})
export class BookModule { }
