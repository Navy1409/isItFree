import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthServiceService {
  private readonly STORAGE_KEY = 'user';
  private loggedIn$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem(this.STORAGE_KEY)
  );
  private admin$ = new BehaviorSubject<boolean>(
    JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}')?.isAdmin ?? false
  );
  private userSubject = new BehaviorSubject<any>(this.getUser());
  user$ = this.userSubject.asObservable();

  constructor() { }
 
   decodeToken(token: string) {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    const data= JSON.parse(decoded);
    this.setUser(token,data);
    this.userSubject.next(data);
  }
  setUser(token,data: {
    token: string;
    userId: string;
    organisationId: string;
    isAdmin: boolean;
    emailId: string;
  }) {
    localStorage.setItem('token', token);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    this.loggedIn$.next(true);
    this.admin$.next(!!data.isAdmin);
  }

  getUser() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || 'null');
  }

  loggedInChanges() {
    return this.loggedIn$.asObservable();
  }
  
  adminChanges() {
    return this.admin$.asObservable();
  }

  logout(){
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.loggedIn$.next(false);
    this.admin$.next(false);
  }
}
