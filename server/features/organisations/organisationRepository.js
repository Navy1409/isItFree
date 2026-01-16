const {pool}=require("../../db/connect");
const squel= require('squel').useFlavour("postgres");
const pgClient= pool.connect()
class organisationRepository{
    async createOrganisation(organisationName){
        const query= squel
        .insert()
        .into("organisations")
        .set('"organisationName"',organisationName)
        .returning('"organisationId"')
        .toParam();

        const result=await pool.query(query.text, query.values);
        return result.rows[0].organisationId;
    }
    
}
module.exports=organisationRepository;