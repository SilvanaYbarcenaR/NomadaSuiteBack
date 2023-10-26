const express = require("express");
const accommodationRouter = express.Router();
const {
  getAccommodations,
  postAccommodation, 
  getAccommodationById,
  deleteAccommodation,
  updateAccommodation,
} = require("../controllers/index");
//nuevas rutas
accommodationRouter.get('/', getAccommodations);
accommodationRouter.post('/create', postAccommodation);
accommodationRouter.get('/:id', getAccommodationById);
accommodationRouter.delete("/:id", deleteAccommodation);
accommodationRouter.put("/:id", updateAccommodation);

module.exports = { accommodationRouter };
