import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OfficeBookingsService } from '../services/office-bookings.service';
import { OfficeService } from '../services/office.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AdminService } from '../services/admin.service';

interface Slot {
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'app-office-availability',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, NgxMaterialTimepickerModule],
  templateUrl: './office-availability.component.html'
})
export class OfficeAvailabilityComponent implements OnInit {

  office: any = null;
  officeId: string = '';
  date: string = '';
  availableSlots: Slot[] = [];
  isBookingModalOpen = false;
  selectedSlot: { startTime: string; endTime: string } | null = null;
  bookingForm = {
    startTime: '',
    endTime: '',
    selectedUsers: [] as string[],
  };
  orgUsers: any[] = [
  ];

  constructor(
    private route: ActivatedRoute,
    private officeBookingService: OfficeBookingsService,
    private officeService: OfficeService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.officeId = this.route.snapshot.paramMap.get('officeId') || '';
    this.date = this.route.snapshot.paramMap.get('date') || '';
    this.getOfficeAvailability();
    this.officeService.getOfficeByOfficeId(this.officeId).subscribe({
      next: (res: any) => this.office = res?.[0] || null,
      error: err => console.error(err)
    });
    this.adminService.getUsersByOrganisationId().subscribe({
      next: (res: any[]) => {
        this.orgUsers = res.map(user => ({
          id: user.userId,
          name: `${user.firstName} ${user.lastName}`
        }));
        console.log(this.orgUsers);

      },
      error: (err) => {
        alert(err?.error?.msg || 'Update failed');
      }
    });

  }

  getOfficeAvailability() {
    this.officeBookingService
      .getOfficeAvailabilityByOfficeIdAndDate(this.officeId, this.date)
      .subscribe({
        next: (res: Slot[]) => {
          this.availableSlots = res || [];
        },
        error: (err) => {
        alert(err?.error?.msg || 'Update failed');
      }
      });
  }

  formatTime(time: string): string {
    return time.slice(0, 5);
  }

  getCurrentTimeRounded(stepMinutes = 15): string {
    const now = new Date();
    const minutes = now.getMinutes();
    const roundedMinutes = Math.ceil(minutes / stepMinutes) * stepMinutes;

    now.setMinutes(roundedMinutes);
    now.setSeconds(0);

    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');

    return `${h}:${m}`;
  }

  bookSlot(slot: Slot) {
    const slotStart = slot.startTime.slice(0, 5);
    const slotEnd = slot.endTime.slice(0, 5);

    this.selectedSlot = {
      startTime: slotStart,
      endTime: slotEnd
    };

    const today = new Date().toISOString().slice(0, 10);

    let startTime = slotStart;

    if (this.date === today) {
      const nowRounded = this.getCurrentTimeRounded(15);
      if (nowRounded > startTime) {
        startTime = nowRounded;
      }
    }

    const endTime = slotEnd;

    if (startTime >= endTime) {
      alert("This slot is already in the past.");
      return;
    }

    this.bookingForm.startTime = startTime;
    this.bookingForm.endTime = endTime;
    this.bookingForm.selectedUsers = [];

    this.isBookingModalOpen = true;
  }

  closeModal() {
    this.isBookingModalOpen = false;
    this.selectedSlot = null;
  }

  isTimeValid(): boolean {
    return this.getBookingError() === '';
  }


  getBookingError(): string {
    if (!this.selectedSlot) return 'No slot selected';
    if (!this.bookingForm.startTime || !this.bookingForm.endTime)
      return 'Start and end time are required';

    const start = this.convertTo24Hour(this.bookingForm.startTime);
    const end = this.convertTo24Hour(this.bookingForm.endTime);

    if (start < this.selectedSlot.startTime)
      return 'Selected start time is before slot start time';

    if (end > this.selectedSlot.endTime)
      return 'Selected end time is after slot end time';

    if (start >= end)
      return 'End time must be after start time';

    const today = new Date().toISOString().slice(0, 10);
    if (this.date === today) {
      const now = new Date().toTimeString().slice(0, 5);
      if (start < now)
        return 'Start time cannot be in the past';
    }
    if (this.bookingForm.selectedUsers.length <= 0) {
      return 'No user Selected'
    }
    if (
      this.bookingForm.selectedUsers.length >
      (this.office?.config?.capacity)
    ) {
      return 'Selected users exceed room capacity';
    }
    console.log("till end");

    return '';
  }

  convertTo24Hour(time: string): string {
    if (/^\d{2}:\d{2}$/.test(time)) {
      return time;
    }

    const [rawTime, modifier] = time.split(' ');
    let [hours, minutes] = rawTime.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  toBackendTime(time: string): string {
    const t = this.convertTo24Hour(time);
    return `${t}:00`;
  }
  confirmBooking() {
    if (!this.isTimeValid()) {
      alert("Invalid time selection");
      return;
    }

    const payload = {
      officeId: this.officeId,
      bookingDate: this.date,
      startTime: this.toBackendTime(this.convertTo24Hour(this.bookingForm.startTime)),
      endTime: this.toBackendTime(this.convertTo24Hour(this.bookingForm.endTime)),
      userIds: this.bookingForm.selectedUsers
    };

    console.log("Booking payload:", payload);
    this.officeBookingService.createBookings(payload).subscribe({
      next: () => {
        alert('Booking successful!');
        this.getOfficeAvailability();
      },
      error: err => {
        alert(err?.error?.msg || 'Booking failed');
      }
    });
    this.closeModal();
  }
}

