const express = require('express');
const router = express.Router();
const OfficeController = require('./officeController')
const officeController = new OfficeController();
const { authorisation } = require('../../middleware/authMiddleware')

router.route('/createOffice').post(authorisation, officeController.createOffice);
router.route('/getOfficesByOrganisationId/:organisationId').get(officeController.getOfficesByOrganisationId)
router.route('/getOfficeByOfficeId/:officeId').get(officeController.getOfficeByOfficeId)

module.exports = router;