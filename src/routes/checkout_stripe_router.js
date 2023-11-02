const express = require('express');
const checkoutStripeRouter = express.Router();
const createPayment = require('../controllers/checkout/stripe_Checkout');

checkoutStripeRouter.post('/charge', createPayment);

module.exports = checkoutStripeRouter