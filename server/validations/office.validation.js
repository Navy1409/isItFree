const CommonValidation = require("./common.schema");

const Joi = require("joi");

class officeValidation {
  constructor() {
    const common = new CommonValidation();
    const officeName = common.officeName;
    const organisationId =common.organisationId;
    const config = common.config;
    const isGroup=common.isGroup;
    const officeId=common.officeId;

    this.createOfficeSchema = Joi.object({
      officeName: officeName.required(),
      organisationId: organisationId.required(),
      location: Joi.string().min(5).max(50),
      config: config.required(),
      isGroup: isGroup.required(),
    });
    this.organisationIdParamSchema = Joi.object({
      organisationId: organisationId.required(),
    });

    this.officeIdParamSchema = Joi.object({
      officeId: officeId.required(),
    });

  }
}

module.exports= officeValidation;
