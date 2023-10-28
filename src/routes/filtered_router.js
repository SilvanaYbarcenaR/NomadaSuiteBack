const express = require("express");
const filteredRouter = express.Router();
const { filterLocation } = require('../controllers/index');
const { filteredByBedrooms } = require("../controllers/index");

filteredRouter.post('/location', filterLocation);
filteredRouter.get("/bedrooms", filteredByBedrooms);

module.exports = { filteredRouter };
