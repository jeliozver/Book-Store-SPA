// Decorators
import { Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';

// HTTP
import { HttpClient } from '@angular/common/http';

// Models
import { ServerResponse } from '../models/server-response.model';
import { Book } from '../models/book.model';

const domain = 'http://localhost:8000';
const getSingleBookEndpoint = domain + '/book/details/';
const createBookEndpoint = domain + '/book/add';
const editBookEndpoint = domain + '/book/edit/';
const deleteBookEndpoint = domain + '/book/delete/';
const rateBookEndpoint = domain + '/book/rate/';
const addToFavoritesEndpoint = domain + '/book/addToFavorites/';
const searchBookEndpoint = domain + '/book/search';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getSingleBook(id: string): Observable<ServerResponse<Book>> {
    return this.http.get<ServerResponse<Book>>(getSingleBookEndpoint + id);
  }

  createBook(payload: Book): Observable<ServerResponse<Book>> {
    return this.http.post<ServerResponse<Book>>(createBookEndpoint, payload);
  }

  editBook(id: string, payload: Book): Observable<ServerResponse<Book>> {
    return this.http.put<ServerResponse<Book>>(editBookEndpoint + id, payload);
  }

  deleteBook(id: string): Observable<ServerResponse<Book>> {
    return this.http.delete<ServerResponse<Book>>(deleteBookEndpoint + id);
  }

  rateBook(id: string, payload: object): Observable<ServerResponse<Book>> {
    return this.http.post<ServerResponse<Book>>(rateBookEndpoint + id, payload);
  }

  addToFavourites(id: string): Observable<ServerResponse<Book>> {
    return this.http.post<ServerResponse<Book>>(addToFavoritesEndpoint + id, {});
  }

  search(query: string): Observable<ServerResponse<Book[]>> {
    return this.http.get<ServerResponse<Book[]>>(searchBookEndpoint + query);
  }
}
