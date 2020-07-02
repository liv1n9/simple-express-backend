require("dotenv").config();
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_MAX_AGE = Number(process.env.JWT_MAX_AGE || "86400");
exports.PORT = process.env.PORT || "3000";