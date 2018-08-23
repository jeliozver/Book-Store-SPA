// Decorators and Lifehooks
import { Component, OnInit, OnDestroy } from '@angular/core';

// Forms
import { FormControl, FormGroup, Validators } from '@angular/forms';

// RXJS
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Services
import { CartService } from '../../services/cart.service';
import { HelperService } from '../../services/helper.service';

// Models
import { Cart } from '../../models/cart.model';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart;
  cartForm: FormGroup;
  changesSub$: Subscription;
  lastCartState: string;

  constructor(
    private cartService: CartService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.cartService
      .getCart()
      .subscribe((res) => {
        this.cart = res.data;
        this.cartForm = this.toFormGroup(this.cart.books);
        this.onChanges();
      });
  }

  ngOnDestroy(): void {
    this.changesSub$.unsubscribe();
  }

  toFormGroup(books: Book[]): FormGroup {
    const group: any = {};

    books.forEach(book => {
      group[book._id] = new FormControl(book.qty || '', Validators.required);
    });

    return new FormGroup(group);
  }

  onChanges(): void {
    this.changesSub$ = this.cartForm
      .valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe(val => {
        if (this.lastCartState !== JSON.stringify(val)) {
          this.lastCartState = JSON.stringify(val);
          this.reCalcSum(val);
        }
      });
  }

  onRemove(id: string): void {
    this.cartService
      .removeFromCart(id)
      .subscribe(() => {
        this.helperService.cartStatus.next('remove');
        this.cart.books = this.cart.books.filter(b => b._id !== id);
        this.reCalcSum(this.cartForm.value);
      });
  }

  onSubmit(): void {
    this.cartService
      .checkout(this.cartForm.value)
      .subscribe((res) => {
        console.log(res);
      });
  }

  reCalcSum(formValues: object): void {
    let price = 0;
    for (const b of this.cart.books) {
      price += b.price * formValues[b._id];
    }

    this.cart.totalPrice = price;
  }
}
