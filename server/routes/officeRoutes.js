const express = require('express');
const router = express.Router();
const OfficeController = require('../features/office/officeController')
const officeController = new OfficeController();

router.route('/createOffice').post(officeController.createOffice);
router.route('/getOfficesByOrganisationId/:organisationId').get(officeController.getOfficesByOrganisationId)
router.route('/getOfficeByOfficeId/:officeId').get(officeController.getOfficeByOfficeId)

module.exports = router;