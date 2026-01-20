const CustomAPIError = require("../../errors/customError");
const OfficeService = require("../office/officeSevice");
const OfficeBookingsRepository = require("./officeBookingsRepository");

class officeBookingsService {
  constructor() {
    this.officeService = new OfficeService();
    this.officeBookingsRepository = new OfficeBookingsRepository();
  }

  async createGroupBookings(
    userId,
    officeId,
    bookingDate,
    startTime,
    endTime,
    config,
  ) {

  }

  async isUserAvailable({ userId, bookingDate, startTime, endTime, isGroup }) {
    const existingBookings = isGroup
      ? await this.officeBookingsRepository.getUserGroupBookingTimes({
          userId,
          bookingDate,
        })
      : await this.officeBookingsRepository.getUserBookingTimes({
          userId,
          bookingDate,
        });

    const conflict = this.doesTimeOverlap(existingBookings, startTime, endTime);

    return !conflict;
  }

  async isOfficeAvailable({ officeId, bookingDate, startTime, endTime }) {
    const existingBookings =
      await this.officeBookingsRepository.getOfficeBookingTimes({
        officeId,
        bookingDate,
      });

    const conflict = this.doesTimeOverlap(existingBookings, startTime, endTime);

    return !conflict;
  }

  async isSeatAvailable({
    officeId,
    bookingDate,
    row,
    column,
    startTime,
    endTime,
  }) {
    const existingBookings =
      await this.officeBookingsRepository.getSeatBookingTimes({
        officeId,
        bookingDate,
        row,
        column,
      });

    const conflict = this.doesTimeOverlap(existingBookings, startTime, endTime);

    return !conflict;
  }

  async doesTimeOverlap(existingBookings, newStart, newEnd) {
    return existingBookings.some(({ startTime, endTime }) => {
      return startTime < newEnd && endTime > newStart;
    });
  }
}
