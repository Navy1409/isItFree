const OfficeService = require('./officeSevice');
const OrganisationService = require('../organisations/organisationService')

class OfficeController {
    constructor() {
        this.officeService = new OfficeService();
        this.organisationService = new OrganisationService();
    }

    createOffice = async (req, res) => {
        try {
            const { officeName, organisationId, location, config, isGroup } = req.body;
            if (!officeName, !organisationId, !location, !config, !isGroup) {
                res.status(400).json('Enter complete data');
            }
            // const jsonConfig = JSON.parse(config);
            const jsonConfig = config;
            if (!jsonConfig.row, !jsonConfig.colum, !jsonConfig.capacity) {
                res.status(400).json('Enter valid config');
            }
            const result = await this.officeService.createOffice(officeName, organisationId, location, config, isGroup)
            res.status(200).json(result);
        } catch (error) {
            console.log(error);

            res.status(400).json(error.message)
        }
    }

    getOfficesByOrganisationId = async (req, res) => {
        try {
            const { organisationId } = req.params;
            if (!organisationId) {
                res.status(400).json("No Organisation Id provided")
            }
            const organisation = await this.organisationService.getOrganisationByOrganisationId(organisationId);
            if (!organisation.length) {
                res.status(400).json("Organisation does not exists")
            }
            const result = await this.officeService.getOfficesByOrganisationId(organisationId);
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    getOfficeByOfficeId = async (req, res) => {
        const { officeId } = req.params;
        if (!officeId) {
            res.status(400).json("No Office Id provded")
        }
        const office = await this.officeService.getOfficeByOfficeId(officeId);
        if (!office.length) {
            res.status(400).json("Office does not exists")
        }
        res.status(200).json(office)
    }
}

module.exports = OfficeController