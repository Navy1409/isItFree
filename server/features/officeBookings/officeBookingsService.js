const CustomAPIError = require("../../errors/customError");
const OfficeService = require("../office/officeSevice");
const OfficeBookingsRepository = require("./officeBookingsRepository");

class officeBookingsService {
  constructor() {
    this.officeService = new OfficeService();
    this.officeBookingsRepository = new OfficeBookingsRepository();
  }

  async createBookings(
    userIds,
    officeId,
    bookingDate,
    startTime,
    endTime,
    config,
  ) {
    const isAvailableForGroupBoookings =
      await this.officeService.getIsGroupByOfficeId(officeId);

    let { row, column } = config ?? {};
    const isGroup = isAvailableForGroupBoookings[0]?.isGroup;

    if (isGroup) {

      if (!Array.isArray(userIds) || userIds.length === 0) {
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

      if (userIds.length > 1) {
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

  async isUserAvailable(userId, bookingDate, startTime, endTime, isGroup) {
    const existingBookings = isGroup
      ? await this.officeBookingsRepository.getUserGroupBookingTimes(
          userId,
          bookingDate,
        )
      : await this.officeBookingsRepository.getUserBookingTimes(
          userId,
          bookingDate,
        );

    const conflict = await this.doesTimeOverlap(
      existingBookings,
      startTime,
      endTime,
    );

    return !conflict;
  }

  async isOfficeAvailable(officeId, bookingDate, startTime, endTime) {
    const existingBookings =
      await this.officeBookingsRepository.getOfficeBookingTimes(
        officeId,
        bookingDate,
      );

    const conflict = await this.doesTimeOverlap(
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

    const conflict = await this.doesTimeOverlap(
      existingBookings,
      startTime,
      endTime,
    );

    return !conflict;
  }

  async doesTimeOverlap(existingBookings, newStart, newEnd) {
    return existingBookings.some(({ startTime, endTime }) => {
      return startTime < newEnd && endTime > newStart;
    });
  }
}
