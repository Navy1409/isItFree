const CustomAPIError = require("../../errors/customError");
const OrganisationRepository = require("./organisationRepository");


class organisationService {
    constructor() {
        this.organisationRepository = new OrganisationRepository()
    }
    async createOrganisation(organisationName,
        open_time,
        close_time, breakTime, pgClient) {
        if (!organisationName || !open_time || !close_time || !breakTime) {
            throw new CustomAPIError('Please provide required credentials', 400);
        }

        let response = await this.organisationRepository.createOrganisation(organisationName, open_time, close_time, breakTime, pgClient);
        if (!response) {
            throw new CustomAPIError('No organisation Created', 400)
        }
        return response;
    }

    async getOrganisationName(organisationId) {
        let response = await this.organisationRepository.getOrganisationName(organisationId);
        if (!response) {
            throw new CustomAPIError('Invalid Credentials', 401);
        }
        return response;
    }

    async updateOrganisationName(organisationId, organisationName) {
        let response = await this.organisationRepository.updateOrganisationName(organisationId, organisationName);
        if (!response) {
            throw new CustomAPIError('Invalid ID', 401);
        }
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