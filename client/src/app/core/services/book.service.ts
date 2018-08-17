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

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getSingleBook(id: string): Observable<ServerResponse<Book>> {
    return this.http.get<ServerResponse<Book>>(getSingleBookEndpoint + id);
  }
}
