const express = require("express");
const filteredRouter = express.Router();
const { filterLocation } = require('../controllers/index');
const { combinatedFilter } = require('../controllers/index');
const {
  filteredByBedrooms,
  filteredByServices,
} = require("../controllers/index");

filteredRouter.get('/location', filterLocation);
filteredRouter.get("/bedrooms", filteredByBedrooms);
filteredRouter.get("/combinated", combinatedFilter);
filteredRouter.get("/services", filteredByServices);

module.exports = { filteredRouter };
