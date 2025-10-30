import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private users = [
    { login: 'admin', password: 'password', role: 'admin' },
    { login: 'user', password: 'password', role: 'user' }
  ];

  private currentUser: any = null;

  constructor() { }

  logIn(login: string, password: string): boolean {
    const user = this.users.find(u => u.login === login && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logOut() {
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.currentUser.role === 'admin';
  }
}