const { pool } = require("../../db/connect");
const squel = require("squel").useFlavour("postgres");

class userRepository {
  getUserByEmail = async (email) => {
    const query = squel
      .select()
      .from("users")
      .where('"emailId" = ?', email)
      .toParam();


    const result = await pool.query(query.text, query.values);
    return result.rows.length;
  };

  getUserById = async (id) => {
    const query = squel
      .select()
      .from("users")
      .field('"userName"')
      .field('"firstName"')
      .field('"lastName"')
      .field('"emailId"')
      .where('"userId" = ?', id)
      .toParam();
    const result = await pool.query(query.text, query.values);
    return result.rows;
  };

  createUser = async (
    userName,
    firstName,
    lastName,
    emailId,
    isAdmin = false,
    password = null,
    organisationId = null
  ) => {
    const query = squel
      .insert()
      .into("users")
      .set('"emailId"', emailId)
      .set('"userName"', userName)
      .set('"firstName"', firstName)
      .set('"lastName"', lastName)
      .set('"isAdmin"', isAdmin)
      .set('"organisationId"', organisationId)
      .set("password", password)
      .toParam();

    const result = await pool.query(query.text, query.values);
    return result.rows[0];
  };

  loginUpdate = async (userId, organisationId) => {
    const query = squel
      .update()
      .table('users')
      .set('"organisationId"', organisationId)
      .where('"userId= ?"', userId)
      .toParam();
    const result = await pool.query(query.text, query.values);
    return "Success";
  };

  updateUser = async (userId, update) => {
    const query = squel.update().table("users");
    Object.entries(update).forEach(([key, value]) => {
      query.set(`"${key}"`, value)
    });
    query.where('"userId" = ?', userId)
      .returning('"userId"')
      .toParam();
    const { text, values } = query.toParam();
    const result = await pool.query(text, values);
    return result.rows[0] ? 'Success' : "Failed";
  }

  deleteUser = async (userId) => {
    const query = squel
      .delete()
      .from('users')
      .where('"userId" = ?', userId)
      .toParam();

    const result = await pool.query(query.text, query.values);
    return result;
  }
}

module.exports = userRepository;
