const express = require('express');
const accommodationRouter = express.Router();
const { getAccommodations } = require('../controllers/index');

accommodationRouter.get('/', getAccommodations);

module.exports = {
    accommodationRouter};
