const express = require("express");
const router = express.Router();
const OrganisationController = require("./organisationController");
const organisationController = new OrganisationController();
const { authorisation } = require('../../middleware/authMiddleware')
router
  .route("/name/:organisationId")
  .get( organisationController.getOrganisationName)
  .patch( authorisation, organisationController.updateOrganisationName);
module.exports = router;
