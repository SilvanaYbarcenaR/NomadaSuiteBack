const express = require("express");
const reviewsRouter = express.Router();
const { getAllReviews, createReview , getAverageReviews} = require("../controllers/index");

reviewsRouter.get('/', getAllReviews);
reviewsRouter.get('/average', getAverageReviews);
reviewsRouter.post('/create', createReview);


module.exports = { reviewsRouter };