const Joi = require('joi');
const CommonValidation = require('./common.schema');

class OrganisationValidation {
    constructor() {
        const common = new CommonValidation();

        this.organisationIdParamSchema = Joi.object({
            organisationId: common.organisationId.required()
        });

        this.updateOrganisationNameSchema = Joi.object({
            organisationName: common.organisationName.required()
        });
    }
}

module.exports = OrganisationValidation;
