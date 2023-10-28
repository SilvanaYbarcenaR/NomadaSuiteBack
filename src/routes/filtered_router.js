const express = require("express");
const filteredRouter = express.Router();
const { filterLocation } = require('../controllers/index');

filteredRouter.post('/location', filterLocation);

module.exports = { filteredRouter };