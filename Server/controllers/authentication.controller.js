
const bcrypt = require("bcrypt");
const User = require('../models/user.model');
const jwt = require('../helpers/jwt.helper');
var _ = require('lodash');
module.exports.register = async (req, res, next) => {
    console.log("user registration fn. in authentication.controller.js");
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    try {
        let user = await User.create({ email: req.body.email, password: hashPassword });
        if (user) {
            res.status(200).json({ status: true, user: _.pick(user, ['_id', 'first_name', 'last_name', 'email']), msg: "User register successfully!" });
        } else {
            res.status(200).json({ status: false, msg: "Something went wrong, Please try again!" });
        }
    } catch (error) {
        if (error.code == 11000) {
            res.status(200).json({ status: false, msg: "Email already exist." });
        } else {
            res.status(200).json({ status: false, msg: error.message });
        }
    }
}
module.exports.authenticate = async (req, res, next) => {
    console.log("user authentication fn. in authentication.controller.js");
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            try {
                const validateUser = await bcrypt.compare(req.body.password, user.password);
                if (validateUser) {
                    let token = jwt.generateJWT(user._id);
                    res.status(200).json({ status: true, msg: "Login successfully", accessToken: token });
                } else {
                    res.status(200).json({ status: false, msg: "Password do not match!" });
                }
            } catch (error) {
                res.status(200).json({ status: false, msg: error.message });
            }
        } else {
            res.status(200).json({ status: false, msg: "User not found!" });
        }
    } catch (error) {
        res.status(200).json({ status: false, msg: error.message });
    }

}