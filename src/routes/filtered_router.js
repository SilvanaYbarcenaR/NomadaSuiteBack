const express = require("express");
const filteredRouter = express.Router();
const { filterLocation } = require('../controllers/index');
const { filteredByBedrooms } = require("../controllers/index");
const { combinatedFilter } = require('../controllers/index');

filteredRouter.get('/location', filterLocation);
filteredRouter.get("/bedrooms", filteredByBedrooms);
filteredRouter.get("/combinated", combinatedFilter);

module.exports = { filteredRouter };
