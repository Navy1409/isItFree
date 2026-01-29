import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class timeRangeValidator {
validateOrganisationTime(control: AbstractControl): ValidationErrors | null {
    const openTime = control.get('openTime')?.value;
    const closeTime = control.get('closeTime')?.value;
    const breakTime = control.get('breakTime')?.value;

    if (!openTime || !closeTime || !breakTime) {
      return null;
    }

    const toMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
    const start = toMinutes(openTime);
    const midBreak = toMinutes(breakTime);
    const end = toMinutes(closeTime);
    if (start >= end) {
      return { invalidTimeRange: true };
    } else if (midBreak >= end && midBreak <= start) {
      return { invalidBreakTime: true };
    }
    return null;
  }
}
