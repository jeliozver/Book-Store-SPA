import { User } from './user.model';
import { Book } from './book.model';

export class Receipt {
  constructor(
    public user: User,
    public productsInfo: Book[],
    public totalPrice: number
  ) { }
}
