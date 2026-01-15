import UserRepository from './userRepository';

class UserService {
    constructor(context) {
        this.userRepository = new UserRepository(context)
    }
    getUserByEmail = async (email) => {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            return false;
        }
        return user;
    }
    createUser = async (user) => {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error('User already exists');
        }
        const createdUser = await this.userRepository.createUser(
            userData.userName,
            userData.firstName,
            userData.lastName,
            userData.emailId,
            userData.isAdmin,
            userData.organisationId
        );

        return createdUser;
    }
}
module.exports = UserService