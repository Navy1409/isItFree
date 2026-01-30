const Joi = require("joi");
const CommonValidation = require("./common.schema");

class OfficeBookingsValidation {
  constructor() {
    const common = new CommonValidation();

    const officeId = common.officeId;
    const bookingDate = common.bookingDate;
    const endTime = common.time;
    const startTime = common.time;
    const userId = common.userId;
    const userIds = common.userIds;
    const config = common.config;

    this.officeVacancyQuerySchema = Joi.object({
      officeId: officeId.required(),
      bookingDate: bookingDate.required()
    });

    this.bookedSeatsQuerySchema = Joi.object({
      officeId: officeId.required(),
      date: bookingDate.required(),
    });

    this.createBookingsSchema = Joi.object({
      userIds: userIds.required(),
      officeId: officeId.required(),
      bookingDate: bookingDate.required(),
      startTime: startTime.required(),
      endTime: endTime.required(),
      config: config.optional()
    });

    this.userIdParamSchema = Joi.object({
      userId: userId.required()
    });
  }
}

module.exports = OfficeBookingsValidation;
