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
      passReqToCallback: true,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const access_token = req.query.access_token;
        const refresh_token = req.query.refresh_token;
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
          return cb(null, savedUser, access_token, refresh_token);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

module.exports = { passport };
