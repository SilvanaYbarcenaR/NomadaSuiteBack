const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    profileImage: String, 
    userName: {
        type: String,
        unique: true, 
        required: true,
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true, 
        required: true,
    },
    password: String,
    birthdate: Date,
    wantsNotifications: Boolean,
    isActive: Boolean,
    isOwner: Boolean,
    isAdmin: Boolean,
    googleId: String
})

const User = mongoose.model('User', userSchema);

module.exports = User