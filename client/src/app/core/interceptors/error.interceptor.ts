// Decorators
import { Injectable } from '@angular/core';

// RXJS
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// HTTP
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

// Services
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error instanceof ProgressEvent) {
            // A client-side or network error occurred
            this.toastr.error('Network Error!');
          } else {
            // The backend returned an unsuccessful response code
            this.toastr.error(err.error.message, `${err.status.toString()} - ${err.statusText}`);
            if (err.error.errors) {
              for (const e in err.error.errors) {
                if (err.error.errors.hasOwnProperty(e)) {
                  this.toastr.error(err.error.errors[e]);
                }
              }
            }
          }

          return throwError(err.error);
        }));
  }
}
