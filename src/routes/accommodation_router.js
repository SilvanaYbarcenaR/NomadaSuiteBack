const express = require('express');
const accommodationRouter = express.Router();
const { getAccommodations, postAccommodation, getAccommodationById } = require('../controllers/index');

accommodationRouter.get('/', getAccommodations);
accommodationRouter.get('/:id', getAccommodationById);
accommodationRouter.post('/create', postAccommodation);

module.exports = { accommodationRouter };
