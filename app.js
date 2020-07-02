var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const bodyParser = require("body-parser");
const chalk = require("chalk");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const productTypesRouter = require("./routes/product-types");
const productRouter = require("./routes/products");
const billRouter = require("./routes/bills");
const { MONGODB_URI } = require("./configs/secrets");
const mongoose = require("mongoose");
const passport = require("passport");

// mongo setup

mongoose.connect(MONGODB_URI, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log("%s MongoDB connection error. Please make sure MongoDB is running.", chalk.red("✗"));
    process.exit();
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// passport setup
app.use(passport.initialize());
app.use(passport.session());
require("./configs/passport");

// routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/product-types", productTypesRouter);
app.use("/products", productRouter);
app.use("/bills", billRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    const isDevelopment = req.app.get("env") === "development";
    const status = err.status || 500;
    const message = isDevelopment ? err.message : undefined;
    const detail = isDevelopment ? JSON.parse(JSON.stringify(err.stack)) : undefined;
    res.status(status).send({ message, detail, status });
});

module.exports = app;
