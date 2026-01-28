const CustomAPIError = require("../../errors/customError");
const UserService = require("../users/userService");
const OfficeBookingsService = require("./officeBookingsService");

class OfficeBookingsController {
  constructor() {
    this.officeBookingsService = new OfficeBookingsService();
    this.userService = new UserService();
  }

  getOfficeVacancyByOfficeIdAndBookingDate = async (req, res) => {
    const payload = req.query;
    try {
      const result =
        await this.officeBookingsService.getOfficeVacancyByOfficeIdAndBookingDate(payload);
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
    const payload = req.body;

    try {
      const result = await this.officeBookingsService.createBookings(payload);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };

  getBookedSeatsByOfficeIdDateAndTime = async (req, res) => {
    const { officeId, date, half } = req.query;

    try {
      const result =
        await this.officeBookingsService.getBookedSeatsByOfficeIdDateAndTime(
          officeId,
          date,
          String(half).toLowerCase(),
        );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
}

module.exports = OfficeBookingsController;
