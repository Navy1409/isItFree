const UserService = require('./userService')
const OrganisationService=require('../organisations/organisationService')
const bcrypt = require('bcrypt');
const CustomAPIError = require('../../errors/customError');
class UserController {
    constructor() {
        this.userService = new UserService()
        this.organisationService= new OrganisationService();
        this.createUser = this.createUser.bind(this);
        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.getUserByOrganisationId =
      this.getUserByOrganisationId.bind(this);
    }
    async createUser(req, res) {
        const { userName, firstName, lastName, emailId, organisationId} = req.body;
        const user = await this.userService.createUser(userName, firstName, lastName, emailId, organisationId)
        res.status(200).json(user);
    }
    async getUserByEmail(req, res) {
        const { emailId } = req.params
        const user = await this.userService.getUserByEmail(emailId);
        if (!user.length) {
            return false;
        }
        res.status(200).json(user)
    }
    async getUserById(req, res) {
        const { userId } = req.params
        const user = await this.userService.getUserById(userId);
        if (!user) {
            return false;
        }
        res.status(200).json(user)
    }
    async deleteUser(req, res) {
        const { userId } = req.params;
        const user = await this.userService.deleteUser(userId);
        res.status(200).json(user);
    }
    async editUser(req, res) {
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