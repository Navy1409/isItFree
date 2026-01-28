const UserService = require('./userService')
const OrganisationService = require('../organisations/organisationService')
const { StatusCodes } = require('http-status-codes');
const UserRepository = require('./userRepository');
const { pool } = require('../../db/connect')
const jwt = require('jsonwebtoken')
class UserController {
    constructor() {
        this.userService = new UserService()
        this.organisationService = new OrganisationService();
        this.userRepository = new UserRepository();
    }
    createUser = async (req, res) => {
        try {
            const payload = req.body;
            const user = await this.userService.createUser(payload)
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }

    }
    getUserByEmail = async (req, res) => {
        const { emailId } = req.params
        try {
            const user = await this.userService.getUserByEmail(emailId);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }

    }
    getUserById = async (req, res) => {
        const { userId } = req.params

        try {
            const user = await this.userService.getUserById(userId);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }

    }
    deleteUser = async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await this.userService.deleteUser(userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }

    }
    editUser = async (req, res) => {
        const params = req.params;
        const body = req.body
        const response = await this.userService.updateUser(params, body);
        res.status(200).json(response)
    }
    getUserByOrganisationId = async (req, res) => {
        const { organisationId } = req.params;
        try {
            const response = await this.userService.getUserByOrganisationId(organisationId);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }

    }
    login = async (req, res) => {
        const payload = req.body;
        try {
            const token = await this.userService.loginUser(payload);
            res.status(StatusCodes.OK).json({ token });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
        }
    }

    register = async (req, res, next) => {
        const pgClient = await pool.connect();
        try {
            const {
                firstName,
                lastName,
                userName,
                organisationName,
                emailId,
                password,
                openTime,
                closeTime,
                breakTime
            } = req.body;
            await pgClient.query("BEGIN");
            const organisationId = await this.organisationService.createOrganisation(
                organisationName,
                openTime,
                closeTime,
                breakTime,
                pgClient
            );
            const user = await this.userService.createUser(
                {
                    userName,
                    firstName,
                    lastName,
                    emailId,
                    organisationId,
                    isAdmin: true,
                    password,
                    pgClient
                }
            );

            await pgClient.query("COMMIT");
            const token = jwt.sign(
                {
                    userId: user.userId, organisationId: organisationId, isAdmin: user.isAdmin,
                    email: user.emailId
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.status(201).json({
                token
            });
        } catch (err) {
            await pgClient.query("ROLLBACK");
            next(err);
        } finally {
            pgClient.release();
        }
    }
}

module.exports = UserController