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
    try {
      const result =
        await this.officeBookingsService.getOfficeVacancyByOfficeIdAndBookingDate({ officeId, bookingDate });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: err.message });
    }
  };

  getUserBookingHistory = async (req, res) => {
    const { userId } = req.params;
    const user = await this.userService.getUserById(userId);

    try {
      let result = await this.officeBookingsService.getBookingHistory(userId);
      const response = result.map((r) => ({
        ...r,
        bookingDate: r.bookingDate.toLocaleDateString("en-CA"),
      }));

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: err.message });
    }
  };

  getUserCurrentBookings = async (req, res) => {
    const { userId } = req.params;
    try {

      const result = await this.officeBookingsService.getCurrentBooking(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: err.message });
    }
  };

  createBookings = async (req, res) => {
    const {
      userIds,
      officeId,
      bookingDate,
      startTime,
      endTime,
      config,
    } = req.body;

    try {
      const result = await this.officeBookingsService.createBookings({
        userIds,
        officeId,
        bookingDate,
        startTime,
        endTime,
        config,
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };

  getBookedSeatsByOfficeIdDateAndTime = async (req, res) => {
    const { officeId, date } = req.query;

    try {
      const result =
        await this.officeBookingsService.getBookedSeatsByOfficeIdDateAndTime(
          officeId,
          date
        );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
}

module.exports = OfficeBookingsController;
