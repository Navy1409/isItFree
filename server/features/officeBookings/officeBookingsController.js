const OfficeBookingsService = require("./officeBookingsService");

class OfficeBookingsController {
    constructor() {
        this.officeBookingsService = new OfficeBookingsService();
    }

    getOfficeVacancyByOfficeIdAndBookingDate = async (req, res) => {
        const { officeId, bookingDate } = req.query;
        if (!officeId) {
            res.status(400).json("Provide Office Id");
        }

        const result = await this.officeBookingsService.getOfficeVacancyByOfficeIdAndBookingDate(officeId, bookingDate)
        res.status(200).json(result)
    }

    getBookedSeatsByOfficeIdDateAndTime = async (req, res) => {
        const { officeId, date, half } = req.query;
        if (!officeId || !date || !half) {
            res.status(400).json("Enter all values")
        }

        const result = await this.officeBookingsService.getBookedSeatsByOfficeIdDateAndTime(officeId, date, String(half).toLowerCase())

        res.status(200).json(result)

    }

}

module.exports = OfficeBookingsController;