const { pool } = require("../../db/connect");
const squel = require("squel").useFlavour("postgres");

class userRepository {
  getUserByEmail = async (email) => {
    const query = squel
      .select()
      .from("users")
      .field("password")
      .field('"userId"')
      .field('"organisationId"')
      .field('"isAdmin"')
      .field('"emailId"')
      .where('"emailId" = ?', email)
      .toParam();


    const result = await pool.query(query.text, query.values);
    return result.rows;
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
    organisationId,
    isAdmin = false,
    password = null,
    pgClient= pool
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
      .returning('"userId"')
      .returning('"isAdmin"')
      .returning('"emailId"')
      .toParam();
    const result = await pgClient.query(query.text, query.values);
    return result.rows[0];
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
  setPassword = async (emailId, hashed_password)=>{
    const query= squel
    .update()
    .table("users")
    .where('"emailId"=?', emailId)
    .set("password",hashed_password)
    .returning('"emailId"')
    .toParam();

    const result = await pool.query(query.text, query.values);
    return result.rows[0];
  }
  getUserByOrganisationId = async (organisationId) => {
    const query = squel
      .select()
      .from("users")
      .field('"userName"')
      .field('"firstName"')
      .field('"lastName"')
      .field('"emailId"')
      .field('"userId"')
      .where('"organisationId"=?', organisationId)
      .toParam();

    const result = await pool.query(query.text, query.values);
    return result.rows;

  }
}

module.exports = userRepository;
