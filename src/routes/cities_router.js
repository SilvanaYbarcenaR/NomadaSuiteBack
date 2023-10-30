const express = require("express");
const { getCityInfo } = require("../controllers/index");

const citiesRouter = express.Router();

citiesRouter.get("/", getCityInfo);

module.exports = { citiesRouter };
