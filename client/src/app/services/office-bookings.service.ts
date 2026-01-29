import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfficeBookingsService {

  constructor(private http:HttpClient) { }
  private readonly baseUrl = 'http://localhost:3000/officeBookings'
   token = localStorage.getItem('token')
    headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  getOfficeAvailabilityByOfficeIdAndDate(officeId, date) {
    return this.http.get<any[]>(`${this.baseUrl}/getGroupRoomAvailability`, { headers: this.headers,
      params:{
        officeId:officeId,
        bookingDate:date
      }
     })
  }

  getBookedSeatByOfficeIdDateAndTime(officeId,date){
    return this.http.get<any[]>(`${this.baseUrl}/getBookedSeatByOfficeIdDateAndTime`, { headers: this.headers,
      params:{
        officeId:officeId,
        date:date
      }
     })
  }

  createBookings(payload){
    return this.http.post(`${this.baseUrl}/createBookings`,payload,{headers:this.headers})
  }
}
