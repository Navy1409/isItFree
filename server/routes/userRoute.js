const express = require('express');
const router = express.Router();
const { authorisation } = require('../middleware/authMiddleware')
const UserController = require('../features/users/userController');
const userController = new UserController();

router.route('/createUser').post(userController.createUser);
router.route('/updateUser/:userId').patch(userController.editUser);
router.route('/getUserById/:userId').get(userController.getUserById)
router.route('/deleteUser/:userId').delete(userController.deleteUser);
router.route('/getUserByOrganisationId/:organisationId').get(userController.getUserByOrganisationId)

module.exports = router;
