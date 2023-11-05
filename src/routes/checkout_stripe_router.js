const stripe = require('stripe')('sk_test_51O7j6AB5JkK26D9XNZkbUpZqEY6VlSep1gISiXFc0IUyPiHKrAHLv5R0cHeVIXtnTbhhhAToD0o1JK1RPPA8jJf100y5twZqAq'); 
const express = require('express');
const createPayment = require('../controllers/checkout/stripe_Checkout');
require('dotenv').config();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const checkoutStripeRouter = express.Router();

checkoutStripeRouter.use((req, res, next) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', () => {
    req.rawBody = data;
    next();
  });
});

checkoutStripeRouter.post('/charge', createPayment);

checkoutStripeRouter.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = await stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    console.log('Evento:', event);
    res.json({ received: true });
  } catch (err) {
    console.error('Error de webhook:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = checkoutStripeRouter;