const express = require('express');
const router = express.Router();
const OfficeBookingsController = require('../features/officeBookings/officeBookingsController');
const officeBookingsController = new OfficeBookingsController();

router.route('/getGroupRoomAvailability').get(officeBookingsController.getOfficeVacancyByOfficeIdAndBookingDate);
router.route('/getBookedSeatByOfficeIdDateAndTime').get(officeBookingsController.getBookedSeatsByOfficeIdDateAndTime)

module.exports = router