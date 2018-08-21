// Decorators
import { Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';

// HTTP
import { HttpClient } from '@angular/common/http';

// Models
import { ServerResponse } from '../models/server-response.model';

const baseUrl = 'http://localhost:8000/user/cart';
const addToCartEndpoint = '/add/';
const removeFromCartEndpoint = '/delete/';
const checkoutEndpoint = '/checkout';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getCart(): Observable<ServerResponse<object>> {
    return this.http.get<ServerResponse<object>>(baseUrl);
  }

  addToCart(id: string): Observable<ServerResponse<object>> {
    return this.http.post<ServerResponse<object>>(baseUrl + addToCartEndpoint + id, {});
  }

  removeFromCart(id: string): Observable<ServerResponse<object>> {
    return this.http.delete<ServerResponse<object>>(baseUrl + removeFromCartEndpoint + id);
  }

  checkout(payload: object): Observable<ServerResponse<object>> {
    return this.http.post<ServerResponse<object>>(baseUrl + checkoutEndpoint, payload);
  }
}
