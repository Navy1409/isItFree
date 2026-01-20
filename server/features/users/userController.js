const UserService = require('./userService')
const OrganisationService=require('../organisations/organisationService')
const bcrypt = require('bcrypt');
const CustomAPIError = require('../../errors/customError');
class UserController {
    constructor() {
        this.userService = new UserService()
    }
    createUser = async (req, res) => {
        const { userName, firstName, lastName, emailId, organisationId } = req.body;
        const user = await this.userService.createUser(userName, firstName, lastName, emailId, organisationId)
        res.status(200).json(user);
    }
    getUserByEmail = async (req, res) => {
        const { emailId } = req.params
        const user = await this.userService.getUserByEmail(emailId);
        if (!user.length) {
            return false;
        }
        res.status(200).json(user)
    }
    getUserById = async (req, res) => {
        const { userId } = req.params
        const user = await this.userService.getUserById(userId);
        if (!user) {
            return false;
        }
        res.status(200).json(user)
    }
    deleteUser = async (req, res) => {
        const { userId } = req.params;
        const user = await this.userService.deleteUser(userId);
        res.status(200).json(user);
    }
    editUser = async (req, res) => {
        const ALLOWED_FIELDS = new Set([
            'userName',
            'firstName',
            'lastName',
            'emailId',
            'password',
            'isAdmin'
        ]);
        const { userId } = req.params;
        const { ...payload } = req.body;
        const updates = {};
        for (const [key, value] of Object.entries(payload)) {
            if (!ALLOWED_FIELDS.has(key)) continue;
            if (value === undefined) continue;
            if (key == 'password') {
                updates.password = await bcrypt.hash(value, 10)
            } else {
                updates[key] = value;
            }
        }
        if (Object.keys(updates).length === 0) {
            throw new Error('No valid fields to update');
        }

        const response = await this.userService.updateUser(userId, updates);
        res.status(200).json(response)
    }
    async getUserByOrganisationId(req, res){
        const {organisationId}=req.params;

        const organisation= await this.organisationService.getOrganisationName(organisationId);
        if(!organisation){
            throw new CustomAPIError('Invalid Credentials', 401)
        }
        const response=await this.userService.getUserByOrganisationId(organisationId);
        res.status(200).json(response);
    }
}

module.exports = UserController