const jwt = require('jsonwebtoken');
const {unAthentication} = require('../errors');


const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new unAthentication("no token");
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username};
        next();

    } catch (err) {
        throw new unAthentication('not authorized to access this token',401);
    }
}

module.exports = authenticationMiddleware;