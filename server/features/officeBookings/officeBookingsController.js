const OfficeBookingsService = require("./officeBookingsService");

class OfficeBookingsController {
    constructor() {
        this.officeBookingsService = new OfficeBookingsService();
    }

    getGroupOfficeAvailability = async (req, res) => {
        const { officeId, bookingDate } = req.query;
        if (!officeId) {
            res.status(400).json("Provide Office Id");
        }

        const result = await this.officeBookingsService.getGroupRoomAvailability(officeId, bookingDate)
        res.status(200).json(result)
    }
}

module.exports = OfficeBookingsController;