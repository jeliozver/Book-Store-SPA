import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBookComponent } from './create-book/create-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { DetailsBookComponent } from './details-book/details-book.component';
import { StoreBookComponent } from './store-book/store-book.component';

@NgModule({
  declarations: [
    CreateBookComponent,
    EditBookComponent,
    DeleteBookComponent,
    DetailsBookComponent,
    StoreBookComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BookModule { }
