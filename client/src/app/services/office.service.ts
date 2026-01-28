import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private readonly baseUrl='http://localhost:3000/office'
  constructor( private http:HttpClient) { }

  getAllOffices(organisationId):Observable<any[]>{
    const token=localStorage.getItem('token')
    const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
    return this.http.get<any[]>(`${this.baseUrl}/getOfficesByOrganisationId/${organisationId}`,{headers:headers}
    )
  }

  getOfficeByOfficeId(officeId):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getOfficeByOfficeId/${officeId}`)
  }
}
