const UserRepository = require("./userRepository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  getUserByEmail = async (email) => {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return false;
    }
    return user;
  };
  createUser = async (
    userName,
    firstName,
    lastName,
    emailId,
    isAdmin,
    hashed_password,
    organisationId
  ) => {
    const user = await this.userRepository.getUserByEmail(emailId);
    if (user.length) {
      throw new Error("User already exists");
    }
    const createdUser = await this.userRepository.createUser(
      userName,
      firstName,
      lastName,
      emailId,
      isAdmin,
      hashed_password,
      organisationId
    );

    return createdUser;
  };

}
module.exports = UserService;
