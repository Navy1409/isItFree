const CustomAPIError = require("../../errors/customError");
const OrganisationRepository = require("./organisationRepository");


class organisationService {
    constructor() {
        this.organisationRepository = new OrganisationRepository()
    }
    async createOrganisation(organisationName,
        open_time,
        close_time, breakTime) {
        if (!organisationName || !open_time || !close_time || !breakTime) {
            throw new CustomAPIError('Please provide required credentials', 400);
        }

        let response = await this.organisationRepository.createOrganisation(organisationName, open_time, close_time, breakTime);
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