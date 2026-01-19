const { pool } = require("../../db/connect");
const squel = require('squel').useFlavour("postgres");
class organisationRepository {
    async createOrganisation(organisationName, open_time, close_time) {
        const query = squel
            .insert()
            .into("organisations")
            .set('"organisationName"', organisationName)
            .set('"openTime"', open_time)
            .set('"closeTime"', close_time)
            .returning('"organisationId"')
            .toParam();

        const result = await pool.query(query.text, query.values);
        return result.rows[0].organisationId;
    }

    async getOrganisationTimings(organisationId) {
        const query = squel
            .select()
            .from("organisations")
            .field("openTime")
            .field("closeTime")
            .where('"organisationId" = ?', organisationId)
            .toParam();

        const result = await pool.query(query.text, query.values);
        return result.rows;
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