const express = require('express');
const router = express.Router();
const { authenticate, authorisation } = require('../../middleware/authMiddleware')
const UserController = require('./userController');
const userController = new UserController();

router.route('/createUser').post(authenticate, authorisation, userController.createUser);
router.route('/updateUser/:userId').patch(authenticate, userController.editUser);
router.route('/getUserByEmail/:emailId').get(authenticate, userController.getUserByEmail);
router.route('/getUserById/:userId').get(authenticate, userController.getUserById)
router.route('/deleteUser/:userId').delete(authenticate, authorisation, userController.deleteUser);
router.route('/getUserByOrganisationId/:organisationId').get(authenticate, userController.getUserByOrganisationId);
router.route('/login').post(userController.login);
router.route('/register').post(userController.register)

module.exports = router;
