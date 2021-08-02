const jwt = require('jsonwebtoken');
const createError = require('http-errors');
module.exports.generateJWT = (user_id) => {
    console.log("generateJWT fn. in jwy.helper.js");
    return jwt.sign({ _id: user_id }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXP
    });

}

module.exports.verifyJWT = (req, res, next) => {
    console.log("verifyJWT fn. in jwy.helper.js");
    if (!req.headers['authorization']) return next(createError.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return next(createError.Unauthorized());
        }
        req._id = payload._id;
        next();
    });
} 