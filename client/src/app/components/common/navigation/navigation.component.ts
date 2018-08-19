// Decorators and Lifehooks
import { Component, OnInit, OnDestroy } from '@angular/core';

// Forms
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Router
import { Router } from '@angular/router';

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
  searchForm: FormGroup;
  isLoggedSub$: Subscription;
  username: string;
  isLogged: boolean;
  isAdmin: boolean;
  statusChecker: number;
  cartItems = 0;

  constructor(
    private router: Router,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'query': new FormControl('', [
        Validators.required
      ])
    });
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

  onSubmit(): void {
    const query: string = this.searchForm.value.query.trim();
    if (query.length !== 0) {
      this.router.navigate([`/book/store/${query}`]);
      this.helperService.searchQuery.next(query);
    }
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
