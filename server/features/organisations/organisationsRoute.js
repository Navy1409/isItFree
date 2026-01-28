const express = require("express");
const router = express.Router();
const OrganisationController = require("./organisationController");
const organisationController = new OrganisationController();
const OrganisationValidation = require('../../validations/organisation.validation');
const validate = require('../../middleware/validate');
const { authorisation } = require('../../middleware/authMiddleware');
const organisationValidation = new OrganisationValidation();
router
  .route("/name/:organisationId")
  .get(
    validate(organisationValidation.organisationIdParamSchema, 'params'),
    organisationController.getOrganisationName
  )
  .patch(
    authorisation,
    validate(organisationValidation.organisationIdParamSchema, 'params'),
    validate(organisationValidation.updateOrganisationNameSchema),
    organisationController.updateOrganisationName
  );

module.exports = router;
