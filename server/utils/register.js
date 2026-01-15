require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const OrganisationService = require("../features/organisations/organisationService");
const CustomAPIError = require("../errors/customError");
const organisationService = new OrganisationService();
const UserService = require("../features/users/userService");
const userService = new UserService();
module.exports = async (req, res, next) => {
  const { firstName, lastName, userName, organisationName, emailId, password } =
    req.body;
  if (!userName || !emailId || !password || !organisationName) {
    throw new CustomAPIError("Please provide required credentials", 400);
  }
  const hashed_password = await bcrypt.hash(password, 10);
  const user = await userService.createUser(
    firstName,
    lastName,
    userName,
    emailId,
    true,
    hashed_password
  );
  const organisation = await organisationService.createOrganisation(
    organisationName,
    user.userId
  );
  if (!user || !organisation) {
    throw new CustomAPIError("Please provide required credentials", 400);
  }
  const result = await userService.loginUpdate(user.userId, organisation);
  if (!result) {
    throw new CustomAPIError("Login unsuccessful", 400);
  }
  const token = jwt.sign(
    { id: user.id, organisation_id: organisation, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.status(201).json({ token });
};
