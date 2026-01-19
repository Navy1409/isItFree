const CustomAPIError = require("../../errors/customError");
const UserRepository = require("./userRepository");

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user.length) {
            return false;
        }
        return user;
    }
    async getUserById(id) {
        const user = await this.userRepository.getUserById(id);
        if (user.length==0) {
            return false;
        }
        return user;
    }
    async createUser(userName, firstName, lastName, emailId,organisationId, isAdmin,hashed_password) {
        const user = await this.userRepository.getUserByEmail(emailId);
        if (user.length) {
            throw new Error('User already exists');
        }
        const createdUser = await this.userRepository.createUser(
            userName, firstName, lastName, emailId,organisationId, isAdmin,hashed_password
        );

    return createdUser;
  };

    async loginUpdate(userId, organisationId) {
        const response = await this.userRepository.loginUpdate(userId, organisationId)
        return response;
    }

    async updateUser(userId, updates) {
        const user = await this.getUserById(userId);
        if (user.length==0) {
            throw new CustomAPIError("No such user Exists", 400)
        }
        const result = await this.userRepository.updateUser(userId, updates)
        return result;

    }
    async deleteUser(userId) {
        const user = await this.getUserById(userId);
        if (!user) {
            throw new CustomAPIError("No such user Exists", 400)
        }
        const result = await this.userRepository.deleteUser(userId);
        return result;

    }
    async getUserByOrganisationId(organisationId){        
        const users= await this.userRepository.getUserByOrganisationId(organisationId);
        if(!users){
            throw new CustomAPIError("Create users to see",400)
        }
        return users;
    }
}
module.exports = UserService;
