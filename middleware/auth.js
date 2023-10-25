const jwt = require('jsonwebtoken');
const {unAthentication} = require('../errors');


const authenticationMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(typeof token == "undefined") {
        console.log("no token")
        return next();
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {name, id} = decoded
        req.name = name;
        req.id = id;
        return next();

    } catch (err) {
        throw new unAthentication('not authorized to access this token',401);
    }
}

module.exports = authenticationMiddleware;