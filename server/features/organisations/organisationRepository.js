const { pool } = require("../../db/connect");
const squel = require('squel').useFlavour("postgres");
class organisationRepository {
  async createOrganisation(organisationName, open_time, close_time, breakTime, pgClient=pool) {
    const query = squel
      .insert()
      .into("organisations")
      .set('"organisationName"', organisationName)
      .set('"openTime"', open_time)
      .set('"closeTime"', close_time)
      .set('"breakTime"', breakTime)
      .returning('"organisationId"')
      .toParam();

    const result = await pgClient.query(query.text, query.values);
    return result.rows[0].organisationId;
  }
  async getOrganisationName(organisationId) {
    const query = squel
      .select()
      .from('"organisations"')
      .field('"organisationName"')
      .where('"organisationId" = ?', organisationId)
      .toParam();
    const result = await pool.query(query.text, query.values);
    return result.rows[0].organisationName;
  }

  async getOrganisationTimings(organisationId) {
    const query = squel
      .select()
      .from("organisations")
      .field('"openTime"')
      .field('"closeTime"')
      .field('"breakTime"')
      .where('"organisationId" = ?', organisationId)
      .toParam();

    const result = await pool.query(query.text, query.values);
    return result.rows[0];
  }
  async updateOrganisationName(organisationId, organisationName) {
    const query = squel
      .update()
      .table("organisations")
      .set('"organisationName"', organisationName)
      .where('"organisationId"=?', organisationId)
      .returning('"organisationName"')
      .toParam();

    const result = await pool.query(query.text, query.values);
    return result.rows[0];
  }

  async getOrganisationByOrganisationId(organisationId) {
    const query = squel.select()
      .from("organisations")
      .where('"organisationId" = ?', organisationId)
      .toParam()
    return (await pool.query(query.text, query.values)).rows;
  }

}
module.exports = organisationRepository;