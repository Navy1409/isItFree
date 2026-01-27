const express = require("express");
const router = express.Router();
const OrganisationController = require("./organisationController");
const organisationController = new OrganisationController();
router
  .route("/name/:organisationId")
  .get(organisationController.getOrganisationName)
  .patch(organisationController.updateOrganisationName);
module.exports = router;
