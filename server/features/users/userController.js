const UserService = require('./userService')
const bcrypt = require('bcrypt');
class UserController {
    constructor() {
        this.userService = new UserService()
    }
    createUser = async (req, res) => {
        try {
                    const payload = req.body;
        const user = await this.userService.createUser(payload)
        res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }

    }
    getUserByEmail = async (req, res) => {
        const { emailId } = req.params
        try {
        const user = await this.userService.getUserByEmail(emailId);
        res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
        
    }
    getUserById = async (req, res) => {
        const { userId } = req.params

        try {
            const user = await this.userService.getUserById(userId);
        res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
        
    }
    deleteUser = async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await this.userService.deleteUser(userId);
        res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
        
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
        try {
        const response=await this.userService.getUserByOrganisationId(organisationId);
        res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }

    }
    login= async (req , res)=>{
        const payload=req.body;
        try {
            const token= await this.userService(payload);
            res.status(StatusCodes.OK).json(token);            
        } catch (error) {
            res.status(500).json({msg:error.message});
        }
    }
}

module.exports = UserController