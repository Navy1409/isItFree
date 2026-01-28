const OfficeRepository = require("./officeRepository");
const CustomAPIError = require("../../errors/customError");
const OrganisationService = require("../organisations/organisationService");

class OfficeService {
  constructor() {
    this.officeRepository = new OfficeRepository();
    this.organisationService = new OrganisationService();
  }
  async createOffice({
    officeName,
    organisationId,
    location,
    config,
    isGroup,
  }) {
    if ((!officeName, !organisationId, !location, !config, !isGroup)) {
      throw new CustomAPIError("Enter complete data", 400);
    }
    // const jsonConfig = JSON.parse(config);
    const jsonConfig = config;
    if ((!jsonConfig.row, !jsonConfig.colum, !jsonConfig.capacity)) {
      throw new CustomAPIError("Enter valid config", 400);
    }
    const organisation =
      await this.organisationService.getOrganisationByOrganisationId(
        organisationId,
      );
    if (!organisation.length) {
      throw new CustomAPIError("No such organsiation exists", 400);
    }
    const response = await this.officeRepository.createOffice(
      officeName,
      organisationId,
      location,
      config,
      isGroup,
    );
    return response;
  }

  async getOfficesByOrganisationId(organisationId) {
    const response =
      await this.officeRepository.getOfficesByOrganisationId(organisationId);
    return response;
  }

  async getIsGroupByOfficeId(officeId) {
    if (!officeId) {
      throw new CustomAPIError("Provide Office Id", 400);
    }
    const response = this.officeRepository.getIsGroupByOfficeId(officeId);
    return response;
  }

  async getOfficeByOfficeId(officeId) {
    if (!officeId) {
      throw new CustomAPIError("Provide Office Id", 400);
    }
    const response = this.officeRepository.getOfficeByOfficeId(officeId);
    return response;
  }
}

module.exports = OfficeService;
