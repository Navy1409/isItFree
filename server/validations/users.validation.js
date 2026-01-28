const Joi = require("joi");
const CommonValidation = require("./common.schema");

class UserValidation {
    constructor() {
        const common = new CommonValidation();

        this.createUserSchema = Joi.object({
            userName: common.userName.required(),
            firstName: common.name.required(),
            lastName: common.name.required(),
            emailId: common.emailId.required(),
            organisationId: common.organisationId.required(),
            isAdmin: common.isAdmin.optional(),
            password: common.password.optional()
        });

        this.updateUserSchema = Joi.object({
            userName: common.userName.optional(),
            firstName: common.name.optional(),
            lastName: common.name.optional(),
            emailId: common.emailId.optional(),
            password: common.password.optional(),
            isAdmin: common.isAdmin.optional()
        }).min(1);

        this.userIdParamSchema = Joi.object({
            userId: common.userId.required()
        });

        this.emailParamSchema = Joi.object({
            emailId: common.emailId.required()
        });

        this.organisationIdParamSchema = Joi.object({
            organisationId: common.organisationId.required()
        });

        this.loginSchema = Joi.object({
            emailId: common.emailId.required(),
            password: common.password.required()
        });

        this.registerSchema = Joi.object({
            firstName: common.name.required(),
            lastName: common.name.required(),
            userName: common.userName.required(),
            organisationName: common.organisationName.required(),
            emailId: common.emailId.required(),
            password: common.password.required(),
            openTime: common.time.required(),
            closeTime: common.time.required(),
            breakTime: common.time.required()
        });
    }
}

module.exports = UserValidation;
