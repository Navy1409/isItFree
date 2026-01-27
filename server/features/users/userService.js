const CustomAPIError = require("../../errors/customError");
const UserRepository = require("./userRepository");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async loginUser({emailId, password}) {
    const user = await this.getUserByEmail(emailId);
    const ok = await bcrypt.compare(password, user[0].password);
    if (!ok) {
      throw new CustomAPIError("Password does not match",401);
    }
    const token= jwt.sign({id:user.userId, isAdmin:user.isAdmin, organsation: user.organisationId}, process.env.JWT_SECRET, {expiresIn:"30d"});
    return token;
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
    if (user.length == 0) {
      return false;
    }
    return user;
  }
  async createUser({
    userName,
    firstName,
    lastName,
    emailId,
    organisationId,
    isAdmin,
    password,
  }) {
    const user = await this.userRepository.getUserByEmail(emailId);
    if (user.length) {
      throw new Error("User already exists");
    }
    const createdUser = await this.userRepository.createUser(
      userName,
      firstName,
      lastName,
      emailId,
      organisationId,
      isAdmin,
      password,
    );

    return createdUser;
  }

  async updateUser(userId, updates) {
    const user = await this.getUserById(userId);
    if (user.length == 0) {
      throw new CustomAPIError("No such user Exists", 400);
    }
    const result = await this.userRepository.updateUser(userId, updates);
    return result;
  }
  async deleteUser(userId) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new CustomAPIError("No such user Exists", 400);
    }
    const result = await this.userRepository.deleteUser(userId);
    return result;
  }
  async getUserByOrganisationId(organisationId) {
    const users =
      await this.userRepository.getUserByOrganisationId(organisationId);
    if (!users) {
      throw new CustomAPIError("Create users to see", 400);
    }
    return users;
  }
}
module.exports = UserService;
