// Decorators
import { Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';

// HTTP
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

// Services
import { HelperService } from '../services/helper.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private heplerService: HelperService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.heplerService.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.heplerService.getToken()
        }
      });
    }

    return next.handle(request);
  }

}
