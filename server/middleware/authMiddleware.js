require('dotenv').config();
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json('Missing or invalid Authorization header')
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.id, organisationId: payload.organisationId, isAdmin: payload.isAdmin }
        next();
    } catch (error) {
        res.status(400).json("Not Authenticated")
    }
}
const authorisation = (req, res, next) => {
    if (!req.user.isAdmin) {
        res.status(400).json("Not Authorised");
    }
    next();
}

module.exports = { authenticate, authorisation }