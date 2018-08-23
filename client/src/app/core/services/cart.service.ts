// Decorators
import { Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// HTTP
import { HttpClient } from '@angular/common/http';

// Models
import { ServerResponse } from '../models/server-response.model';
import { Cart } from '../models/cart.model';

const baseUrl = 'http://localhost:8000/user/cart';
const getCartSizeEndpoint = 'http://localhost:8000/cart/getSize';
const addToCartEndpoint = '/add/';
const removeFromCartEndpoint = '/delete/';
const checkoutEndpoint = '/checkout';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getCartSize(): Observable<ServerResponse<number>> {
    return this.http.get<ServerResponse<number>>(getCartSizeEndpoint);
  }

  getCart(): Observable<ServerResponse<Cart>> {
    return this.http.get<ServerResponse<Cart>>(baseUrl)
      .pipe(
        map(res => {
          res.data.books.map(b => b.qty = 1);
          return res;
        })
      );
  }

  addToCart(id: string): Observable<ServerResponse<Cart>> {
    return this.http.post<ServerResponse<Cart>>(baseUrl + addToCartEndpoint + id, {});
  }

  removeFromCart(id: string): Observable<ServerResponse<Cart>> {
    return this.http.delete<ServerResponse<Cart>>(baseUrl + removeFromCartEndpoint + id);
  }

  checkout(payload: object): Observable<ServerResponse<object>> {
    return this.http.post<ServerResponse<object>>(baseUrl + checkoutEndpoint, payload);
  }
}
