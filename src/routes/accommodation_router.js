const express = require("express");
const accommodationRouter = express.Router();
const {
  getAccommodations,
  postAccommodation,
  deleteAccommodation,
} = require("../controllers/index");

accommodationRouter.get("/", getAccommodations);
accommodationRouter.post("/create", postAccommodation);
accommodationRouter.delete("/:id", deleteAccommodation);

module.exports = { accommodationRouter };
