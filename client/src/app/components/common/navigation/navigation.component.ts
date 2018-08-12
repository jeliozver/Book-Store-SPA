// Decorators and Lifehooks
import { Component, OnInit, OnDestroy } from '@angular/core';

// Services
import { HelperService } from '../../../core/services/helper.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  username: string;
  isLogged: boolean;
  statusChecker: number;

  constructor(private helperService: HelperService) { }

  ngOnInit(): void {
    this.statusChecker = window.setInterval(() => this.tick(), 600000);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.statusChecker);
  }

  tick(): void {
    this.isLogged = this.helperService.isLoggedIn();
  }

  isUserLogged(): boolean {
    if (!this.isLogged) {
      this.isLogged = this.helperService.isLoggedIn();
    }

    return this.isLogged;
  }

  getUsername(): void {
    if (!this.username) {
      this.username = this.helperService.getProfile().username;
    }
  }

  logout(): void {
    this.helperService.clearSession();
    this.isLogged = false;
  }
}
