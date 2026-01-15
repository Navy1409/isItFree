const { pool } = require("../../db/connect");
const squel = require("squel").useFlavour("postgres");

class userRepository {
  getUserByEmail = async (email) => {
    const query = squel
      .select()
      .from("users", "u")
      .field("u.*")
      .where('u."emailId" = ?', email)
      .toParam();

      console.log(query.text, query.values);
      
    const result = await pool.query(query.text, query.values);
    return result.rows[0];
  };

  createUser = async (
    userName,
    firstName,
    lastName,
    emailId,
    isAdmin,
    organisationId
  ) => {
    const query = squel
      .insert()
      .into("users")
      .set("emailId", emailId)
      .set("userName", userName)
      .set("firstName", firstName)
      .set("lastName", lastName)
      .set("isAdmin", isAdmin)
      .set("organisationId", organisationId)
      .returning("id")
      .toParam();

    return await pool.query(query.text, query.values);
  };
}

module.exports = userRepository;
