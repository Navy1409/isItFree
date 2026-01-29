const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../../errors/customError");
const UserRepository = require("./userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async loginUser({ emailId, password }) {
    const users = await this.getUserByEmail(emailId);
    const user = users[0];
    if (!user) {
      throw new CustomAPIError("No such user found", 400);
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw new CustomAPIError("Password does not match", 401);
    }
    const token = jwt.sign({ userId: user.userId, isAdmin: user.isAdmin, organisationId: user.organisationId, emailId: user.emailId }, process.env.JWT_SECRET, { expiresIn: "30d" });
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
    pgClient=pool
  }) {
    const user = await this.userRepository.getUserByEmail(emailId);
    let hashed_password=null;
    if (user.length) {
      throw new CustomAPIError("User already exists", StatusCodes.CONFLICT);
    }
    if(password){
     hashed_password = await bcrypt.hash(password, 10)
    }
    const createdUser = await this.userRepository.createUser(
      userName,
      firstName,
      lastName,
      emailId,
      organisationId,
      isAdmin,
      hashed_password,
      pgClient
    );

    if (!createdUser.userId) {
      throw new CustomAPIError("No User Created", 400)
    }

    return createdUser;
  }

  async updateUser(params, body) {
    const ALLOWED_FIELDS = new Set([
      'userName',
      'firstName',
      'lastName',
      'emailId',
      'password',
      'isAdmin'
    ]);
    const { userId } = params;
    const { ...payload } = body;
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
