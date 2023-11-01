const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

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
  googleId: String,
});

const User = mongoose.model("User", userSchema);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = User;
