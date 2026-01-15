const UserRepository = require("./userRepository");

class UserService {
    constructor() {
        this.userRepository= new UserRepository();
    }
    getUserByEmail = async (email) => {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            return false;
        }
        return user;
    }
    createUser = async (firstName, lastName, userName, organisationName, emailId, hashed_password) => {
        // const user = await this.userRepository.getUserByEmail(emailId);
        // if (!user) {
        //     throw new Error('User already exists');
        // }
        const createdUser = await this.userRepository.createUser(
          firstName,lastName,userName,organisationName, emailId, hashed_password
        );

        return createdUser;
    }
}
module.exports = UserService