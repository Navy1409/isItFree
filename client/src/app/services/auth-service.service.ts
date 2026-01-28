import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly STORAGE_KEY = 'user';

  constructor() { }
  setUser(data: {
    token: string;
    userId: string;
    organisationId: string;
    isAdmin: boolean;
    email: string;
  }) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }
   getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  isAdmin(): boolean {
    return this.getUser()?.isAdmin;
  }

  logout(){
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
