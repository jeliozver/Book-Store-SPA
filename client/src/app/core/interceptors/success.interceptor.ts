// Decorators
import { Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// HTTP
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

// Services
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../services/helper.service';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private helperService: HelperService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              if (event.body.message || event.body.message !== '') {
                this.toastr.success(event.body.message);
              }
            }

            if (event instanceof HttpResponse && request.url.endsWith('login') ||
              event instanceof HttpResponse && request.url.endsWith('register')) {
              this.helperService.saveSession(event.body.data);
              this.helperService.isUserLogged.next(true);
              this.helperService.cartStatus.next('updateStatus');
            }
          }
        )
      );
  }
}
