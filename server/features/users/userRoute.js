const express = require('express');
const router = express.Router();
const { authorisation } = require('../../middleware/authMiddleware')
const UserController = require('./userController');
const userController = new UserController();

router.route('/createUser').post(userController.createUser);
router.route('/updateUser/:userId').patch(userController.editUser);
router.route('/getUserByEmail/:emailId').get(userController.getUserByEmail);
router.route('/getUserById/:userId').get(userController.getUserById)
router.route('/deleteUser/:userId').delete(authorisation, userController.deleteUser);
router.route('/getUserByOrganisationId/:organisationId').get(userController.getUserByOrganisationId);
router.route('/login').post(userController.login);

module.exports = router;
