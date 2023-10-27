const express = require("express");
const locationRouter = express.Router();
const { getLocation } = require('../controllers/index');

locationRouter.get('/:name?', getLocation);

module.exports = {locationRouter}