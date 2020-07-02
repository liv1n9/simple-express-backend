const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { ERole, EGender } = require("../configs/constants");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        sparse: true,
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 64,
        required: true,
    },
    fullName: {
        type: String,
        maxlength: 100,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: Object.values(EGender),
    },
    email: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        maxlength: 20,
    },
    address: {
        type: String,
        required: true,
        maxlength: 512,
    },
    role: {
        type: String,
        enum: Object.values(ERole),
    }
}, { timestamps: true, collection: "User" });

userSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

exports.userModel = model("User", userSchema);
