// Decorators
import { Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';

// HTTP
import { HttpClient } from '@angular/common/http';

// Models
import { ServerResponse } from '../models/server-response.model';
import { Comment } from '../models/comment.model';

const baseUrl = 'http://localhost:8000/comment';
const addCommentEndpoint = '/add/';
const editCommentEndpoint = '/edit/';
const deleteCommentEndpoint = '/delete/';
const getLatestFiveEndpont = '/getLatestFiveByUser/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(id: string, page: string): Observable<ServerResponse<Comment[]>> {
    return this.http.get<ServerResponse<Comment[]>>(`${baseUrl}/${id}/${page}`);
  }

  getLatestFiveComments(id: string): Observable<ServerResponse<Comment[]>> {
    return this.http.get<ServerResponse<Comment[]>>(baseUrl + getLatestFiveEndpont + id);
  }

  addComment(id: string, payload: Comment): Observable<ServerResponse<Comment>> {
    return this.http.post<ServerResponse<Comment>>(baseUrl + addCommentEndpoint + id, payload);
  }

  editComment(id: string, payload: Comment): Observable<ServerResponse<Comment>> {
    return this.http.put<ServerResponse<Comment>>(baseUrl + editCommentEndpoint + id, payload);
  }

  deleteComment(id: string): Observable<ServerResponse<object>> {
    return this.http.delete<ServerResponse<object>>(baseUrl + deleteCommentEndpoint + id);
  }
}
