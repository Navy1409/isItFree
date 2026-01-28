import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  office = {
    officeName: 'Abc-abc',
    location: '1st floor, corner room',
    config: { capacity: 20 }
  };

  availableSlots: Slot[] = [];

  ngOnInit() {
    this.availableSlots = [
      { startTime: '09:00:00', endTime: '10:00:00' },
      { startTime: '11:00:00', endTime: '19:00:00' }
    ];
  }

  formatTime(time: string): string {
    return time.slice(0, 5);
  }

  bookSlot(slot: Slot) {
    console.log('Booking slot:', slot);
  }
}
