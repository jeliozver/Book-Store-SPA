// Decorators
import { Injectable } from '@angular/core';

// Router
import {
  CanActivate,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
  Router
} from '@angular/router';

// RXJS
import { Observable } from 'rxjs';

// Services
import { HelperService } from '../services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanLoad, CanActivate {

  constructor(
    private router: Router,
    private helperService: HelperService
  ) { }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }

  private isAuthenticated(): boolean {
    if (this.helperService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/user/login']);
    return false;
  }
}
