const express = require('express');
const server = express();
const router = require("./routes");
const morgan = require('morgan');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

server.use(express.raw());

server.use(morgan('dev'));
server.use(express.json());

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

server.use(upload.array('images', 5));

server.use(async (req, res, next) => {
  if (req.files) {
    try {
      const imagePromises = req.files.map(async file => {
        const result = await cloudinary.uploader.upload('uploads/' + file.filename);
        return result.secure_url;
      });
      const imageUrls = await Promise.all(imagePromises);
      req.imageURLs = imageUrls;
    } catch (error) {
      console.error("Error al cargar las imágenes a Cloudinary:", error);
      return res.status(500).json({ message: 'Error al cargar las imágenes' });
    }
  }
  next();
});

server.use(router);

module.exports = server;
