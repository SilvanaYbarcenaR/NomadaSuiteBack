const express = require("express");
const filteredRouter = express.Router();
const { filteredByBedrooms } = require("../controllers/index");

filteredRouter.get("/bedrooms", filteredByBedrooms);

module.exports = { filteredRouter };
