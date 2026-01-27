const OfficeService = require("./officeSevice");
const OrganisationService = require("../organisations/organisationService");

class OfficeController {
  constructor() {
    this.officeService = new OfficeService();
    this.organisationService = new OrganisationService();
  }

  createOffice = async (req, res) => {
    const payload = req.body;
    try {
      const result = await this.officeService.createOffice(payload);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);

      res.status(400).json(error.message);
    }
  };

  getOfficesByOrganisationId = async (req, res) => {
    try {
      const params = req.params
      const result =
        await this.officeService.getOfficesByOrganisationId(params);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  getOfficeByOfficeId = async (req, res) => {
    const { officeId } = req.params;

    try {
      const office = await this.officeService.getOfficeByOfficeId(officeId);
      res.status(200).json(office);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = OfficeController;
