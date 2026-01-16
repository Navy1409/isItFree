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
    async getOrganisationName(organisationId){
        const query = squel
  .select()
  .from('"organisations"')
  .field('"organisationName"')
  .where('"organisationId" = ?', organisationId)
  .toParam();


        const result = await pool.query(query.text, query.values);
        return result.rows[0];
    }
    async updateOrganisationName(organisationId, organisationName){        
        const query= squel
        .update()
        .table('organisations')
        .set('"organisationName"',organisationName)
        .where('"organisationId"=?',organisationId)
        .returning('"organisationName"')
        .toParam()

        const result= await pool.query(query.text, query.values);
        return result.rows[0];
    }
    
}
module.exports=organisationRepository;