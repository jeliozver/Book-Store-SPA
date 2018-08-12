// Decorators
import { Injectable } from '@angular/core';

// JWT Decoding
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  saveSession(token): void {
    localStorage.setItem('token', token);
  }

  clearSession(): void {
    localStorage.clear();
  }

  getProfile(): any {
    try {
      const decoded = decode(this.getToken());

      return decoded.sub;
    } catch (err) {
      return false;
    }
  }

  isLoggedIn(): boolean {
    try {
      const decoded = decode(this.getToken());

      if (decoded.exp > Date.now() / 1000) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  isAdmin(): boolean {
    try {
      const decoded = decode(this.getToken());

      if (decoded.exp < Date.now() / 1000 || !decoded.sub.isAdmin) {
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
