import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private readonly baseUrl='http://localhost:3000/office'
  constructor( private http:HttpClient) { }

  getAllOffices(organisationId):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/getOfficesByOrganisationId/${organisationId}`)
  }

  getOfficeByOfficeId(officeId):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getOfficeByOfficeId/${officeId}`)
  }
}
