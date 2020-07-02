const { Forbidden } = require("http-errors");

exports.permit = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            return next();
        } else {
            return next(Forbidden());
        }
    };
};