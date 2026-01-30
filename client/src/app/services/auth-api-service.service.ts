import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiServiceService {

  private readonly BASE_URL = 'http://localhost:3000/user'
  constructor(private http:HttpClient) { }
  register(payload: any) {
    return this.http.post<any>(`${this.BASE_URL}/register`, payload);
  }

  login(payload: any) {
    return this.http.post<any>(`${this.BASE_URL}/login`, payload);
  }

  setPassword(payload:any):Observable<any>{
    return this.http.patch(`${this.BASE_URL}/setPassword`, payload);
  }
}
