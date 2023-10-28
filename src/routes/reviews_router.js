const express = require("express");
const reviewsRouter = express.Router();
const { getAllReviews, createReview } = require("../controllers/index");

reviewsRouter.get('/', getAllReviews);
reviewsRouter.post('/create', createReview);


module.exports = { reviewsRouter };