const jwt = require('jsonwebtoken');
const {unAthentication} = require('../errors');


const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(typeof authHeader == "undefined") {
        console.log("no token")
        return next();
    }
    if(!authHeader.startsWith('Bearer ')) {
        return next();
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {name} = decoded
        req.user = {name};
        return next();

    } catch (err) {
        throw new unAthentication('not authorized to access this token',401);
    }
}

module.exports = authenticationMiddleware;