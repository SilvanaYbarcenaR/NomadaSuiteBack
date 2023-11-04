const passport = require("passport");
const dotenv = require("dotenv");
const User = require("../../src/models/User");
dotenv.config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(User.createStrategy());

//configurar estrategia de Google passport:

passport.use(
  "auth-google",
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        // Buscar si ya existe un usuario con el googleId
        const existingUser = await User.findOne({
          googleId: profile.id,
        }).exec();

        if (existingUser) {
          // Si el usuario ya existe, autentica al usuario existente
          return cb(null, existingUser);
        } else {
          // Si el usuario no existe, crea un nuevo usuario
          const newUser = new User({
            googleId: profile.id,
            userName: profile.displayName,
            email: profile?.emails[0]?.value,
          });

          // Guarda el nuevo usuario en la base de datos
          const savedUser = await newUser.save();

          // Autentica al nuevo usuario
          return cb(null, savedUser);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

module.exports = { passport };
