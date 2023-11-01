const express = require("express");
const server = express();
const router = require("./routes");
const morgan = require("morgan");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const User = require("../src/models/User");
const passport = require("passport");
const session = require("express-session");
dotenv.config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//middleware para manejar las sesiones mediante el paquete Express session
server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
//inicializar passport y la sesion que se va a ejecutar
server.use(passport.initialize());
server.use(passport.session());

//configurar estrategia de Google passport:
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5173/auth/google/home",
    },
    //si el usuario no está en la base de datos lo crea y si está lo autentica:
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { googleId: profile.id },
        { userName: profile.displayName },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
//Rutas de autenticación de Google
server.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
server
  .route("/auth/google/home")
  .get(
    passport.authenticate("google", { failureredirect: "ruta de login" }),
    function (req, res) {
      res.redirect("/home");
    }
  );

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

server.use(router);

module.exports = server;
