const express = require('express');
const router = express.Router();
const OfficeBookingsController = require('../features/officeBookings/officeBookingsController');
const officeBookingsController = new OfficeBookingsController();

router.route('/getGroupRoomAvailability').get(officeBookingsController.getOfficeVacancyByOfficeIdAndBookingDate)
router.route('/getBookedSeatByOfficeIdDateAndTime').get(officeBookingsController.getBookedSeatsByOfficeIdDateAndTime)
router.route('/createBookings').post(officeBookingsController.createBookings)
router.route('/getHistory/:userId').get(officeBookingsController.getUserBookingHistory)
router.route('/getCurrentBookings/:userId').get(officeBookingsController.getUserCurrentBookings)

module.exports = router