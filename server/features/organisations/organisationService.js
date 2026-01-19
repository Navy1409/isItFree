const CustomAPIError = require("../../errors/customError");
const OrganisationRepository = require("./organisationRepository");


class organisationService {
    constructor() {
        this.organisationRepository = new OrganisationRepository()
    }
    async createOrganisation(organisationName,
        open_time,
        close_time) {
        if (!organisationName || !open_time || !close_time) {
            throw new CustomAPIError('Please provide required credentials', 400);
        }

        let response = await this.organisationRepository.createOrganisation(organisationName, open_time, close_time);
        return response;
    }

    async getOrganisationByOrganisationId(organisationId) {
        if (!organisationId) {
            throw new CustomAPIError('Please provide orgasnisation id', 400);
        }

        let response = await this.organisationRepository.getOrganisationByOrganisationId(organisationId);

        return response;
    }
}
module.exports = organisationService;