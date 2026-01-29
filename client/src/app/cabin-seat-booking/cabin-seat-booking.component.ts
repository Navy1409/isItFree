import { Component, OnInit } from '@angular/core';
import { OfficeService } from '../services/office.service';
import { OfficeBookingsService } from '../services/office-bookings.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Seat = { row: number; column: number };
type Booking = { row: number; column: number; startTime: string; endTime: string };

@Component({
  selector: 'app-cabin-seat-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cabin-seat-booking.component.html',
  styleUrl: './cabin-seat-booking.component.css'
})
export class CabinSeatBookingComponent implements OnInit {

  office: any;
  user: any;
  officeId: string | null = '';
  date: string | null = '';
  rows = 0;
  columns = 0;
  seats: Seat[] = [];
  bookings: Booking[] = [];
  selectedSeat: Seat | null = null;
  selectedHalf: 'first half' | 'second half' | 'full day' = 'first half';
  startTime = '';
  endTime = '';

  constructor(
    private officeService: OfficeService,
    private officeBookingsService: OfficeBookingsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.officeId = this.route.snapshot.paramMap.get('officeId')!;
    this.date = this.route.snapshot.paramMap.get('date')!;
    const usrStr = localStorage.getItem('user');
    this.user = usrStr ? JSON.parse(usrStr) : null;
    this.officeService.getOfficeByOfficeId(this.officeId).subscribe({
      next: (res: any) => {
        this.office = res[0];

        this.generateSeats(this.office.config);
        this.updateTimeRange();
        this.loadBookingsForDay();
      },
      error: err => console.error(err)
    });
  }

  loadBookingsForDay() {
    this.officeBookingsService
      .getBookedSeatByOfficeIdDateAndTime(this.officeId, this.date)
      .subscribe({
        next: (res: any) => {
          this.bookings = res;
          console.log('Bookings:', this.bookings);
        },
        error: err => console.error(err)
      });
  }
  generateSeats(config: { row: number; column: number }) {
    this.rows = config.row;
    this.columns = config.column;

    this.seats = [];
    for (let r = 1; r <= this.rows; r++) {
      for (let c = 1; c <= this.columns; c++) {
        this.seats.push({ row: r, column: c });
      }
    }
  }

  updateTimeRange() {
    if (!this.office) return;

    if (this.selectedHalf === 'first half') {
      this.startTime = this.office.openTime;
      this.endTime = this.office.breakTime;
    } else if (this.selectedHalf === 'second half') {
      this.startTime = this.office.breakTime;
      this.endTime = this.office.closeTime;
    } else {
      this.startTime = this.office.openTime;
      this.endTime = this.office.closeTime;
    }
  }

  onHalfChange() {
    if (!this.selectedSeat) return;

    if (this.selectedHalf === 'first half' && !this.canBookFirstHalf()) {
      this.selectedHalf = this.canBookSecondHalf() ? 'second half' : this.selectedHalf;
    }

    if (this.selectedHalf === 'second half' && !this.canBookSecondHalf()) {
      this.selectedHalf = this.canBookFirstHalf() ? 'first half' : this.selectedHalf;
    }

    if (this.selectedHalf === 'full day' && !this.canBookFullDay()) {
      this.selectedHalf = this.canBookFirstHalf() ? 'first half' : 'second half';
    }

    this.updateTimeRange();
  }

  overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
    return !(aEnd <= bStart || aStart >= bEnd);
  }

  isSeatBookedInRange(seat: Seat, start: string, end: string): boolean {
    return this.bookings.some(b =>
      b.row === seat.row &&
      b.column === seat.column &&
      this.overlaps(b.startTime, b.endTime, start, end)
    );
  }

  getSeatStatus(seat: Seat) {
    const firstHalfBooked = this.isSeatBookedInRange(
      seat,
      this.office.openTime,
      this.office.breakTime
    );

    const secondHalfBooked = this.isSeatBookedInRange(
      seat,
      this.office.breakTime,
      this.office.closeTime
    );

    return { firstHalfBooked, secondHalfBooked };
  }

  isSeatFullyBooked(seat: Seat): boolean {
    const s = this.getSeatStatus(seat);
    return s.firstHalfBooked && s.secondHalfBooked;
  }

  selectSeat(seat: Seat) {
    if (this.isSeatFullyBooked(seat)) return;
    this.selectedSeat = seat;
    if (this.isFirstHalfTimeOver()) {
      this.selectedHalf = 'second half';
      this.updateTimeRange();
      return;
    }

    const status = this.getSeatStatus(seat);

    if (status.firstHalfBooked && !status.secondHalfBooked) {
      this.selectedHalf = 'second half';
    } else if (!status.firstHalfBooked && status.secondHalfBooked) {
      this.selectedHalf = 'first half';
    } else {
      this.selectedHalf = 'first half';
    }

    this.updateTimeRange();
  }

  getSeatLabel(seat: Seat): string {
    const rowLetter = String.fromCharCode(64 + seat.row);
    return `${rowLetter}${seat.column}`;
  }

  get availableSeatsCount() {
    return this.seats.filter(s => !this.isSeatFullyBooked(s)).length;
  }

  canBookFirstHalf(): boolean {
    if (!this.selectedSeat) return true;
    if (this.isFirstHalfTimeOver()) return false;

    const s = this.getSeatStatus(this.selectedSeat);
    return !s.firstHalfBooked;
  }

  canBookSecondHalf(): boolean {
    if (!this.selectedSeat) return true;
    if (this.isSecondHalfTimeOver()) return false;
    const s = this.getSeatStatus(this.selectedSeat);
    return !s.secondHalfBooked;
  }

  canBookFullDay(): boolean {
    if (!this.selectedSeat) return true;
    if (this.isFirstHalfTimeOver()) return false;
    const s = this.getSeatStatus(this.selectedSeat);
    return !s.firstHalfBooked && !s.secondHalfBooked;
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toTimeString().slice(0, 8); 
  }

  isToday(): boolean {
    const today = new Date().toISOString().slice(0, 10);
    return this.date === today;
  }
  isFirstHalfTimeOver(): boolean {
    if (!this.office || !this.isToday()) return false;
    return this.getCurrentTime() >= this.office.breakTime;
  }

  isSecondHalfTimeOver(): boolean {
    if (!this.office || !this.isToday()) return false;
    return this.getCurrentTime() >= this.office.closeTime;
  }

  confirmBooking() {
    if (!this.selectedSeat) {
      alert('Select a seat first');
      return;
    }

    if (!this.user?.userId) {
      alert('User not logged in');
      return;
    }

    const payload = {
      officeId: this.officeId,
      bookingDate: this.date,
      startTime: this.startTime,
      endTime: this.endTime,
      config: this.selectedSeat,
      userIds: [this.user.userId]
    };

    console.log('Booking payload:', payload);

    this.officeBookingsService.createBookings(payload).subscribe({
      next: () => {
        alert('Booking successful!');
        this.selectedSeat = null;
        this.loadBookingsForDay();
      },
      error: err => {
        alert(err?.error?.message || 'Booking failed');
      }
    });
  }
}
