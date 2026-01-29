const { pool } = require('../../db/connect');
const squel = require('squel').useFlavour('postgres');

class OfficeRepository {
    async createOffice(officeName, organisationId, location, config, isGroup) {
        const query = squel
            .insert()
            .into("offices")
            .set('"officeName"', officeName)
            .set('"organisationId"', organisationId)
            .set('"location"', location)
            .set(
                '"config"',
                squel.rstr("?::jsonb", JSON.stringify(config))
            )
            .set('"isGroup"', isGroup)
            .toParam();

        const result = await pool.query(query.text, query.values);
        return "Success";
    }
    async getOfficesByOrganisationId(organisationId) {
        const query = squel
            .select()
            .from("offices")
            .field('*')
            .where('"organisationId" = ?', organisationId)
            .toParam();

        const result = await pool.query(query.text, query.values);
        return result.rows;
    }

    async getIsGroupByOfficeId(officeId) {
        const query = squel
            .select()
            .from("offices")
            .field('"isGroup"')
            .where('"officeId"=?', officeId)
            .toParam();
        return (await pool.query(query.text, query.values)).rows;
    }

    async getOfficeByOfficeId(officeId) {
        const query = squel
            .select()
            .from("offices", 'offc')
            .field("offc.*")
            .field('org."openTime"')
            .field('org."closeTime"')
            .field('org."breakTime"')
            .where('offc."officeId" = ?', officeId)
            .join("organisations", 'org', 'org."organisationId"=offc."organisationId"')
            .toParam();

        return (await pool.query(query.text, query.values)).rows
    }
}

module.exports = OfficeRepository;