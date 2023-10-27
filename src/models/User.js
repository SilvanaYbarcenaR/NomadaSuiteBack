const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    profileImage: String, 
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    birthdate: Date,
    wantsNotifications: Boolean,
    isActive: Boolean,
    isOwner: Boolean,
    isAdmin: Boolean,
})

const User = mongoose.model('User', userSchema);

module.exports = User