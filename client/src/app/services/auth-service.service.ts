import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly STORAGE_KEY = 'user';

  constructor() { }
   decodeToken(token: string) {
    const payload = token.split('.')[1];
    console.log(payload);
    
    const decoded = atob(payload);
    const data= JSON.parse(decoded);
    this.setUser(data)
  }
  setUser(data: {
    token: string;
    userId: string;
    organisationId: string;
    isAdmin: boolean;
    emailId: string;
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
