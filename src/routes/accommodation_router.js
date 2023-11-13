const express = require("express");
const accommodationRouter = express.Router();
const {
  getAccommodations,
  postAccommodation, 
  getAccommodationById,
  deleteAccommodation,
  updateAccommodation,
  getDesactiveAccommodations,
  getPendingAccommodations,
  getAllAccommodations,
  getAllAccommodationsByUser
} = require("../controllers/index");

accommodationRouter.get('/', getAccommodations);
accommodationRouter.get('/all', getAllAccommodations);
accommodationRouter.get('/user/:ownerId', getAllAccommodationsByUser);
accommodationRouter.get('/desactive', getDesactiveAccommodations);
accommodationRouter.get('/pending', getPendingAccommodations);
accommodationRouter.post('/create', postAccommodation);
accommodationRouter.get('/:id', getAccommodationById);
accommodationRouter.delete("/:id", deleteAccommodation);
accommodationRouter.put("/:id", updateAccommodation);

module.exports = { accommodationRouter };
