const passport = require("passport");
const { userModel } = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_MAX_AGE } = require("../configs/secrets");
const { Unauthorized } = require("http-errors");

exports.login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(Unauthorized());
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            const payload = { sub: user._id };
            const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_MAX_AGE });
            res.status(200).json({ user, accessToken });
        });
    })(req, res, next);
};