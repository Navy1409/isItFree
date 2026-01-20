const CustomAPIError = require("../../errors/customError");
const OfficeService = require("../office/officeSevice");
const OrganisationRepository = require("../organisations/organisationRepository");
const OfficeBookingsRepository = require("./officeBookingsRepository");

class OfficeBookingsService {
  constructor() {
    this.officeService = new OfficeService();
    this.officeBookingsRepository = new OfficeBookingsRepository();
    this.organisationRepository = new OrganisationRepository();
  }

  async createBookings(
    userIds,
    officeId,
    bookingDate,
    startTime,
    endTime,
    config,
  ) {
    const today = new Date().toISOString().slice(0, 10);

    if (bookingDate < today || startTime > endTime) {
      throw new CustomAPIError("please provide valid Date for booking", 400);
    } else if (bookingDate === today) {
      const nowTime = new Date().toISOString().slice(11, 16);
      if (startTime < nowTime) {
        throw new CustomAPIError("Please provide valid booking time", 400);
      }
    }

    const office = await this.officeService.getOfficeByOfficeId(officeId);
    const { openTime, closeTime } =
      await this.organisationRepository.getOrganisationTimings(
        office[0]?.organisationId,
      );

    if (startTime < openTime || endTime > closeTime) {
      throw new CustomAPIError(
        "The start and end time in bookings must be in between the organisation timings",
      );
    }

    const isAvailableForGroupBoookings =
      await this.officeService.getIsGroupByOfficeId(officeId);

    let { row, column } = config ?? {};
    const isGroup = isAvailableForGroupBoookings[0]?.isGroup;

    if (isGroup) {
      if (userIds.length === 0) {
        throw new CustomAPIError("userIds must be a non-empty array", 400);
      }

      const isOfficeAvailable = await this.isOfficeAvailable(
        officeId,
        bookingDate,
        startTime,
        endTime,
      );

      if (!isOfficeAvailable) {
        throw new CustomAPIError(
          "office is not available at the given time",
          409,
        );
      }

      row = null;
      column = null;
    } else {
      if (userIds.length !== 1) {
        throw new CustomAPIError(
          "There should be only one user for single seat booking",
          409,
        );
      }

      const isSeatAvailable = await this.isSeatAvailable(
        officeId,
        bookingDate,
        row,
        column,
        startTime,
        endTime,
      );

      if (!isSeatAvailable) {
        throw new CustomAPIError(
          "The seat is not available at the given time",
          409,
        );
      }
    }
    const results = [];
    for (const userId of userIds) {
      const userAvailable = await this.isUserAvailable(
        userId,
        bookingDate,
        startTime,
        endTime,
        isGroup,
      );
      if (!userAvailable) {
        throw new Error("The user is not available for the given booking", 409);
      }


      const booking = await this.officeBookingsRepository.createBookings({
        userId,
        officeId,
        bookingDate,
        startTime,
        endTime,
        config: { row, column },
      });
      results.push(booking);
    }
    return results;
  }

  async getOfficeVacancyByOfficeIdAndBookingDate(officeId, bookingDate) {
    const office = await this.officeService.getOfficeByOfficeId(officeId)
    if (!office.length) {
      throw new CustomAPIError("No such office Exists", 400);
    }
    const { openTime, closeTime } = await this.organisationRepository.getOrganisationTimings(office[0]?.organisationId)
    const existingBookings = await this.officeBookingsRepository.getOfficeBookingTimes(officeId, bookingDate)
    if (!existingBookings.length) {
      return { openTime, closeTime };
    }
    const availableBooking = this.getAvailability(openTime, closeTime, existingBookings)
    return availableBooking;
  }

  async getBookedSeatsByOfficeIdDateAndTime(officeId, date, half) {
    const office = await this.officeService.getOfficeByOfficeId(officeId);
    if (!office.length) {
      throw new CustomAPIError("No such office Exists", 400);
    }
    const { openTime, closeTime, breakTime } = await this.organisationRepository.getOrganisationTimings(office[0]?.organisationId);
    let startTime;
    let endTime;
    if (half === 'first half') {
      startTime = openTime;
      endTime = breakTime;
    }
    else if (half === 'second half') {
      startTime = breakTime;
      endTime = closeTime;
    }
    else if (half === 'full day') {
      startTime = openTime;
      endTime = closeTime
    }
    else {
      throw new CustomAPIError("Select correct timings for seat booking", 400)
    }
    const result = await this.officeBookingsRepository.getBookedSeatsByOfficeIdDateAndTime(officeId, date, startTime, endTime)

    return result;
  }

  async isUserAvailable({ userId, bookingDate, startTime, endTime, isGroup }) {
    const existingBookings = isGroup
      ? await this.officeBookingsRepository.getUserGroupBookingTimes(
        userId,
        bookingDate,
      )
      : await this.officeBookingsRepository.getUserBookingTimes(
        userId,
        bookingDate,
      );

    const conflict = this.doesTimeOverlap(existingBookings, startTime, endTime);

    return !conflict;
  }

  async isOfficeAvailable(officeId, bookingDate, startTime, endTime) {
    const existingBookings =
      await this.officeBookingsRepository.getOfficeBookingTimes(
        officeId,
        bookingDate,
      );

    const conflict = this.doesTimeOverlap(
      existingBookings,
      startTime,
      endTime,
    );

    return !conflict;
  }

  async isSeatAvailable(
    officeId,
    bookingDate,
    row,
    column,
    startTime,
    endTime,
  ) {
    const existingBookings =
      await this.officeBookingsRepository.getSeatBookingTimes(
        officeId,
        bookingDate,
        row,
        column,
      );

    const conflict = this.doesTimeOverlap(existingBookings, startTime, endTime);

    return !conflict;
  }

  doesTimeOverlap(existingBookings, newStart, newEnd) {
    return existingBookings.some(({ startTime, endTime }) => {
      return startTime < newEnd && endTime > newStart;
    });
  }

  getAvailability(openTime, closeTime, existingBookings) {
    let currentTime = openTime;
    for (const booking of existingBookings) {
      if (currentTime < booking.startTime) {
        availableBooking.push({
          startTime: currentTime,
          endTime: booking.startTime
        });
      }
      if (booking.endTime > currentTime) {
        currentTime = booking.endTime;
      }
    }
    if (currentTime < closeTime) {
      availableBooking.push({
        startTime: currentTime,
        endTime: closeTime
      });
    }
  }

  async getBookingHistory(userId) {
    const today = new Date();
    const endDate = today.toISOString().slice(0, 10);
    const start = new Date()
    start.setDate(today.getDate() - 7)
    const startDate = start.toISOString().slice(0, 10);

    return await this.officeBookingsRepository.getAllBookingsByUserUUID(
      userId,
      startDate,
      endDate,
    );
  }

  async getCurrentBooking(userId) {
    const startDate = new Date().toISOString().slice(0.1);
    return await this.officeBookingsRepository.getAllBookingsByUserUUID(
      userId,
      startDate,
    );
  }
}

module.exports = OfficeBookingsService;
