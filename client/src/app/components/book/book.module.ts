// Decorators
import { NgModule } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../core/shared/shared.module';
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
    NgxPaginationModule,
    SharedModule,
    BookRoutingModule
  ],
})
export class BookModule { }
