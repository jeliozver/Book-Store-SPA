// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Services
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

}
