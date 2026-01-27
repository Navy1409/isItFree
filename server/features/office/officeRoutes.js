const express = require("express");
const router = express.Router();
const OfficeController = require("./officeController");
const officeController = new OfficeController();
const { authorisation } = require("../../middleware/authMiddleware");
const OfficeValidation = require("../../validations/office.validation");
const officeValidation = new OfficeValidation();
const validate = require("../../middleware/validate");

router
  .route("/createOffice")
  .post(
    authorisation,
    validate(officeValidation.createOfficeSchema),
    officeController.createOffice,
  );
router
  .route("/getOfficesByOrganisationId/:organisationId")
  .get(
    validate(officeValidation.organisationIdParamSchema, "params"),
    officeController.getOfficesByOrganisationId,
  );
router
  .route("/getOfficeByOfficeId/:officeId")
  .get(
    validate(officeValidation.officeIdParamSchema, "params"),
    officeController.getOfficeByOfficeId,
  );

module.exports = router;
