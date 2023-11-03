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

//Hash y Salt: son procesos para dar mayor seguridad a la contraseña
userSchema.plugin(passportLocalMongoose);
//Agregamos findOrCreate al esquema usuarios
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

// Creamos estrategia a partir del modelo
// passport.use(User.createStrategy());

//serializar y desserializar
// passport.serializeUser(function (user, cb) {
//   process.nextTick(function () {
//     cb(null, { id: user.id });
//   });
// });

// passport.deserializeUser(function (user, cb) {
//   process.nextTick(function () {
//     return cb(null, user);
//   });
// });

module.exports = User;
