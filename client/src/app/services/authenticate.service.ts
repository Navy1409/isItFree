import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
private readonly baseUrl='http://localhost:3000/user'
  constructor(private http:HttpClient) { }

  loginUser(payload:{emailId:string,password:string}):Observable<object>{
    return this.http.post(`${this.baseUrl}/login`,payload);
  }
}
