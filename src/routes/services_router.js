const express = require('express');
const servicesRouter = express.Router();
const { getServices } = require('../controllers/index')

servicesRouter.get('/', getServices);

module.exports = { servicesRouter };