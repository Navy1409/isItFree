import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OfficeBookingsService } from '../services/office-bookings.service';
import { OfficeService } from '../services/office.service';

interface Slot {
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'app-office-availability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './office-availability.component.html'
})
export class OfficeAvailabilityComponent implements OnInit {
  office:any='';

  officeId:string|null='';
  date:string|null='';

  availableSlots: Slot[] = [];
constructor(private route:ActivatedRoute,private officeBookingService:OfficeBookingsService,private officeService:OfficeService){

}
  ngOnInit() {
    this.officeId=this.route.snapshot.paramMap.get('officeId');
    this.date=this.route.snapshot.paramMap.get('date')
    console.log(this.officeId, this.date);
    this.officeBookingService.getOfficeAvailabilityByOfficeIdAndDate(this.officeId,this.date).subscribe({
      next:(res:any)=>{
        console.log(res);
        
        this.availableSlots=res;

      },
      error:err=>{
        console.log(err?.error?.msg);
        
      }
    })
    this.officeService.getOfficeByOfficeId(this.officeId).subscribe({
      next:(res:any)=>{
        this.office=res[0]
      },
      error:err=>{
        console.log(err?.error?.msg);
        
      }
    })
  }

  formatTime(time: string): string {
    return time.slice(0, 5);
  }

  bookSlot(slot: Slot) {
    console.log('Booking slot:', slot);
  }
}
