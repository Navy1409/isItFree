const Joi= require('joi');
const {officeId, bookingDate,half, endTime, userIds, config}=require('./common.schema');

export const officeVacancyQuerySchema = Joi.object({
  officeId: officeId.required(),
  bookingDate: bookingDate.required()
});

export const bookedSeatsQuerySchema = Joi.object({
  officeId: uuid.required(),
  date: bookingDate.required(),
  half: half.required()
});


export const createBookingsSchema = Joi.object({
  userIds: userIds.required(),
  officeId: officeId.required(),
  bookingDate: bookingDate.required(),
  startTime: startTime.required(),
  endTime: endTime.required(),
  config
});
export const userIdParamSchema = Joi.object({
  userId: uuid.required(),
});