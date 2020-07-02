const passport = require("passport");
const { Unauthorized } = require("http-errors");
exports.JWTAuth = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info,) => {
        if (!user) {
            return next(Unauthorized());
        }
        if (err) {
            return next(err);
        }
        return next();
    })(req, res, next);
};