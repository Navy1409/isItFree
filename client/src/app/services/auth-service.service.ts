import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthServiceService {
  private readonly STORAGE_KEY = 'user';
  private loggedIn$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem(this.STORAGE_KEY)
  );
  private admin$ = new BehaviorSubject<boolean>(
    JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}')?.isAdmin ?? false
  );

  constructor() { }
 
   decodeToken(token: string) {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    this.setUser(token, decoded);
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
    this.loggedIn$.next(false);
    this.admin$.next(false);
  }
}
