const CustomAPIError = require("../../errors/customError");
const UserService = require("../users/userService");
const OfficeBookingsService = require("./officeBookingsService");

class OfficeBookingsController {
  constructor() {
    this.officeBookingsService = new OfficeBookingsService();
    this.userService = new UserService();
  }

  getOfficeVacancyByOfficeIdAndBookingDate = async (req, res) => {
    const { officeId, bookingDate } = req.query;
    if (!officeId) {
      res.status(400).json("Provide Office Id");
    }

    const result = await this.officeBookingsService.getGroupRoomAvailability(
      officeId,
      bookingDate,
    );
    res.status(200).json(result);
  };

  getUserBookingHistory = async (req, res) => {
    const { userId } = req.params;
    const user = await this.userService.getUserById(userId);
    if (!user) {
      res.status(401).json("Invalid Credentials");
    }

    const result = await this.officeBookingsService.getBookingHistory(userId);
    res.status(200).json(result);
  };

  getUserCurrentBookings = async (req, res) => {
    const { userId } = req.params;
    const user = await this.userService.getUserById(userId);
    if (!user) {
      res.status(401).json("Invalid Credentials");
    }

    const result = await this.officeBookingsService.getCurrentBooking(userId);
    res.status(200).json(result);
  };

  createBookings = async (req, res) => {
    const { userIds, officeId, bookingDate, startTime, endTime, config } =
      req.body;
    if (
      !userIds ||
      !officeId ||
      !bookingDate ||
      !startTime ||
      !endTime ||
      !config
    ) {
      res.status(400).json("requied fields are missing");
    }

    const result = await this.officeBookingsService.createBookings(
      userIds,
      officeId,
      bookingDate,
      startTime,
      endTime,
      config,
    );
    res.status(200).json(result);
  };

  getBookedSeatsByOfficeIdDateAndTime = async (req, res) => {
    const { officeId, date, half } = req.query;
    if (!officeId || !date || !half) {
      res.status(400).json("Enter all values");
    }

    const result =
      await this.officeBookingsService.getBookedSeatsByOfficeIdDateAndTime(
        officeId,
        date,
        String(half).toLowerCase(),
      );

    res.status(200).json(result);
  };
}

module.exports = OfficeBookingsController;
