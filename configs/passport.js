const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");

const { userModel } = require("../models/users");
const { JWT_SECRET } = require("./secrets");

passport.serializeUser((user, done) => {
    return done(null, { _id: user._id });
});

passport.deserializeUser(async (user, done) => {
    try {
        const u = await userModel.findById(user._id);
        if (u) {
            u.password = undefined;
        }
        return done(null, u || false);
    } catch (err) {
        return done(err);
    }
});

passport.use(new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
        try {
            const u = await userModel.findOne({ username });
            if (!u || !await u.comparePassword(password)) {
                return done(null, false);
            } else {
                u.password = undefined;
                return done(null, u);
            }
        } catch (err) {
            return done(err);
        }
    }
));

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
        jsonWebTokenOptions: {
            maxAge: 86400,
        },
        passReqToCallback: true,
    },
    async (req, payload, done) => {
        try {
            const u = await userModel.findOne({ _id: payload.sub });
            if (!u) {
                return done(null, false);
            } else {
                req.user = u;
                return done(null, u);
            }
        } catch (err) {
            return done(err);
        }
    })
);
