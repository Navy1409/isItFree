import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthApiServiceService {

  private readonly BASE_URL = 'http://localhost:3000/auth'
  constructor(private http:HttpClient) { }
  register(payload: any) {
    return this.http.post<any>(`${this.BASE_URL}/register`, payload);
  }

  login(payload: any) {
    return this.http.post<any>(`${this.BASE_URL}/login`, payload);
  }

}
