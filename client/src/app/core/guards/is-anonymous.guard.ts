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
export class IsAnonymousGuard implements CanLoad, CanActivate {

  constructor(
    private router: Router,
    private helperService: HelperService
  ) { }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAnonymous();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAnonymous();
  }

  private isAnonymous(): boolean {
    if (!this.helperService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
