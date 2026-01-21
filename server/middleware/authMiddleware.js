require('dotenv').config();
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(400).json('No token provided')
    }
    const token = authHeader;
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.id, organisationId: payload.organisation_id, isAdmin: payload.isAdmin }
        next();
    } catch (error) {
        res.status(400).json("Not Authenticated")
    }
}
const authorisation = (req, res, next) => {
    if (req.user.isAdmin) {
        res.status(400).json("Not Authorised");
    }
    next();
}

module.exports = { authenticate, authorisation }