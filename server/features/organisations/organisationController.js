const OrganisationService = require("./organisationService");

class organisationController {
  constructor() {
    this.organisationService = new OrganisationService();
  }

  getOrganisationName = async (req, res) => {
    const { organisationId } = req.params;
    try {
      const organisation = await this.organisationService.getOrganisationName(
        organisationId
      );
      res.status(200).json(organisation);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
    updateOrganisationName = async (req, res) => {
    const { organisationId } = req.params;
    const {organisationName}= req.body;
    try {
      const organisation = await this.organisationService.updateOrganisationName(
        organisationId,
        organisationName
      );
      res.status(200).json(organisation);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
}
module.exports=organisationController;
