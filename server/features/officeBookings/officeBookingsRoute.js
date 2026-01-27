const express = require("express");
const router = express.Router();
const OfficeBookingsController = require("./officeBookingsController");
const officeBookingsController = new OfficeBookingsController();
const { validate } = require("../../middleware/validate");
const {
  createBookingsSchema,
  officeVacancyQuerySchema,
  userIdParamSchema,
  bookedSeatsQuerySchema,
} = require("../../validations/officeBookings.validaition");

router
  .route("/getGroupRoomAvailability")
  .get(
    validate(officeVacancyQuerySchema, "query"),
    officeBookingsController.getOfficeVacancyByOfficeIdAndBookingDate,
  );
router
  .route("/getBookedSeatByOfficeIdDateAndTime")
  .get(
    validate(bookedSeatsQuerySchema, "query"),
    officeBookingsController.getBookedSeatsByOfficeIdDateAndTime,
  );
router
  .route("/createBookings")
  .post(
    validate(createBookingsSchema),
    officeBookingsController.createBookings,
  );
router
  .route("/getHistory/:userId")
  .get(
    validate(userIdParamSchema, "params"),
    officeBookingsController.getUserBookingHistory,
  );
router
  .route("/getCurrentBookings/:userId")
  .get(
    validate(userIdParamSchema, "params"),
    officeBookingsController.getUserCurrentBookings,
  );

module.exports = router;
