const express = require("express");
const filteredRouter = express.Router();
const { filterLocation } = require("../controllers/index");
const { combinatedFilter } = require("../controllers/index");
const {
  filteredByBedrooms,
  filteredByServices,
} = require("../controllers/index");
const filteredByPrice = require("../controllers/filters/filteredByPrice");

filteredRouter.get("/location", filterLocation);
filteredRouter.get("/bedrooms", filteredByBedrooms);
filteredRouter.get("/combinated", combinatedFilter);
filteredRouter.get("/services", filteredByServices);
filteredRouter.get("/price", filteredByPrice);

module.exports = { filteredRouter };
