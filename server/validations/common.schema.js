const Joi = require('joi');

class CommonValidation {
  constructor(parameters) {

  }
  uuid = Joi.string().uuid();
  positiveInt = Joi.number().min(1);
  timeHHMMSS = Joi.string().pattern(
    /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
  );
  userId = this.uuid;
  officeId = this.uuid;
  organisationId = this.uuid;
  emailId = Joi.string().email();
  password = Joi.string().min(8).max(30);
  userName = Joi.string().min(3).max(30);
  name = Joi.string().min(2).max(50);
  config = Joi.object({
    row: this.positiveInt.required(),
    column: this.positiveInt.required(),
    capacity: this.positiveInt.optional()
  }).unknown(false);
  isAdmin = Joi.boolean();
  organisationName = Joi.string().min(3).max(100);
  officeName = Joi.string().min(3).max(100);
  location = Joi.string().min(2).max(100);
  isGroup = Joi.boolean();
  bookingDate = Joi.date().iso();
  time = this.timeHHMMSS;
  userIds = Joi.array().items(this.uuid).min(1);
}

module.exports = CommonValidation;