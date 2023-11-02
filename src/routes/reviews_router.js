const express = require("express");
const reviewsRouter = express.Router();
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  getAllReviewsByAccommodationId
} = require("../controllers/index");

reviewsRouter.get('/', getAllReviews);
reviewsRouter.post('/create', createReview);
reviewsRouter.delete('/delete/:id', deleteReview); 
reviewsRouter.put('/update/:id', updateReview); 
reviewsRouter.get('/accommodation/:id', getAllReviewsByAccommodationId); 

module.exports = { reviewsRouter };
