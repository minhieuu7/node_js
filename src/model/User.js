const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 8},
    role: {
        type: String, 
        required: true,
        enum: ["admin", "user"],
        default: "user"
    }
})
UserSchema.index({userName: 1, email: 1});

const User = mongoose.model('users', UserSchema);

module.exports = User;


