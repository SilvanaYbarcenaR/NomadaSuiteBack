const express = require("express");
const locationRouter = express.Router();
const { getLocation } = require('../controllers/index');

locationRouter.get('/', getLocation);

module.exports = {locationRouter}