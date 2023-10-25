const express = require('express');
const accommodationRouter = express.Router();
const { getAccommodations, postAccommodation } = require('../controllers/index');

accommodationRouter.get('/', getAccommodations);
accommodationRouter.post('/create', postAccommodation);

module.exports = { accommodationRouter };
