const express = require("express");
const server = express();
const router = require("./routes");
const morgan = require("morgan");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const { passport } = require("../src/middlewareGoogle/google");
const { loginGoogleRouter } = require("../src/routes/login_google_router");
// const User = require("../src/models/User");
// const passport = require("passport");
const session = require("express-session");
dotenv.config();

// const GoogleStrategy = require("passport-google-oauth20").Strategy;

//middleware para manejar las sesiones mediante el paquete Express session
server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
// //inicializar passport y la sesion que se va a ejecutar
// server.use(passport.initialize());
// server.use(passport.session());

// passport.use(User.createStrategy());

//serializar y desserializar
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

//configurar estrategia de Google passport: middleware

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:3001/auth/google",
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       try {
//         // Buscar si ya existe un usuario con el googleId
//         const existingUser = await User.findOne({
//           googleId: profile.id,
//         }).exec();

//         if (existingUser) {
//           // Si el usuario ya existe, autentica al usuario existente
//           return cb(null, existingUser);
//         } else {
//           // Si el usuario no existe, crea un nuevo usuario
//           const newUser = new User({
//             googleId: profile.id,
//             userName: profile.displayName,
//             email: profile?.emails[0]?.value, // Puedes incluir el email si está disponible
//           });

//           // Guarda el nuevo usuario en la base de datos
//           const savedUser = await newUser.save();

//           // Autentica al nuevo usuario
//           return cb(null, savedUser);
//         }
//       } catch (err) {
//         return cb(err);
//       }
//     }
//   )
// );

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

server.use(morgan("dev"));
server.use(express.json());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

server.use(upload.array("images", 5));

server.use(async (req, res, next) => {
  if (req.files) {
    try {
      const imagePromises = req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(
          "uploads/" + file.filename
        );
        return result.secure_url;
      });
      const imageUrls = await Promise.all(imagePromises);
      req.imageURLs = imageUrls;
    } catch (error) {
      console.error("Error al cargar las imágenes a Cloudinary:", error);
      return res.status(500).json({ message: "Error al cargar las imágenes" });
    }
  }
  next();
});

server.use(
  "/auth",
  passport.authenticate("auth-google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  }),
  loginGoogleRouter
);

// server.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ],
//   })
// );

// server.route("/auth/google").get(
//   passport.authenticate("google", {
//     failureRedirect: "ruta a la cual redireccionar si hay error",
//   }),
//   function (req, res) {
//     res.redirect("http://localhost:5173/home");
//   }
// );

server.use(router);

module.exports = server;
