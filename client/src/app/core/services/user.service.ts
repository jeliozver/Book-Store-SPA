// Decorators
import { Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';

// HTTP
import { HttpClient } from '@angular/common/http';

// Models
import { ServerResponse } from '../models/server-response.model';

const domain = 'http://localhost:8000';
const registerEndpoint = domain + '/user/register';
const loginEndpoint = domain + '/user/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(payload: object): Observable<ServerResponse<string>> {
    return this.http.post<ServerResponse<string>>(registerEndpoint, payload);
  }

  login(payload: object): Observable<ServerResponse<string>> {
    return this.http.post<ServerResponse<string>>(loginEndpoint, payload);
  }
}
