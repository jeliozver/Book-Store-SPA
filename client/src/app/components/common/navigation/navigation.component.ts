// Decorators and Lifehooks
import { Component, OnInit, OnDestroy } from '@angular/core';

// RXJS
import { Subscription } from 'rxjs';

// Services
import { HelperService } from '../../../core/services/helper.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  isLoggedSub$: Subscription;
  username: string;
  isLogged: boolean;
  isAdmin: boolean;
  statusChecker: number;
  cartItems = 0;

  constructor(private helperService: HelperService) { }

  ngOnInit(): void {
    this.statusChecker = window.setInterval(() => this.tick(), 600000);
    this.isLoggedSub$ = this.helperService
      .isUserLogged
      .subscribe((data) => {
        this.isLogged = data;
      });
    this.isLogged = this.helperService.isLoggedIn();
  }

  ngOnDestroy(): void {
    window.clearInterval(this.statusChecker);
    this.isLoggedSub$.unsubscribe();
  }

  tick(): void {
    this.isLogged = this.helperService.isLoggedIn();
  }

  isUserLogged(): boolean {
    return this.isLogged;
  }

  isUserAdmin(): boolean {
    if (!this.isAdmin) {
      this.isAdmin = this.helperService.isAdmin();
    }

    return this.isAdmin;
  }

  getUsername(): void {
    if (!this.username) {
      this.username = this.helperService.getProfile().username;
    }
  }

  logout(): void {
    this.username = undefined;
    this.isAdmin = undefined;
    this.helperService.clearSession();
    this.helperService.isUserLogged.next(false);
  }
}
