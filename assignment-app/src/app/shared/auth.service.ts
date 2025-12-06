import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private users = [
    { login: 'admin', password: 'admin', role: 'admin' },
    { login: 'user', password: 'user', role: 'user' }
  ];

  private currentUser: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    }
  }

  logIn(login: string, password: string): boolean {
    const user = this.users.find(u => u.login === login && u.password === password);
    if (user) {
      this.currentUser = user;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return true;
    }
    return false;
  }

  logOut() {
    this.currentUser = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.currentUser.role === 'admin';
  }

  // ✅ NOUVELLE MÉTHODE À AJOUTER
  getUser() {
    return this.currentUser;
  }
}