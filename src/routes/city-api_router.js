const express = require("express");
const cityApiRouter = express.Router();
const { cityApiIntegration } = require('../controllers/index');

cityApiRouter.get('/search', cityApiIntegration);

module.exports = { cityApiRouter };