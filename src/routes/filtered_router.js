const express = require("express");
const filteredRouter = express.Router();

const {
  filteredByBedrooms,
  filteredByServices,
} = require("../controllers/index");

filteredRouter.get("/bedrooms", filteredByBedrooms);
filteredRouter.get("/services", filteredByServices);

module.exports = { filteredRouter };
