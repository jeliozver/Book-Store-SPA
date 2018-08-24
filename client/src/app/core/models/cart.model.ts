import { User } from './user.model';
import { Book } from '../models/book.model';

export class Cart {
  constructor(
    public user: User,
    public books: Book[],
    public totalPrice: number
  ) { }
}
