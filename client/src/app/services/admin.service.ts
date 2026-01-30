import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly baseURL = 'http://localhost:3000';
  private userString = localStorage.getItem('user');

  constructor(private http: HttpClient) {}

  createUser(payload): Observable<any> {
    const organisationId = this.userString
      ? JSON.parse(this.userString).organisationId
      : null;
    
    const newPayload={
      ...payload,
      isAdmin:false,
      organisationId:organisationId
    }    
    return this.http.post(`${this.baseURL}/user/createUser`, newPayload);
  }
  createOffice(payload):Observable<any>{
    const organisationId = this.userString
      ? JSON.parse(this.userString).organisationId
      : null;
    const {
      row,
      column,
      capacity,
      ...rest
    }=payload;
    const newPayload={
      ...rest,
      organisationId:organisationId,
      config:{
        row:Number(row),
        column:Number(column),
        capacity:Number(capacity)
      }
    }

    return this.http.post(`${this.baseURL}/office/createOffice`,newPayload);
  }
  getUsersByOrganisationId():Observable<any>{
    return this.http.get(`${this.baseURL}/user/getUserByOrganisationId`);
  }
  getOfficesByOrganisationId():Observable<any>{
    const organisationId = this.userString
      ? JSON.parse(this.userString).organisationId
      : null;
    
    return this.http.get(`${this.baseURL}/office/getOfficesByOrganisationId/${organisationId}`)
  }
  updateUser(userId,payload):Observable<any>{
    return this.http.patch(`${this.baseURL}/user/updateUser/${userId}`, payload)
  }
}
