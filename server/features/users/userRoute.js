const express = require('express');
const router = express.Router();
const { authenticate, authorisation } = require('../../middleware/authMiddleware')
const validate = require('../../middleware/validate')
const UserSchema = require('../../validations/users.validation')
const userSchema = new UserSchema();
const UserController = require('./userController');
const userController = new UserController();

router.route('/createUser').post(authenticate, authorisation, validate(userSchema.createUserSchema), userController.createUser);
router.route('/updateUser/:userId').patch(authenticate, validate(userSchema.userIdParamSchema, "params"), validate(userSchema.updateUserSchema), userController.editUser);
router.route('/getUserByEmail/:emailId').get(authenticate, validate(userSchema.emailParamSchema, "params"), userController.getUserByEmail);
router.route('/getUserById/:userId').get(authenticate, validate(userSchema.userIdParamSchema, "params"), userController.getUserById)
router.route('/deleteUser/:userId').delete(authenticate, validate(userSchema.userIdParamSchema, "params"), authorisation, userController.deleteUser);
router.route('/getUserByOrganisationId').get(authenticate, userController.getUserByOrganisationId);
router.route('/login').post(validate(userSchema.loginSchema), userController.login);
router.route('/register').post(validate(userSchema.registerSchema), userController.register)

module.exports = router;
