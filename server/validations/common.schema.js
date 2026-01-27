const Joi=require('joi');

export const uuid = Joi.string().uuid();

export const userId = uuid;
export const officeId = uuid;
export const organisationId = uuid;

export const emailId = Joi.string().email();
export const password = Joi.string().min(8).max(30);
export const userName = Joi.string().min(3).max(30);
export const firstName = Joi.string().min(2).max(50);
export const lastName = Joi.string().min(2).max(50);
export const isAdmin = Joi.boolean();
export const organisationName = Joi.string().min(3).max(100);
export const officeName = Joi.string().min(3).max(100);
export const location = Joi.string().min(2).max(100);
export const isGroup = Joi.boolean();
export const bookingDate = Joi.date().iso();

export const startTime = timeHHMM;
export const endTime = timeHHMM;
export const userIds = Joi.array().items(uuid).min(1);
export const half = Joi.string().valid("first half", "second half", "full day");