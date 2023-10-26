const express = require("express");
const accommodationRouter = express.Router();
const {
  getAccommodations,
  postAccommodation, getAccommodationById,
  deleteAccommodation,
  updateAccommodation,
} = require("../controllers/index");

accommodationRouter.get('/', getAccommodations);
accommodationRouter.post('/create', postAccommodation);

module.exports = { accommodationRouter };
