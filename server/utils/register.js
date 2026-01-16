require("dotenv").config();
const { pool } = require("../db/connect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const OrganisationService = require("../features/organisations/organisationService");
const CustomAPIError = require("../errors/customError");
const organisationService = new OrganisationService();
const UserService = require("../features/users/userService");
const userService = new UserService();
module.exports = async (req, res, next) => {
  const pgClient = await pool.connect();

  try {
    const {
      firstName,
      lastName,
      userName,
      organisationName,
      emailId,
      password,
    } = req.body;
    if (!userName || !emailId || !password || !organisationName) {
      throw new CustomAPIError("Please provide required credentials", 400);
    }

    await pgClient.query("BEGIN");
    const hashed_password = await bcrypt.hash(password, 10);
    const organisation = await organisationService.createOrganisation(
      organisationName
    );
    const user = await userService.createUser(
      userName,
      firstName,
      lastName,
      emailId,
      true,
      hashed_password,
      organisation
    );

    await pgClient.query("COMMIT");
    if (!user || !organisation) {
      throw new CustomAPIError("Please provide required credentials", 400);
    }
    const token = jwt.sign(
      { id: user.userId, organisation_id: organisation, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({ token });
  } catch (err) {
    await pgClient.query("ROLLBACK");
    next(err);
  } finally {
    pgClient.release();
  }
};
