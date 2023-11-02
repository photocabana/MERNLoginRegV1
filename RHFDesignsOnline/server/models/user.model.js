const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
    firstName: {
    type: String,
    required: [true, "First name is required"]
    },
    lastName: {
    type: String,
    required: [true, "Last name is required"]
    },
    email: {
    type: String,
    required: [true, "Email is required"]
    },
    password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be 8 characters or longer"]
    }
}, {timestamps: true});

// add this after UserSchema is defined – virtual becomes (confirmed password) that we don’t want in our database
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

// takes in a function that validates our confirmed password with our password
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

// this should go after – bcrypt – hashes our password 10x with bcrypt (logs the password hashed) – if not run away
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model("User", UserSchema)
