const express = require("express");
const router = express.Router();
const OfficeBookingsController = require("./officeBookingsController");
const officeBookingsController = new OfficeBookingsController();
const validate = require("../../middleware/validate");
const OfficeBookingsValidation = require("../../validations/officeBookings.validaition");
const officeBookingsValidation = new OfficeBookingsValidation();

router
  .route("/getGroupRoomAvailability")
  .get(
    validate(officeBookingsValidation.officeVacancyQuerySchema, "query"),
    officeBookingsController.getOfficeVacancyByOfficeIdAndBookingDate,
  );
router
  .route("/getBookedSeatByOfficeIdDateAndTime")
  .get(
    validate(officeBookingsValidation.bookedSeatsQuerySchema, "query"),
    officeBookingsController.getBookedSeatsByOfficeIdDateAndTime,
  );
router
  .route("/createBookings")
  .post(
    validate(officeBookingsValidation.createBookingsSchema),
    officeBookingsController.createBookings,
  );
router
  .route("/getHistory/:userId")
  .get(
    validate(officeBookingsValidation.userIdParamSchema, "params"),
    officeBookingsController.getUserBookingHistory,
  );
router
  .route("/getCurrentBookings/:userId")
  .get(
    validate(officeBookingsValidation.userIdParamSchema, "params"),
    officeBookingsController.getUserCurrentBookings,
  );

module.exports = router;
