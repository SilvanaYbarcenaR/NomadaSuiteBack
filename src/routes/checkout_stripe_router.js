const stripe = require('stripe')('sk_test_51O7j6AB5JkK26D9XNZkbUpZqEY6VlSep1gISiXFc0IUyPiHKrAHLv5R0cHeVIXtnTbhhhAToD0o1JK1RPPA8jJf100y5twZqAq'); 
const express = require('express');
const createPayment = require('../controllers/checkout/stripe_Checkout');
require('dotenv').config();
const bodyParser = require('body-parser');
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

checkoutStripeRouter.use(bodyParser.raw({ type: 'application/json' }));

checkoutStripeRouter.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      console.log('Pago completado:', session);
  }

  res.json({ received: true });
});

module.exports = checkoutStripeRouter;