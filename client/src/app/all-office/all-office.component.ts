import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OfficeService } from '../services/office.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-all-office',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './all-office.component.html',
  styleUrl: './all-office.component.css'
})
export class AllOfficeComponent implements OnInit {
  offices: any[] = [];
  organisationId: any = '';
  error = ''
  allDates: Date[] = [];
  visibleDates: Date[] = [];
  selectedDate!: Date;
  minDate = new Date();
  token:string|null='';

  constructor(private router: Router, private officeService: OfficeService) { }

  ngOnInit() {
    this.token=localStorage.getItem('user');
    if(!this.token){
    this.router.navigate(['/login'])
    }
    const userStr =localStorage.getItem('user');
   if(userStr){
     const user=JSON.parse(userStr)
    this.organisationId = user.organisationId;
   }
    this.selectedDate = new Date();
    this.allDates = this.getNextWorkingDays(this.selectedDate, 10);
    this.updateVisibleDates();
    this.officeService.getAllOffices(this.organisationId).subscribe({
      next: (res: any) => {
        this.offices = res;
        console.log(this.offices);

      }
      ,
      error: err => {
        this.error = err?.error?.msg;
        console.log(err);

      }
    })
  }

  openOffice(office: any) {
    if (office.isGroup) {
      this.router.navigate(['/office', office.officeId,this.selectDate, 'book']);
    } else {
      this.router.navigate(['/office', office.officeId, this.selectDate]);
    }
  }

  getNextWorkingDays(start: Date, count: number): Date[] {
    const dates: Date[] = [];
    const date = new Date(start);

    while (dates.length < count) {
      const day = date.getDay();
      if (day !== 0 && day !== 6) {
        dates.push(new Date(date));
      }
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }
  updateVisibleDates() {
    const index = this.allDates.findIndex(date =>
      this.isSameDate(date, this.selectedDate)
    );
    const start = Math.max(index - 4, 0);
    this.visibleDates = this.allDates.slice(start, start + 10);
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.updateVisibleDates();
  }
  onMaterialDatePicked(date: Date | null) {
    if (!date) return;

    this.selectedDate = date;
    this.allDates = this.getNextWorkingDays(date, 30);
    this.updateVisibleDates();

    console.log('Selected date:', date);
  }

  dateFilter = (date: Date | null) => {
    if (!date) return false;
    const day = date.getDay();
    return day !== 0 && day !== 6; 
  };
  isSameDate(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }
}
