import { Book } from '../models/book.model';

export class Cart {
   constructor(
     public user: string,
     public books: Book[],
     public totalPrice: number
   ) { }
}
