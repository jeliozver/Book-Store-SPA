// Decorators and Lifehooks
import { Component, OnInit, OnDestroy } from '@angular/core';

// Services
import { HelperService } from '../../../core/services/helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  isLoggedSub$: Subscription;
  username: string;
  isLogged: boolean;
  statusChecker: number;

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

  getUsername(): void {
    if (!this.username) {
      this.username = this.helperService.getProfile().username;
    }
  }

  logout(): void {
    this.username = undefined;
    this.helperService.clearSession();
    this.helperService.isUserLogged.next(false);
  }
}
