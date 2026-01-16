const CustomAPIError = require("../../errors/customError");
const OrganisationRepository = require("./organisationRepository");


class organisationService{
    constructor(){
        this.OrganisationRepository=new OrganisationRepository()
    }
    async createOrganisation(organisationName){
        if(!organisationName){
            throw new CustomAPIError('Please provide required credentials',400);
        }
        
        let response= await this.OrganisationRepository.createOrganisation(organisationName);
        return response;
    }
}
module.exports=organisationService;